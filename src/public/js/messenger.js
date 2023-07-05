
let socket = io()


socket.on ('messengers' ,messages =>{

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




    
