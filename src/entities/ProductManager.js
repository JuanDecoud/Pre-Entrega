import fs from 'fs'

 export default class ProductManager {
    #patchFile
    #arrayProducts 
    #fileType
  
    constructor (patchFile , typeFile){
        this.#patchFile = patchFile
        this.#fileType = typeFile
        this.#arrayProducts=[]
    }

    

    addProduct =async (name,description,price, thubnail,code,stock , category)=>{
        this.#arrayProducts = await this.#retrieveData()
        this.#arrayProducts.push({id:this.#generateId(),name,description,price,thubnail,code,stock,status:true , category}) 
       await this.#saveData()
    }

    getProducts = async  ()=>{
        this.#arrayProducts = await this.#retrieveData()
        return  this.#arrayProducts
    }

    getPruductsByid = async (id)=>{
        let productSearch = null
        this.#arrayProducts = await this.#retrieveData()
        this.#arrayProducts.forEach(product=>{
            if (product.id == id) productSearch = product
            console.log (productSearch)
        })
        return  productSearch
    }

    updateProduct = async (id , newProduct )=>{
        this.#arrayProducts = await this.#retrieveData()
        this.#arrayProducts.forEach(product=>{
            if (product.id === id) {
                let {name,description,price, thubnail,code,stock} = newProduct
                product.name = name
                product.description=description
                product.price = price
                product.thubnail = thubnail
                product.code = code 
                product.stock = stock
            }
        })
       await this.#saveData()
    }

    deleteProduct = async (id)=>{
        let array = await this.#retrieveData()
        this.#arrayProducts=array.filter(element => {return element.id != id});
        await this.#saveData()
    }
  
    #saveData = async ()=> {
        await  fs.promises.writeFile(this.#patchFile , JSON.stringify(this.#arrayProducts,null,"\t"))
    }

    #retrieveData= async ()=>{
        let data = []
       if(fs.existsSync(this.#patchFile)) data= JSON.parse( await fs.promises.readFile(this.#patchFile, this.#fileType))
       return await data
    }
    #generateId =  ()=>{
        let id = 1 ;
        if (this.#arrayProducts.lenght !=0){
            this.#arrayProducts.forEach(element => {
               id= element.id < id ? id = 1 : ++id
            });
        }
        return id
    }
}

const productManager = new ProductManager (`./src/data/products.json` , `utf-8`)



