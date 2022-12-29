import multer from "multer";
import { prisma } from "../../../../database/prismaClient";

interface Products {
    date:string;
    name:string;
    price:string;
    userId:string;
}




export class CsvNubankImportUseCase {
    async execute(products:Products[]){

        const categories = await prisma.category.findMany()
        const bank = await prisma.banks.findUnique({ 
            where:{
                name:"Nubank"
            }
        })
        
        const depositCategory = categories.find(category => category.name === "Entrada")
        const cashOutputCategory = categories.find(category => category.name === "Saida")

        const productsWithNegativePrice = products.filter(product => product.price[0] === "-")
        
        
        const productsListWithCategory = products.map((product) => {

            for(let productWithNegativePrice of productsWithNegativePrice){
                const isNegative = JSON.stringify(productWithNegativePrice) === JSON.stringify(product)
                return {
                    ...product,
                    categoryId:isNegative ? depositCategory.id : cashOutputCategory.id,
                    price:isNegative ?  product.price.slice(1) : product.price,
                    date:new Date(product.date)
                }
            }
        })

        productsListWithCategory.forEach(async products => {
            const { categoryId, date, name, price, userId  } = products
            console.log(products)
            await prisma.products.create({
                data:{
                    name:name,
                    price:price,
                    banksId:bank.id,
                    description:"Nubank Csv",
                    categoryId,
                    transactionDate:date,
                    userId
                }
            })

        })

        return productsListWithCategory;
        

    }
}