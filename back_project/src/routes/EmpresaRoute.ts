import { Router } from "express";
import EmpresaController from "../controller/EmpresaController";

const routes = Router();
const empresaController = new EmpresaController();

routes.get('/', empresaController.getEmpresas);

export default routes;