export default class CartManager {
    
    #patchFile
    #arrayCarts
    #fileType

    constructor (patchFile , typeFile){
        this.#patchFile = patchFile
        this.#fileType = typeFile
        this.#arrayCarts=[]
    }

    createCart =async (id , product)=>{
        this.#arrayProducts = await this.#retrieveData()
        let arrayProducts = []
        arrayProducts.push(product)
        this.#arrayCarts.push({id:this.#generateId(),arrayProducts}) 
       await this.#saveData()
    }



    #generateId =  ()=>{
        let id = 1 ;
        if (this.#arrayCarts.lenght !=0){
            this.#arrayCarts.forEach(element => {
               id= element.id < id ? id = 1 : ++id
            });
        }
        return id
    }

    #saveData = async ()=> {
        await  fs.promises.writeFile(this.#patchFile , JSON.stringify(this.#arrayCarts,null,"\t"))
    }

    #retrieveData= async ()=>{
        let data = []
       if(fs.existsSync(this.#patchFile)) data= JSON.parse( await fs.promises.readFile(this.#patchFile, this.#fileType))
       return await data
    }

    


}