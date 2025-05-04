export interface AdmissionFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredTime: string;
}

export interface Admission extends AdmissionFormData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
}
