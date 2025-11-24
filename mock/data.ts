export interface Position {
  symbol: string
  size: number
  entry: number
  mark: number
  pnl: number
}

export interface Account {
  id: string
  name: string
  todayProfit: number
  walletBalance: number
  positions: Position[]
}

export interface ProfitData {
  time: string
  profit: number
}

export interface WalletData {
  address: string
  balanceETH: number
  balanceUSD: number
}

export const accounts: Account[] = [
  {
    id: "acc1",
    name: "API 1",
    todayProfit: 125.45,
    walletBalance: 2000,
    positions: [
      { symbol: "BTCUSDT", size: 0.05, entry: 61250, mark: 62010, pnl: 38.0 },
      { symbol: "ETHUSDT", size: 1.2, entry: 2900, mark: 3010, pnl: 132 },
    ],
  },
  {
    id: "acc2",
    name: "API 2",
    todayProfit: -54.3,
    walletBalance: 1500,
    positions: [{ symbol: "SOLUSDT", size: 10, entry: 180, mark: 192, pnl: 120 }],
  },
  {
    id: "acc3",
    name: "API 3",
    todayProfit: 289.7,
    walletBalance: 3500,
    positions: [
      { symbol: "ADAUSDT", size: 500, entry: 0.98, mark: 1.05, pnl: 35.0 },
      { symbol: "XRPUSDT", size: 300, entry: 2.1, mark: 2.35, pnl: 75.0 },
    ],
  },
  {
    id: "acc4",
    name: "API 4",
    todayProfit: 156.2,
    walletBalance: 2800,
    positions: [{ symbol: "DOGEUSDT", size: 5000, entry: 0.32, mark: 0.38, pnl: 300.0 }],
  },
  {
    id: "acc5",
    name: "API 5",
    todayProfit: -28.5,
    walletBalance: 1200,
    positions: [
      { symbol: "BNBUSDT", size: 2.5, entry: 625, mark: 615, pnl: -25.0 },
      { symbol: "LTCUSDT", size: 8, entry: 185, mark: 178, pnl: -56.0 },
    ],
  },
  {
    id: "acc6",
    name: "API 6",
    todayProfit: 412.1,
    walletBalance: 4200,
    positions: [
      { symbol: "AVAXUSDT", size: 50, entry: 35, mark: 42, pnl: 350.0 },
      { symbol: "MATICUSDT", size: 1000, entry: 0.85, mark: 0.92, pnl: 70.0 },
    ],
  },
]

export const profitGraph: ProfitData[] = [
  { time: "00:00", profit: 20 },
  { time: "01:00", profit: 45 },
  { time: "02:00", profit: 32 },
  { time: "03:00", profit: 60 },
  { time: "04:00", profit: 55 },
  { time: "05:00", profit: 75 },
  { time: "06:00", profit: 90 },
  { time: "07:00", profit: 85 },
  { time: "08:00", profit: 110 },
  { time: "09:00", profit: 128 },
  { time: "10:00", profit: 145 },
  { time: "11:00", profit: 160 },
  { time: "12:00", profit: 155 },
  { time: "13:00", profit: 175 },
  { time: "14:00", profit: 195 },
  { time: "15:00", profit: 215 },
  { time: "16:00", profit: 235 },
  { time: "17:00", profit: 250 },
  { time: "18:00", profit: 270 },
  { time: "19:00", profit: 290 },
  { time: "20:00", profit: 310 },
  { time: "21:00", profit: 325 },
  { time: "22:00", profit: 340 },
  { time: "23:00", profit: 365 },
]

export const metamask: WalletData = {
  address: "0xFaKE1234abcdFAKE9876",
  balanceETH: 1.234,
  balanceUSD: 4550,
}
