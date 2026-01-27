// Test script for Yahoo Finance API symbols
// Run: node scripts/testYahooFinanceSymbols.js

const axios = require('axios');

const RAPIDAPI_KEY = 'c6ac350c05msh94f749b60978ccdp144b1djsn7e07750b33e8';
const RAPIDAPI_HOST = 'yahoo-finance15.p.rapidapi.com';
const BASE_URL = `https://${RAPIDAPI_HOST}/api/v2/markets/stock/history`;

// Symbols to test
const SYMBOLS_TO_TEST = {
    'Oil & Energy': ['CL=F', 'USO', 'XOM', 'CVX', 'XLE'],
    'USD Index': ['DX-Y.NYB', 'UUP', 'USDU'],
    'Treasury': ['^TNX', 'TLT', 'IEF'],
    'Natural Gas': ['NG=F', 'UNG'],
};

async function testSymbol(symbol) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                symbol,
                interval: '1d',
                limit: '2'
            },
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            },
            timeout: 10000
        });

        if (response.data && response.data.body && response.data.body.length > 0) {
            const latestData = response.data.body[0];
            return {
                success: true,
                symbol,
                price: latestData.close || latestData.adjclose || 0,
                dataPoints: response.data.body.length,
                currency: response.data.currency || 'USD'
            };
        }

        return {
            success: false,
            symbol,
            error: 'No data returned'
        };
    } catch (error) {
        return {
            success: false,
            symbol,
            error: error.response?.data?.message || error.message
        };
    }
}

async function testAllSymbols() {
    console.log('🧪 Testing Yahoo Finance API Symbols...\n');
    console.log('='.repeat(60));
    
    const results = {};

    for (const [category, symbols] of Object.entries(SYMBOLS_TO_TEST)) {
        console.log(`\n📊 Category: ${category}`);
        console.log('-'.repeat(60));
        
        results[category] = [];

        for (const symbol of symbols) {
            process.stdout.write(`Testing ${symbol}...`);
            const result = await testSymbol(symbol);
            
            if (result.success) {
                console.log(` ✅ SUCCESS - Price: ${result.currency} ${result.price.toFixed(2)}`);
                results[category].push({ symbol, status: '✅', price: result.price });
            } else {
                console.log(` ❌ FAILED - ${result.error}`);
                results[category].push({ symbol, status: '❌', error: result.error });
            }

            // Wait 1 second between requests to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 SUMMARY');
    console.log('='.repeat(60));

    for (const [category, symbolResults] of Object.entries(results)) {
        console.log(`\n${category}:`);
        const workingSymbols = symbolResults.filter(r => r.status === '✅');
        const failedSymbols = symbolResults.filter(r => r.status === '❌');
        
        if (workingSymbols.length > 0) {
            console.log('  ✅ Working:', workingSymbols.map(r => r.symbol).join(', '));
        }
        if (failedSymbols.length > 0) {
            console.log('  ❌ Failed:', failedSymbols.map(r => r.symbol).join(', '));
        }
    }

    // Recommendations
    console.log('\n' + '='.repeat(60));
    console.log('💡 RECOMMENDED SYMBOLS FOR SIDEBAR:');
    console.log('='.repeat(60));
    
    const recommendations = {};
    for (const [category, symbolResults] of Object.entries(results)) {
        const working = symbolResults.filter(r => r.status === '✅');
        if (working.length > 0) {
            recommendations[category] = working[0].symbol;
        }
    }

    console.log('\nUpdate your src/constants/index.ts with:');
    console.log('\nexport const INVENTORY_DATA = [');
    if (recommendations['Oil & Energy']) {
        console.log(`    { name: "OPEC Prod.", symbol: "${recommendations['Oil & Energy']}", ... },`);
    }
    if (recommendations['Oil & Energy']) {
        console.log(`    { name: "EIA Stock", symbol: "${recommendations['Oil & Energy']}", ... },`);
    }
    if (recommendations['USD Index']) {
        console.log(`    { name: "USD Index", symbol: "${recommendations['USD Index']}", ... },`);
    }
    if (recommendations['Treasury']) {
        console.log(`    { name: "Fed Rates", symbol: "${recommendations['Treasury']}", ... },`);
    }
    console.log('];\n');
}

// Run the test
testAllSymbols()
    .then(() => {
        console.log('✅ Test completed!');
        process.exit(0);
    })
    .catch(error => {
        console.error('❌ Test failed:', error);
        process.exit(1);
    });


