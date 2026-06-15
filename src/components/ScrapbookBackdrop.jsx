import { motion } from "framer-motion";

/**
 * Scrapbook / journal-page backdrop:
 *   - Aged cream paper base + heavy grain
 *   - Soft coffee/ink stains
 *   - Washi tape strips at corners (room accent tinted)
 *   - Ink splatter
 *   - Postage-stamp & tag tying the room to the page
 *   - Vignette
 *
 * `tint` is the room accent (any CSS color) used for the tape and stamp ink.
 */
export default function ScrapbookBackdrop({ tint = "#b15c40", room = {} }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Cream paper base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #faf3e3 0%, #f1e2c4 60%, #e3d0a8 100%)",
        }}
      />

      {/* Heavy fiber grain */}
      <div
        className="absolute inset-0 opacity-[0.55] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/><feColorMatrix values='0 0 0 0 0.32 0 0 0 0 0.22 0 0 0 0 0.10 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Faint horizontal ruled lines */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0, transparent 35px, #4a2f1a 35px, #4a2f1a 36px)",
        }}
      />

      {/* Coffee stain — top right */}
      <CoffeeStain
        style={{ top: "10%", right: "8%", width: 180, height: 180, opacity: 0.18, transform: "rotate(15deg)" }}
      />
      <CoffeeStain
        style={{ bottom: "16%", left: "6%", width: 220, height: 220, opacity: 0.14, transform: "rotate(-22deg)" }}
      />
      <CoffeeStain
        style={{ top: "44%", left: "62%", width: 140, height: 140, opacity: 0.1 }}
      />

      {/* Washi tape strips */}
      <WashiTape
        color={tint}
        style={{ top: -18, left: "10%", width: 180, transform: "rotate(-6deg)" }}
      />
      <WashiTape
        color="#3b2c14"
        pattern="diagonal"
        style={{ top: -10, right: "12%", width: 210, transform: "rotate(8deg)" }}
      />
      <WashiTape
        color="#d4a04c"
        pattern="dots"
        style={{ bottom: 10, left: "30%", width: 160, transform: "rotate(-3deg)" }}
      />

      {/* Ink splatter */}
      <InkSplatter color={tint} style={{ top: "30%", left: "18%" }} />
      <InkSplatter color="#3b2c14" style={{ bottom: "26%", right: "20%", transform: "rotate(120deg) scale(0.7)" }} />

      {/* Postage stamp */}
      <PostageStamp room={room} tint={tint} />

      {/* Paper tag */}
      <PaperTag room={room} tint={tint} />

      {/* Doodle squiggle */}
      <Squiggle color={tint} />

      {/* Vignette around edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 220px rgba(74, 47, 26, 0.35), inset 0 0 60px rgba(74, 47, 26, 0.15)",
        }}
      />

      {/* Faint top scrim for navbar */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(245, 237, 224, 0.85), transparent)",
        }}
      />
    </div>
  );
}

function CoffeeStain({ style }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute pointer-events-none mix-blend-multiply"
      style={style}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="coffee-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6b4423" stopOpacity="0" />
          <stop offset="40%" stopColor="#6b4423" stopOpacity="0.25" />
          <stop offset="78%" stopColor="#5a3318" stopOpacity="0.55" />
          <stop offset="92%" stopColor="#3b2c14" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#3b2c14" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M100,18 C150,12 175,55 178,98 C182,142 152,178 102,182 C52,184 22,148 18,98 C14,52 50,24 100,18 Z"
        fill="url(#coffee-grad)"
      />
    </svg>
  );
}

function WashiTape({ color, pattern = "solid", style }) {
  const w = style.width || 180;
  const id = `wp-${color.replace(/[^a-z0-9]/gi, "")}-${pattern}-${w}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="absolute pointer-events-none"
      style={{ ...style, height: 26 }}
    >
      <svg
        viewBox={`0 0 ${w} 26`}
        width={w}
        height={26}
        style={{ display: "block" }}
      >
        <defs>
          {pattern === "diagonal" && (
            <pattern
              id={id}
              patternUnits="userSpaceOnUse"
              width="10"
              height="10"
              patternTransform="rotate(45)"
            >
              <rect width="10" height="10" fill={color} />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="10"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="2"
              />
            </pattern>
          )}
          {pattern === "dots" && (
            <pattern
              id={id}
              patternUnits="userSpaceOnUse"
              width="10"
              height="10"
            >
              <rect width="10" height="10" fill={color} />
              <circle cx="5" cy="5" r="1.5" fill="rgba(255,255,255,0.5)" />
            </pattern>
          )}
          <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
            <stop offset="50%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="2"
          width={w}
          height="22"
          fill={pattern === "solid" ? color : `url(#${id})`}
          opacity="0.85"
        />
        <rect
          x="0"
          y="2"
          width={w}
          height="22"
          fill={`url(#${id}-shade)`}
        />
        <line
          x1="0"
          y1="3"
          x2="0"
          y2="23"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
        <line
          x1={w}
          y1="3"
          x2={w}
          y2="23"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
      </svg>
    </motion.div>
  );
}

function InkSplatter({ color, style }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.45, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      viewBox="0 0 100 100"
      width="120"
      height="120"
      className="absolute pointer-events-none"
      style={{ ...style, mixBlendMode: "multiply" }}
      aria-hidden="true"
    >
      <g fill={color}>
        <circle cx="50" cy="50" r="3" />
        <circle cx="58" cy="42" r="1.5" />
        <circle cx="40" cy="52" r="2" />
        <circle cx="62" cy="58" r="1" />
        <circle cx="36" cy="40" r="1.2" />
        <circle cx="70" cy="50" r="0.8" />
        <circle cx="44" cy="62" r="1.6" />
        <circle cx="78" cy="44" r="0.7" />
        <circle cx="28" cy="48" r="0.9" />
        <circle cx="54" cy="68" r="0.8" />
        <circle cx="48" cy="38" r="0.6" />
        <circle cx="22" cy="58" r="1.1" />
        <ellipse cx="56" cy="48" rx="6" ry="3" transform="rotate(20 56 48)" />
      </g>
    </motion.svg>
  );
}

function PostageStamp({ room, tint }) {
  const id = room?.id || "";
  const folio = String(
    ((id.length || 0) * 17 + (id.charCodeAt(0) || 0)) % 98 + 1
  ).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -14, y: -10 }}
      animate={{ opacity: 1, rotate: -8, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="absolute pointer-events-none"
      style={{ top: "13%", right: "5%" }}
    >
      {/* Stamp body with perforated edge done via outer dotted border */}
      <div
        className="relative shadow-[0_10px_24px_-12px_rgba(74,47,26,0.55)]"
        style={{
          width: 130,
          height: 150,
          background: "#faf5ec",
          padding: 8,
          borderRadius: 2,
          backgroundImage:
            "radial-gradient(circle at 4px 4px, #f5ede0 3px, transparent 4px)",
          backgroundSize: "8px 8px",
          backgroundColor: "#faf5ec",
        }}
      >
        <div
          className="w-full h-full flex flex-col items-center justify-center text-center px-2"
          style={{
            background: `linear-gradient(135deg, ${tint}22, ${tint}11)`,
            border: `1.5px solid ${tint}88`,
            borderRadius: 2,
          }}
        >
          <div
            className="font-mono text-[8px] uppercase tracking-[0.32em] mb-1"
            style={{ color: tint }}
          >
            Folio · 2026
          </div>
          <div
            className="font-display text-3xl font-black leading-none"
            style={{ color: tint }}
          >
            {folio}
          </div>
          <div
            className="font-mono text-[8px] uppercase tracking-[0.28em] mt-1"
            style={{ color: tint }}
          >
            {room?.sub || "Room"}
          </div>
          <div
            className="mt-2 h-px w-12"
            style={{ background: tint, opacity: 0.5 }}
          />
          <div className="font-mono text-[7px] uppercase tracking-[0.32em] mt-1 text-ink-700">
            ✦ Reet C ✦
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PaperTag({ room, tint }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 18, x: -10 }}
      animate={{ opacity: 1, rotate: 10, x: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="absolute pointer-events-none"
      style={{ bottom: "10%", left: "4%" }}
    >
      <div className="relative" style={{ width: 220 }}>
        {/* Twine string trailing out the top */}
        <svg
          viewBox="0 0 80 60"
          width="60"
          height="50"
          className="absolute"
          style={{ top: -34, left: 8, transform: "rotate(-20deg)" }}
          aria-hidden="true"
        >
          <path
            d="M5,55 Q20,30 35,40 T70,5"
            fill="none"
            stroke="#5a3318"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="2 2"
            opacity="0.7"
          />
        </svg>

        {/* Luggage-tag shape via SVG so the hole punch is properly cut out */}
        <svg
          viewBox="0 0 220 90"
          width="220"
          height="90"
          className="block drop-shadow-[0_10px_18px_rgba(74,47,26,0.35)]"
        >
          <defs>
            <linearGradient id="tag-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5ede0" />
              <stop offset="100%" stopColor="#e8d8b8" />
            </linearGradient>
            <mask id="tag-mask">
              <rect width="220" height="90" fill="white" />
              <circle cx="20" cy="22" r="6" fill="black" />
            </mask>
          </defs>
          <path
            d="M0,18 L18,0 L220,0 L220,90 L0,90 Z"
            fill="url(#tag-fill)"
            stroke="rgba(74,47,26,0.35)"
            strokeWidth="1"
            mask="url(#tag-mask)"
          />
          {/* Hole-punch ring */}
          <circle
            cx="20"
            cy="22"
            r="6"
            fill="none"
            stroke="rgba(74,47,26,0.4)"
            strokeWidth="0.8"
          />
        </svg>

        {/* Tag content overlay */}
        <div className="absolute inset-0 flex flex-col justify-center pl-12 pr-4">
          <div
            className="font-mono text-[9px] uppercase tracking-[0.32em]"
            style={{ color: tint }}
          >
            ⌁ {room?.label || "Room"}
          </div>
          <div className="font-display text-lg font-bold text-ink-900 leading-tight mt-0.5">
            {room?.sub || "Featured"}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-500 mt-1">
            {room?.hint || "Open the page"}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Squiggle({ color }) {
  return (
    <motion.svg
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.65 }}
      transition={{ duration: 1.4, delay: 0.5 }}
      viewBox="0 0 200 60"
      width="220"
      height="64"
      className="absolute pointer-events-none mix-blend-multiply"
      style={{ top: "55%", right: "10%", transform: "rotate(-8deg)" }}
      aria-hidden="true"
    >
      <path
        d="M5,30 Q30,5 55,30 T105,30 T155,30 T200,30"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0 1"
      />
      <circle cx="200" cy="30" r="3" fill={color} />
    </motion.svg>
  );
}
