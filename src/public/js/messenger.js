
let socket = io()

let userMail = localStorage.getItem('usuario')

if (!localStorage.getItem('usuario')) {
    Swal.fire({
        title: 'Input email address',
        input: 'email',
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address',
        allowOutsideClick: false
      }).then(result =>{
        localStorage.setItem('usuario' , JSON.stringify(result.value))
      })
      
}

socket.on ('updateMessages' ,messages =>{
    console.log("esta info viene del servidor")
    let divProducts = document.getElementById('messengerBox')
        divProducts.innerHTML=''
        for ( data of messages) {
            let div = 
                `<div class ="mx-2 border border-1 border-white my-2">
                        <p>User: ${data.userMail}</p>
                        <p>Message: ${data.messege}</p>
                </div>`
            divProducts.innerHTML+=div
        }
 } )



 let btnSend = document.getElementById('btnSend')

 btnSend.addEventListener('click', ()=>{
    let message = document.getElementById('iMessage').value
    let data = {
        userMail : userMail,
        messege : message
    }
    console.log(data)
    socket.emit('messages', data)
 })



 
 //socket.emit("messages", "esta info viene del cliente")


    
