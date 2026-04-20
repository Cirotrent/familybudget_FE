export interface Category {
  id: number;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  familyId: number;
}