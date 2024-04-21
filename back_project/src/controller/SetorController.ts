import { Request, Response } from "express";
import SetorModel from "../model/SetorModel";

const setorModel = new SetorModel()

export default class SetorController {
    async getSetores(req: Request, res: Response){
        const setores = await setorModel.getSetores()
        return res.json(setores)
    }

    async getSetorById(req: Request, res: Response){
        const id = parseInt(req.params.id)
        const setor = await setorModel.getSetorById(id)
        return res.json(setor)
    }

    async createSetor(req: Request, res: Response){
        const { descricao } = req.body
        const setor = await setorModel.createSetor(descricao)
        return res.json(setor)
    }

    async updateSetor(req: Request, res: Response){
        const id = parseInt(req.params.id)
        const { descricao } = req.body
        const setor = await setorModel.updateSetor(id, descricao)
        return res.json(setor)
    }

    async deleteSetor(req: Request, res: Response){
        const id = parseInt(req.params.id)
        const setor = await setorModel.deleteSetor(id)
        return res.json(setor)
    }
}