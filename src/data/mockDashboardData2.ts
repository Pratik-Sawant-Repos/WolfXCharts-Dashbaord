export const dashboardData = {
  kpis: {
    todayPnl: { value: '+₹24,560.75', percent: '+2.35%', isPositive: true, sparkline: [10, 15, 12, 18, 15, 20, 24] },
    thisWeek: { value: '+₹75,890.20', percent: '+4.91%', isPositive: true, sparkline: [50, 45, 60, 55, 65, 60, 75] },
    thisMonth: { value: '+₹2,45,890.50', percent: '+8.12%', isPositive: true, sparkline: [200, 210, 205, 225, 220, 235, 245] },
    winRate: { value: '78.62%', percent: '+6.21%', isPositive: true, raw: 78.62 },
    riskReward: { value: '1.82', badge: 'Good', sparkline: [1.2, 1.4, 1.3, 1.6, 1.5, 1.7, 1.82] },
    totalTrades: { value: '142', change: '+12', data: [5, 8, 4, 10, 7, 12, 15] }
  },
  equityCurve: [
    { date: 'May 01', value: 100000 },
    { date: 'May 03', value: 120000 },
    { date: 'May 05', value: 135000 },
    { date: 'May 07', value: 130000 },
    { date: 'May 09', value: 150000 },
    { date: 'May 11', value: 145000 },
    { date: 'May 13', value: 180000 },
    { date: 'May 15', value: 175000 },
    { date: 'May 17', value: 190000 },
    { date: 'May 19', value: 185000 },
    { date: 'May 21', value: 245890 }
  ],
  performance: {
    win: { count: 78, percent: '54.9%' },
    loss: { count: 48, percent: '33.8%' },
    breakeven: { count: 16, percent: '11.3%' },
    total: 142
  },
  marketOverview: [
    { symbol: 'NIFTY 50', value: '22,530.70', change: '+0.82%', isPositive: true, sparkline: [22000, 22100, 22050, 22300, 22200, 22450, 22530] },
    { symbol: 'BANKNIFTY', value: '48,520.60', change: '+1.05%', isPositive: true, sparkline: [48000, 48100, 47900, 48300, 48200, 48400, 48520] }
  ],
  tradePerformance: [
    { day: 'M', profitable: 22, losing: 12 },
    { day: 'T', profitable: 18, losing: 15 },
    { day: 'W', profitable: 25, losing: 8 },
    { day: 'T', profitable: 15, losing: 18 },
    { day: 'F', profitable: 28, losing: 10 },
    { day: 'S', profitable: 0, losing: 0 },
    { day: 'S', profitable: 0, losing: 0 }
  ],
  recentTrades: [
    { symbol: 'RELIANCE', type: 'Long', entry: '2,520.45', exit: '2,548.90', pnl: '+₹2,850.00', isPositive: true },
    { symbol: 'NIFTY 23 MAY 22500 CE', type: 'Long', entry: '132.45', exit: '155.90', pnl: '+₹4,692.50', isPositive: true },
    { symbol: 'BANKNIFTY 23 MAY 48500 PE', type: 'Short', entry: '155.30', exit: '142.10', pnl: '+₹2,640.00', isPositive: true },
    { symbol: 'TCS', type: 'Long', entry: '3,456.20', exit: '3,420.50', pnl: '-₹1,786.00', isPositive: false },
    { symbol: 'HDFCBANK', type: 'Long', entry: '1,664.80', exit: '1,699.90', pnl: '+₹3,512.50', isPositive: true }
  ],
  watchlist: [
    { symbol: 'RELIANCE', price: '2,548.90', change: '+1.27%', isPositive: true, sparkline: [25,26,24,28,27,29,30] },
    { symbol: 'TCS', price: '3,420.50', change: '-0.38%', isPositive: false, sparkline: [34,33,35,32,31,30,29] },
    { symbol: 'HDFCBANK', price: '1,699.90', change: '+0.81%', isPositive: true, sparkline: [16,17,16.5,17.5,18,17.8,18.5] },
    { symbol: 'INFY', price: '1,452.80', change: '+1.23%', isPositive: true, sparkline: [14,14.5,14.2,14.8,15,14.9,15.5] },
    { symbol: 'ICICIBANK', price: '1,142.60', change: '+0.56%', isPositive: true, sparkline: [11,11.2,11.1,11.5,11.4,11.6,11.8] }
  ],
  insights: {
    text: "Your win rate improves significantly on NIFTY option trades on Tuesdays and Wednesdays."
  },
  strategy: {
    name: "Momentum Breakout",
    winRate: "82.4%",
    totalProfit: "+₹1,25,340"
  },
  risk: {
    level: "Low Risk",
    score: "32/100",
    capitalAtRisk: "₹35,240",
    exposure: "12.6 %"
  },
  news: [
    { title: "RBI keeps repo rate unchanged, maintains growth forecast", time: "2h ago", source: "Economic Times" },
    { title: "Global cues positive, Asian markets trade higher ahead of results", time: "3h ago", source: "Moneycontrol" }
  ]
};
