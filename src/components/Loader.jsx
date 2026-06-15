import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-paper"
    >
      <div className="relative flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-20 w-20"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-300 via-orange-500 to-amber-900 blur-2xl opacity-70 animate-pulse" />
          <div className="relative h-full w-full rounded-3xl bg-gradient-to-br from-ink-900 via-amber-800 to-ink-900 flex items-center justify-center text-cream-50 font-display text-3xl font-bold shadow-soft">
            R
          </div>
        </motion.div>
        <div className="flex flex-col items-center gap-2">
          <div className="font-display text-base font-semibold gradient-text">
            Reet Chouksey
          </div>
          <div className="text-[10px] text-ink-500 tracking-[0.3em] uppercase font-mono">
            Setting the type…
          </div>
          <div className="mt-2 h-[2px] w-40 overflow-hidden rounded-full bg-ink-100/60">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-600 to-amber-900"
              initial={{ x: "-100%", width: "60%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
