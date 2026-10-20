import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/* Компонент анимированного счётчика чисел (появляется при входе слайда) */
export default function AnimatedNumber({ value, duration = 1.4, decimals = 0, prefix = '', suffix = '' }) {
  const [disp, setDisp] = useState(0)

  useEffect(() => {
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / (duration * 1000))
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setDisp(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  const formatted = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(disp)

  return (
    <span>
      {prefix}{formatted}{suffix}
    </span>
  )
}

/* Плавная полоса-прогресс для сравнений */
export function GrowBar({ pct, color = 'linear-gradient(90deg,#34d399,#2dd4bf)', delay = 0, height = 14 }) {
  return (
    <div className="compare-track" style={{ height }}>
      <motion.div
        className="compare-fill"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
