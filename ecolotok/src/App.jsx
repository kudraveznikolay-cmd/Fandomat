import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  SlideTitle, SlideProblem, SlideMechanism, SlideDemo,
  SlideNetworks, SlideEconomics, SlideEcology, SlideRoadmap, SlideFinal,
} from './slides.jsx'

const SECTIONS = [
  { key: 'title', label: 'Титул', C: SlideTitle },
  { key: 'problem', label: 'Проблема', C: SlideProblem },
  { key: 'mechanism', label: 'Механизм', C: SlideMechanism },
  { key: 'demo', label: 'Демо лотка', C: SlideDemo },
  { key: 'networks', label: 'Сети магазинов', C: SlideNetworks },
  { key: 'economics', label: 'Экономика', C: SlideEconomics },
  { key: 'ecology', label: 'Экология', C: SlideEcology },
  { key: 'roadmap', label: 'Roadmap', C: SlideRoadmap },
  { key: 'final', label: 'Финал', C: SlideFinal },
]

export default function App() {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const touchX = useRef(null)

  const go = useCallback((next) => {
    setIdx((cur) => {
      const n = Math.max(0, Math.min(SECTIONS.length - 1, next))
      setDir(n >= cur ? 1 : -1)
      return n
    })
  }, [])

  const prev = () => go(idx - 1)
  const next = () => go(idx + 1)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.()
    else document.exitFullscreen?.()
  }

  // клавиатура: ←/→, PgUp/PgDn, Home/End, пробел
  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); next() }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); prev() }
      else if (e.key === 'Home') go(0)
      else if (e.key === 'End') go(SECTIONS.length - 1)
      else if (e.key === 'f' || e.key === 'F' || e.key === 'F5') { e.preventDefault(); toggleFullscreen() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx])

  const Active = SECTIONS[idx].C
  const progress = ((idx + 1) / SECTIONS.length) * 100

  return (
    <div
      className="app-shell"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 60) (dx < 0 ? next : prev)()
        touchX.current = null
      }}
    >
      <div className="bg-grid" />
      <motion.div className="orb a" animate={{ x: [0, -40, 0], y: [0, 30, 0] }} transition={{ duration: 16, repeat: Infinity }} />
      <motion.div className="orb b" animate={{ x: [0, 50, 0], y: [0, -20, 0] }} transition={{ duration: 20, repeat: Infinity }} />

      {/* верхняя панель */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">♻️</div>
          <div>
            <div className="brand-name">ЭкоЛоток</div>
            <div className="brand-sub">smart reusable tray</div>
          </div>
        </div>
        <div className="contest-badge">★ 100 идей для Беларуси · 2026</div>
      </header>

      <div className="section-progress">
        <div className="track">
          <motion.div className="fill" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>

      {/* сцена со слайдами */}
      <main className="stage">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={SECTIONS[idx].key}
            custom={dir}
            initial={{ opacity: 0, x: dir * 90, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -dir * 90, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Active go={go} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* нижняя навигация */}
      <footer className="navbar">
        <button className="nav-btn" onClick={prev} disabled={idx === 0}>← Назад</button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div className="nav-dots">
            {SECTIONS.map((s, i) => (
              <button
                key={s.key}
                className={`nav-dot ${i === idx ? 'active' : ''}`}
                onClick={() => go(i)}
                title={s.label}
                aria-label={s.label}
              />
            ))}
          </div>
          <div className="nav-label">{String(idx + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')} · {SECTIONS[idx].label}</div>
        </div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div className="hint-keys" style={{ display: 'flex' }}>
            <span className="keycap">←</span><span className="keycap">→</span> листать · <span className="keycap">F</span> экран жюри
          </div>
          <button className="nav-btn" onClick={toggleFullscreen} title="Полный экран (клавиша F)">⛶ Fullscreen</button>
          <button className="nav-btn primary" onClick={next} disabled={idx === SECTIONS.length - 1}>Далее →</button>
        </div>
      </footer>
    </div>
  )
}
