//Criação de um servidor htpp

const http = require("http");

http.createServer((req, res) =>{

    //Retorno com status de requisição e o formato que será o retorno (content-type) JSON 
    res.writeHead(200, {'Content-Type': 'application/json'});


    if(req.url === "/produto"){

        res.end(JSON.stringify({

            message : "Rota de produto",
        }))
    }else if (req. url === "/usuario"){

        res.end(JSON.stringify({

            message : "Rota de usuários",
        }))
    } else{

        res.end(JSON.stringify({

            message : "Rota padrão",
        }))
    }

    //Enviando a resposta para quem fez a requisição por meio do .end no formato JSON
    res.end(JSON.stringify({

        message: 'Hello World!',
    }));

})//.listen(4001, () => console.log("Servidor rodando na porta 4001"));

