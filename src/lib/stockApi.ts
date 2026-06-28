export interface StockData {
  symbol: string;
  exchange: string;
  ticker: string;
  company_name: string;
  last_price: number;
  change: number;
  percent_change: number;
  volume: number;
  market_cap: number;
  pe_ratio: number;
  sector: string;
}

export interface StockListResponse {
  status: string;
  response_format: string;
  count: number;
  stocks: StockData[];
  timestamp: string;
}

export interface SearchResult {
  symbol: string;
  company_name: string;
  match_type: string;
  source: string;
  api_url: string;
  nse_url?: string;
  bse_url?: string;
}

export interface SearchResponse {
  status: string;
  query: string;
  total_results: number;
  results: SearchResult[];
}

const API_BASE_URL = '/api/stock';

export async function searchStocks(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 2) return [];
  try {
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) return [];
    const data: SearchResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  }
}

/**
 * Fetches real-time stock data for multiple symbols.
 * Handles timeouts and gracefully returns null if the API fails.
 */
export async function fetchStocksData(symbols: string[]): Promise<StockData[] | null> {
  if (!symbols || symbols.length === 0) return null;

  const symbolString = symbols.join(',');
  const url = `${API_BASE_URL}/list?symbols=${symbolString}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    try {
      controller.abort();
    } catch (e) {
      // Ignore abort errors
    }
  }, 8000); // 8s timeout

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: StockListResponse = await response.json();
    
    if (data.status === 'success' && data.stocks) {
      return data.stocks;
    }
    return null;
  } catch (error) {
    console.warn('Failed to fetch stock data (API might be offline):', error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
