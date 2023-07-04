import { Router } from 'express'
import ProductManager from "../entities/ProductManager.js"
import {Server} from 'socket.io'

const socket = new Server()
const viewRouter = Router ()
const productManager = new ProductManager (`./src/data/products.json`, `utf-8`)

viewRouter.get('/', async (req,res)=>{
    let products = await productManager.getProducts()
    res.render('home' ,  {products})
})


viewRouter.get('/realtimeproducts' , async(req,res) =>{
    res.render('realTimeProductos')
})



export default viewRouter