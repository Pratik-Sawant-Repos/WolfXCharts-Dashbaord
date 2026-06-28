'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Star, Search, Plus, Download, Bell, LineChart as LineChartIcon, 
  MoreVertical, ChevronLeft, ChevronRight, X, Loader2
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import styles from './page.module.css';
import { fetchStocksData, StockData, searchStocks, SearchResult } from '@/lib/stockApi';

// Dummy static news and indices data for the right sidebar
const DUMMY_INDICES = [
  { name: 'NIFTY 50', val: '22,530.70', change: '+0.82%' },
  { name: 'BANKNIFTY', val: '48,520.60', change: '+1.05%' },
  { name: 'FINNIFTY', val: '21,780.45', change: '+0.91%' },
  { name: 'SENSEX', val: '74,299.17', change: '+0.78%' },
];

const DUMMY_NEWS = [
  { title: 'NIFTY ends higher as banking stocks rally ahead of results', time: '2h ago', source: 'Moneycontrol' },
  { title: 'RBI keeps repo rate unchanged, maintains growth forecast', time: '3h ago', source: 'Economic Times' }
];

const DEFAULT_SYMBOLS = [
  'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 
  'ICICIBANK.NS', 'SBIN.NS', 'BAJFINANCE.NS', 'KOTAKBANK.NS', 
  'LT.NS', 'BHARTIARTL.NS'
];

export default function WatchlistPage() {
  const [symbols, setSymbols] = useState<string[]>(DEFAULT_SYMBOLS);
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // For demo purposes, allow toggling the empty state
  const [forceEmpty, setForceEmpty] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (symbols.length === 0) {
        setStocks([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const data = await fetchStocksData(symbols);
      if (data) {
        setStocks(data);
      }
      setIsLoading(false);
    }
    loadData();
  }, [symbols]);

  // Search effect
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        const results = await searchStocks(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleAddStock = (symbol: string) => {
    const nseSymbol = symbol.endsWith('.NS') || symbol.endsWith('.BO') ? symbol : `${symbol}.NS`;
    if (!symbols.includes(nseSymbol)) {
      setSymbols(prev => [nseSymbol, ...prev]);
    }
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const isActuallyEmpty = forceEmpty || (!isLoading && stocks.length === 0);

  // Helper to get initials or an icon color based on symbol
  const getIconColor = (sym: string) => {
    const colors = ['#8B5CF6', '#EF4444', '#3B82F6', '#22C55E', '#F59E0B', '#EC4899'];
    return colors[sym.length % colors.length];
  };

  const getSparklineData = (isPositive: boolean) => {
    // Generate a simple random sparkline that ends higher/lower based on positive/negative
    const base = [2,3,4,3,5,4,6];
    if (isPositive) return base.map((v, i) => ({ val: v + i*0.5, i }));
    return base.map((v, i) => ({ val: v - i*0.5, i }));
  };

  return (
    <div className={styles.pageContainer}>
      {/* Gradients for charts */}
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
        <div className={styles.headerLeft}>
          <Star size={24} color="#8B5CF6" />
          <div>
            <h1 className={styles.pageTitle}>My Watchlist</h1>
            <p className={styles.pageSubtitle}>Track your favorite stocks and stay updated</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary} onClick={() => setForceEmpty(!forceEmpty)}>
            <Download size={16} /> Toggle Empty State (Demo)
          </button>
          <button className={styles.btnSecondary}>
            <Download size={16} /> Import Watchlist
          </button>
          <button className={styles.btnPrimary} onClick={() => setIsSearchOpen(true)}>
            <Plus size={16} /> Add Stock
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          
          <div className={styles.tabsRow}>
            <div className={`${styles.tab} ${styles.tabActive}`}>
              All Stocks <span className={styles.badge}>{isActuallyEmpty ? 0 : stocks.length}</span>
            </div>
            <div className={styles.tab}>
              Indices <span className={styles.badge}>0</span>
            </div>
            <div className={styles.tab}>
              Options <span className={styles.badge}>0</span>
            </div>
          </div>

          {isLoading ? (
            <div className={styles.emptyStateContainer} style={{ padding: '2rem' }}>
              <p>Loading real-time market data...</p>
            </div>
          ) : isActuallyEmpty ? (
            /* EMPTY STATE */
            <div>
              <div className={styles.emptyStateContainer}>
                <div className={styles.emptyIconWrapper}>
                  <div className={styles.emptyIconBg} />
                  <Search size={64} className={styles.emptyIcon} />
                </div>
                <h2 className={styles.emptyTitle}>Your watchlist is empty</h2>
                <p className={styles.emptyDesc}>
                  Search for any stock, index, or symbol and add it to your watchlist.
                </p>
                <button className={`${styles.btnPrimary} ${styles.btnLarge}`} onClick={() => setIsSearchOpen(true)}>
                  <Search size={18} /> Search & Add Stocks
                </button>
              </div>

              <div className={styles.featureCardsRow}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}><Star size={20} /></div>
                  <div>
                    <h3 className={styles.featureTitle}>Track Favorites</h3>
                    <p className={styles.featureText}>Add stocks you care about and track them in real-time.</p>
                  </div>
                </div>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}><Bell size={20} /></div>
                  <div>
                    <h3 className={styles.featureTitle}>Get Notified</h3>
                    <p className={styles.featureText}>Receive alerts and updates on your watchlist.</p>
                  </div>
                </div>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}><LineChartIcon size={20} /></div>
                  <div>
                    <h3 className={styles.featureTitle}>Analyze Better</h3>
                    <p className={styles.featureText}>Make informed decisions with powerful analytics.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* FILLED STATE */
            <div className={styles.tableCard}>
              <div className={styles.tableHeaderRow}>
                <div>Symbol</div>
                <div>LTP</div>
                <div>Change</div>
                <div>Change %</div>
                <div>Volume</div>
                <div>Market Cap</div>
                <div>Chart</div>
                <div style={{ textAlign: 'right' }}>Action</div>
              </div>

              {stocks.map((stock, idx) => {
                const isPos = stock.change >= 0;
                const sign = isPos ? '+' : '';
                const valClass = isPos ? styles.valGreen : styles.valRed;
                const sparkData = getSparklineData(isPos);
                
                return (
                  <div key={idx} className={styles.tableRow}>
                    <div className={styles.stockSymbolCell}>
                      <div className={styles.stockIcon} style={{ color: getIconColor(stock.symbol) }}>
                        {stock.symbol.charAt(0)}
                      </div>
                      <div className={styles.stockNameWrapper}>
                        <span className={styles.stockSymbol}>{stock.symbol.replace('.NS', '')}</span>
                        <span className={styles.stockExchange}>NSE</span>
                      </div>
                    </div>
                    <div className={styles.valCell}>{(stock.last_price || 0).toFixed(2)}</div>
                    <div className={`${styles.valCell} ${valClass}`}>{sign}{(stock.change || 0).toFixed(2)}</div>
                    <div className={`${styles.valCell} ${valClass}`}>{sign}{(stock.percent_change || 0).toFixed(2)}%</div>
                    <div className={styles.valCell}>{(stock.volume / 1000000).toFixed(2)}M</div>
                    <div className={styles.valCell}>₹{((stock.market_cap || 0) / 10000000).toFixed(2)}Cr</div>
                    <div style={{ width: '60px', height: '24px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sparkData}>
                          <Area 
                            type="monotone" 
                            dataKey="val" 
                            stroke={isPos ? '#22C55E' : '#EF4444'} 
                            strokeWidth={1.5} 
                            fill={isPos ? 'url(#sparkGreen)' : 'url(#sparkRed)'} 
                            dot={false} 
                            isAnimationActive={false} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <button className={styles.actionBtn}><Bell size={16} /></button>
                      <button className={styles.actionBtn}><MoreVertical size={16} /></button>
                    </div>
                  </div>
                );
              })}

              <div className={styles.tableFooter}>
                <span>Showing 1 to {stocks.length} of {stocks.length} results</span>
                <div className={styles.pagination}>
                  <button className={styles.pageBtn}><ChevronLeft size={14} /></button>
                  <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
                  <button className={styles.pageBtn}>2</button>
                  <button className={styles.pageBtn}><ChevronRight size={14} /></button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          {isActuallyEmpty ? (
            /* Sidebar - Empty State */
            <>
              <div className={styles.sidebarCard}>
                <div className={styles.cardTitle}>Market Indices <Link href="#" className={styles.viewAll}>View All</Link></div>
                <div>
                  {DUMMY_INDICES.map((idx, i) => (
                    <div key={i} className={styles.listRow}>
                      <div className={styles.listSymbol}>{idx.name}</div>
                      <div className={styles.listValGroup}>
                        <span>{idx.val}</span>
                        <span className={styles.valGreen}>{idx.change}</span>
                        <div className={styles.listSparkline}>
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={getSparklineData(true)}>
                              <Area type="monotone" dataKey="val" stroke="#22C55E" fillOpacity={0} strokeWidth={1} dot={false} isAnimationActive={false} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <div className={styles.cardTitle}>Trending Now <Link href="#" className={styles.viewAll}>View All</Link></div>
                <div>
                  {DUMMY_INDICES.map((idx, i) => (
                    <div key={i} className={styles.listRow}>
                      <div className={styles.listSymbol}>{idx.name.substring(0,6)}</div>
                      <div className={styles.listValGroup}>
                        <span>1,452.80</span>
                        <span className={styles.valGreen}>+1.23%</span>
                        <div className={styles.listSparkline}>
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={getSparklineData(true)}>
                              <Area type="monotone" dataKey="val" stroke="#22C55E" fillOpacity={0} strokeWidth={1} dot={false} isAnimationActive={false} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Sidebar - Filled State */
            <>
              <div className={styles.sidebarCard}>
                <div className={styles.cardTitle}>Watchlist Overview</div>
                <div className={styles.donutContainer}>
                  <div className={styles.donutWrapper}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={[{ value: 8 }, { value: 4 }]} dataKey="value" innerRadius={35} outerRadius={45} stroke="none">
                          <Cell fill="#22C55E" />
                          <Cell fill="#EF4444" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className={styles.donutCenter}>
                      <span className={styles.donutTotal}>{stocks.length || 12}</span>
                      <span className={styles.donutLabel}>Total Stocks</span>
                    </div>
                  </div>
                  <div className={styles.donutLegend}>
                    <div className={styles.legendRow}>
                      <span className={styles.legendName}>Gainers</span>
                      <span className={styles.legendValGreen}>8</span>
                    </div>
                    <div className={styles.legendRow}>
                      <span className={styles.legendName}>Losers</span>
                      <span className={styles.legendValRed}>4</span>
                    </div>
                    <div className={styles.legendRow}>
                      <span className={styles.legendName}>Unchanged</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <div className={styles.cardTitle}>Top Gainers <Link href="#" className={styles.viewAll}>View All</Link></div>
                <div>
                  {stocks.filter(s => s.change > 0).slice(0, 4).map((s, i) => (
                    <div key={i} className={styles.listRow}>
                      <div className={styles.listSymbol}>
                        <div className={styles.stockIcon} style={{ width: '16px', height: '16px', fontSize: '10px', color: getIconColor(s.symbol) }}>
                          {s.symbol.charAt(0)}
                        </div>
                        {s.symbol.replace('.NS', '').substring(0, 10)}
                      </div>
                      <div className={styles.listValGroup}>
                        <span>{(s.last_price || 0).toFixed(2)}</span>
                        <span className={styles.valGreen}>+{(s.percent_change || 0).toFixed(2)}%</span>
                        <div className={styles.listSparkline}>
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={getSparklineData(true)}>
                              <Area type="monotone" dataKey="val" stroke="#22C55E" fillOpacity={0} strokeWidth={1} dot={false} isAnimationActive={false} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.sidebarCard}>
                <div className={styles.cardTitle}>Top Losers <Link href="#" className={styles.viewAll}>View All</Link></div>
                <div>
                  {stocks.filter(s => s.change < 0).slice(0, 4).map((s, i) => (
                    <div key={i} className={styles.listRow}>
                      <div className={styles.listSymbol}>
                        <div className={styles.stockIcon} style={{ width: '16px', height: '16px', fontSize: '10px', color: getIconColor(s.symbol) }}>
                          {s.symbol.charAt(0)}
                        </div>
                        {s.symbol.replace('.NS', '').substring(0, 10)}
                      </div>
                      <div className={styles.listValGroup}>
                        <span>{(s.last_price || 0).toFixed(2)}</span>
                        <span className={styles.valRed}>{(s.percent_change || 0).toFixed(2)}%</span>
                        <div className={styles.listSparkline}>
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={getSparklineData(false)}>
                              <Area type="monotone" dataKey="val" stroke="#EF4444" fillOpacity={0} strokeWidth={1} dot={false} isAnimationActive={false} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className={styles.sidebarCard}>
            <div className={styles.cardTitle}>Market News <Link href="#" className={styles.viewAll}>View All</Link></div>
            <div>
              {DUMMY_NEWS.map((news, i) => (
                <div key={i} className={styles.newsItem}>
                  <div className={styles.newsImg}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://picsum.photos/seed/${i + 10}/100/100`} alt="news" />
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

      {/* Search Modal */}
      {isSearchOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsSearchOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <Search size={20} color="var(--text-secondary)" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search for any stock symbol or company name..." 
                className={styles.searchInput}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button className={styles.closeModalBtn} onClick={() => setIsSearchOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.searchResults}>
              {isSearching ? (
                <div className={styles.searchEmpty}>
                  <Loader2 className="animate-spin" style={{ margin: '0 auto', marginBottom: '0.5rem' }} />
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((result, idx) => (
                  <div key={idx} className={styles.searchItem} onClick={() => handleAddStock(result.symbol)}>
                    <div className={styles.searchItemInfo}>
                      <span className={styles.searchItemSymbol}>{result.symbol}</span>
                      <span className={styles.searchItemName}>{result.company_name}</span>
                    </div>
                    <button className={styles.searchAddBtn}>Add</button>
                  </div>
                ))
              ) : searchQuery.length >= 2 ? (
                <div className={styles.searchEmpty}>No results found for "{searchQuery}"</div>
              ) : (
                <div className={styles.searchEmpty}>Type at least 2 characters to search Indian stocks via API</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
