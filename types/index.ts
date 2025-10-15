// Sales Data Types
export interface SalesData {
    "Transaction ID": number;
    "Date": string;
    "Customer ID": string;
    "Gender": string;
    "Age": number;
    "Product Category": string;
    "Quantity": number;
    "Price per Unit": number;
    "Total Amount": number;
  }
  
  // Filter Types
  export interface FilterState {
    minAmount: string | number;
    maxAmount: string | number;
    startDate: string;
    endDate: string;
    category: string;
  }
  
  // Chart Data Types
  export interface LineChartData {
    date: string;
    totalAmount: number;
    transactionCount: number;
  }
  
  export interface BarChartData {
    category: string;
    totalAmount: number;
    quantity: number;
  }
  
  export interface PieChartData {
    name: string;
    value: number;
    count: number;
    [key: string]: string | number;
  }
  
  export interface AgeDistributionData {
    ageGroup: string;
    count: number;
    totalAmount: number;
  }
  
  // API Response Types
  export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
  }
  
  // Component Props Types
  export interface FilterPanelProps {
    onFiltersChange: (filters: FilterState) => void;
  }
  
  export interface ChartComponentProps {
    filters?: FilterState;
    data?: LineChartData[] | BarChartData[] | PieChartData[];
    loading?: boolean;
    error?: string | null;
  }
  
  // Chart Configuration Types
  export interface ChartConfig {
    width?: number;
    height?: number;
    margin?: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  }
  
  // Utility Types
  export type ChartType = 'line' | 'bar' | 'pie' | 'area';
  
  export type FilterKey = keyof FilterState;
  
  export type ProductCategory = 
    | 'Beauty' 
    | 'Clothing' 
    | 'Electronics' 
    | 'Home' 
    | 'Sports' 
    | 'Books' 
    | 'Toys';
  
  export type Gender = 'Male' | 'Female';
  
  // API Function Types
  export type FetchFunction<T> = () => Promise<T>;
  export type FilteredFetchFunction<T> = (filters: FilterState) => Promise<T>;
  