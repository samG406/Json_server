"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_server_1 = __importDefault(require("json-server"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// No client API imports needed; only filtered endpoint is exposed
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
    console.log(`🔍 Filtered data: http://localhost:${PORT}/api/salesData/filtered`);
});
