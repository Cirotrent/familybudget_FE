export interface TransactionRequest {
  amount: number;
  description: string;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  familyId: number;
}

export interface TransactionResponse {
  id: number;
  amount: number;
  description: string;
  type: 'INCOME' | 'EXPENSE';
  date: string;
}