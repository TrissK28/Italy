/**
 * CityMapEmbed - 城市地图组件（纯静态，无外部依赖）
 * 显示景点列表 + 高德地图跳转按钮
 */

import type { City } from "@/data/attractions";
import { MapPin, ExternalLink } from "lucide-react";

interface CityMapEmbedProps {
  city: City;
  accentColor: string;
}

export function CityMapEmbed({ city, accentColor }: CityMapEmbedProps) {
  const { lat, lng } = city.mapCenter;

  // 高德地图搜索链接（跳转打开，不嵌入）
  const amapUrl = `https://uri.amap.com/search?keyword=${encodeURIComponent(city.nameCn)}&center=${lng},${lat}&zoom=${city.mapZoom}`;
  // 百度地图链接
  const baiduUrl = `https://map.baidu.com/search/${encodeURIComponent(city.nameCn + "景点")}`;

  return (
    <div className="rounded-xl border border-stone-200 overflow-hidden shadow-sm mb-6">
      {/* 标题栏 */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: accentColor + "15", borderBottom: `1px solid ${accentColor}30` }}
      >
        <div className="flex items-center gap-2">
          <MapPin size={14} style={{ color: accentColor }} />
          <span className="text-sm font-semibold text-stone-700">
            {city.nameCn} 景点导航
          </span>
        </div>
        <div className="flex gap-2">
          <a
            href={amapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-opacity hover:opacity-80"
            style={{ background: accentColor, color: "white" }}
          >
            <ExternalLink size={10} /> 高德地图
          </a>
          <a
            href={baiduUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-opacity hover:opacity-80"
            style={{ background: "#3385FF", color: "white" }}
          >
            <ExternalLink size={10} /> 百度地图
          </a>
        </div>
      </div>

      {/* 景点网格 */}
      <div className="p-4 bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {city.attractions.map((a, i) => {
            const navUrl = a.lat && a.lng
              ? `https://uri.amap.com/marker?position=${a.lng},${a.lat}&name=${encodeURIComponent(a.nameCn)}&callnative=1`
              : `https://uri.amap.com/search?keyword=${encodeURIComponent(a.nameCn)}&callnative=1`;
            return (
              <a
                key={a.id}
                href={navUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all hover:shadow-sm hover:opacity-90 active:scale-95"
                style={{ borderColor: accentColor + "30", background: accentColor + "08" }}
              >
                <span
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-[10px]"
                  style={{ background: accentColor }}
                >
                  {i + 1}
                </span>
                <span className="text-xs font-medium text-stone-700 leading-tight truncate">{a.nameCn}</span>
                <MapPin size={10} className="shrink-0 ml-auto" style={{ color: accentColor }} />
              </a>
            );
          })}
        </div>
        <p className="text-xs text-stone-400 mt-3 text-center">点击景点名称可在高德地图中导航</p>
      </div>
    </div>
  );
}
