'use client';

import { dashboardData } from '@/data/mockDashboardData2';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Plus, Crown, Info, Clock, Zap, Loader2 } from 'lucide-react';
import { fetchStocksData, StockData } from '@/lib/stockApi';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, 
  PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';
import styles from './page.module.css';

const COLORS = ['#22C55E', '#EF4444', '#F59E0B'];

interface CustomTooltipProps {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '0.5rem', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '0.75rem' }}>
        <p style={{ margin: 0 }}>{label}</p>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{`₹${(payload[0].value as number).toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export default function DashboardOverview() {
  const { kpis, equityCurve, performance, marketOverview, tradePerformance, recentTrades, watchlist, insights, strategy, risk, news } = dashboardData;

  const [liveStocks, setLiveStocks] = useState<Record<string, StockData>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const symbols = ['RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS', '^NSEI', '^NSEBANK'];
        const data = await fetchStocksData(symbols);
        
        if (data) {
          const stockMap: Record<string, StockData> = {};
          data.forEach(s => {
            stockMap[s.symbol] = s;
          });
          setLiveStocks(stockMap);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {/* SVG Defs for Gradients */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </svg>
      
      {/* Header Row */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Welcome back, Trader 👋</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.datePickerBtn}>
            <Calendar size={16} /> 20 May, 2025
          </button>
          <button className={styles.addTradeBtn}>
            <Plus size={16} /> Add Trade
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className={styles.kpiGrid}>
        {/* Today's P&L */}
        <div className={styles.card}>
          <div className={styles.kpiLabel}>Today&apos;s P&L</div>
          <div className={styles.kpiValueRow}>
            <span className={`${styles.kpiValue} ${styles.textGreen}`}>{kpis.todayPnl.value}</span>
            <span className={`${styles.kpiPercent} ${styles.textGreen}`}>{kpis.todayPnl.percent}</span>
          </div>
          <div className={styles.sparklineContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }} data={kpis.todayPnl.sparkline.map((v, i) => ({ val: v, i }))}>
                <Area type="monotone" dataKey="val" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#colorGreen)" dot={false} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* This Week */}
        <div className={styles.card}>
          <div className={styles.kpiLabel}>This Week</div>
          <div className={styles.kpiValueRow}>
            <span className={`${styles.kpiValue} ${styles.textGreen}`}>{kpis.thisWeek.value}</span>
            <span className={`${styles.kpiPercent} ${styles.textGreen}`}>{kpis.thisWeek.percent}</span>
          </div>
          <div className={styles.sparklineContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }} data={kpis.thisWeek.sparkline.map((v, i) => ({ val: v, i }))}>
                <Area type="monotone" dataKey="val" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#colorGreen)" dot={false} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* This Month */}
        <div className={styles.card}>
          <div className={styles.kpiLabel}>This Month</div>
          <div className={styles.kpiValueRow}>
            <span className={`${styles.kpiValue} ${styles.textGreen}`}>{kpis.thisMonth.value}</span>
            <span className={`${styles.kpiPercent} ${styles.textGreen}`}>{kpis.thisMonth.percent}</span>
          </div>
          <div className={styles.sparklineContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }} data={kpis.thisMonth.sparkline.map((v, i) => ({ val: v, i }))}>
                <Area type="monotone" dataKey="val" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#colorGreen)" dot={false} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Win Rate */}
        <div className={styles.card} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className={styles.kpiLabel}>Win Rate</div>
            <div className={styles.kpiValueRow}>
              <span className={styles.kpiValue}>{kpis.winRate.value}</span>
            </div>
            <span className={`${styles.kpiPercent} ${styles.textGreen}`} style={{ display: 'block', marginTop: '0.25rem' }}>{kpis.winRate.percent}</span>
          </div>
          <div style={{ width: '50px', height: '50px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie data={[{ value: kpis.winRate.raw }, { value: 100 - kpis.winRate.raw }]} dataKey="value" innerRadius={18} outerRadius={24} stroke="none" startAngle={90} endAngle={-270}>
                  <Cell fill="#22C55E" />
                  <Cell fill="var(--border-strong)" />
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Reward */}
        <div className={styles.card}>
          <div className={styles.kpiLabel}>Risk Reward</div>
          <div className={styles.kpiValueRow}>
            <span className={styles.kpiValue}>{kpis.riskReward.value}</span>
            <span style={{ fontSize: '0.65rem', background: '#F59E0B', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{kpis.riskReward.badge}</span>
          </div>
          <div className={styles.sparklineContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }} data={kpis.riskReward.sparkline.map((v, i) => ({ val: v, i }))}>
                <Area type="monotone" dataKey="val" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorPurple)" dot={false} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Trades */}
        <div className={styles.card}>
          <div className={styles.kpiLabel}>Total Trades</div>
          <div className={styles.kpiValueRow}>
            <span className={styles.kpiValue}>{kpis.totalTrades.value}</span>
          </div>
          <div className={styles.sparklineContainer} style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '24px', marginTop: '10px' }}>
             <span className={`${styles.kpiPercent} ${styles.textBlue}`} style={{ marginRight: 'auto' }}>{kpis.totalTrades.change}</span>
             {kpis.totalTrades.data.map((h, i) => (
                <div key={i} style={{ width: '4px', height: `${h}px`, background: '#4F46E5', borderRadius: '2px' }} />
             ))}
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className={styles.middleGrid}>
        {/* Equity Curve */}
        <div className={`${styles.card} ${styles.equityCard}`} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardTitle}>
            Equity Curve
            <button style={{ background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-secondary)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>This Month ⌄</button>
          </div>
          <div className={styles.equityValueBadge}>₹2,45,890.50</div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equityCurve} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="equityColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={3} fill="url(#equityColor)" dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Overview */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Performance Overview</div>
          <div className={styles.perfDonutContainer}>
            <div style={{ width: '120px', height: '120px', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={[ { value: performance.win.count }, { value: performance.loss.count }, { value: performance.breakeven.count } ]} 
                       dataKey="value" innerRadius={45} outerRadius={55} stroke="none">
                    {COLORS.map((color, index) => <Cell key={`cell-${index}`} fill={color} />)}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{performance.total}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Total Trades</span>
              </div>
            </div>
            <div className={styles.perfLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendDot} style={{ background: COLORS[0] }} /> Win
                <span className={styles.legendVal}>{performance.win.count} ({performance.win.percent})</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendDot} style={{ background: COLORS[1] }} /> Loss
                <span className={styles.legendVal}>{performance.loss.count} ({performance.loss.percent})</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendDot} style={{ background: COLORS[2] }} /> Breakeven
                <span className={styles.legendVal}>{performance.breakeven.count} ({performance.breakeven.percent})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Market Overview</div>
          <div className={styles.marketCardContent}>
            {marketOverview.map((market, idx) => {
              const apiSymbolMap: Record<string, string> = {
                'NIFTY 50': '^NSEI',
                'BANKNIFTY': '^NSEBANK'
              };
              const liveData = liveStocks[apiSymbolMap[market.symbol]];
              const displayValue = liveData ? liveData.last_price.toLocaleString('en-IN') : market.value;
              const displayChange = liveData ? `${liveData.percent_change > 0 ? '+' : ''}${liveData.percent_change}%` : market.change;
              const isPositive = liveData ? liveData.percent_change >= 0 : market.isPositive;

              return (
              <div key={idx} className={styles.marketItem}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className={styles.marketSymbol}>{market.symbol}</span>
                  <span className={styles.marketVal}>
                    {isLoading && <Loader2 size={12} className={styles.spinner} style={{ marginRight: '4px', animation: 'spin 1s linear infinite', opacity: 0.5 }} />}
                    {displayValue}
                  </span>
                </div>
                <div className={`${styles.kpiPercent} ${isPositive ? styles.textGreen : styles.textRed}`}>
                  {displayChange}
                </div>
                <div className={styles.marketSpark}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }} data={market.sparkline.map((v, i) => ({ val: v, i }))}>
                      <Area type="monotone" dataKey="val" stroke={idx === 0 ? '#22C55E' : '#3B82F6'} strokeWidth={1.5} fillOpacity={1} fill={idx === 0 ? 'url(#colorGreen)' : 'url(#colorBlue)'} dot={false} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>

      {/* Bottom Row 1 */}
      <div className={styles.bottomGrid1}>
        {/* Trade Performance (Bar Chart) */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Trade Performance</div>
          <div className={styles.barLegend}>
            <div className={styles.barLegendItem}><div className={styles.legendDot} style={{ background: '#22C55E', borderRadius: '2px' }} /> Profitable</div>
            <div className={styles.barLegendItem}><div className={styles.legendDot} style={{ background: '#EF4444', borderRadius: '2px' }} /> Losing</div>
          </div>
          <div style={{ flex: 1, width: '100%', minHeight: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tradePerformance} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'var(--border-light)' }} contentStyle={{ background: 'var(--bg-card)', border: 'none', color: 'var(--text-primary)' }} />
                <Bar dataKey="profitable" stackId="a" fill="#22C55E" barSize={12} radius={[0, 0, 4, 4]} />
                <Bar dataKey="losing" stackId="a" fill="#EF4444" barSize={12} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Trades Table */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Recent Trades <Link href="#" className={styles.viewAll}>View All</Link></div>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Type</th>
                  <th>Entry</th>
                  <th>Exit</th>
                  <th style={{ textAlign: 'right' }}>P&L</th>
                </tr>
              </thead>
              <tbody>
                {recentTrades.map((trade, idx) => (
                  <tr key={idx}>
                    <td>{trade.symbol}</td>
                    <td className={trade.type === 'Long' ? styles.textGreen : styles.textRed}>{trade.type}</td>
                    <td>{trade.entry}</td>
                    <td>{trade.exit}</td>
                    <td style={{ textAlign: 'right' }} className={trade.isPositive ? styles.textGreen : styles.textRed}>{trade.pnl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Watchlist Table */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Watchlist <Link href="#" className={styles.viewAll}>View All</Link></div>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <tbody>
                {watchlist.map((item, idx) => {
                  const liveData = liveStocks[item.symbol];
                  const displayValue = liveData ? liveData.last_price.toLocaleString('en-IN') : item.price;
                  const displayChange = liveData ? `${liveData.percent_change > 0 ? '+' : ''}${liveData.percent_change}%` : item.change;
                  const isPositive = liveData ? liveData.percent_change >= 0 : item.isPositive;

                  return (
                  <tr key={idx}>
                    <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #D97706)' }} />
                      {item.symbol}
                    </td>
                    <td>
                      {isLoading && <Loader2 size={12} className={styles.spinner} style={{ marginRight: '4px', animation: 'spin 1s linear infinite', opacity: 0.5 }} />}
                      {displayValue}
                    </td>
                    <td className={isPositive ? styles.textGreen : styles.textRed}>{displayChange}</td>
                    <td style={{ width: '40px', padding: 0 }}>
                      <div style={{ height: '24px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }} data={item.sparkline.map((v, i) => ({ val: v, i }))}>
                            <Area type="monotone" dataKey="val" stroke={isPositive ? '#22C55E' : '#EF4444'} strokeWidth={1.5} fillOpacity={1} fill={isPositive ? 'url(#colorGreen)' : 'url(#colorRed)'} dot={false} isAnimationActive={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Row 2 */}
      <div className={styles.bottomGrid2}>
        {/* AI Insights */}
        <div className={styles.card}>
          <div className={styles.cardTitle}><span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#C084FC' }}><Crown size={16} /> AI Insights</span></div>
          <p className={styles.insightText}>{insights.text}</p>
          <button className={styles.insightBtn}>View Analysis</button>
        </div>

        {/* Top Winning Strategy */}
        <div className={styles.card}>
          <div className={styles.cardTitle}><span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22C55E' }}><Info size={16} /> Top Winning Strategy</span></div>
          <div className={styles.strategyName}>{strategy.name}</div>
          <div className={styles.strategyStats}>
            <div>
              <div className={styles.stratLabel}>Win Rate</div>
              <div className={`${styles.stratVal} ${styles.textGreen}`}>{strategy.winRate}</div>
            </div>
            <div>
              <div className={styles.stratLabel}>Total Profit</div>
              <div className={`${styles.stratVal} ${styles.textGreen}`}>{strategy.totalProfit}</div>
            </div>
          </div>
          <div style={{ marginTop: 'auto', height: '24px', width: '100%' }}>
             <ResponsiveContainer width="100%" height="100%">
                 <AreaChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }} data={[1,3,2,5,4,7,6].map((v, i) => ({ val: v, i }))}>
                   <Area type="monotone" dataKey="val" stroke="#8B5CF6" strokeWidth={1.5} fillOpacity={1} fill="url(#colorPurple)" dot={false} isAnimationActive={false} />
                 </AreaChart>
              </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Analysis */}
        <div className={styles.card}>
          <div className={styles.cardTitle}><span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3B82F6' }}><Clock size={16} /> Risk Analysis</span></div>
          <div className={styles.riskContainer}>
             <div style={{ width: '80px', height: '80px', position: 'relative' }}>
               <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                  <path stroke="var(--border-strong)" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path stroke="#22C55E" strokeWidth="3" strokeDasharray="32, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
               </svg>
               <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.65rem', color: '#22C55E' }}>Low Risk</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{risk.score}</span>
               </div>
             </div>
             <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '1rem' }}>
                  <div className={styles.stratLabel}>Capital at Risk</div>
                  <div className={styles.stratVal} style={{ fontSize: '1rem' }}>{risk.capitalAtRisk}</div>
                </div>
                <div>
                  <div className={styles.stratLabel}>Exposure</div>
                  <div className={styles.stratVal} style={{ fontSize: '0.875rem' }}>{risk.exposure}</div>
                </div>
             </div>
          </div>
        </div>

        {/* News & Updates */}
        <div className={styles.card}>
          <div className={styles.cardTitle}><span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}><Zap size={16} /> News & Updates</span> <Link href="#" className={styles.viewAll}>View All</Link></div>
          <div className={styles.newsList}>
            {news.map((item, idx) => (
              <div key={idx} className={styles.newsItem}>
                <div className={styles.newsIcon}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://ui-avatars.com/api/?name=N&background=random" style={{ width: 16, height: 16, borderRadius: '50%' }} alt="" />
                </div>
                <div>
                  <div className={styles.newsTitle}>{item.title}</div>
                  <div className={styles.newsMeta}>{item.time} • {item.source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
