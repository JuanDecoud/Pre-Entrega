import mongoose from 'mongoose'

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    products : {
       type : [
            {
                product: {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'products',
                },
                quantity : {
                    type:Number,
                    default : 1
                } 
            }
       ],
       default : []
    }
} )

cartSchema.method('isProductatCard' , function(pid){
    let boolean = false
    this.products.forEach(element => {
        let newid =element._id.toString()
        if (newid === pid){
            boolean= true
        } 
    });
    return boolean 
})


const cartModel = mongoose.model (cartCollection ,cartSchema)

export default cartModel 