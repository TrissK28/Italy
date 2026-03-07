/// <reference types="vite/client" />

import { useEffect, useRef, useState } from "react";
import { usePersistFn } from "@/hooks/usePersistFn";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    L?: any;
  }
}

// 通过 CDN 加载 Leaflet（国内可访问）
let _leafletPromise: Promise<void> | null = null;

function loadLeaflet(): Promise<void> {
  if (_leafletPromise) return _leafletPromise;
  if (window.L) { _leafletPromise = Promise.resolve(); return _leafletPromise; }

  _leafletPromise = new Promise((resolve, reject) => {
    // 加载 CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    // 加载 JS
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    const timer = setTimeout(() => {
      _leafletPromise = null;
      reject(new Error("Leaflet load timeout"));
    }, 15000);
    script.onload = () => { clearTimeout(timer); resolve(); };
    script.onerror = () => { clearTimeout(timer); _leafletPromise = null; reject(new Error("Leaflet load failed")); };
    document.head.appendChild(script);
  });
  return _leafletPromise;
}

export interface LatLng { lat: number; lng: number; }

interface MapViewProps {
  className?: string;
  initialCenter?: LatLng;
  initialZoom?: number;
  onMapReady?: (map: any) => void;
}

export function MapView({
  className,
  initialCenter = { lat: 41.8967, lng: 12.4822 },
  initialZoom = 13,
  onMapReady,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [loadError, setLoadError] = useState(false);

  const init = usePersistFn(async () => {
    try {
      await loadLeaflet();
    } catch (e) {
      console.warn("Leaflet failed to load:", e);
      setLoadError(true);
      return;
    }
    if (!mapContainer.current || mapRef.current) return;
    const L = window.L;
    const map = L.map(mapContainer.current, {
      center: [initialCenter.lat, initialCenter.lng],
      zoom: initialZoom,
      zoomControl: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    mapRef.current = map;
    if (onMapReady) onMapReady(map);
  });

  useEffect(() => {
    init();
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [init]);

  if (loadError) {
    return (
      <div className={cn("w-full h-[500px] flex flex-col items-center justify-center bg-stone-100 text-stone-400", className)}>
        <span className="text-3xl mb-2">🗺️</span>
        <p className="text-sm font-medium">地图加载失败</p>
        <p className="text-xs mt-1">请使用高德/百度地图App查看景点位置</p>
      </div>
    );
  }

  return <div ref={mapContainer} className={cn("w-full h-[500px]", className)} />;
}
