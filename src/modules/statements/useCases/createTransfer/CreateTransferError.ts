import { AppError } from "../../../../shared/errors/AppError";

export namespace CreateTransferError {
  export class InsufficientFunds extends AppError {
    constructor() {
      super('Insufficient funds', 400);
    }
  }
}
