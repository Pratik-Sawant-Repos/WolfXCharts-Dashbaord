'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Settings, SlidersHorizontal, Info, Maximize2, ChevronDown } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import styles from './page.module.css';
import { fetchStocksData, StockData } from '@/lib/stockApi';

// Define hardcoded structure for the Heatmap mapping
const SECTORS = {
  'FINANCIAL SERVICES': ['HDFCBANK.NS', 'ICICIBANK.NS', 'SBIN.NS', 'KOTAKBANK.NS', 'AXISBANK.NS', 'BAJFINANCE.NS', 'HDFCLIFE.NS'],
  'IT SERVICES': ['TCS.NS', 'INFY.NS', 'WIPRO.NS', 'HCLTECH.NS', 'TECHM.NS'],
  'OIL & GAS': ['RELIANCE.NS', 'ONGC.NS', 'IOC.NS', 'BPCL.NS', 'HINDPETRO.NS'],
  'AUTOMOBILE': ['MARUTI.NS', 'TATAMOTORS.NS', 'M&M.NS', 'BAJAJ-AUTO.NS', 'EICHERMOT.NS'],
  'CONSUMER GOODS': ['HINDUNILVR.NS', 'ITC.NS', 'NESTLEIND.NS', 'DABUR.NS'],
  'PHARMA': ['SUNPHARMA.NS', 'DRREDDY.NS', 'CIPLA.NS', 'DIVISLAB.NS'],
  'METALS': ['TATASTEEL.NS', 'JSWSTEEL.NS', 'HINDALCO.NS', 'SAIL.NS'],
  'POWER': ['NTPC.NS', 'POWERGRID.NS', 'ADANIPOWER.NS']
};

const INDIAN_INDICES = [
  { symbol: '^NSEI', name: 'NIFTY 50' },
  { symbol: '^NSEBANK', name: 'BANKNIFTY' },
  { symbol: '^CNXFIN', name: 'FINNIFTY' },
  { symbol: '^BSESN', name: 'SENSEX' },
  { symbol: '^INDIAVIX', name: 'INDIA VIX' }
];

const GLOBAL_INDICES = [
  { symbol: '^GSPC', name: 'S&P 500', flag: '🇺🇸' },
  { symbol: '^IXIC', name: 'NASDAQ', flag: '🇺🇸' },
  { symbol: '^DJI', name: 'DOW JONES', flag: '🇺🇸' },
  { symbol: '^FTSE', name: 'FTSE 100', flag: '🇬🇧' },
  { symbol: '^N225', name: 'NIKKEI 225', flag: '🇯🇵' },
  { symbol: '^HSI', name: 'HANG SENG', flag: '🇭🇰' }
];

const DUMMY_NEWS = [
  { title: 'RBI keeps repo rate unchanged, maintains growth forecast', time: '2h ago', source: 'Economic Times' },
  { title: 'Global markets trade higher as tech stocks rally on AI optimism', time: '3h ago', source: 'Bloomberg' }
];

export default function MarketOverviewPage() {
  const [dataMap, setDataMap] = useState<Record<string, StockData>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Generate the sparkline chart arrays (randomized slightly but trending up/down based on isPositive)
  const getSparklineData = (isPositive: boolean) => {
    const base = [10, 12, 11, 14, 13, 16, 15, 18];
    if (isPositive) return base.map((v, i) => ({ val: v + i }));
    return base.map((v, i) => ({ val: v - i }));
  };

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      // Flatten all symbols we need to fetch
      const allSymbols = [
        ...INDIAN_INDICES.map(i => i.symbol),
        ...GLOBAL_INDICES.map(i => i.symbol),
        ...Object.values(SECTORS).flat()
      ];

      try {
        const data = await fetchStocksData(allSymbols);
        if (data) {
          const map: Record<string, StockData> = {};
          data.forEach(s => { map[s.symbol] = s; });
          setDataMap(map);
        }
      } catch (err) {
        console.error("Failed to fetch market data", err);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Compute heatmap color logic
  const getHeatmapColor = (changePct: number) => {
    if (changePct >= 2) return '#059669'; // Bright Green
    if (changePct >= 0) return '#10B981'; // Lighter Green
    if (changePct <= -2) return '#DC2626'; // Bright Red
    return '#EF4444'; // Lighter Red
  };

  const getIconColor = (sym: string) => {
    const colors = ['#8B5CF6', '#3B82F6', '#22C55E', '#F59E0B', '#EC4899'];
    return colors[sym.length % colors.length];
  };

  // Derive Market Breadth from all fetched stocks (excluding indices)
  const stocksOnly = Object.values(dataMap).filter(s => !s.symbol.startsWith('^'));
  const advancers = stocksOnly.filter(s => s.change > 0).length;
  const decliners = stocksOnly.filter(s => s.change < 0).length;
  const unchanged = stocksOnly.length - advancers - decliners;
  const advPercent = stocksOnly.length > 0 ? Math.round((advancers / stocksOnly.length) * 100) : 65;

  return (
    <div className={styles.pageContainer}>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="sparkGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="sparkRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </svg>

      {/* Header */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Market Overview</h1>
          <p className={styles.pageSubtitle}>Live market heatmap and global overview</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary}><Settings size={14}/> Heatmap Settings</button>
          <button className={styles.btnSecondary}><SlidersHorizontal size={14}/> Customize</button>
        </div>
      </div>

      <div className={styles.tabsRow}>
        <div className={`${styles.tab} ${styles.tabActive}`}>Market Heatmap</div>
        <div className={styles.tab}>Indices</div>
        <div className={styles.tab}>F&O</div>
        <div className={styles.tab}>Global Markets</div>
        <div className={styles.tab}>Currencies</div>
        <div className={styles.tab}>Commodities</div>
        <div className={styles.tab}>News</div>
      </div>

      <div className={styles.mainGrid}>
        
        {/* Left Column */}
        <div className={styles.leftColumn}>
          
          {/* Top Indices */}
          <div className={styles.indicesRow}>
            {INDIAN_INDICES.map((idx, i) => {
              const data = dataMap[idx.symbol];
              if (!data) return <div key={i} className={styles.skeletonCard} />;
              const isPos = data.change >= 0;
              return (
                <div key={i} className={styles.indexCard}>
                  <span className={styles.indexName}>{idx.name}</span>
                  <span className={styles.indexVal}>{data.last_price.toFixed(2)}</span>
                  <span className={`${styles.indexChange} ${isPos ? styles.valGreen : styles.valRed}`}>
                    {isPos ? '+' : ''}{data.percent_change.toFixed(2)}% ({data.change.toFixed(2)})
                  </span>
                  <div className={styles.sparklineWrapper}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getSparklineData(isPos)}>
                        <Area type="monotone" dataKey="val" stroke={isPos ? '#22C55E' : '#EF4444'} strokeWidth={1.5} fill={isPos ? 'url(#sparkGreen)' : 'url(#sparkRed)'} dot={false} isAnimationActive={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indian Market Heatmap */}
          <div className={styles.sectionContainer} style={{ padding: '1rem' }}>
            <div className={styles.sectionHeader} style={{ marginBottom: '1rem' }}>
              <div className={styles.sectionTitle}>
                <img src={`https://flagcdn.com/w20/in.png`} alt="IN" width="16" style={{ borderRadius: '2px' }}/>
                Indian Market Heatmap <Info size={14} color="var(--text-secondary)" />
              </div>
              <div className={styles.sectionFilters}>
                <span className={`${styles.filterBadge} ${styles.filterBadgeActive}`}>All</span>
                <span className={styles.filterBadge}>Large Cap</span>
                <span className={styles.filterBadge}>Mid Cap</span>
                <span className={styles.filterBadge}>Small Cap</span>
                <span className={styles.filterBadge} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Market Cap <ChevronDown size={12} />
                </span>
                <button className={styles.btnSecondary} style={{ padding: '0.25rem' }}><Maximize2 size={14}/></button>
              </div>
            </div>

            {isLoading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', height: '400px' }}>
                <div className={styles.skeletonCard} style={{ height: '100%' }}/>
                <div className={styles.skeletonCard} style={{ height: '100%' }}/>
                <div className={styles.skeletonCard} style={{ height: '100%' }}/>
                <div className={styles.skeletonCard} style={{ height: '100%' }}/>
              </div>
            ) : (
              <div className={styles.heatmapContainer}>
                {Object.entries(SECTORS).map(([sectorName, symbols], secIdx) => {
                  return (
                    <div key={secIdx} className={styles.sectorBlock}>
                      <div className={styles.sectorHeader}>{sectorName}</div>
                      <div className={styles.stocksGrid}>
                        {symbols.map((sym, i) => {
                          const stock = dataMap[sym];
                          const change = stock ? stock.percent_change : 0;
                          const sign = change > 0 ? '+' : '';
                          return (
                            <div 
                              key={i} 
                              className={styles.stockBlock} 
                              style={{ 
                                backgroundColor: getHeatmapColor(change),
                                flex: i === 0 ? '2' : '1', // Make the first item larger for visual variety
                                minHeight: '60px'
                              }}
                            >
                              <span className={styles.stockBlockSym}>{sym.replace('.NS','').substring(0,8)}</span>
                              <span className={styles.stockBlockChange}>{sign}{change.toFixed(2)}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Global Markets */}
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                Global Markets
              </div>
            </div>
            
            <div className={styles.globalGrid}>
              {GLOBAL_INDICES.map((idx, i) => {
                const data = dataMap[idx.symbol];
                if (!data) return <div key={i} className={styles.skeletonCard} />;
                const isPos = data.change >= 0;
                return (
                  <div key={i} className={styles.indexCard} style={{ padding: '0.75rem' }}>
                    <span className={styles.indexName} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {idx.flag} {idx.name}
                    </span>
                    <span className={styles.indexVal} style={{ fontSize: '1rem' }}>{data.last_price.toFixed(2)}</span>
                    <span className={`${styles.indexChange} ${isPos ? styles.valGreen : styles.valRed}`}>
                      {isPos ? '+' : ''}{data.percent_change.toFixed(2)}%
                    </span>
                    <div className={styles.sparklineWrapper} style={{ height: '20px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={getSparklineData(isPos)}>
                          <Area type="monotone" dataKey="val" stroke={isPos ? '#22C55E' : '#EF4444'} strokeWidth={1} fillOpacity={0} dot={false} isAnimationActive={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className={styles.rightColumn}>
          
          {/* Market Breadth */}
          <div className={styles.sidebarCard}>
            <div className={styles.cardTitle}>Market Breadth</div>
            <div className={styles.gaugeContainer}>
              <div className={styles.gaugeWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ value: advancers }, { value: decliners }]} dataKey="value" innerRadius={45} outerRadius={55} stroke="none" startAngle={180} endAngle={0}>
                      <Cell fill="#22C55E" />
                      <Cell fill="#EF4444" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className={styles.gaugeCenter} style={{ top: '20px' }}>
                  <span className={styles.gaugeVal}>{advPercent}%</span>
                  <span className={styles.gaugeLabel}>Advancing</span>
                </div>
              </div>
              <div className={styles.gaugeLegend}>
                <div className={styles.gaugeLegendItem}>
                  <div className={styles.gaugeLegendName}><div style={{width: 6, height: 6, borderRadius: '50%', background: '#22C55E'}}/> Advances</div>
                  <div className={styles.gaugeLegendNum} style={{ color: '#22C55E' }}>{advancers || 1892}</div>
                </div>
                <div className={styles.gaugeLegendItem}>
                  <div className={styles.gaugeLegendName}><div style={{width: 6, height: 6, borderRadius: '50%', background: '#EF4444'}}/> Declines</div>
                  <div className={styles.gaugeLegendNum} style={{ color: '#EF4444' }}>{decliners || 1156}</div>
                </div>
                <div className={styles.gaugeLegendItem}>
                  <div className={styles.gaugeLegendName}><div style={{width: 6, height: 6, borderRadius: '50%', background: 'var(--text-secondary)'}}/> Unchanged</div>
                  <div className={styles.gaugeLegendNum} style={{ color: 'var(--text-secondary)' }}>{unchanged || 124}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Gainers */}
          <div className={styles.sidebarCard}>
            <div className={styles.cardTitle}>Top Gainers <Link href="#" className={styles.viewAll}>View All</Link></div>
            <div>
              {stocksOnly.filter(s => s.change > 0).sort((a,b) => b.percent_change - a.percent_change).slice(0, 5).map((s, i) => (
                <div key={i} className={styles.listRow}>
                  <div className={styles.listSymbol}>
                    <div className={styles.stockIcon} style={{ color: getIconColor(s.symbol) }}>{s.symbol.charAt(0)}</div>
                    {s.symbol.replace('.NS', '').substring(0, 10)}
                  </div>
                  <div className={styles.listValGroup}>
                    <span>{s.last_price.toFixed(2)}</span>
                    <span className={styles.valGreen}>+{s.percent_change.toFixed(2)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Losers */}
          <div className={styles.sidebarCard}>
            <div className={styles.cardTitle}>Top Losers <Link href="#" className={styles.viewAll}>View All</Link></div>
            <div>
              {stocksOnly.filter(s => s.change < 0).sort((a,b) => a.percent_change - b.percent_change).slice(0, 5).map((s, i) => (
                <div key={i} className={styles.listRow}>
                  <div className={styles.listSymbol}>
                    <div className={styles.stockIcon} style={{ color: getIconColor(s.symbol) }}>{s.symbol.charAt(0)}</div>
                    {s.symbol.replace('.NS', '').substring(0, 10)}
                  </div>
                  <div className={styles.listValGroup}>
                    <span>{s.last_price.toFixed(2)}</span>
                    <span className={styles.valRed}>{s.percent_change.toFixed(2)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market News */}
          <div className={styles.sidebarCard}>
            <div className={styles.cardTitle}>Market News <Link href="#" className={styles.viewAll}>View All</Link></div>
            <div>
              {DUMMY_NEWS.map((news, i) => (
                <div key={i} className={styles.newsItem}>
                  <div className={styles.newsImg}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://picsum.photos/seed/${i + 20}/100/100`} alt="news" />
                  </div>
                  <div className={styles.newsContent}>
                    <h4 className={styles.newsTitle}>{news.title}</h4>
                    <span className={styles.newsMeta}>{news.time} • {news.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
