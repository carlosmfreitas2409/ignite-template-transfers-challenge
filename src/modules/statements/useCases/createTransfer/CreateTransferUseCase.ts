import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { OperationType } from "../../entities/Statement";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { CreateTransferError } from "./CreateTransferError";

interface IRequest {
  sender_id: string;
  receiver_id: string;
  amount: number;
  description: string;
}

@injectable()
class CreateTransferUseCase {
  constructor(
    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ sender_id, receiver_id, amount, description }: IRequest): Promise<void> {
    const checkSenderExists = this.usersRepository.findById(sender_id);

    if(!checkSenderExists) {
      throw new AppError('Sender user does not exists!');
    }

    const checkReceiverExists = this.usersRepository.findById(receiver_id);

    if(!checkReceiverExists) {
      throw new AppError('Receiver user does not exists!');
    }

    const { balance: sender_balance } = await this.statementsRepository.getUserBalance({ user_id: sender_id });

    if(sender_balance < amount) {
      throw new CreateTransferError.InsufficientFunds();
    }

    // Receiver statement
    await this.statementsRepository.createTransfer({
      amount,
      description,
      type: OperationType.TRANSFER,
      user_id: receiver_id,
      sender_id
    });

    // Sender statement
    await this.statementsRepository.create({
      amount,
      description,
      type: OperationType.WITHDRAW,
      user_id: sender_id
    });
  }
}

export { CreateTransferUseCase }
