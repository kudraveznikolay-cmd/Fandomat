import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ============ Живая демонстрация «умного» лотка ============
   Интерактивный SVG-лоток: товары загружаются/выгружаются,
   датчик веса показывает нагрузку, LED и экран меняют статус,
   при возврате — анимация монеты и «чек» с начислением залога. */

const DEPOSIT = 0.5

const ITEMS = [
  { x: 34, y: -6, w: 52, h: 40, fill: '#155e46', stroke: 'rgba(163,230,53,0.55)', label: '🥔' },
  { x: 92, y: -14, w: 40, h: 48, fill: '#166b52', stroke: 'rgba(52,211,153,0.6)', label: '🥕' },
  { x: 138, y: -2, w: 46, h: 36, fill: '#1d6f5a', stroke: 'rgba(45,212,191,0.6)', label: '🍞' },
]

export default function TrayDemo() {
  const [loaded, setLoaded] = useState([false, false, false])
  const [returned, setReturned] = useState(false)
  const [refunds, setRefunds] = useState(0)
  const [coins, setCoins] = useState([])
  const coinId = useRef(0)

  const weight = loaded.filter(Boolean).length // условных "кг"
  const allLoaded = loaded.every(Boolean)

  const toggleItem = (i) => {
    if (returned) return
    setLoaded((l) => l.map((v, j) => (j === i ? !v : v)))
  }

  const doReturn = () => {
    if (!allLoaded || returned) return
    setReturned(true)
    setRefunds((r) => r + DEPOSIT)
    const id = ++coinId.current
    setCoins((c) => [...c, { id, x: 40 + Math.random() * 20 }])
    setTimeout(() => setCoins((c) => c.filter((k) => k.id !== id)), 1400)
    setTimeout(() => {
      setLoaded([false, false, false])
      setReturned(false)
    }, 1800)
  }

  const statusColor = returned ? '#fbbf24' : allLoaded ? '#34d399' : weight > 0 ? '#2dd4bf' : '#64748b'
  const statusText = returned
    ? '✔ Лоток принят · залог возвращён'
    : allLoaded
      ? 'Лоток полон → можно сдавать'
      : weight > 0
        ? 'Сканирование содержимого…'
        : 'Лоток пуст · возьмите товар'

  return (
    <div className="demo-wrap">
      {/* ---- левая колонка: интерактивный лоток ---- */}
      <div className="demo-tray-col" style={{ position: 'relative' }}>
        <AnimatePresence>
          {coins.map((c) => (
            <motion.div
              key={c.id}
              className="coin-float"
              style={{ left: `${c.x}%`, top: '30%' }}
              initial={{ opacity: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 1, 0], y: -90, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4 }}
            >
              +{DEPOSIT.toFixed(2)} Br 🪙
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="tray3d">
          <svg viewBox="0 0 320 240" className="tray-svg">
            <defs>
              <linearGradient id="demoTray" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f4433" />
                <stop offset="100%" stopColor="#062018" />
              </linearGradient>
              <linearGradient id="shelfG" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50%" stopColor="rgba(52,211,153,0.35)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>

            {/* полка */}
            <rect x="10" y="196" width="300" height="8" rx="4" fill="url(#shelfG)" />

            {/* экранчик на торце лотка */}
            <g transform="translate(232,120)">
              <rect width="74" height="52" rx="10" fill="#041310" stroke="rgba(52,211,153,0.4)" />
              <text x="37" y="20" textAnchor="middle" fontSize="10" fill="#8fa3ab">вес</text>
              <text x="37" y="38" textAnchor="middle" fontSize="15" fontWeight="800" fill={statusColor}>
                {(weight * 1.2).toFixed(1)} кг
              </text>
            </g>

            {/* корпус лотка с лёгким tilt при загрузке */}
            <motion.g
              animate={{ rotate: returned ? -4 : 0, y: returned ? -8 : 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 12 }}
            >
              <g transform="translate(30,110)">
                <path
                  d="M 0 14 L 200 14 L 182 84 Q 180 92 172 92 L 28 92 Q 20 92 18 84 Z"
                  fill="url(#demoTray)" stroke="rgba(52,211,153,0.6)" strokeWidth="2"
                />
                {[36, 72, 108, 144].map((x) => (
                  <line key={x} x1={x} y1="20" x2={x - 7} y2="86" stroke="rgba(52,211,153,0.15)" strokeWidth="2.5" />
                ))}
                <rect x="66" y="0" width="68" height="14" rx="7" fill="#0a2a21" stroke="rgba(52,211,153,0.45)" strokeWidth="1.5" />

                {/* QR-чип */}
                <g transform="translate(158,52)">
                  <rect width="26" height="26" rx="5" fill="#0b1f18" stroke="rgba(52,211,153,0.6)" />
                  {[3, 11, 19].map((x) => [3, 11, 19].map((y) => ((x * y) % 10 < 5) && (
                    <rect key={`${x}${y}`} x={x} y={y} width="4.5" height="4.5" rx="1" fill="#34d399" />
                  )))}
                </g>

                {/* LED статуса */}
                <motion.circle
                  cx="8" cy="26" r="6"
                  animate={{ fill: statusColor, opacity: [1, 0.45, 1] }}
                  transition={{ opacity: { duration: 1.1, repeat: Infinity } }}
                />

                {/* товары — кликабельные */}
                {ITEMS.map((it, i) => (
                  <g key={i} onClick={() => toggleItem(i)} style={{ cursor: returned ? 'default' : 'pointer' }}>
                    <AnimatePresence>
                      {loaded[i] && (
                        <motion.g
                          initial={{ y: -70, opacity: 0, rotate: -8 }}
                          animate={{ y: 0, opacity: 1, rotate: 0 }}
                          exit={{ y: -50, opacity: 0, scale: 0.8 }}
                          transition={{ type: 'spring', stiffness: 140, damping: 13 }}
                        >
                          <rect x={it.x} y={it.y} width={it.w} height={it.h} rx="6" fill={it.fill} stroke={it.stroke} strokeWidth="1.6" />
                          <text x={it.x + it.w / 2} y={it.y + it.h / 2 + 7} textAnchor="middle" fontSize="18">{it.label}</text>
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </g>
                ))}
              </g>
            </motion.g>
          </svg>
        </div>

        <div className="demo-controls">
          <button className="demo-btn accent" onClick={doReturn} disabled={!allLoaded || returned}>
            ↩ Сдать лоток у стойки
          </button>
          <button className="demo-btn warn" onClick={() => setLoaded([false, false, false])} disabled={returned}>
            Очистить
          </button>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {ITEMS.map((it, i) => (
            <button
              key={i}
              className="demo-btn"
              onClick={() => toggleItem(i)}
              disabled={returned}
              style={loaded[i]
                ? { borderColor: 'var(--stroke-bright)', background: 'rgba(52,211,153,0.16)', color: '#a7f3d0' }
                : {}}
            >
              {it.label} {loaded[i] ? 'в лотке ✓' : 'на полке — положить'}
            </button>
          ))}
        </div>
        <div className="hint-keys">
          💡 Нажимайте кнопки с товарами, затем «Сдать лоток» — и ждите возврат залога
        </div>
      </div>

      {/* ---- правая колонка: статус + чек ---- */}
      <div className="demo-info-col">
        <div
          className="status-line glass"
          style={{ borderColor: returned ? 'rgba(251,191,36,0.4)' : 'var(--stroke-bright)' }}
        >
          <span className="led-dot" style={{ background: statusColor, boxShadow: `0 0 12px ${statusColor}` }} />
          <AnimatePresence mode="wait">
            <motion.span
              key={statusText}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {statusText}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="glass card-pad">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>🧾 Чек возврата</strong>
            <span className="pill" style={{ padding: '4px 10px', fontSize: 11 }}>RFID · 0,3 c</span>
          </div>
          <div className="receipt-row"><span>Лоток ЭкоЛоток № EL-2026-0148</span><span className="v">принят</span></div>
          <div className="receipt-row"><span>Возврат залога</span><span className="v">+{(refunds).toFixed(2)} Br</span></div>
          <div className="receipt-row"><span>Эко-баллы (+5)</span><span className="v">{refunds > 0 ? 5 : 0}</span></div>
          <div className="receipt-row"><span>CO₂ не выброшено</span><span className="v">{refunds > 0 ? '−0,16 кг' : '—'}</span></div>
        </div>

        <div className="glass card-pad" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div className="stat-num" style={{ color: '#34d399' }}>{(refunds).toFixed(2)}</div>
            <div className="stat-lbl">Br возвращено в демо</div>
          </div>
          <div>
            <div className="stat-num" style={{ color: '#2dd4bf' }}>{Math.round(refunds / DEPOSIT) * 3}</div>
            <div className="stat-lbl">циклов переиспользования</div>
          </div>
        </div>
      </div>
    </div>
  )
}
