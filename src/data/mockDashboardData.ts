export const mockWatchlist = [
  { sym: 'AAPL', p: '173.50', c: '+1.2%', isPositive: true },
  { sym: 'TSLA', p: '194.20', c: '-0.8%', isPositive: false },
  { sym: 'BTC', p: '64,100', c: '+2.4%', isPositive: true },
  { sym: 'ETH', p: '3,450', c: '+1.1%', isPositive: true },
];

export const mockStats = {
  todayPnl: { label: "Today's P&L", value: "+$1,240.50", isPositive: true },
  portfolioValue: { label: "Portfolio Value", value: "$145,890.00", isPositive: true },
  winRate: { label: "Win Rate", value: "68.4%", isPositive: true },
};

export const mockEquityData = [
  { name: 'Mon', value: 140000 },
  { name: 'Tue', value: 141500 },
  { name: 'Wed', value: 141000 },
  { name: 'Thu', value: 144500 },
  { name: 'Fri', value: 145890 },
];

export const mockRecentTrades = [
  { sym: 'NVDA', type: 'Long • Options', pnl: '+$450.00', isPositive: true },
  { sym: 'AMD', type: 'Short • Equity', pnl: '-$120.00', isPositive: false },
  { sym: 'MSFT', type: 'Long • Equity', pnl: '+$310.00', isPositive: true },
];

export const mockHeatmapData = [
  { id: 1, type: 'pos-dark' },
  { id: 2, type: 'pos-light' },
  { id: 3, type: 'neg-light' },
  { id: 4, type: 'pos-light' },
  { id: 5, type: 'neg-dark' },
  { id: 6, type: 'pos-dark' },
  { id: 7, type: 'pos-dark' },
  { id: 8, type: 'neutral' },
];
