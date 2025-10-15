# JSON Server API

A RESTful API server built with JSON Server for sales data management.

## 🚀 Features

- **RESTful API** for sales data
- **CORS enabled** for cross-origin requests
- **Health check endpoint** for monitoring
- **TypeScript support** with comprehensive type definitions
- **Production ready** for deployment

## 📊 API Endpoints

### Data Endpoints
- `GET /salesData` - Get all sales data
- `GET /salesData/:id` - Get specific sales record
- `POST /salesData` - Create new sales record
- `PUT /salesData/:id` - Update sales record
- `DELETE /salesData/:id` - Delete sales record

### Utility Endpoints
- `GET /api/health` - Health check endpoint

## 🛠️ Development

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production Start
```bash
npm start
```

## 🌐 Deployment on Render.com

### Step 1: Prepare Your Repository
1. Push your code to GitHub/GitLab
2. Ensure all files are committed

### Step 2: Deploy on Render
1. Go to [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your repository
4. Configure the service:
   - **Name**: `json-api-server` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: `18` (or latest)

### Step 3: Environment Variables (Optional)
- `PORT`: Automatically set by Render
- `NODE_ENV`: Set to `production`

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Your API will be available at: `https://your-app-name.onrender.com`

## 📝 Usage Examples

### Fetch All Sales Data
```javascript
fetch('https://your-app-name.onrender.com/salesData')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Health Check
```javascript
fetch('https://your-app-name.onrender.com/api/health')
  .then(response => response.json())
  .then(data => console.log(data));
```

## 🔧 Configuration

### CORS
The server is configured to allow all origins. For production, consider restricting this:

```typescript
server.use(cors({
  origin: ['https://yourdomain.com'],
  credentials: true
}));
```

### Port
The server uses `process.env.PORT` (set by Render) or defaults to `3001`.

## 📁 Project Structure

```
├── src/
│   ├── app.ts          # Main server file
│   ├── client-api.ts   # Client-side API functions
│   └── data.json       # JSON database
├── types/
│   └── index.ts        # TypeScript type definitions
├── dist/               # Compiled JavaScript (generated)
├── package.json
├── ts.config.json
└── README.md
```

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**: Ensure all dependencies are in `package.json`
2. **Port issues**: Render automatically sets `PORT` environment variable
3. **CORS errors**: Check CORS configuration in `app.ts`
4. **Data not loading**: Verify `data.json` is in the correct location

### Logs
Check Render dashboard for deployment logs and runtime logs.

## 📄 License

MIT License

