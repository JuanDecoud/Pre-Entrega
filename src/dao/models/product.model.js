import mongoose from 'mongoose'

const productCollection = "products"

const productSchema = new mongoose.Schema({
    name : String ,
    description : String,
    price: String ,
    code: {
        type : String ,
        index : true
    },
    stock: String ,
    status: Boolean,
    category: String,
    linkThubnail : String,
})



 const productModel = mongoose.model (productCollection ,productSchema)

 export default productModel