"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFilteredData = exports.fetchAgeDistributionData = exports.fetchPieChartData = exports.fetchBarChartData = exports.fetchLineChartData = exports.fetchAllSalesData = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
// Fetch all sales data
const fetchAllSalesData = async () => {
    try {
        const response = await axios_1.default.get(`${BASE_URL}/salesData`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching sales data:', error);
        throw error;
    }
};
exports.fetchAllSalesData = fetchAllSalesData;
// Line Chart API - Sales over time
const fetchLineChartData = async () => {
    try {
        const response = await axios_1.default.get(`${BASE_URL}/salesData`);
        const data = response.data;
        // Group data by date and sum total amounts
        const groupedData = data.reduce((acc, item) => {
            const date = item.Date;
            if (!acc[date]) {
                acc[date] = { date, totalAmount: 0, transactionCount: 0 };
            }
            acc[date].totalAmount += item["Total Amount"];
            acc[date].transactionCount += 1;
            return acc;
        }, {});
        // Convert to array and sort by date
        return Object.values(groupedData).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    catch (error) {
        console.error('Error fetching line chart data:', error);
        throw error;
    }
};
exports.fetchLineChartData = fetchLineChartData;
// Bar Chart API - Sales by Product Category
const fetchBarChartData = async () => {
    try {
        const response = await axios_1.default.get(`${BASE_URL}/salesData`);
        const data = response.data;
        // Group data by product category
        const categoryData = data.reduce((acc, item) => {
            const category = item["Product Category"];
            if (!acc[category]) {
                acc[category] = { category, totalAmount: 0, quantity: 0 };
            }
            acc[category].totalAmount += item["Total Amount"];
            acc[category].quantity += item.Quantity;
            return acc;
        }, {});
        return Object.values(categoryData);
    }
    catch (error) {
        console.error('Error fetching bar chart data:', error);
        throw error;
    }
};
exports.fetchBarChartData = fetchBarChartData;
// Pie Chart API - Sales by Gender
const fetchPieChartData = async () => {
    try {
        const response = await axios_1.default.get(`${BASE_URL}/salesData`);
        const data = response.data;
        // Group data by gender
        const genderData = data.reduce((acc, item) => {
            const gender = item.Gender;
            if (!acc[gender]) {
                acc[gender] = { name: gender, value: 0, count: 0 };
            }
            acc[gender].value += item["Total Amount"];
            acc[gender].count += 1;
            return acc;
        }, {});
        return Object.values(genderData);
    }
    catch (error) {
        console.error('Error fetching pie chart data:', error);
        throw error;
    }
};
exports.fetchPieChartData = fetchPieChartData;
// Age Distribution API - for additional charts
const fetchAgeDistributionData = async () => {
    try {
        const response = await axios_1.default.get(`${BASE_URL}/salesData`);
        const data = response.data;
        // Create age groups
        const ageGroups = {
            '18-25': { ageGroup: '18-25', count: 0, totalAmount: 0 },
            '26-35': { ageGroup: '26-35', count: 0, totalAmount: 0 },
            '36-45': { ageGroup: '36-45', count: 0, totalAmount: 0 },
            '46-55': { ageGroup: '46-55', count: 0, totalAmount: 0 },
            '56+': { ageGroup: '56+', count: 0, totalAmount: 0 }
        };
        data.forEach((item) => {
            const age = item.Age;
            let group;
            if (age >= 18 && age <= 25)
                group = '18-25';
            else if (age >= 26 && age <= 35)
                group = '26-35';
            else if (age >= 36 && age <= 45)
                group = '36-45';
            else if (age >= 46 && age <= 55)
                group = '46-55';
            else
                group = '56+';
            ageGroups[group].count += 1;
            ageGroups[group].totalAmount += item["Total Amount"];
        });
        return Object.values(ageGroups);
    }
    catch (error) {
        console.error('Error fetching age distribution data:', error);
        throw error;
    }
};
exports.fetchAgeDistributionData = fetchAgeDistributionData;
// Filtered data function
const fetchFilteredData = async (filters) => {
    try {
        const response = await axios_1.default.get(`${BASE_URL}/salesData`);
        let data = response.data;
        // Apply filters
        if (filters.minAmount) {
            data = data.filter(item => item["Total Amount"] >= Number(filters.minAmount));
        }
        if (filters.maxAmount) {
            data = data.filter(item => item["Total Amount"] <= Number(filters.maxAmount));
        }
        if (filters.startDate) {
            data = data.filter(item => new Date(item.Date) >= new Date(filters.startDate));
        }
        if (filters.endDate) {
            data = data.filter(item => new Date(item.Date) <= new Date(filters.endDate));
        }
        if (filters.category) {
            data = data.filter(item => item["Product Category"] === filters.category);
        }
        return data;
    }
    catch (error) {
        console.error('Error fetching filtered data:', error);
        throw error;
    }
};
exports.fetchFilteredData = fetchFilteredData;
