// API utility functions for Django backend integration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();
    return {
      data,
      status: response.status,
      message: data.message,
    };
  }

  // Authentication
  async login(credentials: { username: string; password: string }) {
    return this.request<{ token: string; user: any }>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Smart Parking endpoints
  async getParkingLots() {
    return this.request<any[]>('/parking/lots/');
  }

  async getParkingAvailability(lotId: string) {
    return this.request<any>(`/parking/lots/${lotId}/availability/`);
  }

  // Traffic endpoints
  async getTrafficData() {
    return this.request<any[]>('/traffic/current/');
  }

  async getTrafficIncidents() {
    return this.request<any[]>('/traffic/incidents/');
  }

  // Public Transport endpoints
  async getBusRoutes() {
    return this.request<any[]>('/transport/bus-routes/');
  }

  async getBusArrivals(stopId: string) {
    return this.request<any[]>(`/transport/bus-stops/${stopId}/arrivals/`);
  }

  // Waste Management endpoints
  async getWasteBins() {
    return this.request<any[]>('/waste/bins/');
  }

  async getWasteCollectionSchedule() {
    return this.request<any[]>('/waste/collection-schedule/');
  }

  // Energy endpoints
  async getEnergyConsumption() {
    return this.request<any[]>('/energy/consumption/');
  }

  async getBuildingEnergyData(buildingId: string) {
    return this.request<any>(`/energy/buildings/${buildingId}/`);
  }

  // Water endpoints
  async getWaterQuality() {
    return this.request<any[]>('/water/quality/');
  }

  async getWaterSupplyStatus() {
    return this.request<any>('/water/supply-status/');
  }

  // Emergency Services endpoints
  async getEmergencyServices() {
    return this.request<any[]>('/emergency/services/');
  }

  async reportEmergency(emergency: any) {
    return this.request<any>('/emergency/report/', {
      method: 'POST',
      body: JSON.stringify(emergency),
    });
  }

  // Crime endpoints
  async getCrimeData() {
    return this.request<any[]>('/crime/incidents/');
  }

  async getCrimeHeatmap() {
    return this.request<any>('/crime/heatmap/');
  }

  // Citizen Reports endpoints
  async getCitizenReports() {
    return this.request<any[]>('/reports/');
  }

  async submitCitizenReport(report: any) {
    return this.request<any>('/reports/', {
      method: 'POST',
      body: JSON.stringify(report),
    });
  }

  // Tree Tracker endpoints
  async getTreeData() {
    return this.request<any[]>('/trees/');
  }

  async addTree(tree: any) {
    return this.request<any>('/trees/', {
      method: 'POST',
      body: JSON.stringify(tree),
    });
  }

  // Alerts endpoints
  async getAlerts() {
    return this.request<any[]>('/alerts/');
  }

  async markAlertAsRead(alertId: string) {
    return this.request<any>(`/alerts/${alertId}/read/`, {
      method: 'PATCH',
    });
  }

  // Budget endpoints
  async getBudgetData() {
    return this.request<any>('/budget/');
  }

  async getDepartmentBudgets() {
    return this.request<any[]>('/budget/departments/');
  }

  // Business endpoints
  async getBusinesses() {
    return this.request<any[]>('/businesses/');
  }

  async getBusinessById(businessId: string) {
    return this.request<any>(`/businesses/${businessId}/`);
  }

  // AI Assistant endpoints
  async sendChatMessage(message: string) {
    return this.request<{ response: string }>('/ai-assistant/chat/', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);