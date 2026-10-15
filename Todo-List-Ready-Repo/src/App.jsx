import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTodoStore } from "./store/useTodoStore";
import TodoForm from "./components/TodoForm";
import TodoFilters from "./components/TodoFilters";
import TodoList from "./components/TodoList";
import Feedback from "./components/Feedback";

export default function App() {
  const todos = useTodoStore((s) => s.todos);
  const clearCompleted = useTodoStore((s) => s.clearCompleted);

  const [now, setNow] = useState(new Date());
  const [motionOn, setMotionOn] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const total = todos.length;
  const done = todos.filter((t) => t.completed).length;
  const remaining = total - done;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    // respects the user's "reduce motion" system setting
    <MotionConfig reducedMotion="user">
      <Feedback />
      <div className={`ambient-scene ${motionOn ? "motion-on" : "motion-paused"}`} aria-hidden="true">
        <span className="orb orb-one" />
        <span className="orb orb-two" />
        <span className="orb orb-three" />
        <span className="orbit orbit-one"><i /></span>
        <span className="orbit orbit-two"><i /></span>
        <span className="ambient-spark spark-one">✦</span>
        <span className="ambient-spark spark-two">✧</span>
        <span className="ambient-spark spark-three">✦</span>
        <span className="particle particle-one" />
        <span className="particle particle-two" />
        <span className="particle particle-three" />
      </div>
      <main className="app">
        <motion.section
          className="card"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        >
          <div className="border-beam" aria-hidden="true" />
          <header className="header">
            <div className="logo-orbit" aria-hidden="true"><span className="logo-core">✓</span><span className="logo-ring" /></div>
            <h1>Todo <span>List</span></h1>
            <p>Turn your plans into progress ✦</p>
            <div className="live-status"><span className="live-dot" /> YOUR DAY, IN MOTION <span className="live-clock">{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span></div>
          </header>

          <TodoForm />

          <div className="progress" aria-label={`${percent}% completed`}>
            <motion.div
              className="progress-bar"
              animate={{ width: `${percent}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>

          <div className="toolbar">
            <span className="counter">
              <span className="counter-number">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={remaining}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: "inline-block" }}
                  >
                    {remaining}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              {remaining === 1 ? "task" : "tasks"} left
            </span>

            <button
              type="button"
              className="clear-btn"
              onClick={() => { clearCompleted(); window.dispatchEvent(new CustomEvent("todo-feedback", { detail: { type: "success", message: "تم تنظيف المهام المنجزة" } })); }}
              disabled={done === 0}
            >
              Clear completed
            </button>
          </div>

          <div className="interactive-row">
            <TodoFilters />
            <motion.button type="button" className="motion-toggle" onClick={() => setMotionOn((v) => !v)} whileHover={{ scale: 1.08, rotate: 8 }} whileTap={{ scale: 0.9 }} aria-label={motionOn ? "Pause background animation" : "Resume background animation"} title={motionOn ? "Pause background animation" : "Resume background animation"}>{motionOn ? "✦" : "Ⅱ"}</motion.button>
          </div>
          <TodoList />
        </motion.section>
      </main>
    </MotionConfig>
  );
}
