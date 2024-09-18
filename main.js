// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade = 1) {
    // Obter os produtos do localStorage ou criar um novo array vazio
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verificar se o produto já está no carrinho
    const produtoExistente = carrinho.find(produto => produto.id === id);

    if (produtoExistente) {
        // Se o produto já existir, incrementar a quantidade
        produtoExistente.quantidade += quantidade;
    } else {
        // Se não existir, adicionar o novo produto ao array
        carrinho.push({ id, nome, valor, quantidade });
    }

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualizar a exibição do carrinho
    exibirCarrinho();
}

// Função para remover uma quantidade do produto no carrinho
function removerProduto(id, quantidade = 1) {
    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Encontrar o produto no carrinho
    const produtoExistente = carrinho.find(produto => produto.id === id);

    if (produtoExistente) {
        // Decrementar a quantidade
        produtoExistente.quantidade -= quantidade;

        // Se a quantidade for menor ou igual a zero, remover o produto do carrinho
        if (produtoExistente.quantidade <= 0) {
            carrinho = carrinho.filter(produto => produto.id !== id);
        }

        // Salvar o carrinho atualizado no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Atualizar a exibição do carrinho
        exibirCarrinho();
    }
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verificar se o carrinho está vazio
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    if (carrinho.length > 0) {
        // Exibir os produtos em um elemento HTML (ajuste conforme sua estrutura HTML)
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${(produto.valor * produto.quantidade).toFixed(2)} `;
            listaProdutos.appendChild(li);
        });
    } else {
        // Exibir a mensagem de carrinho vazio
        listaProdutos.innerHTML = 'O carrinho está vazio!';
    }
}

// Inicialização da aplicação: verificar se há produtos no carrinho e exibi-los
exibirCarrinho();
