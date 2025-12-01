// =========================
//   VALIDAÇÃO DE SESSÃO
// =========================
let token = sessionStorage.getItem('token')
let nome = sessionStorage.getItem('nome')
let tipo = sessionStorage.getItem('tipo')

// Se não tiver token, redireciona para login
if (!token) {
    location.href = '../index.html'
}

// Se não for cliente, volta para admin
if (tipo !== 'CLIENTE') {
    location.href = './home.html'
}

// =========================
//   UI
// =========================
let nomeUsuario = document.getElementById('nomeUsuario');
let btnLogout = document.getElementById('btnLogout');

if (nomeUsuario && nome) {
    nomeUsuario.textContent = nome
}

// Logout
btnLogout.addEventListener("click", (e) => {
    e.preventDefault()
    sessionStorage.clear()
    localStorage.clear()
    location.href = '../index.html'
})

// =========================
//   PRODUTOS TEMPORÁRIOS
// =========================

let produtos = []

fetch('http://localhost:3000/produto', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(resp => resp.json())
.then(data => {
    produtos = data

    // depuração opcional:
    console.log('produtos recebidos:', produtos)

    data.forEach(prod => {
        // use prod.codProduto (ou o nome real do id vindo do backend)
        const id = prod.codProduto

        lista.innerHTML += `
            <article class="produto">
                <figure>
                    <img src="${prod.imagem_url}" alt="${prod.nome}">
                    <h2>${prod.nome}</h2>
                    <br>
                    <h3>R$ ${prod.preco || ''}</h3>
                    <br>
                    <p>${prod.descricao || ''}</p>
                </figure>
                <div class="controle-produto">
                    <br>
                    <input type="number" min="1" value="1" id="qtd-${id}">
                    <br>
                    <button onclick="add(${id})">Adicionar ao carrinho</button>
                </div>
            </article>
        `
    })
})

// =========================
//   RENDERIZAÇÃO DOS CARDS
// =========================
let lista = document.getElementById('listaProdutos');


// =========================
//   ADICIONAR AO CARRINHO
// =========================
function add(id) {
    const qtdInput = document.getElementById(`qtd-${id}`)
    if (!qtdInput) {
        alert('Erro: campo de quantidade não encontrado para o produto.')
        return
    }

    const qtd = parseInt(qtdInput.value) || 1

    // procurar por codProduto (ou o campo real)
    const produto = produtos.find(p => p.codProduto === id)
    if (!produto) {
        alert('Produto não encontrado!')
        return
    }

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

    const itemExistente = carrinho.find(item => item.id === produto.codProduto)

    if (itemExistente) {
        itemExistente.qtd += qtd
    } else {
        carrinho.push({
            id: produto.codProduto,            // id único
            nome: produto.nome,
            qtd: qtd,
            preco: Number(produto.preco)       // garante número
        })
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho))

    alert("Produto adicionado ao carrinho!")
}