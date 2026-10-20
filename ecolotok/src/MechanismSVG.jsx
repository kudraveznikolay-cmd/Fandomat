import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MECH_STEPS } from './data.js'

/* ============ Анимированный SVG-механизм работы ЭкоЛотка ============
   Купол с лотком: QR-чип, RFID-метка, пьезо-датчик веса, LED-статус.
   Цикл из 5 фаз подсвечивает соответствующие элементы и шаги справа. */

const PHASE_MS = 2600

export default function MechanismSVG() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 5), PHASE_MS)
    return () => clearInterval(id)
  }, [])

  const goodsIn = phase === 0 || phase === 1 || phase === 2
  const atStation = phase >= 3
  const refunded = phase === 4

  return (
    <div className="mech-wrap" style={{ width: '100%' }}>
      <div className="mech-svg-panel glass card-pad">
        <svg viewBox="0 0 560 380" width="100%" style={{ maxHeight: '58vh' }}>
          <defs>
            <linearGradient id="trayGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d3b2c" />
              <stop offset="100%" stopColor="#07211a" />
            </linearGradient>
            <linearGradient id="stationGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#123c33" />
              <stop offset="100%" stopColor="#081a17" />
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(52,211,153,0.55)" />
              <stop offset="100%" stopColor="rgba(52,211,153,0)" />
            </radialGradient>
          </defs>

          {/* ---- приёмная станция (справа) ---- */}
          <g transform="translate(360,190)">
            <rect x="0" y="40" width="170" height="90" rx="14" fill="url(#stationGrad)" stroke="rgba(45,212,191,0.4)" strokeWidth="1.4" />
            <rect x="14" y="24" width="142" height="18" rx="8" fill="#0a2620" stroke="rgba(45,212,191,0.5)" strokeWidth="1.2" />
            {/* экран станции */}
            <rect x="22" y="62" width="70" height="44" rx="6" fill="#041310" stroke="rgba(52,211,153,0.35)" />
            <AnimatePresence>
              {atStation && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <text x="57" y="82" textAnchor="middle" fontSize="11" fill="#34d399" fontWeight="700">RFID</text>
                  <text x="57" y="98" textAnchor="middle" fontSize="10" fill={refunded ? '#fbbf24' : '#2dd4bf'} fontWeight="800">
                    {refunded ? '+0,50 Br' : 'скан…'}
                  </text>
                </motion.g>
              )}
            </AnimatePresence>
            {/* антенна считывателя */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx="120" cy="84" r={10 + i * 12}
                className="sensor-ring"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={atStation && !refunded ? { opacity: [0, 0.8, 0], scale: [0.6, 1.15, 1.4] } : { opacity: 0 }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35 }}
              />
            ))}
            <circle cx="120" cy="84" r="7" fill="#0b2b24" stroke="rgba(45,212,191,0.6)" />
            <motion.circle cx="120" cy="84" r="3.2" className="led" animate={{ opacity: atStation ? 1 : 0.25 }} />
            <text x="85" y="152" textAnchor="middle" fontSize="11" fill="#8fa3ab">Стойка приёма · мойка · повтор</text>
          </g>

          {/* ---- стрелок потока к станции ---- */}
          <motion.path
            d="M 250 250 C 300 250 320 232 356 226"
            fill="none" stroke="rgba(52,211,153,0.6)" strokeWidth="2" className="flow-dash"
            animate={{ strokeDashoffset: [0, -56] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            opacity={phase >= 3 ? 1 : 0.25}
          />

          {/* ---- сам лоток (центр/слева) ---- */}
          <motion.g
            animate={{
              x: atStation ? 96 : 0,
              y: atStation ? -6 : 0,
              rotate: atStation ? -2 : 0,
            }}
            transition={{ type: 'spring', stiffness: 60, damping: 14 }}
          >
            <g transform="translate(70,150)">
              {/* корпус лотка */}
              <path
                className="tray-body"
                d="M 10 20 L 190 20 L 172 84 Q 170 92 162 92 L 38 92 Q 30 92 28 84 Z"
              />
              {/* рёбра жёсткости */}
              {[42, 74, 106, 138].map((x) => (
                <line key={x} x1={x} y1="26" x2={x - 6} y2="86" stroke="rgba(52,211,153,0.18)" strokeWidth="2" />
              ))}
              {/* ручка */}
              <rect x="70" y="8" width="60" height="12" rx="6" fill="#0a2a21" stroke="rgba(52,211,153,0.4)" />

              {/* товары в лотке */}
              <AnimatePresence>
                {goodsIn && (
                  <motion.g
                    initial={{ y: -46, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 12 }}
                  >
                    <rect x="44" y="-14" width="44" height="34" rx="5" fill="#155e46" stroke="rgba(163,230,53,0.5)" />
                    <rect x="94" y="-22" width="34" height="42" rx="5" fill="#166b52" stroke="rgba(52,211,153,0.6)" />
                    <circle cx="150" cy="0" r="15" fill="#1d6f5a" stroke="rgba(45,212,191,0.6)" />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* вес сверху — датчик прогибается под товаром */}
              <motion.line
                x1="18" y1="20" x2="182" y2="20" stroke="rgba(255,255,255,0.16)" strokeWidth="2"
                animate={{ y1: goodsIn ? 24 : 20, y2: goodsIn ? 24 : 20 }}
              />

              {/* QR-чип на дне лотка */}
              <g transform="translate(148,58)">
                <rect width="30" height="30" rx="6" className="qr-chip" />
                {[4, 12, 20].map((x) =>
                  [4, 12, 20].map((y) => ((x + y) % 16 === 0 || x === 4 || y === 20) && (
                    <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" rx="1" fill="#34d399" opacity="0.9" />
                  ))
                )}
                <motion.rect
                  width="30" height="30" rx="6" fill="none" stroke="#2dd4bf" strokeWidth="2"
                  animate={{ opacity: phase === 1 ? [0.2, 1, 0.2] : 0.35 }}
                  transition={{ duration: 1, repeat: phase === 1 ? Infinity : 0 }}
                />
              </g>

              {/* пьезо-датчик веса */}
              <g transform="translate(52,64)">
                <rect width="42" height="18" rx="5" fill="#082019" stroke="rgba(45,212,191,0.5)" />
                <motion.circle
                  cx="21" cy="9" r="4" fill="#2dd4bf"
                  animate={{ scale: goodsIn ? [1, 1.35, 1] : 0.7, opacity: goodsIn ? 1 : 0.35 }}
                  transition={{ duration: 1.1, repeat: goodsIn ? Infinity : 0 }}
                />
                <text x="21" y="-6" textAnchor="middle" fontSize="9.5" fill="#8fa3ab">вес-датчик</text>
              </g>

              {/* статусный LED на торце */}
              <motion.circle
                cx="8" cy="30" r="5"
                animate={{
                  fill: refunded ? '#fbbf24' : atStation ? '#2dd4bf' : goodsIn ? '#34d399' : '#1f3f36',
                  opacity: [1, 0.5, 1],
                }}
                transition={{ opacity: { duration: 1.2, repeat: Infinity } }}
              />

              {/* halo при возврате залога */}
              <AnimatePresence>
                {refunded && (
                  <motion.circle
                    cx="100" cy="56" r="70" fill="url(#glow)"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: [0.9, 0], scale: [0.8, 1.25] }}
                    transition={{ duration: 1.8 }}
                  />
                )}
              </AnimatePresence>
            </g>
          </motion.g>

          {/* подпись фазы */}
          <text x="280" y="356" textAnchor="middle" fontSize="13" fill="#cbd5d5" fontWeight="700">
            Фаза {phase + 1}/5 — {MECH_STEPS[phase].t}
          </text>
        </svg>
      </div>

      {/* шаги механизма */}
      <div className="mech-steps">
        {MECH_STEPS.map((s, i) => (
          <div key={i} className={`mech-step ${i === phase ? 'on' : ''}`}>
            <div className="n">{i + 1}</div>
            <div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 8 }}>
          <span className="pill">♻️ Полный цикл: 1 лоток ≈ 300+ использований</span>
        </div>
      </div>
    </div>
  )
}
