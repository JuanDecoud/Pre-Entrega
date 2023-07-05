import { Router } from 'express';

import messengerModel from '../dao/models/messenger.model.js'

const messengerRouter = Router()


messengerRouter.get ('/' , async (req,res)=>{
    let messages = await messengerModel.find().lean()
    let io = req.app.get('socketio')
    io.emit('messengers' , messages)
    res.render('messenger',{messages})
})

messengerRouter.post ('/' ,  async(req,res)=>{
    let message = req.body.message
    await messengerModel.create({ userMail:"Probando",messege: message})
    res.render ('messenger')
   
})


export default messengerRouter