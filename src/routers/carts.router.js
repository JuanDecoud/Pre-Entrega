import { Router } from 'express'
import CartManager from '../entities/CartManager.js'
import ProductManager from "../entities/ProductManager.js"



const cartsRouter = Router ()
const cartManager = new CartManager (`./src/data/carts.json`, `utf-8`)
const productManager = new ProductManager (`./src/data/products.json`, `utf-8`)


cartsRouter.post ('/:cid/product/:pid' , async(req,res)=>{
    const productId = req.params.pid
    const cartId = req.params.cid

    if (productId!=undefined && cartId != undefined){
        let carttoUpdate = await cartManager.getCartsByid(cartId)
        let producttoAdded = await  productManager.getPruductsByid(productId)
        
        if (!producttoAdded)res.status(400).json ({status : ' Fail' , Message : 'Product does not exist'})
        if (!carttoUpdate)res.status(400).json ({status : ' Fail' , Message : ' Cart does not exist'})
        if (carttoUpdate && producttoAdded){
            let productFind =cartManager.isproductAtcard(productId,carttoUpdate.arrayProducts)
      
            if (productFind){
                let index =carttoUpdate.arrayProducts.findIndex(item => {
                    return item.id == productFind.id
                })
                carttoUpdate.arrayProducts[index].quantity +=1
                await cartManager.updateCart(cartId,carttoUpdate)
                res.status(200).json ({status : ' Sucess' , Message : 'Cart Update Successfully'})
            }
            if (!productFind){
                carttoUpdate.arrayProducts.push ({id :producttoAdded.id , quantity:1})
                await cartManager.updateCart(cartId,carttoUpdate)
                res.status(200).json ({status : ' Sucess' , Message : 'Cart Update Successfully'})
            }
        }
    }
})

cartsRouter.post ('/', async(req,res)=>{
    await cartManager.createCart()
    res.status(200).json ({Status : 'Sucess', Mesagge : 'Cart added'})
})

cartsRouter.get('/:cid',async (req,res)=>{
    let cartId = req.params.cid
    let cart = await cartManager.getCartsByid(cartId)
    if(!cart)res.status(400).json ({status :'Fail' , message: 'Cart does not exist'})
    res.status(200).json (cart.arrayProducts)
})


export default cartsRouter