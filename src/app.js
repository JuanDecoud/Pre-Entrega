import  express  from 'express';
import productRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
const app = express ();
app.use(express.json())
app.use(express.static('./src/public'))
app.use ('/products' , productRouter)
app.use ('/carts' , cartsRouter)

app.listen(8080 , ()=>console.log("Server Up"))


