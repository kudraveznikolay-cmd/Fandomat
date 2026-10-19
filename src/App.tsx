import { useState, useEffect } from 'react';

// ============ DATA ============
const storesData = [
  { name: 'Евроопт', collected: 12450, target: 15000, machines: 8 },
  { name: 'Корона', collected: 9870, target: 12000, machines: 6 },
  { name: 'Санта', collected: 7650, target: 10000, machines: 5 },
  { name: 'Гиппо', collected: 6230, target: 8000, machines: 4 },
  { name: 'Green', collected: 4580, target: 6000, machines: 3 },
  { name: 'Соседи', collected: 3210, target: 5000, machines: 2 },
];

const monthlyData = [
  { month: 'Янв', collected: 2100 },
  { month: 'Фев', collected: 3400 },
  { month: 'Мар', collected: 4800 },
  { month: 'Апр', collected: 6200 },
  { month: 'Май', collected: 7800 },
  { month: 'Июн', collected: 9500 },
  { month: 'Июл', collected: 11200 },
  { month: 'Авг', collected: 13400 },
  { month: 'Сен', collected: 15800 },
  { month: 'Окт', collected: 18200 },
  { month: 'Ноя', collected: 21000 },
  { month: 'Дек', collected: 24500 },
];

const pieData = [
  { name: 'Картонные лотки', value: 45, color: '#22c55e' },
  { name: 'Пластиковые лотки', value: 30, color: '#4ade80' },
  { name: 'Бумажная упаковка', value: 15, color: '#86efac' },
  { name: 'Пенопласт', value: 10, color: '#bbf7d0' },
];

const steps = [
  { title: 'Покупатель приносит упаковку', desc: 'Клиент магазина приносит пустую яичную упаковку к фандомату', icon: '🧑' },
  { title: 'Сканер распознаёт тип', desc: 'ИК-сенсор определяет тип упаковки: картон, пластик или пенопласт', icon: '📷' },
  { title: 'Пресс компактирует', desc: 'Механизм прессования уменьшает объём упаковки в 5 раз', icon: '⚙️' },
  { title: 'Сортировка по типу', desc: 'Автоматическая сортировка по материалу для дальнейшей переработки', icon: '🔄' },
  { title: 'Начисление бонусов', desc: 'Покупатель получает бонусные баллы на карту лояльности магазина', icon: '🎁' },
];

// ============ COMPONENTS ============

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="container">
        <div className="flex gap-3" style={{ alignItems: 'center' }}>
          <div style={{ width: 32, height: 32, background: '#22c55e', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 20 }}>♻️</span>
          </div>
          <span className="font-bold text-white">ЭкоЛоток</span>
        </div>
        <div className="nav-links">
          <a href="#mechanism">Механизм</a>
          <a href="#demo">Демонстрация</a>
          <a href="#stats">Статистика</a>
          <a href="#results">Результаты</a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [count, setCount] = useState(0);
  const target = 43990;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= target) return target;
        return prev + Math.ceil(target / 60);
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div className="container text-center">
        <div className="fade-in" style={{ animationDelay: '0s' }}>
          <div className="badge glass mb-8">
            <span>🏆</span>
            <span className="text-green">Конкурс «100 идей Фандомата» • Республика Беларусь</span>
          </div>
        </div>

        <div className="fade-in" style={{ animationDelay: '0.2s' }}>
          <h1>
            <span className="gradient-text">ЭкоЛоток</span>
            <br />
            <span className="text-white" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
              Фандомат для яичной упаковки
            </span>
          </h1>
        </div>

        <div className="fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-lg mb-12" style={{ maxWidth: 800, margin: '0 auto 48px' }}>
            Инновационная система автоматизированного сбора и переработки яичной упаковки
            в торговых сетях Беларуси. Вместе мы уже собрали более 43 000 единиц упаковки!
          </p>
        </div>

        <div className="fade-in flex flex-center flex-wrap gap-6 mb-12" style={{ animationDelay: '0.6s' }}>
          <StatCard icon="📦" value={count.toLocaleString()} label="Собрано единиц" />
          <StatCard icon="🏪" value="28" label="Фандоматов" />
          <StatCard icon="📍" value="6" label="Торговых сетей РБ" />
          <StatCard icon="🌿" value="4.2т" label="Переработано" />
        </div>

        <div className="bounce" style={{ animationDelay: '1.2s' }}>
          <span style={{ fontSize: 32, color: '#4ade80' }}>↓</span>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="glass" style={{ padding: '16px 24px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 24 }}>{icon}</span>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-muted">{label}</div>
      </div>
    </div>
  );
}

function ProblemSection() {
  const problems = [
    { icon: '🌍', title: '500 млн лотков/год', desc: 'Ежегодный объём яичной упаковки, попадающей на свалки в Беларуси', color: '#f87171' },
    { icon: '⚡', title: '450 лет разложения', desc: 'Срок разложения пластикового яичного лотка в окружающей среде', color: '#fb923c' },
    { icon: '👥', title: '82% не перерабатывается', desc: 'Доля яичной упаковки, которая не попадает в переработку в РБ', color: '#facc15' },
  ];

  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2><span className="gradient-text">Проблема</span></h2>
          <p className="text-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
            Ежегодно в Беларуси выбрасывается более 500 миллионов яичных лотков.
            Большинство из них попадают на свалки, загрязняя окружающую среду.
          </p>
        </div>

        <div className="grid grid-3">
          {problems.map((item, i) => (
            <div key={i} className="glass text-center fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{item.icon}</div>
              <h3 className="text-white">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MechanismSection() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="mechanism" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2><span className="gradient-text">Как это работает</span></h2>
          <p className="text-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
            Простой и удобный процесс сбора яичной упаковки в 5 шагов
          </p>
        </div>

        <div className="glass">
          <div className="grid grid-2">
            <div>
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`step ${step === i ? 'active' : ''}`}
                  onClick={() => setStep(i)}
                >
                  <div className="step-icon">{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h4 className="text-white" style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>{s.title}</h4>
                    <p className="text-sm text-muted">{s.desc}</p>
                  </div>
                  {step === i && (
                    <div style={{ width: 12, height: 12, background: '#4ade80', borderRadius: '50%' }} />
                  )}
                </div>
              ))}
            </div>

            <div className="flex-center" style={{ minHeight: 300 }}>
              <div className="text-center">
                <div style={{ fontSize: 96, marginBottom: 16 }}>{steps[step].icon}</div>
                <h3 className="text-green">{steps[step].title}</h3>
                <p>{steps[step].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrayDemoSection() {
  const [traySlots, setTraySlots] = useState<boolean[]>(Array(10).fill(false));
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);

  const handleInsert = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    const newSlots = [...traySlots];
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < 10) {
        newSlots[idx] = true;
        setTraySlots([...newSlots]);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setTraySlots(Array(10).fill(false));
          setProcessedCount(prev => prev + 1);
          setIsProcessing(false);
        }, 1000);
      }
    }, 200);
  };

  return (
    <section id="demo" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2><span className="gradient-text">Демонстрация работы лотка</span></h2>
          <p className="text-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
            Интерактивная модель: нажмите кнопку, чтобы увидеть процесс приёма и обработки лотка
          </p>
        </div>

        <div className="grid grid-2">
          <div className="glass">
            <h3 className="text-white text-center mb-6">Яичный лоток (10 яиц)</h3>
            <div className="tray-grid">
              {traySlots.map((filled, i) => (
                <div key={i} className={`tray-slot ${filled ? 'filled' : ''}`} />
              ))}
            </div>
            <button
              onClick={handleInsert}
              disabled={isProcessing}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              {isProcessing ? '⚙️ Обработка...' : '🥚 Вставить лоток'}
            </button>
          </div>

          <div className="glass">
            <h3 className="text-white text-center mb-6">Статистика обработки</h3>
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-green mb-2">{processedCount}</div>
              <div className="text-muted">Лотков обработано</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ProcessBar label="Сканирование" progress={isProcessing ? 100 : 0} />
              <ProcessBar label="Прессование" progress={isProcessing ? 100 : 0} />
              <ProcessBar label="Сортировка" progress={isProcessing ? 100 : 0} />
              <ProcessBar label="Начисление бонусов" progress={isProcessing ? 100 : 0} />
            </div>

            <div className="mt-6" style={{ padding: 16, borderRadius: 12, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
              <div className="flex gap-3 text-green mb-2" style={{ alignItems: 'center' }}>
                <span>✓</span>
                <span className="font-bold">Бонусы начислены!</span>
              </div>
              <p className="text-sm text-muted">+{processedCount * 5} баллов на карту лояльности</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessBar({ label, progress }: { label: string; progress: number }) {
  return (
    <div>
      <div className="flex" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
        <span className="text-sm text-muted">{label}</span>
        <span className="text-sm text-green">{progress > 0 ? '✓' : '—'}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function StatisticsSection() {
  const maxCollected = Math.max(...monthlyData.map(d => d.collected));

  return (
    <section id="stats" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2><span className="gradient-text">Статистика по магазинам</span></h2>
          <p className="text-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
            Реальные данные сбора яичной упаковки в торговых сетях Беларуси
          </p>
        </div>

        <div className="grid grid-3 mb-12">
          {storesData.map((store, i) => (
            <div key={store.name} className="glass fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h4 className="text-white" style={{ fontSize: '1.1rem' }}>{store.name}</h4>
                <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', fontSize: '0.75rem' }}>
                  {store.machines} фандоматов
                </span>
              </div>
              <div className="mb-3">
                <div className="flex" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
                  <span className="text-sm text-muted">Собрано</span>
                  <span className="text-sm font-bold text-green">{store.collected.toLocaleString()}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(store.collected / store.target) * 100}%` }} />
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                  Цель: {store.target.toLocaleString()}
                </div>
              </div>
              <div className="flex gap-3" style={{ alignItems: 'center' }}>
                <span style={{ color: '#4ade80' }}>📈</span>
                <span className="text-sm text-green">{Math.round((store.collected / store.target) * 100)}% от плана</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-2">
          <div className="glass">
            <h3 className="text-white mb-4 flex gap-3" style={{ alignItems: 'center' }}>
              <span>📊</span> Динамика сбора за год
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 250, padding: '20px 0' }}>
              {monthlyData.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div
                    style={{
                      width: '100%',
                      height: `${(d.collected / maxCollected) * 200}px`,
                      background: 'linear-gradient(180deg, #4ade80, #22c55e)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.5s',
                    }}
                  />
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass">
            <h3 className="text-white mb-4 flex gap-3" style={{ alignItems: 'center' }}>
              <span>♻️</span> Типы собранной упаковки
            </h3>
            <div className="flex-center" style={{ minHeight: 250 }}>
              <div style={{ position: 'relative', width: 200, height: 200 }}>
                <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                  {pieData.reduce<{ elements: any[]; offset: number }>((acc, item, i) => {
                    const circumference = 2 * Math.PI * 40;
                    const strokeLength = (item.value / 100) * circumference;
                    const element = (
                      <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="20"
                        strokeDasharray={`${strokeLength} ${circumference}`}
                        strokeDashoffset={-acc.offset}
                      />
                    );
                    acc.elements.push(element);
                    acc.offset += strokeLength;
                    return acc;
                  }, { elements: [], offset: 0 }).elements}
                </svg>
              </div>
            </div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
              {pieData.map((item) => (
                <div key={item.name} className="flex gap-3" style={{ alignItems: 'center' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color }} />
                  <span className="text-sm text-muted">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EcoImpactSection() {
  const ecoStats = [
    { label: 'CO₂ не выброшено', value: '2.8 тонны', percent: 78 },
    { label: 'Деревьев сохранено', value: '47 шт.', percent: 65 },
    { label: 'Воды сэкономлено', value: '15 000 л', percent: 82 },
    { label: 'Энергии сохранено', value: '340 кВт·ч', percent: 55 },
  ];

  const recycleSteps = [
    { step: '1', title: 'Сбор', desc: 'Покупатель сдаёт упаковку в фандомат', emoji: '📦' },
    { step: '2', title: 'Прессование', desc: 'Уменьшение объёма в 5 раз', emoji: '🔧' },
    { step: '3', title: 'Транспортировка', desc: 'Вывоз заполненных контейнеров', emoji: '🚛' },
    { step: '4', title: 'Переработка', desc: 'Производство новой продукции', emoji: '♻️' },
    { step: '5', title: 'Новая жизнь', desc: 'Картон, утеплитель, компост', emoji: '🌱' },
  ];

  return (
    <section className="py-24" style={{ background: 'linear-gradient(180deg, rgba(20, 83, 45, 0.2), transparent)' }}>
      <div className="container">
        <div className="text-center mb-16">
          <h2><span className="gradient-text">Экологический эффект</span></h2>
          <p className="text-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
            Каждая собранная яичная упаковка — это вклад в чистое будущее нашей планеты
          </p>
        </div>

        <div className="grid grid-2">
          <div className="glass">
            <h3 className="text-white mb-6 flex gap-3" style={{ alignItems: 'center' }}>
              <span>🌿</span> Вклад в экологию
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {ecoStats.map((item, i) => (
                <div key={i}>
                  <div className="flex" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="text-sm text-muted">{item.label}</span>
                    <span className="text-sm font-bold text-green">{item.value}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass">
            <h3 className="text-white mb-6 flex gap-3" style={{ alignItems: 'center' }}>
              <span>♻️</span> Цикл переработки
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recycleSteps.map((item, i) => (
                <div key={i} className="flex gap-4 p-4" style={{ alignItems: 'center', borderRadius: 12, background: 'rgba(255,255,255,0.05)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="text-white" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.title}</div>
                    <div className="text-sm text-muted">{item.desc}</div>
                  </div>
                  <div className="text-green font-bold text-sm">#{item.step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  const results = [
    { icon: '🎯', value: '43 990', label: 'Единиц упаковки собрано' },
    { icon: '🌿', value: '4.2 тонны', label: 'Материала переработано' },
    { icon: '👥', value: '12 500+', label: 'Участников программы' },
    { icon: '⭐', value: '98%', label: 'Довольных покупателей' },
  ];

  const plans = [
    { year: '2025', plan: 'Расширение до 100 фандоматов в Минске, Бресте, Гомеле, Гродно, Витебске и Могилёве' },
    { year: '2026', plan: 'Интеграция с крупнейшими торговыми сетями Беларуси' },
    { year: '2027', plan: 'Запуск мобильного приложения и партнёрство с оператором вторсырья' },
  ];

  return (
    <section id="results" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2><span className="gradient-text">Наши результаты</span></h2>
          <p className="text-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
            За 12 месяцев работы проекта мы достигли значительных результатов
          </p>
        </div>

        <div className="grid grid-4 mb-16">
          {results.map((r, i) => (
            <div key={i} className="glass text-center fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{r.icon}</div>
              <div className="text-3xl font-black text-white mb-2">{r.value}</div>
              <div className="text-sm text-muted">{r.label}</div>
            </div>
          ))}
        </div>

        <div className="glass text-center">
          <h3 className="text-white mb-6" style={{ fontSize: '1.8rem' }}>Планы развития</h3>
          <div className="grid grid-3">
            {plans.map((item, i) => (
              <div key={i} style={{ padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.05)' }}>
                <div className="text-green font-bold text-xl mb-2">{item.year}</div>
                <p className="text-sm text-muted">{item.plan}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="flex-center gap-3 mb-4">
          <div style={{ width: 40, height: 40, background: '#22c55e', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 24 }}>♻️</span>
          </div>
          <span className="text-xl font-bold gradient-text">ЭкоЛоток</span>
        </div>
        <p className="text-sm text-muted mb-4">
          Проект для конкурса «100 идей Фандомата» • Республика Беларусь • Сбор и переработка яичной упаковки
        </p>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>© 2024-2025 ЭкоЛоток • Беларусь</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div>
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <MechanismSection />
      <TrayDemoSection />
      <StatisticsSection />
      <EcoImpactSection />
      <ResultsSection />
      <Footer />
    </div>
  );
}
