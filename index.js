// usando o INQUIRER => é um módulo node.js para PROMPTS interativos
const { select, input } = require("@inquirer/prompts");

// modelo de meta
let meta = {
    value: "Tomar 3L de água por dia.",
    checked: false
};

// lista de metas
let metas = [meta];

// cadastrar nova meta
const cadastrarMeta = async () => {
    const meta = await input({message: "Digite sua meta:"});

    // verifica se o usuário digitou algo
    if(meta.length == 0) {
        console.log("A meta não pode ser vazia.");
        return;
    }

    metas.push({ value: meta, checked: false });
}

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
                await cadastrarMeta();
                console.log(metas);
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