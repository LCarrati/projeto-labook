import z from "zod"

// esses são para o PUT
export interface EditProductInputDTO {
    idtoEdit: string,
    id?: string,
    name?: number,
    price?: string
}

export interface EditProductOutputDTO {
    message: string,
    product : {
        id: string,
        name: string,
        price: number,
        createdAt: string
    }
}

export const editProductSchema = z.object({
    idtoEdit: z.string(),
    id: z.string().optional(),
    name: z.string().min(2).optional(),
    price: z.number().positive().min(1).optional()
}).transform(data => data as EditProductInputDTO)
// lá no controller vc tem um código assim:
// const input = {
//     idToEdit: req.params.id,
//     id: req.body.id,
//     name: req.body.name,
//     price: req.body.price
// }
// const productBusiness = new ProductBusiness()
// const output = await productBusiness.editProduct(input)
// res.status(200).send(output)
// 
// no business vc tem todas as validações desses parametros seja do 'params' seja do 'body'. Essas validações serão alteradas pra usar o ZOD.
// altero o código do controller para:
// const input = editProductSchema.parse({
//     idToEdit: req.params.id,
//     id: req.body.id,
//     name: req.body.name,
//     price: req.body.price
// })
//
// const productBusiness = new ProductBusiness()
// const output = await productBusiness.editProduct(input)
// res.status(200).send(output)

// no business eu tenho o código:
// public editProduct = async (input: any) => {
//     const {
//       idToEdit,
//       id,
//       name,
//       price
//     } = input

//     if (id !== undefined) {
//       if (typeof id !== "string") {
//         throw new BadRequestError("'id' deve ser string")
//       }
//     }

//     if (name !== undefined) {
//       if (typeof name !== "string") {
//         throw new BadRequestError("'name' deve ser string")
//       }

//       if (name.length < 2) {
//         throw new BadRequestError("'name' deve possuir pelo menos 2 caracteres")
//       }
//     }

//     if (price !== undefined) {
//       if (typeof price !== "number") {
//         throw new BadRequestError("'price' deve ser number")
//       }

//       if (price <= 0) {
//         throw new BadRequestError("'price' não pode ser zero ou negativo")
//       }
//     }

//     const productDatabase = new ProductDatabase()
//     const productToEditDB = await productDatabase.findProductById(idToEdit)

//     if (!productToEditDB) {
//       throw new NotFoundError("'id' para editar não existe")
//     }

//     const product = new Product(
//       productToEditDB.id,
//       productToEditDB.name,
//       productToEditDB.price,
//       productToEditDB.created_at
//     )

//     id && product.setId(id)
//     name && product.setName(name)
//     price && product.setPrice(price)

//     const updatedProductDB: ProductDB = {
//       id: product.getId(),
//       name: product.getName(),
//       price: product.getPrice(),
//       created_at: product.getCreatedAt()
//     }

//     await productDatabase.updateProduct(idToEdit, updatedProductDB)

//     const output = {
//       message: "Produto editado com sucesso",
//       product: {
//         id: product.getId(),
//         name: product.getName(),
//         price: product.getPrice(),
//         createdAt: product.getCreatedAt()
//       }
//     }

//     return output
//   }

// alterações:
// na primeira linha do método: public editProduct = async (input: any) => {
// mudo para: public editProduct = async (input: EditProductInputDTO): Promise<EditProductOutputDTO> => {
// nas últimas linhas, onde defino sa raída (return) do método: const output = {
// mudo para: const output: EditProductOutputDTO = {
// posso remover todos os IFs de validação

// no try/catch do controller eu ainda vou precisar pegar os erros pra mostrar mensagens de erro personalizadas:
// import { ZodError } from 'zod'
// ...código
// catch (error) {
//     if (error instanceof ZodError){
//          res.status(400).send(error.issues[0].message)
//     } else if (error instanceof BaseError) {
//         res.status(error.statusCode).send(error.message)
//     } else {
//         res.status(500).send("Erro inesperado")
//     }
// }
