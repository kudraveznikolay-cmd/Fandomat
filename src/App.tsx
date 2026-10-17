import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, Recycle, BarChart3, MapPin, TrendingUp, Award,
  ShoppingBag, Package, ChevronDown, Star,
  Users, Globe, Zap, Target, CheckCircle
} from 'lucide-react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area
} from 'recharts';

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
  { month: 'Янв', collected: 2100, recycled: 1800 },
  { month: 'Фев', collected: 3400, recycled: 2900 },
  { month: 'Мар', collected: 4800, recycled: 4200 },
  { month: 'Апр', collected: 6200, recycled: 5500 },
  { month: 'Май', collected: 7800, recycled: 7100 },
  { month: 'Июн', collected: 9500, recycled: 8700 },
  { month: 'Июл', collected: 11200, recycled: 10400 },
  { month: 'Авг', collected: 13400, recycled: 12600 },
  { month: 'Сен', collected: 15800, recycled: 14900 },
  { month: 'Окт', collected: 18200, recycled: 17300 },
  { month: 'Ноя', collected: 21000, recycled: 19800 },
  { month: 'Дек', collected: 24500, recycled: 23200 },
];

const pieData = [
  { name: 'Картонные лотки', value: 45, color: '#22c55e' },
  { name: 'Пластиковые лотки', value: 30, color: '#4ade80' },
  { name: 'Бумажная упаковка', value: 15, color: '#86efac' },
  { name: 'Пенопласт', value: 10, color: '#bbf7d0' },
];

// ============ COMPONENTS ============

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/b3cc0c17-30dd-48a7-b1e3-14bbfbf13977/_result.png"
          alt="Фандомат для сбора яичной упаковки"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/80 via-[#0a0f1a]/60 to-[#0a0f1a]" />
      </div>
      {/* Background effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-eco-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
            <Award className="w-5 h-5 text-egg-400" />
            <span className="text-sm font-medium text-eco-300">Конкурс «100 идей Фандомата» • Республика Беларусь</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
        >
          <span className="gradient-text">ЭкоЛоток</span>
          <br />
          <span className="text-white/90 text-3xl md:text-5xl lg:text-6xl">Фандомат для яичной упаковки</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-12"
        >
          Инновационная система автоматизированного сбора и переработки яичной упаковки
          в торговых сетях Беларуси. Вместе мы уже собрали более 43 000 единиц упаковки!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <StatCard icon={<Package className="w-6 h-6" />} value={count.toLocaleString()} label="Собрано единиц" />
          <StatCard icon={<ShoppingBag className="w-6 h-6" />} value="28" label="Фандоматов" />
          <StatCard icon={<MapPin className="w-6 h-6" />} value="6" label="Торговых сетей РБ" />
          <StatCard icon={<Leaf className="w-6 h-6" />} value="4.2т" label="Переработано" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-eco-400 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="glass-card rounded-2xl px-6 py-4 flex items-center gap-3 hover:border-eco-400/50 transition-all duration-300">
      <div className="text-eco-400">{icon}</div>
      <div className="text-left">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-white/50">{label}</div>
      </div>
    </div>
  );
}

function ProblemSection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Проблема</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Ежегодно в Беларуси выбрасывается более 500 миллионов яичных лотков. 
            Большинство из них попадают на свалки, загрязняя окружающую среду.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Globe className="w-10 h-10" />,
              title: '500 млн лотков/год',
              desc: 'Ежегодный объём яичной упаковки, попадающей на свалки в Беларуси',
              color: 'text-red-400'
            },
            {
              icon: <Zap className="w-10 h-10" />,
              title: '450 лет разложения',
              desc: 'Срок разложения пластикового яичного лотка в окружающей среде',
              color: 'text-orange-400'
            },
            {
              icon: <Users className="w-10 h-10" />,
              title: '82% не перерабатывается',
              desc: 'Доля яичной упаковки, которая не попадает в переработку в РБ',
              color: 'text-yellow-400'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass-card rounded-3xl p-8 text-center hover:border-red-400/30 transition-all duration-300 group"
            >
              <div className={`${item.color} mb-4 flex justify-center group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/50">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MechanismSection() {
  const [step, setStep] = useState(0);
  const steps = [
    { title: 'Покупатель приносит упаковку', desc: 'Клиент магазина приносит пустую яичную упаковку к фандомату', icon: '🧑' },
    { title: 'Сканер распознаёт тип', desc: 'ИК-сенсор определяет тип упаковки: картон, пластик или пенопласт', icon: '📷' },
    { title: 'Пресс компактирует', desc: 'Механизм прессования уменьшает объём упаковки в 5 раз', icon: '⚙️' },
    { title: 'Сортировка по типу', desc: 'Автоматическая сортировка по материалу для дальнейшей переработки', icon: '🔄' },
    { title: 'Начисление бонусов', desc: 'Покупатель получает бонусные баллы на карту лояльности магазина', icon: '🎁' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Как это работает</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Простой и удобный процесс сбора яичной упаковки в 5 шагов
          </p>
        </motion.div>

        {/* Mechanism visualization */}
        <div className="glass-card rounded-3xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Steps */}
            <div className="flex-1 space-y-4">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  onClick={() => setStep(i)}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    step === i ? 'bg-eco-500/20 border border-eco-400/50' : 'hover:bg-white/5'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                    step === i ? 'bg-eco-500' : 'bg-white/10'
                  }`}>
                    {s.icon}
                  </div>
                  <div>
                    <h4 className={`font-semibold ${step === i ? 'text-eco-300' : 'text-white/70'}`}>
                      {s.title}
                    </h4>
                    <p className="text-sm text-white/40">{s.desc}</p>
                  </div>
                  {step === i && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-3 h-3 bg-eco-400 rounded-full"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Animation area */}
            <div className="flex-1 relative h-80 md:h-96 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-8xl mb-4">{steps[step].icon}</div>
                  <h3 className="text-2xl font-bold text-eco-300 mb-2">{steps[step].title}</h3>
                  <p className="text-white/60">{steps[step].desc}</p>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      step === i ? 'bg-eco-400 w-8' : 'bg-white/20'
                    }`}
                  />
                ))}
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
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Демонстрация работы лотка</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Интерактивная модель: нажмите кнопку, чтобы увидеть процесс приёма и обработки лотка
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Tray visualization */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6 text-center">Яичный лоток (10 яиц)</h3>
            <div className="grid grid-cols-5 gap-3 mb-8">
              {traySlots.map((filled, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: filled ? [1, 1.2, 1] : 1,
                    backgroundColor: filled ? '#22c55e' : 'rgba(255,255,255,0.1)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square rounded-full border-2 border-white/20 flex items-center justify-center"
                >
                  {filled && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3/4 h-3/4 rounded-full bg-eco-400/80"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleInsert}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                isProcessing
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-eco-500 hover:bg-eco-400 text-white hover:shadow-lg hover:shadow-eco-500/30'
              }`}
            >
              {isProcessing ? '⚙️ Обработка...' : '🥚 Вставить лоток'}
            </button>
          </motion.div>

          {/* Processing stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6 text-center">Статистика обработки</h3>

            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-black text-eco-400 mb-2">{processedCount}</div>
                <div className="text-white/50">Лотков обработано</div>
              </div>

              <div className="space-y-3">
                <ProcessBar label="Сканирование" progress={isProcessing ? 100 : 0} delay={0} />
                <ProcessBar label="Прессование" progress={isProcessing ? 100 : 0} delay={200} />
                <ProcessBar label="Сортировка" progress={isProcessing ? 100 : 0} delay={400} />
                <ProcessBar label="Начисление бонусов" progress={isProcessing ? 100 : 0} delay={600} />
              </div>

              <div className="mt-6 p-4 rounded-xl bg-eco-500/10 border border-eco-500/20">
                <div className="flex items-center gap-2 text-eco-300 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Бонусы начислены!</span>
                </div>
                <p className="text-sm text-white/50">
                  +{processedCount * 5} баллов на карту лояльности
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProcessBar({ label, progress, delay }: { label: string; progress: number; delay: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-white/60">{label}</span>
        <span className="text-eco-400">{progress > 0 ? '✓' : '—'}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, delay: delay / 1000 }}
          className="h-full bg-gradient-to-r from-eco-500 to-eco-300 rounded-full"
        />
      </div>
    </div>
  );
}

function StatisticsSection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Статистика по магазинам</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Реальные данные сбора яичной упаковки в торговых сетях Беларуси
          </p>
        </motion.div>

        {/* Store cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {storesData.map((store, i) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:border-eco-400/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">{store.name}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-eco-500/20 text-eco-300">
                  {store.machines} фандоматов
                </span>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/50">Собрано</span>
                  <span className="text-eco-300 font-semibold">{store.collected.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(store.collected / store.target) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className="h-full bg-gradient-to-r from-eco-600 to-eco-400 rounded-full"
                  />
                </div>
                <div className="text-right text-xs text-white/40 mt-1">
                  Цель: {store.target.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-eco-400" />
                <span className="text-eco-300">
                  {Math.round((store.collected / store.target) * 100)}% от плана
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Monthly chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-eco-400" />
              Динамика сбора за год
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10, 15, 26, 0.9)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="collected"
                  stroke="#22c55e"
                  fill="rgba(34, 197, 94, 0.2)"
                  name="Собрано"
                />
                <Area
                  type="monotone"
                  dataKey="recycled"
                  stroke="#fde047"
                  fill="rgba(253, 224, 71, 0.1)"
                  name="Переработано"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Recycle className="w-5 h-5 text-eco-400" />
              Типы собранной упаковки
            </h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(10, 15, 26, 0.9)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      borderRadius: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-white/60">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  const results = [
    { icon: <Target className="w-8 h-8" />, value: '43 990', label: 'Единиц упаковки собрано', color: 'text-eco-400' },
    { icon: <Leaf className="w-8 h-8" />, value: '4.2 тонны', label: 'Материала переработано', color: 'text-eco-300' },
    { icon: <Users className="w-8 h-8" />, value: '12 500+', label: 'Участников программы', color: 'text-egg-400' },
    { icon: <Star className="w-8 h-8" />, value: '98%', label: 'Довольных покупателей', color: 'text-egg-300' },
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Наши результаты</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            За 12 месяцев работы проекта мы достигли значительных результатов
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className={`${r.color} flex justify-center mb-4`}>{r.icon}</div>
              <div className="text-3xl font-black text-white mb-2">{r.value}</div>
              <div className="text-sm text-white/50">{r.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Future plans */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Планы развития</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { year: '2025', plan: 'Расширение до 100 фандоматов в Минске, Бресте, Гомеле, Гродно, Витебске и Могилёве' },
              { year: '2026', plan: 'Интеграция с крупнейшими торговыми сетями Беларуси' },
              { year: '2027', plan: 'Запуск мобильного приложения и партнёрство с оператором вторсырья' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5">
                <div className="text-eco-400 font-bold text-xl mb-2">{item.year}</div>
                <p className="text-white/60 text-sm">{item.plan}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EcoImpactSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-eco-900/20 to-transparent" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Экологический эффект</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Каждая собранная яичная упаковка — это вклад в чистое будущее нашей планеты
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Eco stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-eco-400" />
              Вклад в экологию
            </h3>
            <div className="space-y-6">
              {[
                { label: 'CO₂ не выброшено', value: '2.8 тонны', percent: 78 },
                { label: 'Деревьев сохранено', value: '47 шт.', percent: 65 },
                { label: 'Воды сэкономлено', value: '15 000 л', percent: 82 },
                { label: 'Энергии сохранено', value: '340 кВт·ч', percent: 55 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/70 text-sm">{item.label}</span>
                    <span className="text-eco-300 font-bold">{item.value}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      className="h-full bg-gradient-to-r from-eco-600 to-eco-400 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recycling process */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Recycle className="w-6 h-6 text-eco-400" />
              Цикл переработки
            </h3>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Сбор', desc: 'Покупатель сдаёт упаковку в фандомат', emoji: '📦' },
                { step: '2', title: 'Прессование', desc: 'Уменьшение объёма в 5 раз', emoji: '🔧' },
                { step: '3', title: 'Транспортировка', desc: 'Вывоз заполненных контейнеров', emoji: '🚛' },
                { step: '4', title: 'Переработка', desc: 'Производство новой продукции', emoji: '♻️' },
                { step: '5', title: 'Новая жизнь', desc: 'Картон, утеплитель, компост', emoji: '🌱' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-eco-500/20 flex items-center justify-center text-xl">
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">{item.title}</div>
                    <div className="text-xs text-white/50">{item.desc}</div>
                  </div>
                  <div className="text-eco-400 font-bold text-sm">#{item.step}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-eco-500 rounded-xl flex items-center justify-center">
            <Recycle className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">ЭкоЛоток</span>
        </div>
        <p className="text-white/40 text-sm mb-4">
          Проект для конкурса «100 идей Фандомата» • Республика Беларусь • Сбор и переработка яичной упаковки
        </p>
        <div className="flex justify-center gap-4">
          <span className="text-white/30 text-xs">© 2024-2025 ЭкоЛоток • Беларусь</span>
        </div>
      </div>
    </footer>
  );
}

// ============ NAVIGATION ============
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#mechanism', label: 'Механизм' },
    { href: '#demo', label: 'Демонстрация' },
    { href: '#stats', label: 'Статистика' },
    { href: '#results', label: 'Результаты' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0f1a]/90 backdrop-blur-xl border-b border-white/10' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-eco-500 rounded-lg flex items-center justify-center">
            <Recycle className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white">ЭкоЛоток</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-eco-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

// ============ MAIN APP ============
export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <div id="mechanism">
        <MechanismSection />
      </div>
      <div id="demo">
        <TrayDemoSection />
      </div>
      <div id="stats">
        <StatisticsSection />
      </div>
      <EcoImpactSection />
      <div id="results">
        <ResultsSection />
      </div>
      <Footer />
    </div>
  );
}
