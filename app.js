//Chamando o express
const express = require("express");

//Gerador de ID universal de forma randômica
const {randomUUID} = require("crypto");


//File System
const fs = require("fs");

//Inicializando o express
const app = express();

//Middle (meio do caminho) - especificando que deverá usar o formato JSON no express
app.use(express.json());

let products = [];

//Pegando os dados do arquivo products.json (informações do produto com File System)

fs.readFile("products.json", "utf-8", (err, data) =>{

    if(err){

        console.log(err);
    }else{

        //.parse é formato de objeto
        products = JSON.parse(data);
    }
});

//Criando rota para inserir dados de um produto (nome e preço)
app.post("/products", (req, res) =>{

    const {name, price} = req.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    };

    products.push(product);

   

    productFile()


    return res.json(product);
});

//Listando os produtos criados
app.get("/products", (req, res) =>{

    return res.json(products);
});

//Listando um produto específico por meio do ID
app.get("/products/:id", (req, res) =>{

    //Desestruturação para pegar o parâmetro id
    const {id} = req.params;
    const product = products.find(product => product.id === id);
    return res.json(product)
});

//Alteração de produto por meio do ID

app.put("/products/:id", (req, res) =>{

    //Desestruturação para pegar o parâmetro id
    const {id} = req.params;
    const {name, price} = req.body;

    //Percorrendo o array para encontrar o index com o ID exato
    const productIndex = products.findIndex(product => product.id === id);
    //Alteração do produto com o index exato encontrado no productIndex
    products[productIndex] = {

        //Somente será modificado o name e price do produto, menos o ID
        ...products[productIndex],
        name,
        price
    }

    productFile();

    return res.json({message: "Change made successfully!"});
});

//Exclusão do produto

app.delete("/products/:id", (req, res) =>{

    //Desestruturação para pegar o parâmetro id
    const {id} = req.params;

     //Percorrendo o array para encontrar o index com o ID exato
     const productIndex = products.findIndex(product => product.id === id);

     //Pegar o index encontrado e remover 1 posição
    products.splice(productIndex, 1);

    productFile();

    return res.json({message: "Product removed successfully!"});
});


function productFile(){

    //Criação de um arquivo JSON para guardar as informações do produto
    fs.writeFile("products.json", JSON.stringify(products), (err) =>{

        if(err){

            console.log(err);
        }else{
            console.log("Product Inserted!")
        }
    });
}

app.listen(4002, () => console.log("Server is running in 4002 Port"));