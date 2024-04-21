import { Router } from "express";
import EmpresaController from "../controller/EmpresaController";

const routes = Router();
const empresaController = new EmpresaController();

routes.get('/', empresaController.getEmpresas);
routes.get('/:razao_social', empresaController.getEmpresaByNome);
routes.post('/', empresaController.createEmpresa);
routes.put('/:razao_social', empresaController.updateEmpresa);
routes.delete('/:razao_social', empresaController.deleteEmpresa);

export default routes;