import { Router } from "express";
import SetorController from "../controller/SetorController";

const routes = Router();

const setorController = new SetorController();

routes.get('/', setorController.getSetores);
routes.get('/:id', setorController.getSetorById);
routes.post('/', setorController.createSetor);
routes.put('/:id', setorController.updateSetor);
routes.delete('/:id', setorController.deleteSetor);

export default routes;