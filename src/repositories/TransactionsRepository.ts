import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return [...this.transactions];
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(
      e => e.type === 'income',
    );
    const outcomeTrasactions = this.transactions.filter(
      e => e.type === 'outcome',
    );

    const sumTransaction = (previous: number, current: Transaction): number =>
      previous + current.value;

    const income = incomeTransactions.reduce(sumTransaction, 0);
    const outcome = outcomeTrasactions.reduce(sumTransaction, 0);
    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const id = uuid();
    const transaction: Transaction = {
      id,
      title,
      type,
      value,
    };
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
