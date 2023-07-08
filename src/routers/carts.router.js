import { Router } from 'express'
import CartManager from '../dao/modelsFs/CartManager.js'
import ProductManager from "../dao/modelsFs/ProductManager.js"
import cartModel from '../dao/models/cart.model.js'
import productModel from '../dao/models/product.model.js'


const cartsRouter = Router ()
const cartManager = new CartManager (`./src/data/carts.json`, `utf-8`)
const productManager = new ProductManager (`./src/data/products.json`, `utf-8`)


cartsRouter.post ('/:cid/product/:pid' , async(req,res)=>{
    const productId = req.params.pid
    const cartId = req.params.cid
  

    if (productId!=undefined && cartId != undefined){

        try{
            let cartdb = await cartModel.findById(cartId)
      
            let productdb = await productModel.findById(productId)
            if (!productdb)res.status(400).json ({status : ' Fail' , Message : 'Product does not exist'})
            if (!cartdb)res.status(400).json ({status : ' Fail' , Message : ' Cart does not exist'})
            if (cartdb && productdb){

                let result =  cartdb.isProductatCard(productId)
                if (result ===true){
                    console.log(cartdb)
                    await cartModel.updateOne({'_id': cartId},{$set: { ...cartdb}})
                    res.status(200).json({status : "success" , message : "Product added at cart"})
                }
            if (result === false){
                    cartdb.products.push(productdb)
                    await cartModel.updateOne({'_id': cartId},{$set: { ...cartdb}})
                    res.status(200).json({status: "Sucess" , message : "Product Added to cart"})
            }
        }
        }catch (err){
            res.json ({status : "error" , message : err.message })
        }
        
    }
})

cartsRouter.delete('/:cid/product/:pid', async(req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    const cart = await cartModel.findById(cid)
    await cart.deleteProduct(pid)
    await cartModel.updateOne({'_id':cid}, {$set : {...cart}} )
    res.status(200).json({status: "Sucess" , message : "Product deleted"})

})

cartsRouter.post ('/', async(req,res)=>{
    //await cartManager.createCart()
    try {
        cartModel.create({})
        res.status(200).json ({Status : 'Sucess', Mesagge : 'Cart added'})

    }catch (err){
        res.json ({status : "error" , message : err.message })
    }
    
})

cartsRouter.get('/:cid',async (req,res)=>{
    try{
        let cartId = req.params.cid
        let cart = await cartModel.findById(cartId)
        if(!cart)res.status(400).json ({status :'Fail' , message: 'Cart does not exist'})
        res.status(200).json (cart)
    }catch (err){

    }
 
})


export default cartsRouter