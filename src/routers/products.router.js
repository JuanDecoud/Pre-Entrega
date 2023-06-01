import { Router } from 'express';

import ProductManager from '../entities/ProductManager.js'
import uploader from '../utils/multer.product.js'

const rutaArchivos = './src/public/'


const productRouter = Router();
const productManager = new ProductManager (`./src/data/products.json`, `utf-8`)

productRouter.get ('/' ,async (req , res)=>{
    const limit = req.query.limit
    const pid = req.query.pid
    let products = await productManager.getProducts()
    if (limit <=0) res.status(400).send("El limite no puede ser igual o inferior a 0")
    if(limit>0){
        const productsWlimit = []
        for (let index = 0; index <= limit-1; index++) productsWlimit.push (products[index]);   
        res.status(200).send(productsWlimit)
    }
    if (pid!=undefined){
        let searchProduct = await  productManager.getPruductsByid(pid)
        if (!searchProduct ) res.status(404).send (`Product not found`)
        else res.status(200).json(searchProduct)
    }
    if (limit === undefined && !pid && products.length != 0 ) res.status(200).send(products)
})


productRouter.post (`/`,uploader.single('file') , async (req,res)=>{
    if (!req.file)res.status (400).json ({message : 'Please, upload product image'})
    console.log(req.body)
    const {name,description,price,code,stock , category} = req.body
    if (!name || !description || !price || !code || !stock || !category)res.status(400).send ("All fields are required")
    else {
        let validate = await productManager.validatenewProduct(code)
        console.log(validate)
        if (validate === true){
            await productManager.addProduct(name,description,price,code,stock,category ,rutaArchivos+req.file.filename)
            res.status(200).json ({mesage : `Sucess : product added successfully`} )
        }
        else {
            res.status(406).json({message : `Product already exists`})
        }
    }
})

productRouter.put(`/:pid` , async (req,res)=>{
    let id = req.params.pid
    let update = req.body
    let producttoUpdate = await productManager.getPruductsByid(id)
    if (producttoUpdate){
        producttoUpdate = { ...producttoUpdate, ...update}
        await productManager.updateProduct(id , producttoUpdate)
        res.status(200).send("Success : Product update")
    }
    if (!producttoUpdate) res.status(404).send ("This product not exist")
})


productRouter.delete (`/:pid`, async (req,res)=>{
    let id = req.params.pid
    let productTodelete = await productManager.getPruductsByid(id)
    if (!productTodelete) res.status(404).send("Product not Found")
    if (productTodelete){
        await productManager.deleteProduct(id)
        res.status(200).send ("Sucess: Product Deleted")
    }
    
})


export default productRouter ;