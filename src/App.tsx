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

// ============ APP ============
export default function App() {
  return (
    <div style={{ background: '#0a0f1a', color: '#e2e8f0', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
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

// ============ COMPONENTS ============

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '16px 0',
      background: scrolled ? 'rgba(10, 15, 26, 0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, background: '#22c55e', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
            ♻️
          </div>
          <span style={{ fontWeight: 700, color: 'white' }}>ЭкоЛоток</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#mechanism" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>Механизм</a>
          <a href="#demo" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>Демонстрация</a>
          <a href="#stats" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>Статистика</a>
          <a href="#results" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>Результаты</a>
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
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.15) 0%, transparent 70%)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 999,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            fontSize: 14,
          }}>
            <span>🏆</span>
            <span style={{ color: '#4ade80' }}>Конкурс «100 идей Фандомата» • Республика Беларусь</span>
          </div>
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
          <span style={{
            background: 'linear-gradient(135deg, #4ade80, #22c55e, #fde047)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>ЭкоЛоток</span>
          <br />
          <span style={{ color: 'white', fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
            Фандомат для яичной упаковки
          </span>
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 800, margin: '0 auto 48px' }}>
          Инновационная система автоматизированного сбора и переработки яичной упаковки
          в торговых сетях Беларуси. Вместе мы уже собрали более 43 000 единиц упаковки!
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginBottom: 48 }}>
          <StatCard icon="📦" value={count.toLocaleString()} label="Собрано единиц" />
          <StatCard icon="🏪" value="28" label="Фандоматов" />
          <StatCard icon="📍" value="6" label="Торговых сетей РБ" />
          <StatCard icon="🌿" value="4.2т" label="Переработано" />
        </div>

        <div style={{ fontSize: 32, color: '#4ade80' }}>↓</div>
      </div>
    </section>
  );
}

function StatCard({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 16,
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}>
      <span style={{ fontSize: 24 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>{value}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{label}</div>
      </div>
    </div>
  );
}

function ProblemSection() {
  const problems = [
    { icon: '🌍', title: '500 млн лотков/год', desc: 'Ежегодный объём яичной упаковки, попадающей на свалки в Беларуси' },
    { icon: '⚡', title: '450 лет разложения', desc: 'Срок разложения пластикового яичного лотка в окружающей среде' },
    { icon: '👥', title: '82% не перерабатывается', desc: 'Доля яичной упаковки, которая не попадает в переработку в РБ' },
  ];

  return (
    <section style={{ padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>
            <span style={{
              background: 'linear-gradient(135deg, #4ade80, #22c55e, #fde047)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Проблема</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 700, margin: '0 auto' }}>
            Ежегодно в Беларуси выбрасывается более 500 миллионов яичных лотков.
            Большинство из них попадают на свалки, загрязняя окружающую среду.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          {problems.map((item, i) => (
            <div key={i} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 24,
              padding: 32,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{item.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p>
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
    <section id="mechanism" style={{ padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>
            <span style={{
              background: 'linear-gradient(135deg, #4ade80, #22c55e, #fde047)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Как это работает</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 700, margin: '0 auto' }}>
            Простой и удобный процесс сбора яичной упаковки в 5 шагов
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 24,
          padding: 32,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            <div>
              {steps.map((s, i) => (
                <div
                  key={i}
                  onClick={() => setStep(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: 16,
                    borderRadius: 12,
                    cursor: 'pointer',
                    background: step === i ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
                    border: step === i ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid transparent',
                    marginBottom: 12,
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    background: step === i ? '#22c55e' : 'rgba(255,255,255,0.1)',
                  }}>
                    {s.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: step === i ? '#4ade80' : 'rgba(255,255,255,0.7)', fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{s.title}</h4>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>{s.desc}</p>
                  </div>
                  {step === i && (
                    <div style={{ width: 12, height: 12, background: '#4ade80', borderRadius: '50%' }} />
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 96, marginBottom: 16 }}>{steps[step].icon}</div>
                <h3 style={{ color: '#4ade80', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{steps[step].title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>{steps[step].desc}</p>
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
    <section id="demo" style={{ padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>
            <span style={{
              background: 'linear-gradient(135deg, #4ade80, #22c55e, #fde047)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Демонстрация работы лотка</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 700, margin: '0 auto' }}>
            Интерактивная модель: нажмите кнопку, чтобы увидеть процесс приёма и обработки лотка
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 24,
            padding: 32,
          }}>
            <h3 style={{ color: 'white', fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 24 }}>Яичный лоток (10 яиц)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 32 }}>
              {traySlots.map((filled, i) => (
                <div key={i} style={{
                  aspectRatio: '1',
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.2)',
                  background: filled ? '#22c55e' : 'transparent',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>
            <button
              onClick={handleInsert}
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: 16,
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 18,
                border: 'none',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                background: isProcessing ? 'rgba(255,255,255,0.1)' : '#22c55e',
                color: isProcessing ? 'rgba(255,255,255,0.5)' : 'white',
              }}
            >
              {isProcessing ? '⚙️ Обработка...' : '🥚 Вставить лоток'}
            </button>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 24,
            padding: 32,
          }}>
            <h3 style={{ color: 'white', fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 24 }}>Статистика обработки</h3>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: '#4ade80', marginBottom: 8 }}>{processedCount}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)' }}>Лотков обработано</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ProcessBar label="Сканирование" progress={isProcessing ? 100 : 0} />
              <ProcessBar label="Прессование" progress={isProcessing ? 100 : 0} />
              <ProcessBar label="Сортировка" progress={isProcessing ? 100 : 0} />
              <ProcessBar label="Начисление бонусов" progress={isProcessing ? 100 : 0} />
            </div>

            <div style={{ marginTop: 24, padding: 16, borderRadius: 12, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4ade80', marginBottom: 8 }}>
                <span>✓</span>
                <span style={{ fontWeight: 700 }}>Бонусы начислены!</span>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>+{processedCount * 5} баллов на карту лояльности</p>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{label}</span>
        <span style={{ fontSize: 14, color: '#4ade80' }}>{progress > 0 ? '✓' : '—'}</span>
      </div>
      <div style={{ height: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #16a34a, #4ade80)', borderRadius: 999, transition: 'width 0.8s' }} />
      </div>
    </div>
  );
}

function StatisticsSection() {
  const maxCollected = Math.max(...monthlyData.map(d => d.collected));

  return (
    <section id="stats" style={{ padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>
            <span style={{
              background: 'linear-gradient(135deg, #4ade80, #22c55e, #fde047)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Статистика по магазинам</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 700, margin: '0 auto' }}>
            Реальные данные сбора яичной упаковки в торговых сетях Беларуси
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginBottom: 48 }}>
          {storesData.map((store, i) => (
            <div key={store.name} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 24,
              padding: 24,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h4 style={{ color: 'white', fontSize: 18, fontWeight: 700 }}>{store.name}</h4>
                <span style={{ fontSize: 12, padding: '4px 8px', borderRadius: 999, background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}>
                  {store.machines} фандоматов
                </span>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Собрано</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#4ade80' }}>{store.collected.toLocaleString()}</span>
                </div>
                <div style={{ height: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(store.collected / store.target) * 100}%`, background: 'linear-gradient(90deg, #16a34a, #4ade80)', borderRadius: 999 }} />
                </div>
                <div style={{ textAlign: 'right', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                  Цель: {store.target.toLocaleString()}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#4ade80' }}>📈</span>
                <span style={{ fontSize: 14, color: '#4ade80' }}>{Math.round((store.collected / store.target) * 100)}% от плана</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 24,
            padding: 32,
          }}>
            <h3 style={{ color: 'white', fontSize: 20, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span>📊</span> Динамика сбора за год
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 250, padding: '20px 0' }}>
              {monthlyData.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{
                    width: '100%',
                    height: `${(d.collected / maxCollected) * 200}px`,
                    background: 'linear-gradient(180deg, #4ade80, #22c55e)',
                    borderRadius: '4px 4px 0 0',
                  }} />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 24,
            padding: 32,
          }}>
            <h3 style={{ color: 'white', fontSize: 20, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span>♻️</span> Типы собранной упаковки
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250 }}>
              <div style={{ position: 'relative', width: 200, height: 200 }}>
                <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                  {(() => {
                    const circumference = 2 * Math.PI * 40;
                    let offset = 0;
                    return pieData.map((item, i) => {
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
                          strokeDashoffset={-offset}
                        />
                      );
                      offset += strokeLength;
                      return element;
                    });
                  })()}
                </svg>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
              {pieData.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color }} />
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{item.name} ({item.value}%)</span>
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
    <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, rgba(20, 83, 45, 0.2), transparent)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>
            <span style={{
              background: 'linear-gradient(135deg, #4ade80, #22c55e, #fde047)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Экологический эффект</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 700, margin: '0 auto' }}>
            Каждая собранная яичная упаковка — это вклад в чистое будущее нашей планеты
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 24,
            padding: 32,
          }}>
            <h3 style={{ color: 'white', fontSize: 20, fontWeight: 700, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span>🌿</span> Вклад в экологию
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {ecoStats.map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{item.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#4ade80' }}>{item.value}</span>
                  </div>
                  <div style={{ height: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.percent}%`, background: 'linear-gradient(90deg, #16a34a, #4ade80)', borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 24,
            padding: 32,
          }}>
            <h3 style={{ color: 'white', fontSize: 20, fontWeight: 700, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span>♻️</span> Цикл переработки
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recycleSteps.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.05)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{item.desc}</div>
                  </div>
                  <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 14 }}>#{item.step}</div>
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
    <section id="results" style={{ padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, marginBottom: 16 }}>
            <span style={{
              background: 'linear-gradient(135deg, #4ade80, #22c55e, #fde047)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Наши результаты</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 700, margin: '0 auto' }}>
            За 12 месяцев работы проекта мы достигли значительных результатов
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 64 }}>
          {results.map((r, i) => (
            <div key={i} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 24,
              padding: 32,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{r.icon}</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: 'white', marginBottom: 8 }}>{r.value}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{r.label}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 24,
          padding: 32,
          textAlign: 'center',
        }}>
          <h3 style={{ color: 'white', fontSize: 29, fontWeight: 700, marginBottom: 24 }}>Планы развития</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {plans.map((item, i) => (
              <div key={i} style={{ padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{item.year}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{item.plan}</p>
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
    <footer style={{ padding: '48px 0', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, background: '#22c55e', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
            ♻️
          </div>
          <span style={{
            fontSize: 20,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #4ade80, #22c55e, #fde047)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>ЭкоЛоток</span>
        </div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
          Проект для конкурса «100 идей Фандомата» • Республика Беларусь • Сбор и переработка яичной упаковки
        </p>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>© 2024-2025 ЭкоЛоток • Беларусь</p>
      </div>
    </footer>
  );
}
