import { Request, Response } from 'express';
import EmpresaModel from '../model/EmpresaModel';

const empresaModel = new EmpresaModel()

export default class EmpresaController {
    async getEmpresas(req: Request, res: Response){
        const empresas = await empresaModel.getEmpresas()
        return res.json(empresas)
    }

    async getEmpresaByNome(req: Request, res: Response){
        const razao_social = req.params.razao_social
        const empresa = await empresaModel.getEmpresaByNome(razao_social)
        return res.json(empresa)
    }

    async createEmpresa(req: Request, res: Response){
        const { razao_social, cnpj, nome_fantasia } = req.body
        const empresa = await empresaModel.createEmpresa(razao_social, cnpj, nome_fantasia)
        return res.json(empresa)
    }

    async updateEmpresa(req: Request, res: Response){
        const razao_social = req.params.razao_social
        const { cnpj, nome_fantasia } = req.body
        const empresa = await empresaModel.updateEmpresa(razao_social, cnpj, nome_fantasia)
        return res.json(empresa)
    }

    async deleteEmpresa(req: Request, res: Response){
        const razao_social = req.params.razao_social
        const empresa = await empresaModel.deleteEmpresa(razao_social)
        return res.json(empresa)
    }

}
