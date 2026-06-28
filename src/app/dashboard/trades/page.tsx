'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Calendar, Info, 
  Settings, Box, FileText, CheckCircle, HelpCircle, AlertTriangle, Briefcase, Zap, Target
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import styles from './page.module.css';

export default function AddNewTradePage() {
  const mockSparklineData = [1, 2.5, 2, 4, 3, 5, 4.5, 6, 5.5, 7].map((v, i) => ({ val: v, i }));

  return (
    <div className={styles.pageContainer}>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="tradeSparkline" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <Link href="/dashboard" className={styles.backBtn}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className={styles.pageTitle}>Add New Trade</h1>
            <p className={styles.pageSubtitle}>Record and track your trade in detail</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary}>Save as Draft</button>
          <button className={styles.btnPrimary}>Save Trade</button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Left Column (Forms) */}
        <div className={styles.leftColumn}>
          {/* Trade Information */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Trade Information</h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Trade Date</label>
                <div className={styles.inputWrapper}>
                  <Calendar size={16} className={styles.inputIconLeft} />
                  <input type="text" className={`${styles.inputField} ${styles.inputWithIconLeft}`} defaultValue="20 May, 2025" />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Name / Symbol</label>
                <input type="text" className={styles.inputField} placeholder="e.g. NIFTY, BANKNIFTY" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Strike Price</label>
                <input type="text" className={styles.inputField} placeholder="e.g. 22500" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>CE / PE</label>
                <div className={styles.selectWrapper}>
                  <select className={styles.selectField}>
                    <option>Select</option>
                    <option>CE</option>
                    <option>PE</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Contract Expiry</label>
                <div className={styles.inputWrapper}>
                  <Calendar size={16} className={styles.inputIconLeft} />
                  <input type="text" className={`${styles.inputField} ${styles.inputWithIconLeft}`} placeholder="Select Expiry Date" />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Buy / Sell</label>
                <div className={styles.selectWrapper}>
                  <select className={styles.selectField}>
                    <option>Select</option>
                    <option>Buy</option>
                    <option>Sell</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>No. of Lots</label>
                <div className={styles.selectWrapper}>
                  <select className={styles.selectField} defaultValue="2">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Product Type</label>
                <div className={styles.selectWrapper}>
                  <select className={styles.selectField} defaultValue="Options">
                    <option>Options</option>
                    <option>Futures</option>
                    <option>Cash</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Trade Levels */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Trade Levels</h2>
            <div className={styles.formGridLevels}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Entry Price</label>
                <div className={styles.inputWrapper}>
                  <input type="text" className={`${styles.inputField} ${styles.inputWithIconRight}`} defaultValue="0.00" />
                  <span className={styles.inputIconRight}>₹</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Stop Loss (SL)</label>
                <div className={styles.inputWrapper}>
                  <input type="text" className={`${styles.inputField} ${styles.inputSL} ${styles.inputWithIconRight}`} defaultValue="0.00" />
                  <span className={styles.inputIconRight}>₹</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Target 1 (T1)</label>
                <div className={styles.inputWrapper}>
                  <input type="text" className={`${styles.inputField} ${styles.inputT1} ${styles.inputWithIconRight}`} defaultValue="0.00" />
                  <span className={styles.inputIconRight}>₹</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Target 2 (T2)</label>
                <div className={styles.inputWrapper}>
                  <input type="text" className={`${styles.inputField} ${styles.inputT2} ${styles.inputWithIconRight}`} defaultValue="0.00" />
                  <span className={styles.inputIconRight}>₹</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Exit Price / High</label>
                <div className={styles.inputWrapper}>
                  <input type="text" className={`${styles.inputField} ${styles.inputWithIconRight}`} defaultValue="0.00" />
                  <span className={styles.inputIconRight}>₹</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trade Outcome */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Trade Outcome</h2>
            <div className={styles.formGridOutcome}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Gain Points</label>
                <div className={styles.inputWrapper}>
                  <input type="text" className={`${styles.inputField} ${styles.inputWithIconRight}`} defaultValue="0.00" />
                  <span className={styles.inputIconRight}>₹</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Result</label>
                <div className={styles.selectWrapper}>
                  <select className={styles.selectField}>
                    <option>Select Result</option>
                    <option>Win</option>
                    <option>Loss</option>
                    <option>Breakeven</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Profit Amount (Per 2 Lot)</label>
                <div className={styles.inputWrapper}>
                  <input type="text" className={`${styles.inputField} ${styles.inputProfit} ${styles.inputWithIconLeft}`} defaultValue="0.00" />
                  <span className={styles.inputIconLeft} style={{ color: 'var(--primary-color)' }}>₹</span>
                </div>
              </div>
              <div className={styles.miniChartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockSparklineData}>
                    <Area type="monotone" dataKey="val" stroke="#8B5CF6" strokeWidth={2} fill="url(#tradeSparkline)" dot={false} isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className={styles.miniChartInfo}>
                  <span className={styles.chartVal}>0.00 <span className={styles.chartValSub}>Total Profit/Loss</span></span>
                  <span className={styles.chartPercent}>0.00 (0.00%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Additional Notes</h2>
            <textarea className={styles.textareaField} placeholder="Add your analysis, strategy, or notes about this trade..." />
            <div className={styles.textareaFooter}>0 / 500</div>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className={styles.rightColumn}>
          
          <div className={styles.card}>
            <h2 className={styles.cardTitle}><FileText size={16} color="#8B5CF6" /> Trade Summary</h2>
            <div className={styles.summaryList}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}><Box size={14} /> Symbol</span>
                <span className={styles.summaryValue}>-</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}><Calendar size={14} /> Expiry</span>
                <span className={styles.summaryValue}>-</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}><Briefcase size={14} /> Type</span>
                <span className={styles.summaryValue}>-</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}><HelpCircle size={14} /> Lots</span>
                <span className={styles.summaryValue}>2</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}><ArrowLeft style={{ transform: 'rotate(45deg)' }} size={14} /> Entry</span>
                <span className={styles.summaryValue}>-</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}><ArrowLeft style={{ transform: 'rotate(225deg)' }} size={14} /> Exit</span>
                <span className={styles.summaryValue}>-</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}><AlertTriangle size={14} /> Risk/Reward</span>
                <span className={styles.summaryValue}>-</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}><Zap size={16} color="#8B5CF6" /> Quick Stats</h2>
            <div className={styles.summaryList}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}><Box size={14} /> Risk (Entry - SL)</span>
                <span className={styles.summaryValueGreen}>0.00</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}><CheckCircle size={14} /> Reward (T1)</span>
                <span className={styles.summaryValueGreen}>0.00</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}><CheckCircle size={14} /> Reward (T2)</span>
                <span className={styles.summaryValueGreen}>0.00</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}><AlertTriangle size={14} /> RR Ratio (T1)</span>
                <span className={styles.summaryValueGreen}>0.00</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}><AlertTriangle size={14} /> RR Ratio (T2)</span>
                <span className={styles.summaryValueGreen}>0.00</span>
              </div>
            </div>
          </div>

          <div className={styles.proTipCard}>
            <Target size={120} className={styles.proTipIconBg} />
            <div className={styles.proTipHeader}>
              <HelpCircle size={16} /> Pro Tip
            </div>
            <p className={styles.proTipText}>
              Well planned trades with defined SL and targets increase your consistency.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
