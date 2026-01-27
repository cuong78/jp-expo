// [HOMEPAGE]-------------------------------------------------------------------------------------------
export interface ReportList {
    id: string;
    name: string;
}

// [SIDEBAR]--------------------------------------------------------------------------------------------
export interface InventoryDataItem {
    name: string;
    value: string;
    unit: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    icon: any; // Lucide icon component
    symbol?: string; // Yahoo Finance symbol
}

export interface Commodity {
    name: string;
    price: string;
    change1w: string;
    change1m: string;
    change1y: string;
    volatility: string;
}

export interface ChartData {
    name: string;
    value: number;
    status?: "HOLD" | "SELL";
}

export interface NewsItem {
    id: number | string;
    title: string;
    summary: string;
    timeLabel?: string;
    source?: string;
    url?: string;
    imageUrl?: string;
    author?: string | null;
    publishedAt?: string;
    fullContent?: string;
}

// [DASHBOARD]------------------------------------------------------------------------------------------
// [DASHBOARD] - AssetData
export interface AssetSparkPoint {
    value: number;
}

export interface AssetData {
    name: string;
    change: string; // e.g. '+2,8%'
    valueColor: string; // Tailwind class, e.g. 'text-emerald-500'
    lineColor: string; // Hex color, e.g. '#10b981'
    data: AssetSparkPoint[]; // sparkline points
    symbol?: string; // Yahoo Finance symbol
}

// [DASHBOARD] - PDchartData
export interface PDChartPoint {
    month: string; // 'Jan', 'Feb', ... (legacy)
    date?: string; // ISO date string for new data format
    oil: number;
    gas: number;
    wind: number;
    solar: number;
}

// New energy data point type for the fake data
export interface EnergyDataPoint {
    date: string; // ISO date string YYYY-MM-DD
    type: 'actual' | 'predicted';
    oil: number;
    gas: number;
    wind: number;
    solar: number;
}

// [DASHBOARD] - Summary table rows
export interface SummaryRow {
    asset: string; // e.g. 'Crude Oil (WTI)'
    avgPrice: string; // e.g. '$80.56'
    change: string; // e.g. '+12.18%'
    changeColor: string; // Tailwind class, e.g. 'text-teal-500'
    vol: string; // e.g. '22.34%'
    last: string; // e.g. '$79.85'
}

// [DASHBOARD] - Forecast data (OHLC + volume)
export interface ForecastPoint {
    time: string; // e.g. '10:00'
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

// [REPORTS]--------------------------------------------------------------------------------------------
// [REPORTS]
export interface ReportRow {
    id: string;
    name: string;
    asset: string;
    model: string;
    runDate: string;
    runTime: string;
    horizon: string;
    timeframe: string;
    mae: number;
    mape: string;
    rmse: number;
    status: "Generated" | "Archived" | "Failed";
}

// [NEWS]-----------------------------------------------------------------------------------------------
// [NEWS] -
export interface NewsArticle {
    id: string;
    asset: string;
    headline: string;
    impactDescription: string;
    trend: "Bullish" | "Bearish" | "Stable";
    timeLabel: string;
    imageUrl: string;
    mediaType: "image" | "video";
    duration?: string;
    tags: string[];
}

// [NEWS] -
export interface RelatedArticle extends NewsArticle {}

// [NEWS] -
export interface SentimentFactor {
    id: string;
    factor: string;
    influenceScore: number;
    color: string; // tailwind bg class
    volatilityHistory: number[];
}

// [NEWS] -
export interface UpcomingEvent {
    id: string;
    title: string;
    date: string; // e.g., 'Tue 13'
    type: "policy" | "forecast" | "storage";
    color: string; // tailwind classes
    width: string; // e.g., 'w-[18%]'
    offset: string; // e.g., 'left-[2%]'
}

// [NEWS API] - Response types from NewsAPI.org
export interface NewsAPIArticle {
    title: string;
    description: string;
    url: string;
    image_url: string;
    published_at: string;
    source: string;
    author: string | null;
    content_preview: string;
    full_content: string;
}

// [NEWS] -
export interface NewsResponse {
    status: string;
    timestamp: string;
    total_results: number;
    total_articles: number;
    current_page: number;
    total_pages: number;
    articles: NewsAPIArticle[];
}
