import axios from "axios";
import { AdmissionFormData, Admission, ApiResponse } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const admissionService = {
  createAdmission: async (
    formData: AdmissionFormData
  ): Promise<ApiResponse<Admission>> => {
    try {
      const response = await api.post<ApiResponse<Admission>>(
        "/admissions",
        formData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ApiResponse<Admission>;
      }
      throw error;
    }
  },

  getAllAdmissions: async (): Promise<ApiResponse<Admission[]>> => {
    try {
      const response = await api.get<ApiResponse<Admission[]>>("/admissions");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ApiResponse<Admission[]>;
      }
      throw error;
    }
  },

  getAdmissionById: async (id: string): Promise<ApiResponse<Admission>> => {
    try {
      const response = await api.get<ApiResponse<Admission>>(
        `/admissions/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ApiResponse<Admission>;
      }
      throw error;
    }
  },

  updateAdmission: async (
    id: string,
    formData: Partial<AdmissionFormData>
  ): Promise<ApiResponse<Admission>> => {
    try {
      const response = await api.put<ApiResponse<Admission>>(
        `/admissions/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ApiResponse<Admission>;
      }
      throw error;
    }
  },

  deleteAdmission: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await api.delete<ApiResponse<null>>(`/admissions/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ApiResponse<null>;
      }
      throw error;
    }
  },
};
