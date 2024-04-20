import { Request, Response } from 'express';
import EmpresaModel from '../model/EmpresaModel';

const empresaModel = new EmpresaModel()

export default class EmpresaController {
    async getEmpresas(req: Request, res: Response){
        const empresas = await empresaModel.getEmpresas()
        return res.json(empresas)
    }

}
