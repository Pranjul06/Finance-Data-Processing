export type User = {
  id: string;
  username: string;
  role: 'VIEWER' | 'ANALYST' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
};

export type FinancialRecord = {
  id: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  date: Date;
  notes?: string;
  createdByUserId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const users: User[] = [
  {
    id: 'admin-1',
    username: 'admin',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export const records: FinancialRecord[] = [];
