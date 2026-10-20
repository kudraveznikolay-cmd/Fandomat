import React from 'react'
import { motion } from 'framer-motion'
import MechanismSVG from './MechanismSVG.jsx'
import TrayDemo from './TrayDemo.jsx'
import NetworksSlide from './NetworksSlide.jsx'
import AnimatedNumber, { GrowBar } from './AnimatedNumber.jsx'
import { PROBLEM_STATS, TOTALS, MONTHLY, fmt } from './data.js'

const fade = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -22 },
}

const stagger = { animate: { transition: { staggerChildren: 0.09 } } }
const item = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } }

/* ================= S1 · титул ================= */
export function SlideTitle({ go }) {
  return (
    <motion.div className="slide" variants={stagger} initial="initial" animate="animate" exit="exit">
      <div className="hero-wrap">
        <div className="hero-left">
          <motion.div className="kicker" variants={item}>Конкурс «100 идей для Беларуси» · проектный питч</motion.div>
          <motion.h1 className="hero-title" variants={item}>
            Эко<span className="grad-text">Лоток</span>
          </motion.h1>
          <motion.p className="lede" variants={item} style={{ marginTop: 16 }}>
            Многоразовый «умный» лоток для сетей ритейла: покупатель вносит залог 0,50 Br,
            датчики и RFID отслеживают оборот тары, а возврат залога происходит за 3 секунды
            у стойки приёма. Меньше пластика — больше прибыли сети и лояльности покупателя.
          </motion.p>
          <motion.div className="hero-stats" variants={item}>
            <div className="glass hero-stat">
              <div className="stat-num" style={{ color: '#34d399' }}><AnimatedNumber value={TOTALS.stores} /></div>
              <div className="stat-lbl">точек-партнёров</div>
            </div>
            <div className="glass hero-stat">
              <div className="stat-num" style={{ color: '#2dd4bf' }}><AnimatedNumber value={TOTALS.trays} /></div>
              <div className="stat-lbl">лотков в обороте</div>
            </div>
            <div className="glass hero-stat">
              <div className="stat-num" style={{ color: '#a3e635' }}><AnimatedNumber value={TOTALS.co2kg} suffix=" кг" /></div>
              <div className="stat-lbl">CO₂ / сутки</div>
            </div>
          </motion.div>
          <motion.div variants={item} style={{ marginTop: 26, display: 'flex', gap: 12 }}>
            <button className="nav-btn primary" onClick={() => go(1)}>Начать презентацию →</button>
            <span className="pill gold" style={{ alignSelf: 'center' }}>★ Формат: листайте ← →</span>
          </motion.div>
        </div>
        <div className="hero-right">
          <motion.div
            className="glass card-pad"
            style={{ width: 'min(420px, 90%)' }}
            animate={{ y: [0, -14, 0], rotate: [0, 1.2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 300 220" width="100%">
              <defs>
                <linearGradient id="heroTray" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f4433" /><stop offset="100%" stopColor="#062018" />
                </linearGradient>
              </defs>
              <path d="M 20 60 L 280 60 L 258 150 Q 255 160 245 160 L 55 160 Q 45 160 42 150 Z"
                fill="url(#heroTray)" stroke="rgba(52,211,153,0.7)" strokeWidth="2.5" />
              {[60, 105, 150, 195, 240].map((x) => (
                <line key={x} x1={x} y1="68" x2={x - 10} y2="152" stroke="rgba(52,211,153,0.18)" strokeWidth="3" />
              ))}
              <rect x="110" y="44" width="80" height="16" rx="8" fill="#0a2a21" stroke="rgba(52,211,153,0.5)" strokeWidth="2" />
              <motion.circle cx="34" cy="76" r="7" fill="#34d399"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
              {[0, 1, 2].map((i) => (
                <motion.circle key={i} cx="150" cy="110" r={30 + i * 22} fill="none"
                  stroke="rgba(45,212,191,0.5)" strokeWidth="1.4"
                  animate={{ opacity: [0.6, 0, 0.6], scale: [0.92, 1.1, 0.92] }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.7 }}
                  style={{ transformOrigin: '150px 110px' }} />
              ))}
              <text x="150" y="200" textAnchor="middle" fontSize="13" fill="#8fa3ab">RFID · QR · вес-датчик · LED-статус</text>
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

/* ================= S2 · проблема ================= */
export function SlideProblem() {
  return (
    <motion.div className="slide" variants={stagger} initial="initial" animate="animate" exit="exit">
      <motion.div className="kicker" variants={item}>01 · Проблема</motion.div>
      <motion.div className="slide-title" variants={item}>Одноразовая тара съедает бюджеты сетей и полигоны страны</motion.div>
      <motion.div className="slide-sub" variants={item}>По данным пилотного аудита торговых сетей Республики Беларусь</motion.div>

      <div className="problem-grid">
        {PROBLEM_STATS.map((p, i) => (
          <motion.div key={i} className="glass card-pad problem-card" variants={item}>
            <div className="problem-icon">{p.icon}</div>
            <div className="problem-val">{p.val}</div>
            <div className="problem-desc">{p.desc}</div>
          </motion.div>
        ))}
      </div>

      <motion.div className="glass card-pad compare-bar" variants={item}>
        <div style={{ fontWeight: 800, marginBottom: 14, fontSize: 14 }}>Куда уходит тара сегодня vs. с ЭкоЛотком</div>
        {[
          { n: 'Одноразовая тара → полигон ТКО', pct: 87, c: 'linear-gradient(90deg,#fb7185,#fb718555)' },
          { n: 'Переработка (без системы возврата)', pct: 9, c: 'linear-gradient(90deg,#fbbf24,#fbbf2455)' },
          { n: 'ЭкоЛоток: повторное использование', pct: 96, c: 'linear-gradient(90deg,#34d399,#2dd4bf)' },
          { n: 'ЭкоЛоток: доля возвратов покупателями', pct: 95, c: 'linear-gradient(90deg,#2dd4bf,#2dd4bf55)' },
        ].map((r, i) => (
          <div className="compare-row" key={i}>
            <div className="compare-name">{r.n}</div>
            <GrowBar pct={r.pct} color={r.c} delay={0.3 + i * 0.15} />
            <div style={{ width: 46, textAlign: 'right', fontWeight: 800, fontSize: 13 }}>{r.pct}%</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ================= S3 · механизм ================= */
export function SlideMechanism() {
  return (
    <motion.div className="slide" variants={fade} initial="initial" animate="animate" exit="exit">
      <div>
        <div className="kicker">02 · Как это работает</div>
        <div className="slide-title">Анимированный механизм ЭкоЛотка</div>
        <div className="slide-sub">Полный цикл: выдача → залог → контроль датчиков → приём → мгновенный возврат</div>
      </div>
      <MechanismSVG />
    </motion.div>
  )
}

/* ================= S4 · живое демо ================= */
export function SlideDemo() {
  return (
    <motion.div className="slide" variants={fade} initial="initial" animate="animate" exit="exit">
      <div>
        <div className="kicker">03 · Интерактивная демонстрация</div>
        <div className="slide-title">Попробуйте прямо сейчас — «живой» лоток</div>
        <div className="slide-sub">Загрузите товары кликом, сдайте лоток у стойки и увидите мгновенный возврат залога</div>
      </div>
      <TrayDemo />
    </motion.div>
  )
}

/* ================= S5 · сети ================= */
export function SlideNetworks() {
  return (
    <motion.div className="slide" variants={fade} initial="initial" animate="animate" exit="exit">
      <div>
        <div className="kicker">04 · Покрытие и статистика</div>
        <div className="slide-title">Детальная статистика по сетям магазинов</div>
        <div className="slide-sub">Нажмите на сеть — справа появится разрез: точки, лотки, возвраты, экология, география</div>
      </div>
      <NetworksSlide />
    </motion.div>
  )
}

/* ================= S6 · экономика ================= */
export function SlideEconomics() {
  const maxReturns = Math.max(...MONTHLY.map((m) => m.returns))
  return (
    <motion.div className="slide" variants={stagger} initial="initial" animate="animate" exit="exit">
      <motion.div className="kicker" variants={item}>05 · Экономика проекта</motion.div>
      <motion.div className="slide-title" variants={item}>Юнит-экономика и динамика оборота</motion.div>
      <div className="eco-wrap">
        <motion.div className="glass card-pad eco-left" variants={item}>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Рост оборота лотков по месяцам пилота</div>
          <div className="chart-bars">
            {MONTHLY.map((m, i) => (
              <div className="bar-col" key={m.m}>
                <motion.div
                  className={`bar ${i % 2 ? 'teal' : ''}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${(m.returns / maxReturns) * 100}%` }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="bar-value">{fmt(m.returns)}</div>
                </motion.div>
                <div className="bar-label">{m.m}<br /><b style={{ color: '#cbd5d5' }}>{fmt(m.trays)} лотк.</b></div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>Возвратов в месяц · всего за пилот: {fmt(MONTHLY.reduce((a, m) => a + m.returns, 0))}</div>
        </motion.div>

        <div className="eco-right">
          <motion.div className="glass card-pad" variants={item}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>Юнит-экономика одного лотка</div>
            <div className="unit-econ">
              <div className="econ-row"><span>Изготовление (перфорированный PP + RFID + датчик)</span><b>−14,0 Br</b></div>
              <div className="econ-row"><span>Срок службы ≈ 300 циклов × маржа сети на трафике</span><b>+38,0 Br</b></div>
              <div className="econ-row"><span>Экономия на закупке одноразовой тары</span><b>+9,5 Br</b></div>
              <div className="econ-row total"><span>Профиль с 1 лотка за срок службы</span><span style={{ color: '#34d399' }}>+33,5 Br</span></div>
            </div>
          </motion.div>
          <motion.div className="glass card-pad" style={{ display: 'flex', justifyContent: 'space-around' }} variants={item}>
            <div style={{ textAlign: 'center' }}>
              <div className="stat-num" style={{ fontSize: 22, color: '#fbbf24' }}><AnimatedNumber value={1.4} decimals={1} suffix=" млн Br" /></div>
              <div className="stat-lbl">выручка за год (пилот)</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="stat-num" style={{ fontSize: 22, color: '#34d399' }}><AnimatedNumber value={11} suffix=" мес." /></div>
              <div className="stat-lbl">окупаемость CAPEX</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

/* ================= S7 · экология ================= */
export function SlideEcology() {
  const co2Year = TOTALS.co2kg * 365
  return (
    <motion.div className="slide" variants={stagger} initial="initial" animate="animate" exit="exit">
      <motion.div className="kicker" variants={item}>06 · Экологический эффект</motion.div>
      <motion.div className="slide-title" variants={item}>Цифры, которые увидит область и страна</motion.div>
      <div className="eco-cards">
        {[
          { v: TOTALS.savedPolymerKg, s: ' кг/сут', l: 'полимера не отправляется на полигон', c: '#34d399' },
          { v: co2Year, s: ' т/год', l: 'CO₂-эквивалента (в тоннах)', c: '#2dd4bf', div: 1000, dec: 0 },
          { v: TOTALS.returnsPerDay * 365, s: '', l: 'возвратов в год по пилоту', c: '#a3e635' },
        ].map((e, i) => (
          <motion.div key={i} className="glass card-pad eco-card" variants={item}>
            <div className="eco-big" style={{ color: e.c }}>
              <AnimatedNumber value={e.v / (e.div || 1)} decimals={e.dec || 0} suffix={e.s} />
            </div>
            <div className="stat-lbl">{e.l}</div>
          </motion.div>
        ))}
      </div>

      <motion.div className="glass card-pad donut-wrap" variants={item}>
        <svg width="170" height="170" viewBox="0 0 42 42">
          <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
          {[
            { pct: 96, c: '#34d399', off: 0 },
            { pct: 3, c: '#fbbf24', off: 96 },
            { pct: 1, c: '#fb7185', off: 99 },
          ].map((seg, i) => (
            <motion.circle
              key={i} cx="21" cy="21" r="15.9" fill="none" stroke={seg.c} strokeWidth="6" strokeLinecap="round"
              strokeDasharray={`${seg.pct} ${100 - seg.pct}`} strokeDashoffset={25 - seg.off}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.2 }}
            />
          ))}
          <text x="21" y="20" textAnchor="middle" fontSize="7" fontWeight="800" fill="#eaf4ef">96%</text>
          <text x="21" y="26" textAnchor="middle" fontSize="3.4" fill="#8fa3ab">переиспользуются</text>
        </svg>
        <div className="legend">
          <div className="legend-item"><span className="legend-sw" style={{ background: '#34d399' }} />Повторное использование лотка — 96%</div>
          <div className="legend-item"><span className="legend-sw" style={{ background: '#fbbf24' }} />Отправлено на переработку по износу — 3%</div>
          <div className="legend-item"><span className="legend-sw" style={{ background: '#fb7185' }} />Потери / не возвращено — 1%</div>
          <div style={{ marginTop: 6 }}><span className="pill">🌍 1 лоток ЭкоЛоток заменяет ~300 одноразовых</span></div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ================= S8 · roadmap ================= */
const ROADMAP = [
  { t: 'Q4 2026', tag: 'Сейчас', h: 'Пилот: 318 точек, 5 сетей', p: '1 401 лотков в обороте, 10 635 возвратов в сутки, удержание возвратов 95,4%. Обратная связь от покупателей собрана.' },
  { t: 'Q1–Q2 2027', tag: 'Шаг 2', h: 'Масштабирование на областные центры', p: '+1 500 лотков, интеграция с кассовым ПО сетей, мойка-хабы в 6 областях, мобильное приложение с эко-баллами.' },
  { t: 'Q3–Q4 2027', tag: 'Шаг 3', h: 'Франшиза модели для рынков и HoReCa', p: 'Лотки для овощных рынков, пекарен и доставки готовой еды. Открытая API-платформа учёта оборота тары.' },
  { t: '2028', tag: 'Горизонт', h: 'Национальный стандарт многоразовой тары', p: 'Выход на уровень госпрограммы «Твёрдые бытовые отходы», экспорт решения в сети СНГ.' },
]

export function SlideRoadmap() {
  return (
    <motion.div className="slide" variants={stagger} initial="initial" animate="animate" exit="exit">
      <motion.div className="kicker" variants={item}>07 · Дорожная карта</motion.div>
      <motion.div className="slide-title" variants={item}>От пилота к национальному стандарту</motion.div>
      <div className="timeline">
        <div className="tl-line" />
        {ROADMAP.map((r, i) => (
          <motion.div key={i} className="tl-item" variants={item}>
            <div className="tl-dot">{i + 1}</div>
            <div className="tl-body">
              <div className="tl-tag">{r.t} · {r.tag}</div>
              <h4>{r.h}</h4>
              <p>{r.p}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ================= S9 · финал ================= */
export function SlideFinal({ go }) {
  return (
    <motion.div className="slide final-wrap" variants={stagger} initial="initial" animate="animate" exit="exit">
      <motion.div className="kicker" variants={item}>08 · Призыв к жюри</motion.div>
      <motion.h1 className="hero-title" variants={item}>
        Дайте нам <span className="grad-text">1% полки</span> — <br />и тара перестанет быть отходом
      </motion.h1>
      <motion.p className="lede" variants={item} style={{ textAlign: 'center' }}>
        ЭкоЛоток доказал экономику на пилоте. Для национального запуска нам нужны три вещи:
      </motion.p>
      <div className="ask-grid">
        {[
          { big: '350 тыс. Br', l: 'грант на производство 10 000 лотков и 4 моечных хаба' },
          { big: 'Пилот-сеть №1', l: 'протокол с крупной сетью о масштабировании на 1 000 точек' },
          { big: 'Экспертиза', l: 'менторство по RFID-интеграции с кассовым ПО и ESG-отчётностью' },
        ].map((a, i) => (
          <motion.div key={i} className="glass card-pad ask-card" variants={item}>
            <div className="big">{a.big}</div>
            <div className="stat-lbl">{a.l}</div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={item} style={{ display: 'flex', gap: 12, marginTop: 6 }}>
        <span className="pill">♻️ Экология</span>
        <span className="pill gold">💰 Экономика</span>
        <span className="pill">🤝 Удобство покупателя</span>
      </motion.div>
      <motion.div className="team-line" variants={item}>Команда «ЭкоЛоток» · конкурс «100 идей для Беларуси» · 2026</motion.div>
      <motion.button className="nav-btn primary" variants={item} onClick={() => go(0)}>↺ Смотреть слайды заново</motion.button>
    </motion.div>
  )
}
