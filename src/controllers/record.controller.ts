import { Request, Response } from 'express';
import { records, FinancialRecord } from '../db';
import { randomUUID } from 'crypto';

export const createRecord = async (req: Request, res: Response) => {
  const { amount, type, category, date, notes } = req.body;

  const newRecord: FinancialRecord = {
    id: randomUUID(),
    amount,
    type,
    category,
    date: new Date(date),
    notes,
    createdByUserId: (req as any).user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  records.push(newRecord);
  res.status(201).json({ record: newRecord });
};

export const listRecords = async (req: Request, res: Response) => {
  const { type, category, startDate, endDate } = req.query;

  let filtered = records;

  if (type) {
    filtered = filtered.filter(r => r.type === type);
  }
  if (category) {
    filtered = filtered.filter(r => r.category === category);
  }
  if (startDate) {
    filtered = filtered.filter(r => r.date >= new Date(startDate as string));
  }
  if (endDate) {
    filtered = filtered.filter(r => r.date <= new Date(endDate as string));
  }

  // sort desc by date
  filtered.sort((a, b) => b.date.getTime() - a.date.getTime());

  res.json({ records: filtered });
};

export const getRecord = async (req: Request, res: Response) => {
  const { id } = req.params;

  const record = records.find(r => r.id === id);

  if (!record) {
    return res.status(404).json({ error: 'Record not found' });
  }

  res.json({ record });
};

export const updateRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, type, category, date, notes } = req.body;

  const record = records.find(r => r.id === id);
  if (!record) {
    return res.status(404).json({ error: 'Record not found' });
  }

  if (amount !== undefined) record.amount = amount;
  if (type !== undefined) record.type = type;
  if (category !== undefined) record.category = category;
  if (date !== undefined) record.date = new Date(date);
  if (notes !== undefined) record.notes = notes;
  record.updatedAt = new Date();

  res.json({ record });
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params;

  const index = records.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Record not found' });
  }

  records.splice(index, 1);
  res.json({ message: 'Record deleted' });
};
