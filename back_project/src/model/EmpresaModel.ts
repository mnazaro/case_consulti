import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default class EmpresaModel {
    async getEmpresas(){
        return await prisma.empresa.findMany()
    }

    async getEmpresaByNome(razao_social: string){
        return await prisma.empresa.findUnique({
            where: {
                razao_social: razao_social
            }
        })
    }

    async createEmpresa(razao_social: string, cnpj: string, nome_fantasia?: string,){
        return await prisma.empresa.create({
            data: {
                razao_social: razao_social,
                cnpj: cnpj,
                nome_fantasia: nome_fantasia || null
            }
        })
    }

    async updateEmpresa(id: number, razao_social: string, cnpj: string, nome_fantasia: string){
        return await prisma.empresa.update({
            where: {
               id: id 
            },
            data: {
                razao_social: razao_social,
                cnpj: cnpj,
                nome_fantasia: nome_fantasia
            }
        })
    }

    async deleteEmpresa(razao_social: string){
        return await prisma.empresa.delete({
            where: {
                razao_social: razao_social
            }
        })
    }
}