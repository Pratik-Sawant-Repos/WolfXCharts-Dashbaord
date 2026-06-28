import yahooFinance from 'yahoo-finance2';

async function test() {
  try {
    const symbols = ['RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS', '^NSEI', '^NSEBANK'];
    const quotes = await yahooFinance.quote(symbols);
    console.log(quotes.map(q => q.symbol));
  } catch (error) {
    console.error("ERROR:", error);
  }
}

test();
