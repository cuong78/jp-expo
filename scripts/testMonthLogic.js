// Test script to verify Month filter logic
const fs = require('fs');

// Load data
const energyData = JSON.parse(fs.readFileSync('./public/data/fakeData.json', 'utf8'));

// Find current date (latest 'actual' date)
const actualData = energyData.filter(d => d.type === 'actual');
const latestActual = actualData[actualData.length - 1];
const currentDate = new Date(latestActual.date);

console.log('='.repeat(80));
console.log('MONTH FILTER LOGIC TEST');
console.log('='.repeat(80));
console.log(`\nCurrent Date (now) from data: ${currentDate.toISOString().split('T')[0]}`);
console.log(`Total actual records: ${actualData.length}`);
console.log(`Total predicted records: ${energyData.length - actualData.length}`);

// Simulate Month filter logic
const today = new Date(currentDate);
today.setHours(0, 0, 0, 0);

// Calculate range
const monthStartDate = new Date(today);
monthStartDate.setDate(monthStartDate.getDate() - 30); // ~1 month before
const monthEndDate = new Date(today);
monthEndDate.setDate(monthEndDate.getDate() + 30); // ~1 month after

console.log(`\nMonth range: ${monthStartDate.toISOString().split('T')[0]} to ${monthEndDate.toISOString().split('T')[0]}`);

// Generate weekly points
const weekPoints = [];

// Go backwards from current date
let currentPoint = new Date(today);
while (currentPoint >= monthStartDate) {
    weekPoints.unshift(new Date(currentPoint));
    currentPoint.setDate(currentPoint.getDate() - 7);
}

// Go forward from current date
currentPoint = new Date(today);
currentPoint.setDate(currentPoint.getDate() + 7);
while (currentPoint <= monthEndDate) {
    weekPoints.push(new Date(currentPoint));
    currentPoint.setDate(currentPoint.getDate() + 7);
}

console.log(`\nGenerated ${weekPoints.length} weekly points:`);
console.log('-'.repeat(80));

weekPoints.forEach((point, index) => {
    const isCurrentWeek = point.getTime() === today.getTime();
    const marker = isCurrentWeek ? ' ← NOW' : '';
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][point.getDay()];
    
    // Check if this point has data
    const windowStart = new Date(point);
    windowStart.setDate(windowStart.getDate() - 3);
    const windowEnd = new Date(point);
    windowEnd.setDate(windowEnd.getDate() + 3);
    
    const dataInWindow = energyData.filter(d => {
        const date = new Date(d.date);
        return date >= windowStart && date <= windowEnd;
    });
    
    const actualCount = dataInWindow.filter(d => d.type === 'actual').length;
    const predictedCount = dataInWindow.filter(d => d.type === 'predicted').length;
    
    console.log(`${String(index + 1).padStart(2, ' ')}. ${point.toISOString().split('T')[0]} (${dayOfWeek}) - Data: ${actualCount} actual, ${predictedCount} predicted${marker}`);
});

console.log('\n' + '='.repeat(80));
console.log('TEST COMPLETED');
console.log('='.repeat(80));

// Verify spacing between points
console.log('\nVerifying 7-day spacing:');
for (let i = 1; i < weekPoints.length; i++) {
    const diff = (weekPoints[i] - weekPoints[i-1]) / (1000 * 60 * 60 * 24);
    const isCorrect = diff === 7 ? '✓' : '✗';
    console.log(`  ${isCorrect} Point ${i} to ${i+1}: ${diff} days`);
}

