import mongoose from 'mongoose'

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    products : {
       type : [
            {
                product: {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'products'
                }
            }
       ],
       default : []
    }
})


cartSchema.pre('isProductatCart' , function (){
    this.populate()
})

const cartModel = mongoose.model (cartCollection ,cartSchema)

export default cartModel 