import { NextRequest, NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const symbolsParam = searchParams.get('symbols');

    if (!symbolsParam) {
      return NextResponse.json({ status: 'error', message: 'No symbols provided' }, { status: 400 });
    }

    const symbols = symbolsParam.split(',').map(s => s.trim()).filter(Boolean);
    
    if (symbols.length === 0) {
      return NextResponse.json({ status: 'success', stocks: [] });
    }

    // Fetch quotes for all symbols
    const quotes = await yahooFinance.quote(symbols);
    
    // Normalize to an array (quote() returns a single object if only one symbol is passed)
    const quotesArray = Array.isArray(quotes) ? quotes : [quotes];

    const stocks = quotesArray.map((q: any) => {
      return {
        symbol: q.symbol,
        exchange: q.exchange || 'NSE',
        ticker: q.symbol,
        company_name: q.longName || q.shortName || q.symbol,
        last_price: q.regularMarketPrice || 0,
        change: q.regularMarketChange || 0,
        percent_change: q.regularMarketChangePercent || 0,
        volume: q.regularMarketVolume || 0,
        market_cap: q.marketCap || 0,
        pe_ratio: q.trailingPE || 0,
        sector: q.sector || 'Unknown'
      };
    });

    return NextResponse.json({
      status: 'success',
      response_format: 'num',
      count: stocks.length,
      stocks: stocks,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API /stock/list Error:', error);
    return NextResponse.json({ status: 'error', message: 'Failed to fetch stock data' }, { status: 500 });
  }
}
