// usando o INQUIRER => é um módulo node.js para PROMPTS interativos
const {select} = require("@inquirer/prompts");

const start = async () => {
    while(true) {

        // define as opções que irão aparecer nos prompts 
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        });

        // irá executar uma ação de acordo com a opção escolhida
        switch(opcao) {
            case "cadastrar":
                console.log("vamos cadastrar");
            break;
            case "listar":
                console.log("vamos listar")
            break;
            case "sair":
                console.log("Até a próxima!");
                return
        };
    };
};
start();