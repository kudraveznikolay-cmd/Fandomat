// Единая модель данных презентации «ЭкоЛоток»
// (демонстрационные значения для питча; реальная статистика подставляется из CSV-выгрузок)

export const NETWORKS = [
  {
    id: 'euro',
    name: 'Евроопт',
    short: 'ЕО',
    color: '#34d399',
    cities: ['Минск', 'Гомель', 'Брест', 'Гродно', 'Витебск', 'Могилёв'],
    stores: 128,          // точек с экспериментальными лотками ЭкоЛоток
    trays: 640,           // установленных лотков
    returnsPerDay: 4820,  // возвращённых лотков в сутки
    depositBr: 0.5,       // залог за лоток, BYN
    retention: 96.4,      // % возвратов
    savedPolymerKg: 312,  // кг полимера, сэкономленного в сутки
    co2kg: 780,           // кг CO₂-эквивалента в сутки
  },
  {
    id: 'green',
    name: 'Светофор',
    short: 'СВ',
    color: '#a3e635',
    cities: ['Минск', 'Барановичи', 'Пинск', 'Солигорск'],
    stores: 74,
    trays: 310,
    returnsPerDay: 2410,
    depositBr: 0.5,
    retention: 94.8,
    savedPolymerKg: 151,
    co2kg: 389,
  },
  {
    id: 'hit',
    name: 'HIT',
    short: 'HT',
    color: '#2dd4bf',
    cities: ['Минск', 'Молодечно', 'Бобруйск'],
    stores: 52,
    trays: 205,
    returnsPerDay: 1580,
    depositBr: 0.5,
    retention: 95.6,
    savedPolymerKg: 99,
    co2kg: 255,
  },
  {
    id: 'neptun',
    name: 'Нептун',
    short: 'НП',
    color: '#fbbf24',
    cities: ['Минск', 'Жодино', 'Дзержинск'],
    stores: 38,
    trays: 150,
    returnsPerDay: 1120,
    depositBr: 0.5,
    retention: 93.9,
    savedPolymerKg: 70,
    co2kg: 181,
  },
  {
    id: 'fullprice',
    name: 'Full Price',
    short: 'FP',
    color: '#f472b6',
    cities: ['Минск', 'Лидa', 'Орша'],
    stores: 26,
    trays: 96,
    returnsPerDay: 705,
    depositBr: 0.5,
    retention: 95.1,
    savedPolymerKg: 44,
    co2kg: 114,
  },
]

export const TOTALS = NETWORKS.reduce(
  (a, n) => ({
    stores: a.stores + n.stores,
    trays: a.trays + n.trays,
    returnsPerDay: a.returnsPerDay + n.returnsPerDay,
    savedPolymerKg: a.savedPolymerKg + n.savedPolymerKg,
    co2kg: a.co2kg + n.co2kg,
  }),
  { stores: 0, trays: 0, returnsPerDay: 0, savedPolymerKg: 0, co2kg: 0 }
)

export const MONTHLY = [
  { m: 'Май', trays: 120, returns: 900 },
  { m: 'Июнь', trays: 260, returns: 2300 },
  { m: 'Июль', trays: 480, returns: 4900 },
  { m: 'Август', trays: 760, returns: 8400 },
  { m: 'Сентябрь', trays: 1120, returns: 13200 },
  { m: 'Октябрь', trays: 1401, returns: 10635 * 3 },
]

export const MECH_STEPS = [
  {
    t: 'Покупатель берёт товар в лотке',
    d: 'Лотки многоразовые, штабелируются на полке рядом с кассой. На дне — QR-код и RFID-метка.',
  },
  {
    t: 'Залог 0,50 BYN привязывается к QR',
    d: 'Оплата через ЕРИП / QR кошелька. Чек хранится в приложении — карта лояльности не нужна.',
  },
  {
    t: 'Датчик в лотке фиксирует вес',
    d: 'Пьезо-датчик и датчик присутствия понимают: лоток пуст или снова загружен товаром.',
  },
  {
    t: 'Возврат у стойки приёма',
    d: 'Лоток ставится на приёмную панель, RFID-считыватель распознаёт метку за 0,3 секунды.',
  },
  {
    t: 'Мгновенный возврат залога + бонус',
    d: '0,50 BYN возвращается на счёт + 5 эко-баллов партнёрам. Лоток уходит на мойку и повторное использование.',
  },
]

export const PROBLEM_STATS = [
  { icon: '📦', val: '1,2 млн', desc: 'одноразовых лотков и упаковки ежегодно используются в сетях РБ' },
  { icon: '🗑️', val: '~87%', desc: 'такой тары попадает на полигоны ТКО уже после одного применения' },
  { icon: '💸', val: '460 тыс. BYN', desc: 'расходы сетей на закупку одноразовой тары в год' },
  { icon: '⏳', val: '450 лет', desc: 'разложение полимерного лотка на полигоне' },
]

export function fmt(n) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(n))
}
