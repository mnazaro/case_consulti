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
        const { razao_social, cnpj, nome_fantasia, setor_Ids } = req.body
        const empresa = await empresaModel.createEmpresa(razao_social, cnpj, nome_fantasia, setor_Ids)
        return res.json(empresa)
    }

    // Função para atualizar uma empresa: deve 
    async updateEmpresa(req: Request, res: Response){
        const id = parseInt(req.params.id)
        const { razao_social, cnpj, nome_fantasia, setor_Ids } = req.body
        const empresa = await empresaModel.updateEmpresa(id, razao_social, cnpj, nome_fantasia, setor_Ids)
        return res.json(empresa)
    }

    async deleteEmpresa(req: Request, res: Response){
        const id = parseInt(req.params.id)
        const empresa = await empresaModel.deleteEmpresa(id)
        return res.json(empresa)
    }

}
