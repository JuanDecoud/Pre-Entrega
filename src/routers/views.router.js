import { Router } from 'express'
import ProductManager from '../dao/modelsFs/ProductManager.js'

const viewRouter = Router ()
const productManager = new ProductManager (`./src/data/products.json`, `utf-8`)

viewRouter.get('/', async (req,res)=>{
    let products = await productManager.getProducts()
    res.render('home' ,  {products})
})

viewRouter.get('/realtimeproducts' , async(req,res) =>{
   let products = await productManager.getProducts() 
   res.render('realTimeProductos',{products})  

})


export default viewRouter