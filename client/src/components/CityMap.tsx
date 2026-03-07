/**
 * CityMap Component — Leaflet 版本（OpenStreetMap，国内可用，无需Key）
 * 功能：景点总览标记 + 路线规划
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { MapView } from "./Map";
import type { City, Attraction } from "@/data/attractions";
import {
  MapPin, ChevronDown, ChevronUp, Route, CheckSquare,
  Square, Navigation, Clock, RotateCcw, ListOrdered, X
} from "lucide-react";

interface CityMapProps {
  city: City;
  accentColor: string;
}

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(h));
}

function nearestNeighbourOrder(attractions: Attraction[]): Attraction[] {
  if (attractions.length <= 2) return [...attractions];
  const unvisited = [...attractions];
  const result: Attraction[] = [unvisited.splice(0, 1)[0]];
  while (unvisited.length > 0) {
    const last = result[result.length - 1];
    let bestIdx = 0, bestDist = Infinity;
    unvisited.forEach((a, i) => {
      if (!a.lat || !a.lng || !last.lat || !last.lng) return;
      const d = haversineKm({ lat: last.lat, lng: last.lng }, { lat: a.lat, lng: a.lng });
      if (d < bestDist) { bestDist = d; bestIdx = i; }
    });
    result.push(unvisited.splice(bestIdx, 1)[0]);
  }
  return result;
}

type MapMode = "view" | "plan";

export function CityMap({ city, accentColor }: CityMapProps) {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const routeLineRef = useRef<any>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mode, setMode] = useState<MapMode>("view");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [orderedRoute, setOrderedRoute] = useState<Attraction[]>([]);
  const [routeLegs, setRouteLegs] = useState<{ from: string; to: string; distKm: string }[]>([]);

  const mappableAttractions = city.attractions.filter(a => a.lat && a.lng);

  function handleMapReady(map: any) {
    mapRef.current = map;
    setMapReady(true);
  }

  // 清除地图上所有标记和路线
  function clearMap() {
    const L = window.L;
    if (!L || !mapRef.current) return;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    if (routeLineRef.current) { routeLineRef.current.remove(); routeLineRef.current = null; }
  }

  // 总览模式：显示所有景点标记
  useEffect(() => {
    if (!mapReady || !mapRef.current || !window.L) return;
    if (mode !== "view") return;
    const L = window.L;
    clearMap();

    mappableAttractions.forEach((attraction, index) => {
      if (!attraction.lat || !attraction.lng) return;
      const icon = L.divIcon({
        html: `<div style="background:${accentColor};color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${index + 1}</div>`,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      const marker = L.marker([attraction.lat, attraction.lng], { icon })
        .addTo(mapRef.current)
        .bindPopup(`
          <div style="font-family:sans-serif;min-width:180px">
            <div style="font-weight:700;font-size:14px;margin-bottom:4px">${index + 1}. ${attraction.nameCn}</div>
            <div style="font-size:11px;color:#78716c;margin-bottom:6px">${attraction.name}</div>
            <div style="font-size:12px;margin-bottom:3px">🎫 ${attraction.ticketPrice.split("\n")[0]}</div>
            <div style="font-size:12px">🕐 ${attraction.openingHours.split("\n")[0]}</div>
            ${attraction.freeDay !== "无" ? `<div style="font-size:11px;color:#16a34a;margin-top:4px">✅ 免费日：${attraction.freeDay.split("\n")[0]}</div>` : ""}
          </div>
        `);
      markersRef.current.push(marker);
    });
  }, [mapReady, mode, mappableAttractions, accentColor]);

  // 路线规划模式：根据选中景点绘制路线
  function planRoute() {
    if (!mapRef.current || !window.L) return;
    const L = window.L;
    const selected = mappableAttractions.filter(a => selectedIds.has(a.id));
    if (selected.length < 2) return;

    const ordered = nearestNeighbourOrder(selected);
    setOrderedRoute(ordered);

    // 绘制折线路线
    clearMap();
    const latlngs = ordered.map(a => [a.lat!, a.lng!]);
    routeLineRef.current = L.polyline(latlngs, { color: accentColor, weight: 4, opacity: 0.8, dashArray: "8,6" }).addTo(mapRef.current);

    // 路线节点标记
    ordered.forEach((a, i) => {
      const icon = L.divIcon({
        html: `<div style="background:${accentColor};color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4)">${i + 1}</div>`,
        className: "",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
      const marker = L.marker([a.lat!, a.lng!], { icon }).addTo(mapRef.current).bindPopup(`<b>${i + 1}. ${a.nameCn}</b>`);
      markersRef.current.push(marker);
    });

    // 自动缩放到路线范围
    mapRef.current.fitBounds(routeLineRef.current.getBounds(), { padding: [30, 30] });

    // 计算各段距离
    const legs = [];
    for (let i = 0; i < ordered.length - 1; i++) {
      const a = ordered[i], b = ordered[i + 1];
      if (!a.lat || !a.lng || !b.lat || !b.lng) continue;
      const dist = haversineKm({ lat: a.lat, lng: a.lng }, { lat: b.lat, lng: b.lng });
      legs.push({ from: a.nameCn, to: b.nameCn, distKm: dist.toFixed(1) });
    }
    setRouteLegs(legs);
  }

  function resetPlan() {
    setSelectedIds(new Set());
    setOrderedRoute([]);
    setRouteLegs([]);
    clearMap();
    // 重新显示总览标记
    if (mapReady && mapRef.current && window.L) {
      const L = window.L;
      mappableAttractions.forEach((attraction, index) => {
        if (!attraction.lat || !attraction.lng) return;
        const icon = L.divIcon({
          html: `<div style="background:${accentColor};color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${index + 1}</div>`,
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        const marker = L.marker([attraction.lat, attraction.lng], { icon }).addTo(mapRef.current).bindPopup(`<b>${index + 1}. ${attraction.nameCn}</b>`);
        markersRef.current.push(marker);
      });
    }
  }

  if (mappableAttractions.length === 0) return null;

  return (
    <div className="mt-4 rounded-xl border border-stone-200 overflow-hidden shadow-sm">
      {/* Header */}
      <button
        className="w-full flex items-center justify-between px-5 py-3 bg-stone-50 hover:bg-stone-100 transition-colors border-b border-stone-200"
        onClick={() => setIsExpanded(v => !v)}
      >
        <div className="flex items-center gap-2">
          <MapPin size={15} style={{ color: accentColor }} />
          <span className="text-sm font-semibold text-stone-700">{city.nameCn} 景点地图 & 行程规划</span>
          <span className="text-xs text-stone-400">（{mappableAttractions.length} 处景点）</span>
        </div>
        {isExpanded ? <ChevronUp size={16} className="text-stone-400" /> : <ChevronDown size={16} className="text-stone-400" />}
      </button>

      {isExpanded && (
        <div>
          {/* Mode tabs */}
          <div className="flex border-b border-stone-200 bg-white">
            <button
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${mode === "view" ? "border-current" : "border-transparent text-stone-400 hover:text-stone-600"}`}
              style={mode === "view" ? { color: accentColor } : {}}
              onClick={() => { setMode("view"); resetPlan(); }}
            >
              <MapPin size={13} /> 景点总览
            </button>
            <button
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${mode === "plan" ? "border-current" : "border-transparent text-stone-400 hover:text-stone-600"}`}
              style={mode === "plan" ? { color: accentColor } : {}}
              onClick={() => setMode("plan")}
            >
              <Route size={13} /> 路线规划
            </button>
          </div>

          {/* Plan mode: attraction checklist */}
          {mode === "plan" && (
            <div className="p-4 bg-stone-50 border-b border-stone-100">
              <div className="text-xs font-semibold text-stone-500 mb-2">选择景点（至少2个）：</div>
              <div className="flex flex-wrap gap-2 mb-3">
                {mappableAttractions.map((a, i) => {
                  const checked = selectedIds.has(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => setSelectedIds(prev => {
                        const next = new Set(prev);
                        checked ? next.delete(a.id) : next.add(a.id);
                        return next;
                      })}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all"
                      style={checked ? { background: accentColor, color: "white", borderColor: accentColor } : { borderColor: "#d6d3d1", color: "#57534e" }}
                    >
                      {checked ? <CheckSquare size={12} /> : <Square size={12} />}
                      {i + 1}. {a.nameCn}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={planRoute}
                  disabled={selectedIds.size < 2}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity disabled:opacity-40"
                  style={{ background: accentColor }}
                >
                  <Navigation size={12} /> 生成最优路线
                </button>
                <button onClick={resetPlan} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-500 border border-stone-200 hover:bg-stone-100">
                  <RotateCcw size={12} /> 重置
                </button>
              </div>
            </div>
          )}

          {/* Map */}
          <MapView
            className="w-full h-[360px] md:h-[440px]"
            initialCenter={city.mapCenter}
            initialZoom={city.mapZoom}
            onMapReady={handleMapReady}
          />

          {/* Route result */}
          {orderedRoute.length >= 2 && routeLegs.length > 0 && (
            <div className="p-4 bg-white border-t border-stone-100">
              <div className="flex items-center gap-2 mb-3">
                <ListOrdered size={14} style={{ color: accentColor }} />
                <span className="text-sm font-semibold text-stone-700">推荐游览顺序</span>
              </div>
              <div className="space-y-2">
                {orderedRoute.map((a, i) => (
                  <div key={a.id} className="flex items-center gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: accentColor }}>{i + 1}</div>
                    <span className="text-sm font-medium text-stone-700">{a.nameCn}</span>
                    {i < routeLegs.length && (
                      <span className="ml-auto text-xs text-stone-400 flex items-center gap-1">
                        <Navigation size={10} /> {routeLegs[i].distKm} km →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 text-xs text-stone-400 text-center">
            地图数据来自 OpenStreetMap · 点击标记查看景点信息
          </div>
        </div>
      )}
    </div>
  );
}
