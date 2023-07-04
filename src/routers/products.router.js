import { Router } from 'express';

import ProductManager from '../dao/modelsFs/ProductManager.js'
import uploader from '../utils/multer.product.js'
import productModel from '../dao/models/product.model.js'


const productRouter = Router();
const productManager = new ProductManager (`./src/data/products.json`, `utf-8`)

productRouter.get ('/' ,async (req , res)=>{
    const limit = req.query.limit
    const pid = req.query.pid
    try{
        let products = await productModel.find()
        if (limit <=0) res.status(400).send("El limite no puede ser igual o inferior a 0")
        if(limit>0){
            let productsWlimit = []
            /*for (let index = 0; index <= limit-1; index++) productsWlimit.push (products[index]);   */
            productsWlimit = await productModel.find().limit(limit)
            res.status(200).send(productsWlimit)
        }
        if (pid!=undefined){
            let searchProduct = await  productModel.findById(pid)
            if (!searchProduct ) res.status(404).send (`Product not found`)
            else res.status(200).json(searchProduct)
        }
        if (limit === undefined && !pid && products.length != 0 ){
            let io = req.app.get('socketio')
            io.emit('updateProducts' , products)
            res.status(200).send(products)
        }

    }catch (err){
        res.json ({status : "error" , message : err.message })
    }
    
})

productRouter.post (`/`,uploader.single('file') , async (req,res)=>{
    if (!req.file)res.status (400).json ({message : 'Please, upload product image'})
    const {name,description,price,code,stock , category} = req.body
    console.log(req.body)
    if (!name || !description || !price || !code || !stock || !category)res.status(400).send ("All fields are required")
    else {
        try {
            let validate = await productModel.find({code :code})
            if (validate.length ===0){
                const imgRute = '/'+req.file.filename
                await productModel.create ({name,description,price,code,stock,status :true,category ,linkThubnail:'/'+req.file.filename})
                let products = await productModel.find()
                let io = req.app.get('socketio')
                io.emit('updateProducts' , products)
                res.status(200).json ({mesage : `Sucess : product added successfully`} )
            }
            else {
                res.status(406).json({message : `Product already exists`})
            }
        }
        catch (err){
            res.status(404).json({status: 'error' , error : err.message})
        }   
    }
})

productRouter.put(`/:pid` , async (req,res)=>{
    let id = req.params.pid
    let update = req.body
    /*let producttoUpdate = await productModel.getPruductsByid(id)*/
    /*producttoUpdate = { ...producttoUpdate, ...update}
    /* await productManager.updateProduct(id , producttoUpdate)*/
    try {
        let result = await productModel.updateOne({'_id': id},{$set: { ...update}})
        console.log (result)
        if (result.matchedCount === 0) res.status(404).send ("This product not exist")
        else {
            let products = await productModel.find()
            let io = req.app.get('socketio')
            io.emit('updateProducts' , products)
            res.status(200).send("Success : Product update")
        }
    }catch (err){
        res.json ({status:'error' , message: err.message })
    }
    
    
    
})


productRouter.delete (`/:pid`, async (req,res)=>{
    let id = req.params.pid
    /*let productTodelete = await productManager.getPruductsByid(id)
    if (!productTodelete) res.status(404).send("Product not Found")
    if (productTodelete){
        await productManager.deleteProduct(id)
        let products = await productManager.getProducts()
        let io = req.app.get('socketio')
        io.emit('updateProducts' , products)
        res.status(200).send ("Sucess: Product Deleted")
    }
    */
   try {
        let result = await productModel.deleteOne({"_id":id})
        await productManager.deleteProduct(id)
        let products = await productModel.find()
        let io = req.app.get('socketio')
        io.emit('updateProducts' , products)
        res.status(200).send ("Sucess: Product Deleted")
   }catch (err){
        res.json ({status:'error' , message: err.message })
   }
})


export default productRouter ;