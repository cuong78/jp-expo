// Generate fake data from 2020-01-01 to current date + 1 year prediction
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateFakeData() {
    const startDate = new Date('2020-01-01');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const endDate = new Date(today);
    endDate.setFullYear(endDate.getFullYear() + 1);
    
    const data = [];
    
    // Helper to generate volatile values with trend
    function generateValue(baseValue, dayIndex, volatility = 0.15) {
        const trend = Math.sin(dayIndex / 30) * 10; // Monthly cycle
        const noise = (Math.random() - 0.5) * baseValue * volatility;
        const seasonal = Math.sin(dayIndex / 365 * Math.PI * 2) * 15; // Yearly seasonality
        return Math.max(10, baseValue + trend + noise + seasonal);
    }
    
    let currentDate = new Date(startDate);
    let dayIndex = 0;
    
    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const isActual = currentDate <= today;
        
        data.push({
            date: dateStr,
            type: isActual ? 'actual' : 'predicted',
            oil: Math.round(generateValue(85, dayIndex, 0.18) * 100) / 100,
            gas: Math.round(generateValue(45, dayIndex + 50, 0.22) * 100) / 100,
            wind: Math.round(generateValue(35, dayIndex + 100, 0.20) * 100) / 100,
            solar: Math.round(generateValue(55, dayIndex + 150, 0.25) * 100) / 100
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
        dayIndex++;
    }
    
    return data;
}

// Generate and save data
const data = generateFakeData();
const outputPath = path.join(__dirname, '../public/data/fakeData.json');

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log(`✅ Generated ${data.length} data points from 2020-01-01 to ${data[data.length - 1].date}`);
console.log(`📊 Actual data points: ${data.filter(d => d.type === 'actual').length}`);
console.log(`🔮 Predicted data points: ${data.filter(d => d.type === 'predicted').length}`);

