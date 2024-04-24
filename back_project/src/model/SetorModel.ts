import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default class SetorModel {
    async getSetores(){
        return await prisma.setor.findMany({
            include: {
                empresas: true
            }
        })
    }

    async getSetorById(id: number){
        return await prisma.setor.findUnique({
            where: {
                id: id
            },
            include: {
                empresas: true
            }
        })
    }

    async createSetor(descricao: string){
        return await prisma.setor.create({
            data: {
                descricao: descricao
            }
        })
    }

    async updateSetor(id: number, descricao: string){
        return await prisma.setor.update({
            where: {
                id: id
            },
            data: {
                descricao: descricao
            },
            include: {
                empresas: true
            }
        })
    }

    async deleteSetor(id: number){
        return await prisma.setor.delete({
            where: {
                id: id
            },
            include: {
                empresas: true
            }
        })
    }
}