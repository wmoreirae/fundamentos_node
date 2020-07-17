import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const responseObject = {
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance(),
    };

    return response.json(responseObject);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    const { title, value, type } = request.body;

    const parsedValue = Number(value);

    if (!['income', 'outcome'].includes(type)) {
      throw Error('|The provided type of transaction is invalid');
    }

    const transaction = createTransactionService.execute({
      title,
      value: parsedValue,
      type,
    });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
