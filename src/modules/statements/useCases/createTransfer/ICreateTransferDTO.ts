import { OperationType } from "../../entities/Statement";

interface ICreateTransferDTO {
  user_id: string;
  sender_id: string;
  amount: number;
  description: string;
  type: OperationType;
}

export { ICreateTransferDTO };
