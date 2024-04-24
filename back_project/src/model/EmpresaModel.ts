import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default class EmpresaModel {
    async getEmpresas(){
        return await prisma.empresa.findMany();
    }


    async getEmpresaByNome(razao_social: string){
        return await prisma.empresa.findUnique({
            where: {
                razao_social: razao_social
            }
        })
    }

    async createEmpresa(razao_social: string, cnpj: string, nome_fantasia?: string, setor_Ids?: number[]){
        return await prisma.empresa.create({
            data: {
                razao_social: razao_social,
                cnpj: cnpj,
                nome_fantasia: nome_fantasia || null,
                setores: {
                    connect: (setor_Ids || []).map(id => {
                        return {
                            id: id
                        }
                    })
                }
            }
        })
    }

    async updateEmpresa(id: number, razao_social: string, cnpj: string, nome_fantasia: string, setor_Ids: number[]){
        return await prisma.empresa.update({
            where: {
               id: id 
            },
            data: {
                razao_social: razao_social,
                cnpj: cnpj,
                nome_fantasia: nome_fantasia,
                setores: {
                    set: setor_Ids.map(id => {
                        return {
                            id: id
                        }
                    })
                }
            }
        })
    }

    async deleteEmpresa(id: number){
        return await prisma.empresa.delete({
            where: {
                id: id
            }
        })
    }
}