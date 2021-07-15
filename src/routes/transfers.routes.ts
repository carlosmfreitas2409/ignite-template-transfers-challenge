import { Router } from "express";
import { CreateTransferController } from "../modules/statements/useCases/createTransfer/CreateTransferController";

import { ensureAuthenticated } from "../shared/infra/http/middlwares/ensureAuthenticated";

const transferRouter = Router();

const createTransferController = new CreateTransferController();

transferRouter.post('/:receiver_id', ensureAuthenticated, createTransferController.handle);

export { transferRouter };
