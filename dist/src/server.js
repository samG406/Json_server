"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_server_1 = __importDefault(require("json-server"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const client_api_1 = require("./client-api");
const server = json_server_1.default.create();
const router = json_server_1.default.router(path_1.default.join(__dirname, 'db.json'));
const middlewares = json_server_1.default.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// Enable CORS for all routes
server.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
// Add custom routes before JSON Server router
server.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'JSON Server is running!' });
});
// Chart data endpoints using your existing functions
server.get('/api/charts/line', async (req, res) => {
    try {
        const data = await (0, client_api_1.fetchLineChartData)();
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching line chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
server.get('/api/charts/bar', async (req, res) => {
    try {
        const data = await (0, client_api_1.fetchBarChartData)();
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
server.get('/api/charts/pie', async (req, res) => {
    try {
        const data = await (0, client_api_1.fetchPieChartData)();
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
server.get('/api/charts/age-distribution', async (req, res) => {
    try {
        const data = await (0, client_api_1.fetchAgeDistributionData)();
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching age distribution data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Filtered data endpoint - server-side filtering
server.get('/api/salesData/filtered', async (req, res) => {
    try {
        // Get raw data from db.json
        const db = require('./db.json');
        let data = db.salesData;
        // Apply filters based on query parameters (same logic as fetchFilteredData)
        const { minAmount, maxAmount, startDate, endDate, category } = req.query;
        if (minAmount) {
            data = data.filter((item) => item["Total Amount"] >= Number(minAmount));
        }
        if (maxAmount) {
            data = data.filter((item) => item["Total Amount"] <= Number(maxAmount));
        }
        if (startDate) {
            data = data.filter((item) => new Date(item.Date) >= new Date(startDate));
        }
        if (endDate) {
            data = data.filter((item) => new Date(item.Date) <= new Date(endDate));
        }
        if (category) {
            data = data.filter((item) => item["Product Category"] === category);
        }
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching filtered data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Use default router
server.use(router);
// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`🚀 JSON Server is running on port ${PORT}`);
    console.log(`📊 Raw data available at: http://localhost:${PORT}/salesData`);
    console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📈 Chart endpoints:`);
    console.log(`   • Line chart: http://localhost:${PORT}/api/charts/line`);
    console.log(`   • Bar chart: http://localhost:${PORT}/api/charts/bar`);
    console.log(`   • Pie chart: http://localhost:${PORT}/api/charts/pie`);
    console.log(`   • Age distribution: http://localhost:${PORT}/api/charts/age-distribution`);
    console.log(`🔍 Filtered data: http://localhost:${PORT}/api/salesData/filtered`);
});
