// usando o INQUIRER => é um módulo node.js para PROMPTS interativos
const { select, input, checkbox } = require("@inquirer/prompts");

// módulo node.js para salvar dados
const fs = require("fs").promises;

let mensagem = "Bem-vindo(a) ao App de metas!"; // mensagem inicial

// lista de metas
let metas

// carregar/salvar as metas
const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8"); // serve para o programa ler o arquivo das metas
        metas = JSON.parse(dados);
    }
    catch(erro) {
        metas = [];
    }
};
const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2));
}

// cadastrar nova meta
const cadastrarMeta = async () => {
    const meta = await input({message: "Digite sua meta:"});

    // verifica se o usuário digitou algo
    if(meta.length == 0) {
        mensagem = "A meta não pode ser vazia.";
        return;
    }

    metas.push({ value: meta, checked: false });

    mensagem = "Meta cadastrada com sucesso!";
};

// listar todas as metas
const listarMetas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas cadastradas.";
        return
    };

    const respostas = await checkbox({
        message: "Use as setas para alternar entre as metas, o espaço para marcar/desmarcar e o Enter para finalizar esta etapa.",
        choices: [...metas],
        instructions: false // retira as instruções de uso do checkbox
    });

    // marca todas as metas existentes como FALSE
    metas.forEach((m) => {
        m.checked = false;
    });

    if(respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada.";
        return;
    };

    // compara cada nova meta com a que já existe no array METAS, se existir é marcado como TRUE, se não mantém o FALSE
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        });

        meta.checked = true;
    });

    mensagem = "Meta(s) concluída(s).";
};

// metas realizadas
const metasRealizadas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas cadastradas.";
        return
    };

    const realizadas = metas.filter((meta) => {
        return meta.checked;
    });

    if(realizadas.length == 0) {
        mensagem = "Não existem metas realizadas. :(";
        return
    };

    await select({
        message: `Metas realizadas (${realizadas.length})`,
        choices: [...realizadas]
    });
};

// metas abertas
const metasAbertas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas cadastradas.";
        return
    };

    const abertas = metas.filter((meta) => {
        return !meta.checked;
    });

    if(abertas.length == 0) {
        mensagem = "Não existem metas abertas. :)";
        return
    };

    await select({
        message: `Metas abertas (${abertas.length})`,
        choices: [...abertas]
    });
};

// deletar metas
const deletarMetas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas cadastradas.";
        return
    };
    
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false};
    });

    const itensADeletar = await checkbox({
        message: "Selecione uma meta para deletar.",
        choices: [...metasDesmarcadas],
        instructions: false
    });

    if(itensADeletar.length == 0) {
        mensagem = "Não há itens para deletar.";
        return
    };

    // deleta a meta selecionada
    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item;
        });
    });

    mensagem = "Meta(s) deletada(s) com sucesso.";
};

// sistema de mensagens
const mostrarMensagem = () => {
    console.clear(); // limpa o console

    if(mensagem != 0) {
        console.log(mensagem);
        console.log("");
        mensagem = "";
    };
};

// inicia a aplicação
const start = async () => {
    await carregarMetas();

    while(true) {
        mostrarMensagem();
        await salvarMetas();

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
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Encerrar App",
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
            case "deletar":
                await deletarMetas();
            break;
            case "sair":
                console.log("Até a próxima! :)");
                return
        };
    };
};
start();