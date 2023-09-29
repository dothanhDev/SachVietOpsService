import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { User } from '../../models/UserModel/User';
class HttpCategoryController {
  private axiosInstance: AxiosInstance;

  constructor(axiosConfig: any) {
    // Create an Axios instance with the provided configuration
    this.axiosInstance = axios.create(axiosConfig);
    const token: any = localStorage.getItem('token');
    const jwtToken = JSON.parse(token);
    if (jwtToken) {
      this.axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${jwtToken}`;
    }

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          return (window.location.href = '/auth');
        }
        return Promise.reject(error);
      },
    );
  }
  async getOne(id: number): Promise<any> {
    try {
      const response = await this.axiosInstance.get(`/category/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async login(account: User) {
    try {
      const response = await this.axiosInstance.post('auth/login', account);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async register(account: User) {
    try {
      const response = await this.axiosInstance.post('auth/register', account);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(url: string) {
    try {
      const response = await this.axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default HttpCategoryController;