import jsonServer from 'json-server';
import cors from 'cors';
import path from 'path';
import { 
  fetchLineChartData, 
  fetchBarChartData, 
  fetchPieChartData, 
  fetchAgeDistributionData,
  fetchFilteredData 
} from './client-api';

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

// Add custom routes before JSON Server router
server.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'JSON Server is running!' });
});

// Chart data endpoints using your existing functions
server.get('/api/charts/line', async (req, res) => {
  try {
    const data = await fetchLineChartData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching line chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.get('/api/charts/bar', async (req, res) => {
  try {
    const data = await fetchBarChartData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.get('/api/charts/pie', async (req, res) => {
  try {
    const data = await fetchPieChartData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.get('/api/charts/age-distribution', async (req, res) => {
  try {
    const data = await fetchAgeDistributionData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching age distribution data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Filtered data endpoint using your existing function
server.get('/api/salesData/filtered', async (req, res) => {
  try {
    const filters = {
      minAmount: req.query.minAmount as string,
      maxAmount: req.query.maxAmount as string,
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
      category: req.query.category as string
    };
    
    const data = await fetchFilteredData(filters);
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
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📈 Chart endpoints:`);
  console.log(`   • Line chart: http://localhost:${PORT}/api/charts/line`);
  console.log(`   • Bar chart: http://localhost:${PORT}/api/charts/bar`);
  console.log(`   • Pie chart: http://localhost:${PORT}/api/charts/pie`);
  console.log(`   • Age distribution: http://localhost:${PORT}/api/charts/age-distribution`);
  console.log(`🔍 Filtered data: http://localhost:${PORT}/api/salesData/filtered`);
});
