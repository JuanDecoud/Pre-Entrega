import  express  from 'express';
import productRouter from './routers/products.router.js'

const app = express ();
app.use(express.json())

app.get ("/",(req,res)=>{
    res.send("hola")
})
app.use ('/products' , productRouter)

app.listen(8080 , ()=>console.log("Server Up"))


