import { NextRequest, NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ status: 'error', message: 'No query provided' }, { status: 400 });
    }

    // Use yahooFinance search. It searches globally, but we can filter or let the user see matches.
    const searchResults: any = await yahooFinance.search(query);

    // Map to our SearchResult interface
    // Only return Equities to avoid returning random news articles or irrelevant indices,
    // though we might want indices. We'll filter for quotes.
    const quotes = searchResults.quotes || [];

    const mappedResults = quotes.map((q: any) => {
      return {
        symbol: q.symbol,
        company_name: q.shortname || q.longname || q.symbol,
        match_type: 'fuzzy',
        source: 'yahoo',
        api_url: `/api/stock/list?symbols=${q.symbol}`
      };
    });

    return NextResponse.json({
      status: 'success',
      query: query,
      total_results: mappedResults.length,
      results: mappedResults
    });

  } catch (error) {
    console.error('API /stock/search Error:', error);
    return NextResponse.json({ status: 'error', message: 'Search failed' }, { status: 500 });
  }
}
