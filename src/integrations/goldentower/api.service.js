import config from "../../config/env.js";
import logger from "../../utils/logger.js";

class GoldenTowerApiService {
  constructor() {
    this.baseUrl = config.goldenTower.apiUrl.replace(/\/$/, "");
  }

  async request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {})
    };

    if (config.goldenTower.apiToken) {
      headers.Authorization = `Bearer ${config.goldenTower.apiToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    const text = await response.text();

    let data;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!response.ok) {
      logger.error(
        {
          status: response.status,
          url
        },
        "Golden Tower API request failed"
      );

      throw new Error(
        `Golden Tower API error: ${response.status}`
      );
    }

    return data;
  }

  async getProducts() {
    const response = await this.request("/products");

    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.products)) {
      return response.products;
    }

    return [];
  }

  async getProductById(productId) {
    if (!productId) {
      return null;
    }

    try {
      const response = await this.request(
        `/products/${productId}`
      );

      return response?.data || response;
    } catch (error) {
      logger.error(
        {
          productId,
          error: error.message
        },
        "Failed to get product"
      );

      return null;
    }
  }
}

const goldenTowerApi = new GoldenTowerApiService();

export default goldenTowerApi;