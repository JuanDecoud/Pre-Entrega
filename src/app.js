import  express  from 'express';
import productRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import viewRouter from './routers/views.router.js'
import handlebars from 'express-handlebars'
//import {Server} from 'socket.io'

const app = express ();
app.use(express.json())
app.use(express.static('./src/public'))


/// routers
app.use ('/products' , productRouter)
app.use ('/carts' , cartsRouter)
app.use ('/views' , viewRouter)
//---------------------------------
/// engine 
app.engine('handlebars' , handlebars.engine())
app.set('views','./src/views')
app.set('view engine' ,'handlebars')
//--------

const serverHttp=app.listen(8080 , ()=>console.log("Server Up"))
//const io = new Server(serverHttp)


io.on('connection' , ()=>{
    console.log("Cliente Conectado")
})

