import { motion, AnimatePresence } from "framer-motion";
import { rooms } from "../data/content.js";
import RoomGlyph from "./icons/RoomGlyphs.jsx";

export default function RoomMarkers({ hovered, setHovered, onClick }) {
  const current = rooms.find((r) => r.id === hovered);

  return (
    <div className="pointer-events-none absolute inset-0">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-auto"
          >
            <button
              onClick={() => onClick(current.id)}
              data-cursor="hover"
              className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-strong border border-ink-200/70 hover:shadow-soft transition"
            >
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-xl"
                style={{
                  background: `${current.color}1f`,
                  color: current.color,
                  border: `1px solid ${current.color}55`,
                }}
              >
                <RoomGlyph roomId={current.id} size={16} />
              </span>
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-widest text-ink-400">
                  {current.label}
                </div>
                <div className="text-[13px] font-semibold text-ink-900">
                  {current.sub} · {current.hint}
                </div>
              </div>
              <span className="text-ink-400 text-xs">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
