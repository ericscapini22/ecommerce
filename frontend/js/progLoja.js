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
    nomeUsuario.textContent = 'Usuário: '+ nome
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
let produtos = [
    { id: 1, nome: "Kit - 4 rodas BBS", preco: 3800.90, img: "https://http2.mlstatic.com/D_NQ_NP_2X_672740-MLB83411044974_042025-F.webp" },
    { id: 2, nome: "Equalizador Pioneer", preco: 4900.00, img: "https://img.olx.com.br/images/14/149588349524631.jpg" },
    { id: 3, nome: "2 Bancos Recaro", preco: 3499.90, img: "https://http2.mlstatic.com/D_NQ_NP_2X_814156-MLB91917230342_092025-F.webp" },
    { id: 4, nome: "Kit Turbina", preco: 1899.90, img: "https://http2.mlstatic.com/D_NQ_NP_2X_990731-MLB53162048678_012023-F-turbina-50-zr-5049-com-refluxo.webp" }
]

// =========================
//   RENDERIZAÇÃO DOS CARDS
// =========================
let lista = document.getElementById('listaProdutos');

produtos.forEach(prod => {
    lista.innerHTML += `
        <article class="produto">
            <figure>
                <img src="${prod.img}">
                <figcaption>${prod.nome}</figcaption>
            </figure>
            <div class="controle-produto">
                <br>
                <input type="number" min="1" value="1" id="qtd-${prod.id}">
                <br>
                <button onclick="add(${prod.id})">Adicionar</button>
            </div>
        </article>
    `
})

// =========================
//   ADICIONAR AO CARRINHO
// =========================
function add(id) {

    let qtd = parseInt(document.getElementById(`qtd-${id}`).value)

    let produto = produtos.find(p => p.id === id)

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

    // Adiciona item
    carrinho.push({
        id: produto.id,
        nome: produto.nome,
        qtd: qtd,
        preco: produto.preco
    })

    localStorage.setItem('carrinho', JSON.stringify(carrinho))

    alert("Produto adicionado ao carrinho!")
}