import jsonServer from 'json-server';
import cors from 'cors';
import path from 'path';
// No client API imports needed; only filtered endpoint is exposed

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Enable CORS for all routes
server.use(cors({
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
      data = data.filter((item: any) => item["Total Amount"] >= Number(minAmount));
    }
    
    if (maxAmount) {
      data = data.filter((item: any) => item["Total Amount"] <= Number(maxAmount));
    }
    
    if (startDate) {
      data = data.filter((item: any) => new Date(item.Date) >= new Date(startDate as string));
    }
    
    if (endDate) {
      data = data.filter((item: any) => new Date(item.Date) <= new Date(endDate as string));
    }
    
    if (category) {
      data = data.filter((item: any) => item["Product Category"] === category);
    }
    
    res.json(data);
  } catch (error) {
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
