import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NETWORKS, TOTALS, fmt } from './data.js'
import AnimatedNumber from './AnimatedNumber.jsx'

/* ============ Детальная статистика по сетям магазинов ============
   Слева — список сетей с анимированными барами покрытия;
   справа — детальная карточка выбранной сети + мини-карта городов. */

const MAX_STORES = Math.max(...NETWORKS.map((n) => n.stores))

// условные координаты городов РБ на стилизованной мини-карте (0..100%)
const CITY_POS = {
  'Минск': [52, 44], 'Гомель': [82, 62], 'Брест': [12, 58], 'Гродно': [14, 30],
  'Витебск': [66, 12], 'Могилёв': [74, 40], 'Барановичи': [24, 52], 'Пинск': [10, 70],
  'Солигорск': [36, 50], 'Молодечно': [42, 34], 'Бобруйск': [68, 56], 'Жодино': [56, 42],
  'Дзержинск': [46, 46], 'Лидa': [20, 26], 'Орша': [80, 24],
}

export default function NetworksSlide() {
  const [selId, setSelId] = useState(NETWORKS[0].id)
  const sel = NETWORKS.find((n) => n.id === selId)

  return (
    <div className="networks-wrap">
      {/* список сетей */}
      <div className="net-list" style={{ minWidth: 0 }}>
        <AnimatePresence initial={false}>
          {NETWORKS.map((n, i) => (
            <motion.div
              key={n.id}
              className={`net-row ${n.id === selId ? 'sel' : ''}`}
              onClick={() => setSelId(n.id)}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.45 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <div className="net-logo" style={{ background: n.color }}>{n.short}</div>
                <div style={{ minWidth: 0 }}>
                  <div className="net-name">{n.name}</div>
                  <div className="net-city">{n.cities.length} гор.</div>
                </div>
              </div>
              <div className="net-track">
                <motion.div
                  className="net-fill"
                  style={{ background: `linear-gradient(90deg, ${n.color}, ${n.color}55)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(n.stores / MAX_STORES) * 100}%` }}
                  transition={{ duration: 1, delay: 0.15 + 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="net-count" style={{ color: n.color }}>
                {fmt(n.stores)}
                <span>точек · {fmt(n.trays)} лотк.</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          className="glass card-pad"
          style={{ marginTop: 6, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 8 }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div style={{ textAlign: 'center' }}>
            <div className="stat-num" style={{ fontSize: 24, color: '#34d399' }}>
              <AnimatedNumber value={TOTALS.stores} />
            </div>
            <div className="stat-lbl">точек всего</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="stat-num" style={{ fontSize: 24, color: '#2dd4bf' }}>
              <AnimatedNumber value={TOTALS.trays} />
            </div>
            <div className="stat-lbl">лотков в обороте</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="stat-num" style={{ fontSize: 24, color: '#a3e635' }}>
              <AnimatedNumber value={TOTALS.returnsPerDay} />
            </div>
            <div className="stat-lbl">возвратов / сутки</div>
          </div>
        </motion.div>
      </div>

      {/* детальная карточка */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={sel.id}
          className="net-detail glass"
          initial={{ opacity: 0, x: 26, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -18, scale: 0.98, position: 'absolute' }}
          transition={{ duration: 0.35 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="net-logo" style={{ background: sel.color, width: 44, height: 44, fontSize: 16 }}>
              {sel.short}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20 }}>{sel.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>пилотное покрытие · данные за октябрь 2026</div>
            </div>
            <span className="pill" style={{ marginLeft: 'auto' }}>удержание {sel.retention}%</span>
          </div>

          <div className="detail-grid">
            <div className="detail-cell">
              <div className="k">Торговых точек</div>
              <div className="v" style={{ color: sel.color }}><AnimatedNumber value={sel.stores} /></div>
            </div>
            <div className="detail-cell">
              <div className="k">Лотков в системе</div>
              <div className="v"><AnimatedNumber value={sel.trays} /></div>
            </div>
            <div className="detail-cell">
              <div className="k">Возвратов в сутки</div>
              <div className="v"><AnimatedNumber value={sel.returnsPerDay} /></div>
            </div>
            <div className="detail-cell">
              <div className="k">Экономия полимера</div>
              <div className="v">{sel.savedPolymerKg} кг/сут</div>
            </div>
          </div>

          {/* мини-карта присутствия */}
          <div>
            <div className="k" style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              География присутствия
            </div>
            <div className="map-dots">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <path d="M18 22 L38 10 L62 14 L84 20 L92 42 L86 68 L64 84 L34 88 L14 72 L8 46 Z"
                  fill="rgba(52,211,153,0.05)" stroke="rgba(52,211,153,0.25)" strokeWidth="0.6" />
              </svg>
              {sel.cities.map((c, i) => {
                const p = CITY_POS[c] || [50, 50]
                return (
                  <motion.span
                    key={c}
                    className="map-dot"
                    style={{ left: `${p[0]}%`, top: `${p[1]}%`, background: sel.color, boxShadow: `0 0 10px ${sel.color}` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.08, type: 'spring', stiffness: 200 }}
                    title={c}
                  />
                )
              })}
              <div style={{ position: 'absolute', right: 10, bottom: 8, fontSize: 11, color: 'var(--muted)' }}>
                {sel.cities.join(' · ')}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span className="pill">🌱 CO₂: −{fmt(sel.co2kg)} кг/сут</span>
            <span className="pill gold">💰 Залог {sel.depositBr.toFixed(2)} Br</span>
            <span className="pill">📈 Оборот лотков ×{(1 + sel.returnsPerDay / sel.trays).toFixed(1)}/день</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
