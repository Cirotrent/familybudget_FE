export interface TransactionRequest {
  amount: number;
  description: string;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  familyId: number;
  categoryId: number;
}

export interface TransactionResponse {
  id: number;
  amount: number;
  description: string;
  type: 'INCOME' | 'EXPENSE';
  date: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface DashboardFilterRequest {
  startDate?: string;
  endDate?: string;
  type?: string;
  categoryId?: number;
  familyId?: number;
}