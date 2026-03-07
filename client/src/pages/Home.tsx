/**
 * Italy Travel Guide - Home Page
 * Design: Modern Travel Magazine Style
 * Color: Warm parchment bg + Italy green/red accents + City color coding
 * Typography: Cormorant Garamond (headings) + DM Sans (body) + DM Mono (data)
 * Layout: Full-width hero + sticky city nav + full-width tables per city
 */

import { useState, useEffect, useRef } from "react";
import { cities, globalNotes, type City, type Attraction } from "@/data/attractions";
import { CityMap } from "@/components/CityMap";
import { Search, Clock, Ticket, CalendarX, CalendarCheck, AlertTriangle, ChevronUp, Info, BookOpen, Tag, ExternalLink, Star } from "lucide-react";

const HERO_IMAGE = "/images/hero.webp";

const cityColorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  rome:         { bg: "#C4622D", text: "#fff", border: "#A0501F", light: "#FDF0EA" },
  florence:     { bg: "#8B6914", text: "#fff", border: "#6E5210", light: "#FBF5E6" },
  venice:       { bg: "#1B4B8A", text: "#fff", border: "#153A6E", light: "#EAF0FB" },
  milan:        { bg: "#3A3A4A", text: "#fff", border: "#2A2A38", light: "#F0F0F4" },
  naples:       { bg: "#C45A1A", text: "#fff", border: "#9E4814", light: "#FDF0E8" },
  pisa:         { bg: "#2A6B4A", text: "#fff", border: "#1E5238", light: "#E8F5EE" },
  "cinque-terre": { bg: "#1A6B8A", text: "#fff", border: "#135470", light: "#E8F4F8" },
};

function TagBadge({ text, type }: { text: string; type: "free" | "paid" | "reserve" | "warning" | "closed" | "info" }) {
  const styles = {
    free:    "bg-emerald-100 text-emerald-800 border border-emerald-200",
    paid:    "bg-amber-100 text-amber-800 border border-amber-200",
    reserve: "bg-blue-100 text-blue-800 border border-blue-200",
    warning: "bg-orange-100 text-orange-800 border border-orange-200",
    closed:  "bg-red-100 text-red-800 border border-red-200",
    info:    "bg-slate-100 text-slate-700 border border-slate-200",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${styles[type]}`}>
      {text}
    </span>
  );
}

const QR_CDN = "/images/qrcode.jpg";

function QrPopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 点击外部关闭
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div
      ref={ref}
      className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer select-none"
      style={{ background: "rgba(245,240,232,0.15)", color: "#F5F0E8", border: "1px solid rgba(245,240,232,0.25)", position: "relative" }}
      onClick={() => setOpen(v => !v)}
    >
      <BookOpen size={14} className="text-amber-400" />
      <span>公众号：</span>
      <span className="text-amber-300 font-bold">Triss 攻略集</span>

      {/* 浮窗二维码 - 使用 fixed 定位避免 overflow 裁剪 */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: ref.current ? window.innerHeight - ref.current.getBoundingClientRect().top + 12 : 120,
            right: ref.current ? window.innerWidth - ref.current.getBoundingClientRect().right : 32,
            zIndex: 9999,
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col items-center gap-2" style={{ width: 200 }}>
            <img
              src={QR_CDN}
              alt="Triss 攻略集 公众号二维码"
              style={{ width: 160, height: 160, objectFit: "contain", borderRadius: 8, display: "block" }}
            />
            <p style={{ fontSize: 12, color: "#78716c", textAlign: "center", lineHeight: 1.5, margin: 0 }}>
              扫码关注<br />
              <span style={{ fontWeight: 600, color: "#292524" }}>Triss 攻略集</span>
            </p>
            {/* 小三角 */}
            <div style={{ position: "absolute", bottom: -8, right: 24, width: 16, height: 16, background: "#fff", transform: "rotate(45deg)", boxShadow: "2px 2px 4px rgba(0,0,0,0.08)" }} />
          </div>
        </div>
      )}
    </div>
  );
}

function getTagType(tag: string): "free" | "paid" | "reserve" | "warning" | "closed" | "info" {
  if (tag.includes("免费") || tag.includes("部分免费")) return "free";
  if (tag.includes("预约") || tag.includes("通票") || tag.includes("联票")) return "reserve";
  if (tag.includes("禁止") || tag.includes("限时")) return "warning";
  if (tag.includes("闭") || tag.includes("关")) return "closed";
  return "info";
}

function AttractionCard({ attraction, colors }: { attraction: Attraction; colors: { bg: string; text: string; border: string; light: string } }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-xl border border-stone-200 overflow-hidden shadow-sm bg-white">
      {/* Card Header */}
      <div className="px-4 py-3 flex items-start justify-between gap-3" style={{ background: colors.light, borderBottom: `2px solid ${colors.border}20` }}>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-stone-800 text-base leading-tight" style={{ fontFamily: "Georgia, serif" }}>{attraction.nameCn}</div>
          <div className="text-xs text-stone-400 mt-0.5 italic truncate">{attraction.name}</div>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {attraction.tags.map(tag => (
              <TagBadge key={tag} text={tag} type={getTagType(tag)} />
            ))}
          </div>
        </div>
        {attraction.bookingUrl && (
          <a
            href={attraction.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium"
            style={{ background: "#1C1A16", color: "#F5F0E8" }}
          >
            <ExternalLink size={10} />
            订票
          </a>
        )}
      </div>

      {/* Card Body: Info Grid */}
      <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-stone-100">
        <div className="px-3 py-2.5">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1 flex items-center gap-1"><Ticket size={10} /> 门票</div>
          <div className="text-xs text-stone-700 font-mono leading-relaxed whitespace-pre-line">{attraction.ticketPrice}</div>
        </div>
        <div className="px-3 py-2.5">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1 flex items-center gap-1"><Clock size={10} /> 开放时间</div>
          <div className="text-xs text-stone-700 leading-relaxed whitespace-pre-line">{attraction.openingHours}</div>
        </div>
        <div className="px-3 py-2.5">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1 flex items-center gap-1"><CalendarCheck size={10} /> 免费日</div>
          <div className={`text-xs leading-relaxed whitespace-pre-line ${attraction.freeDay === "无" ? "text-stone-400" : "text-emerald-700 font-medium"}`}>
            {attraction.freeDay}
          </div>
        </div>
        <div className="px-3 py-2.5">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1 flex items-center gap-1"><CalendarX size={10} /> 闭馆日</div>
          <div className="text-xs text-red-700 leading-relaxed whitespace-pre-line">{attraction.closedDay}</div>
        </div>
      </div>

      {/* Expand Button */}
      <button
        className="w-full px-4 py-2.5 text-xs text-stone-500 flex items-center justify-center gap-1.5 border-t border-stone-100 hover:bg-stone-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <AlertTriangle size={11} className="text-amber-500" />
        {expanded ? "收起注意事项 ▲" : "查看注意事项 ▼"}
      </button>

      {/* Expanded Notes */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 bg-amber-50/40 border-t border-amber-100">
          <ul className="space-y-1.5 mt-2">
            {attraction.notes.map((note, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
                <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 text-xs text-stone-400 italic">地址：{attraction.address}</div>
        </div>
      )}
    </div>
  );
}

function AttractionRow({ attraction, isEven }: { attraction: Attraction; isEven: boolean }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <tr
        className={`transition-colors duration-150 ${isEven ? "bg-white" : "bg-stone-50/60"} hover:bg-amber-50/40`}
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: "pointer" }}
      >
        {/* 景点名称 */}
        <td className="px-4 py-3.5 min-w-[180px]">
          <div className="font-semibold text-stone-800 text-sm leading-tight">{attraction.nameCn}</div>
          <div className="text-xs text-stone-400 mt-0.5 italic">{attraction.name}</div>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {attraction.tags.map(tag => (
              <TagBadge key={tag} text={tag} type={getTagType(tag)} />
            ))}
          </div>
          {attraction.bookingUrl && (
            <a
              href={attraction.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 hover:opacity-80"
              style={{ background: "#1C1A16", color: "#F5F0E8" }}
            >
              <ExternalLink size={10} />
              官方订票
            </a>
          )}
        </td>
        {/* 门票价格 */}
        <td className="px-4 py-3.5 min-w-[200px]">
          <div className="text-xs leading-relaxed text-stone-700 font-mono whitespace-pre-line">{attraction.ticketPrice}</div>
        </td>
        {/* 开放时间 */}
        <td className="px-4 py-3.5 min-w-[200px]">
          <div className="text-xs leading-relaxed text-stone-700 whitespace-pre-line">{attraction.openingHours}</div>
        </td>
        {/* 免费日 */}
        <td className="px-4 py-3.5 min-w-[160px]">
          <div className="text-xs leading-relaxed whitespace-pre-line">
            {attraction.freeDay === "无" || attraction.freeDay === "全年免费" ? (
              <span className={attraction.freeDay === "全年免费" ? "text-emerald-700 font-medium" : "text-stone-400"}>
                {attraction.freeDay}
              </span>
            ) : (
              <span className="text-emerald-700">{attraction.freeDay}</span>
            )}
          </div>
        </td>
        {/* 闭馆日 */}
        <td className="px-4 py-3.5 min-w-[140px]">
          <div className="text-xs leading-relaxed text-red-700 whitespace-pre-line">{attraction.closedDay}</div>
        </td>
        {/* 展开提示 */}
        <td className="px-4 py-3.5 text-center">
          <span className="text-stone-300 text-xs">{expanded ? "▲" : "▼"}</span>
        </td>
      </tr>
      {/* 展开的注意事项 */}
      {expanded && (
        <tr className={isEven ? "bg-amber-50/30" : "bg-amber-50/50"}>
          <td colSpan={6} className="px-4 pb-4 pt-2">
            <div className="bg-white rounded-lg border border-amber-100 p-3.5 shadow-sm">
              <div className="flex items-center gap-1.5 mb-2.5">
                <AlertTriangle size={13} className="text-amber-600" />
                <span className="text-xs font-semibold text-stone-600 uppercase tracking-wide">注意事项</span>
              </div>
              <ul className="space-y-1.5">
                {attraction.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
                    <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2.5 text-xs text-stone-400 italic">
                地址：{attraction.address}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function CitySection({ city }: { city: City }) {
  const colors = cityColorMap[city.id] || cityColorMap.rome;
  return (
    <section id={`city-${city.id}`} className="mb-16 scroll-mt-20">
      {/* City Header */}
      <div className="relative overflow-hidden rounded-xl mb-6" style={{ background: colors.bg }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 0%, transparent 60%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)`
        }} />
        <div className="relative px-8 py-6 flex items-end justify-between">
          <div>
            <div className="text-white/60 text-sm font-medium tracking-widest uppercase mb-1" style={{ fontFamily: "inherit" }}>
              Italy · {city.name}
            </div>
            <h2 className="text-white font-bold leading-none" style={{ fontFamily: "Georgia, serif", fontSize: "3rem" }}>
              {city.nameCn}
            </h2>
            <p className="text-white/80 text-sm mt-2 max-w-lg" style={{ fontFamily: "inherit" }}>
              {city.description}
            </p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-white/40 text-7xl font-bold leading-none" style={{ fontFamily: "Georgia, serif" }}>
              {city.attractions.length}
            </div>
            <div className="text-white/60 text-xs tracking-widest uppercase">景点</div>
          </div>
        </div>
      </div>

      {/* City Map - 城市标题下方 */}
      <CityMap city={city} accentColor={colors.bg} />

      <div className="md:hidden space-y-3">
        {city.attractions.map((attraction) => (
          <AttractionCard key={attraction.id} attraction={attraction} colors={colors} />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "900px" }}>
            <thead>
              <tr style={{ background: "#1C1A16" }}>
                <th className="px-4 py-3 text-left text-xs font-semibold text-stone-300 uppercase tracking-wider whitespace-nowrap">
                  <span className="flex items-center gap-1.5"><Ticket size={12} /> 景点名称</span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-stone-300 uppercase tracking-wider whitespace-nowrap">
                  <span className="flex items-center gap-1.5"><Ticket size={12} /> 门票价格</span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-stone-300 uppercase tracking-wider whitespace-nowrap">
                  <span className="flex items-center gap-1.5"><Clock size={12} /> 开放时间</span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-stone-300 uppercase tracking-wider whitespace-nowrap">
                  <span className="flex items-center gap-1.5"><CalendarCheck size={12} /> 免费日</span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-stone-300 uppercase tracking-wider whitespace-nowrap">
                  <span className="flex items-center gap-1.5"><CalendarX size={12} /> 闭馆日</span>
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-stone-300 uppercase tracking-wider whitespace-nowrap">
                  详情
                </th>
              </tr>
            </thead>
            <tbody>
              {city.attractions.map((attraction, i) => (
                <AttractionRow key={attraction.id} attraction={attraction} isEven={i % 2 === 0} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 bg-stone-50 border-t border-stone-200 text-xs text-stone-400 flex items-center gap-1">
          <Info size={11} /> 点击任意行可展开查看详细注意事项
        </div>
      </div>

      {/* City Map moved to above */}
    </section>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCity, setActiveCity] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Filter cities/attractions by search
  const filteredCities = cities.map(city => ({
    ...city,
    attractions: city.attractions.filter(a =>
      a.nameCn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.nameCn.includes(searchQuery)
    )
  })).filter(city => city.attractions.length > 0);

  // Track active city on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
      for (const city of [...cities].reverse()) {
        const el = document.getElementById(`city-${city.id}`);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveCity(city.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCity = (cityId: string) => {
    const el = document.getElementById(`city-${cityId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF7", fontFamily: "inherit" }}>

      {/* Hero Section */}
      <div className="relative h-[480px] md:h-[560px] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="意大利风景"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)"
        }} />
        <div className="relative h-full flex flex-col justify-end pb-12 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-white/60 text-sm tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "inherit" }}>
            Travel Guide · 2026
          </div>
          <h1 className="text-white font-bold leading-none mb-4" style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            textShadow: "0 2px 20px rgba(0,0,0,0.3)"
          }}>
            意大利热门景点<br />完整攻略
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed mb-6">
            涵盖罗马、佛罗伦萨、威尼斯、米兰、那不勒斯、比萨、五渔村等城市；
            门票价格、开放时间、免费日、闭馆日及注意事项一览无余。
          </p>
          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { num: "7", label: "座城市" },
              { num: "25", label: "处景点" },
              { num: "2026", label: "最新数据" },
            ].map(s => (
              <div key={s.label} className="text-white">
                <div className="text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>{s.num}</div>
                <div className="text-white/60 text-xs tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Navigation */}
      <div
        ref={navRef}
        className="sticky top-0 z-40 border-b border-stone-200 shadow-sm"
        style={{ background: "rgba(250,250,247,0.96)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="py-2">
            {/* Search */}
            <div className="relative mb-2">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="搜索景点..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-sm bg-stone-100 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 w-full"
              />
            </div>
            {/* City tabs - 两列网格，手机全显 */}
            <div className="grid grid-cols-4 md:flex md:flex-wrap gap-1.5">
              {cities.map(city => {
                const colors = cityColorMap[city.id];
                const isActive = activeCity === city.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => scrollToCity(city.id)}
                    className="px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 text-center"
                    style={isActive ? {
                      background: colors.bg,
                      color: colors.text,
                      boxShadow: `0 2px 8px ${colors.bg}40`
                    } : {
                      background: "#f5f5f0",
                      color: "#57534e",
                    }}
                  >
                    {city.nameCn}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* 公众号引流横幅 */}
        <div className="mb-6 rounded-xl relative" style={{ background: "linear-gradient(135deg, #1C1A16 0%, #3A2E1E 60%, #5C3D1E 100%)" }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg shrink-0" style={{ background: "rgba(255,255,255,0.12)" }}>
                <Star size={18} className="text-amber-400" fill="currentColor" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm" style={{ fontFamily: "Georgia, serif", fontSize: "1rem" }}>
                  热门景点预约流程，请前往公众号查看
                </div>
                <div className="text-white/60 text-xs mt-0.5">
                  自由行攻略持续更新，请点击下方公众号查看👇
                </div>
              </div>
            </div>
            <QrPopover />
          </div>
        </div>

        {/* Quick Tips Banner */}
        <div className="mb-10 rounded-xl p-5 border border-amber-200 bg-amber-50/60">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 shrink-0">
              <Info size={16} className="text-amber-700" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-800 mb-1 text-sm" style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem" }}>
                使用说明 & 重要提示
              </h3>
              <div className="grid md:grid-cols-3 gap-3 mt-2">
                <div className="text-xs text-stone-600 leading-relaxed">
                  <span className="font-semibold text-amber-700">📅 博物馆日：</span>
                  每月第一个周日，意大利国家博物馆免费开放，但人流极大，建议早到。
                </div>
                <div className="text-xs text-stone-600 leading-relaxed">
                  <span className="font-semibold text-amber-700">👗 着装要求：</span>
                  进入所有教堂须遮肩遮膝，可在入口借用披肩，违规者拒绝入内。
                </div>
                <div className="text-xs text-stone-600 leading-relaxed">
                  <span className="font-semibold text-amber-700">🎫 预约建议：</span>
                  最后的晚餐需提前 2—3 个月预约；梵蒂冈、斗兽场、博尔盖塞建议提前 1—2 月预约。
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* City Sections */}
        {searchQuery ? (
          filteredCities.length > 0 ? (
            filteredCities.map(city => <CitySection key={city.id} city={city} />)
          ) : (
            <div className="text-center py-20 text-stone-400">
              <Search size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg">未找到匹配的景点</p>
              <p className="text-sm mt-1">请尝试其他关键词</p>
            </div>
          )
        ) : (
          cities.map(city => <CitySection key={city.id} city={city} />)
        )}

        {/* Travel Tips Section */}
        <section className="mt-8 mb-16">
          <h2 className="font-bold text-stone-800 mb-6" style={{ fontFamily: "Georgia, serif", fontSize: "2rem" }}>
            意大利旅行贴士
          </h2>

          {/* Row 1: Holidays + Booking Tips */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Holidays */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
              <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>
                <CalendarX size={16} className="text-red-500" /> 法定节假日
              </h3>
              <p className="text-xs text-stone-500 mb-3">以下日期景点可能关闭或缩短开放时间，出行前请查官网确认。</p>
              <div className="grid grid-cols-2 gap-1.5">
                {globalNotes.holidays.map(h => (
                  <div key={h.date} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    <span className="text-stone-500 text-xs font-mono">{h.date}</span>
                    <span className="text-stone-700 text-xs">{h.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Tips */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
              <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>
                <BookOpen size={16} className="text-blue-500" /> 预约时间建议
              </h3>
              <p className="text-xs text-stone-500 mb-3">以下景点门票极为紧俏，务必提前预约，否则可能无票可买。</p>
              <div className="space-y-2">
                {globalNotes.bookingTips.map(tip => (
                  <div key={tip.attraction} className="flex items-center justify-between border-b border-stone-100 pb-2 last:border-0 last:pb-0">
                    <span className="text-stone-700 font-medium text-xs">{tip.attraction}</span>
                    <span className="text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded font-mono">{tip.tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Free Museum Sunday + Dress Code */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Free Museum Sunday */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <h3 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>
                <CalendarCheck size={16} className="text-emerald-600" /> 博物馆周日（每月第一个周日）
              </h3>
              <p className="text-xs text-emerald-700 leading-relaxed mb-2">{globalNotes.freeMuseumSunday.content}</p>
              <p className="text-xs text-emerald-600 font-medium">⚠️ 免费日人流极大，部分景点仍需提前预约（可能收取预约费）。</p>
            </div>

            {/* Dress Code */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>
                <AlertTriangle size={16} className="text-amber-600" /> 教堂着装规范
              </h3>
              <p className="text-xs text-amber-700 leading-relaxed mb-2">进入所有教堂（含圣彼得大教堂、圣马可大教堂、佛罗伦萨大教堂等）须<strong>遮肩遮膝</strong>。</p>
              <ul className="text-xs text-amber-700 space-y-1">
                <li>• 可在入口处借用或购买披肩/围巾</li>
                <li>• 违规者将被拒绝入内，无法退票</li>
                <li>• 梵蒂冈西斯廷教堂额外禁止短裤、无袖上衣</li>
              </ul>
            </div>
          </div>

          {/* Row 3: City Passes + Currency */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* City Passes */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
              <h3 className="font-semibold text-stone-800 mb-3 flex items-center gap-2" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>
                <Ticket size={16} className="text-purple-500" /> 城市通票
              </h3>
              <div className="space-y-3 text-xs text-stone-600">
                <div className="border-b border-stone-100 pb-2">
                  <span className="font-semibold text-stone-800">罗马通票（Roma Pass）</span><br />
                  48小时€32 / 72小时€52，含2—3处博物馆免费入场 + 无限次公共交通，适合多日游览。
                </div>
                <div className="border-b border-stone-100 pb-2">
                  <span className="font-semibold text-stone-800">佛罗伦萨博物馆联票</span><br />
                  学院美术馆+巴杰罗博物馆48小时联票€26，72小时联票可含更多场馆，官方渠道购买。
                </div>
                <div className="border-b border-stone-100 pb-2">
                  <span className="font-semibold text-stone-800">威尼斯MUVE博物馆通票</span><br />
                  含圣马可广场博物馆群（总督宫+科雷尔博物馆等），成人€30，性价比高。
                </div>
                <div>
                  <span className="font-semibold text-stone-800">比萨奇迹广场联票</span><br />
                  斜塔+全部景点联票€35，比单独购票节省约€10，强烈推荐。
                </div>
              </div>
            </div>

            {/* Currency & Payment */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
              <h3 className="font-semibold text-stone-800 mb-3 flex items-center gap-2" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>
                <Info size={16} className="text-slate-500" /> 货币与支付
              </h3>
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5 shrink-0">•</span>
                  <span><strong>货币：</strong>欧元（€），1€≈7.8人民币（2026年参考汇率，出行前请查实时汇率）</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5 shrink-0">•</span>
                  <span><strong>刷卡：</strong>绝大多数景点、餐厅、商店均支持Visa/Mastercard，建议备用现金€50—100</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5 shrink-0">•</span>
                  <span><strong>支付宝/微信：</strong>部分景点（如米兰大教堂）支持，但覆盖率有限，不可完全依赖</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5 shrink-0">•</span>
                  <span><strong>取现：</strong>建议使用银联卡在ATM取现，手续费约1—2%，避免机场兑换</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5 shrink-0">•</span>
                  <span><strong>小费：</strong>非强制，餐厅可留€1—2，出租车可凑整数</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Best Time + Booking Priority */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Best Time */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
              <h3 className="font-semibold text-stone-800 mb-3 flex items-center gap-2" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>
                <Clock size={16} className="text-orange-500" /> 最佳旅行季节
              </h3>
              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
                  <span className="font-semibold text-emerald-800">🌸 最佳：4—5月 / 9—10月</span><br />
                  气候温和（18—25°C），人流相对少，景色优美，花费适中。强烈推荐。
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                  <span className="font-semibold text-amber-800">☀️ 旺季：6—8月</span><br />
                  气温高（30—38°C），人流极大，票价上涨，需提前数月预约热门景点。
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100">
                  <span className="font-semibold text-blue-800">❄️ 淡季：11—3月</span><br />
                  人少价低，但部分景点缩短开放时间，威尼斯可能遭遇高潮水（Acqua Alta）。
                </div>
              </div>
            </div>

            {/* Booking Priority */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
              <h3 className="font-semibold text-stone-800 mb-3 flex items-center gap-2" style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>
                <Star size={16} className="text-amber-500" /> 购票渠道优先级
              </h3>
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  <span className="text-emerald-600 font-bold shrink-0">①</span>
                  <span><strong>官方网站</strong>：最便宜、最可靠，本页所有"官方订票"按钮均指向官方渠道</span>
                </div>
                <div className="flex items-start gap-2 p-2 rounded-lg bg-blue-50 border border-blue-100">
                  <span className="text-blue-600 font-bold shrink-0">②</span>
                  <span><strong>官方授权平台</strong>：Vivaticket、CoopCulture、B-Ticket等，部分景点唯一官方渠道</span>
                </div>
                <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-50 border border-amber-100">
                  <span className="text-amber-600 font-bold shrink-0">③</span>
                  <span><strong>第三方平台</strong>：Tiqets、GetYourGuide等，价格偏高但有时官网售罄时仍有票</span>
                </div>
                <div className="flex items-start gap-2 p-2 rounded-lg bg-red-50 border border-red-100">
                  <span className="text-red-600 font-bold shrink-0">✗</span>
                  <span><strong>避免</strong>：景点门口黄牛票、仿冒官网（域名相似但价格高出数倍）</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-stone-900 text-stone-400 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-white font-bold text-lg mb-1" style={{ fontFamily: "Georgia, serif" }}>
                意大利热门景点攻略
              </div>
              <p className="text-xs text-stone-500 max-w-md">
                数据来源：各景点官方网站及权威旅游资源，更新至2025—2026年。
                票价与时间可能随季节调整，出行前请以官方网站为准。
              </p>
            </div>
            <div className="text-xs text-stone-600 text-right">
              <div>数据更新：2025—2026</div>
              <div className="mt-1">涵盖 7 座城市 · 25 处景点</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-50"
          style={{ background: "#1C1A16", color: "white" }}
        >
          <ChevronUp size={18} />
        </button>
      )}
    </div>
  );
}
