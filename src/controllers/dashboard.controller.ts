import { Request, Response } from 'express';
import { records } from '../db';

export const getDashboardSummary = async (req: Request, res: Response) => {
  let totalIncome = 0;
  let totalExpense = 0;
  
  const categoryMap: Record<string, { type: string, total: number }> = {};

  records.forEach(r => {
    if (r.type === 'INCOME') totalIncome += r.amount;
    if (r.type === 'EXPENSE') totalExpense += r.amount;
    
    const catKey = `${r.category}_${r.type}`;
    if (!categoryMap[catKey]) {
      categoryMap[catKey] = { type: r.type, total: 0 };
    }
    categoryMap[catKey].total += r.amount;
  });

  const netBalance = totalIncome - totalExpense;

  const categoryWiseTotals = Object.entries(categoryMap).map(([key, val]) => ({
    category: key.split('_')[0],
    type: val.type,
    total: val.total,
  }));

  const recentRecords = [...records].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

  res.json({
    summary: {
      totalIncome,
      totalExpense,
      netBalance,
    },
    categoryWiseTotals,
    recentRecords,
  });
};
