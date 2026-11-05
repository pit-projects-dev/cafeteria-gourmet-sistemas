const produtos = [
    { id: 1, nome: "Café Espresso Especial", categoria: "cafe", preco: 8.50 },
    { id: 2, nome: "Cappuccino Cremoso", categoria: "cafe", preco: 12.00 },
    { id: 3, nome: "Torta de Doce de Leite", categoria: "doce", preco: 14.50 },
    { id: 4, nome: "Pão de Queijo Artesanal", categoria: "salgado", preco: 6.00 }
];

let carrinho = [];
let pedidosLoja = [];

function carregarProdutos(filtro = 'todos') {
    const grade = document.getElementById('grade-produtos');
    grade.innerHTML = '';
    
    const filtrados = filtro === 'todos' ? produtos : produtos.filter(p => p.categoria === filtro);
    
    filtrados.forEach(produto => {
        grade.innerHTML += `
            <div class="cartao-produto">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
            </div>
        `;
    });
}

function filtrarProdutos(categoria) {
    carregarProdutos(categoria);
}

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    document.getElementById('contador-carrinho').innerText = carrinho.length;
    const lista = document.getElementById('itens-carrinho');
    lista.innerHTML = '';
    
    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.preco;
        lista.innerHTML += `<p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>`;
    });
    
    document.getElementById('valor-total').innerText = total.toFixed(2);
}

function abrirCarrinho() {
    document.getElementById('modal-carrinho').style.display = 'block';
}

function fecharCarrinho() {
    document.getElementById('modal-carrinho').style.display = 'none';
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    fecharCarrinho();
    document.getElementById('modal-pix').style.display = 'block';
}

function fecharPix() {
    document.getElementById('modal-pix').style.display = 'none';
}

function confirmarPagamento() {
    document.getElementById('modal-pix').style.display = 'none';
    
    const novoPedido = {
        id: Math.floor(100 + Math.random() * 900),
        itens: carrinho.map(i => i.nome).join(', '),
        total: carrinho.reduce((acc, i) => acc + i.preco, 0),
        status: "Aprovado (PIX)"
    };
    
    pedidosLoja.push(novoPedido);
    carrinho = [];
    atualizarCarrinho();
    atualizarPainelLojista();
    alert("Pagamento confirmado com sucesso! Pedido enviado para a cozinha.");
}

function atualizarPainelLojista() {
    const corpo = document.getElementById('tabela-pedidos-corpo');
    corpo.innerHTML = '';
    
    if (pedidosLoja.length === 0) {
        corpo.innerHTML = `<tr><td colspan="4" style="text-align: center;">Nenhum pedido recente.</td></tr>`;
        return;
    }
    
    pedidosLoja.forEach(p => {
        corpo.innerHTML += `
            <tr>
                <td>#${p.id}</td>
                <td>${p.itens}</td>
                <td>R$ ${p.total.toFixed(2)}</td>
                <td><span style="color: green; font-weight: bold;">${p.status}</span></td>
            </tr>
        `;
    });
}

// Inicializar página
carregarProdutos();
