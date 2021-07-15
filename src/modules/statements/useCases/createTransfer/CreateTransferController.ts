import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateTransferUseCase } from "./CreateTransferUseCase";

class CreateTransferController {
  async handle(request: Request, response: Response): Promise<Response> {
    const sender_id = request.user.id;
    const { receiver_id } = request.params;
    const { amount, description } = request.body;

    const createTransfer = container.resolve(CreateTransferUseCase);

    await createTransfer.execute({
      sender_id,
      receiver_id,
      amount,
      description
    });

    return response.status(201).send();
  }
}

export { CreateTransferController };
