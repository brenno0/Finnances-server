import { prisma } from "../../../../database/prismaClient";

interface ICreateProducts {
    name:string;
    price: string;
    description?: string;
    userId:string;
    categoryId:string;
    banksId:string;
    transactionDate:Date;
}

export class CreateProductsUseCase {
    async execute({ name, price, description, userId, categoryId, banksId, transactionDate }: ICreateProducts) {
        
        if(!name || typeof name !== "string"){
            throw new Error("O Campo nome é obrigatório e precisa ser uma string")
        }
        if(!description || typeof description !== "string"){
            throw new Error("O Campo descrição é obrigatório e precisa ser uma string")
        }
        if(!price || typeof price !== "string" ){
            throw new Error("O Campo preço é obrigatório")
        } 
        if(!userId){
            throw new Error("O id do usuário é obrigatório")
        }
        if(!categoryId){
            throw new Error("O id da categoria é obrigatório")
        }
        if(!banksId){
            throw new Error("O id do banco é obrigatório")
        }

        const isUserRegistered = await prisma.user.findFirst({
            where:{
                id:userId
            }
        })

        const isCategoryRegistered = await prisma.category.findFirst({
            where:{
                id:categoryId
            }
        })

        const isBankRegistered = await prisma.banks.findFirst({
            where:{
                id:banksId,
            }
        })


        if(!isUserRegistered){
            throw new Error("Usuário não encontrado.")
        }
        if(!isCategoryRegistered){
            throw new Error("Categoria não encontrada.")
        }
        if(!isBankRegistered){
            throw new Error("Banco não encontrado.")
        }

        const product = await prisma.products.create({ 
            data:{
                name,
                price,
                description,
                userId,
                categoryId,
                banksId,
                transactionDate
            }
        })

        return product;
       
    }
}