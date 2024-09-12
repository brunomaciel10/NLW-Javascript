// usando o INQUIRER => é um módulo node.js para PROMPTS interativos
const { select, input, checkbox } = require("@inquirer/prompts");

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
};

// listar todas as metas
const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para alternar entre as metas, o espaço para marcar/desmarcar e o Enter para finalizar esta etapa.",
        choices: [...metas],
        instructions: false
    });

    // marca todas as metas existentes como FALSE
    metas.forEach((m) => {
        m.checked = false;
    });

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada.")
        return;
    };

    // compara cada nova meta com a que já existe no array METAS, se existir é marcado como TRUE, se não mantém o FALSE
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        });

        meta.checked = true;
    });

    console.log("Meta(s) concluída(s).")
};

// metas realizadas
const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked;
    });

    if(realizadas.length == 0) {
        console.log("Não existem metas realizadas. :(");
        return;
    };

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    });
};

// metas abertas
const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true;
    });

    if(abertas.length == 0) {
        console.log("Não existem metas abertas. :)");
        return;
    };

    await select({
        message: "Metas Abertas",
        choises: [...abertas]
    });
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
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
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
            break;
            case "listar":
                await listarMetas();
            break;
            case "realizadas":
                await metasRealizadas();
            break;
            case "abertas":
                await metasAbertas();
            break;
            case "sair":
                console.log("Até a próxima!");
                return
        };
    };
};
start();