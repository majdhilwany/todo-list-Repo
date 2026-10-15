import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function notify(type, message) {
  window.dispatchEvent(new CustomEvent("todo-feedback", { detail: { type, message } }));
}

export default function Feedback() {
  const [notice, setNotice] = useState(null);
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    let timer;
    const handleFeedback = (event) => {
      const detail = event.detail;
      setNotice({ ...detail, id: Date.now() });
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setNotice(null), 2600);
      if (detail.type === "success") {
        const id = Date.now();
        setBursts(Array.from({ length: 18 }, (_, i) => ({
          id: `${id}-${i}`,
          left: `${38 + Math.random() * 24}%`,
          delay: Math.random() * 0.18,
          color: ["#8b7bff", "#ff8eb5", "#43d9b5", "#ffc857", "#69b9ff"][i % 5],
          rotate: Math.random() * 360,
        })));
        window.setTimeout(() => setBursts([]), 1100);
      }
    };
    window.addEventListener("todo-feedback", handleFeedback);
    return () => {
      window.removeEventListener("todo-feedback", handleFeedback);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <style>{`
        .feedback-toast{position:fixed;z-index:1000;top:24px;left:50%;display:flex;align-items:center;gap:11px;min-width:230px;max-width:calc(100vw - 28px);padding:13px 17px;border:1px solid rgba(255,255,255,.8);border-radius:16px;background:rgba(255,255,255,.94);box-shadow:0 16px 45px rgba(44,35,93,.18);backdrop-filter:blur(14px);font-size:14px;font-weight:700;color:#302b4a;transform:translateX(-50%)}
        .feedback-symbol{width:29px;height:29px;flex:none;display:grid;place-items:center;border-radius:10px;font-size:17px}.feedback-toast.success .feedback-symbol{background:#dcfff4;color:#079b75}.feedback-toast.warning .feedback-symbol{background:#fff0d9;color:#b97500}.feedback-toast.danger .feedback-symbol{background:#ffe5eb;color:#d84b6c}.confetti-piece{position:fixed;z-index:999;top:0;width:8px;height:13px;border-radius:3px;pointer-events:none}
      `}</style>
      <AnimatePresence>
        {notice && <motion.div key={notice.id} className={`feedback-toast ${notice.type}`} role="status" initial={{ opacity: 0, y: -25, x: "-50%", scale: .92 }} animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }} exit={{ opacity: 0, y: -15, x: "-50%", scale: .95 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>
          <span className="feedback-symbol">{notice.type === "success" ? "✓" : notice.type === "warning" ? "!" : "×"}</span>
          <span>{notice.message}</span>
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {bursts.map((piece) => <motion.span key={piece.id} className="confetti-piece" style={{ left: piece.left, background: piece.color, rotate: piece.rotate }} initial={{ opacity: 0, y: 10, scale: .4 }} animate={{ opacity: [0, 1, 1, 0], y: [10, 90, 190], x: [0, Math.sin(piece.rotate) * 70, Math.cos(piece.rotate) * 120], rotate: piece.rotate + 220 }} transition={{ duration: .95, delay: piece.delay, ease: "easeOut" }} />)}
      </AnimatePresence>
    </>
  );
}
