// =========================
//   VALIDAÇÃO DE SESSÃO
// =========================
let token = sessionStorage.getItem('token')
let nome = sessionStorage.getItem('nome')
let tipo = sessionStorage.getItem('tipo')

// Se não tiver token, vai para login
if (!token) {
    location.href = '../index.html'
}

// Se não for cliente, manda para admin
if (tipo !== 'CLIENTE') {
    location.href = './home.html'
}

// =========================
//   ELEMENTOS DE TELA
// =========================
let nomeUsuario = document.getElementById('nomeUsuario')
let btnLogout = document.getElementById('btnLogout')

let area = document.getElementById('area-carrinho')
let totalTxt = document.getElementById('total')
let btnFinalizar = document.getElementById('btn-finalizar')
let btnLimpar = document.getElementById('btn-limpar')
let btnVoltar = document.getElementById('btn-voltar')

// Nome do usuário
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
//   CARRINHO
// =========================
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

// =========================
//   RENDERIZAÇÃO DA TABELA
// =========================
function render() {

    area.innerHTML = ""

    if (carrinho.length === 0) {
        area.innerHTML = `<p>Carrinho vazio</p>`
        totalTxt.textContent = "Total: R$ 0,00"
        return
    }

    let total = 0

    let tabela = `<table>
            <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Preço</th>
                <th>Subtotal</th>
            </tr>`

    carrinho.forEach(item => {
        const preco = Number(item.preco)
        const qtd = Number(item.qtd)
        const subtotal = preco * qtd
        total += subtotal

        tabela += `
        <tr>
            <td>${item.nome}</td>
            <td>${qtd}</td>
            <td>R$ ${preco.toFixed(2)}</td>
            <td>R$ ${subtotal.toFixed(2)}</td>
        </tr>
    `
    })

    tabela += `</table>`
    area.innerHTML = tabela

    totalTxt.textContent = `Total: R$ ${total.toFixed(2)}`
}

render()

// =========================
//   BOTÕES
// =========================
btnVoltar.addEventListener('click', () => location.href = './loja.html')

btnLimpar.addEventListener('click', () => {
    localStorage.removeItem('carrinho')
    carrinho = []
    render()
})

btnFinalizar.addEventListener('click', () => {
    alert("Pedido finalizado!")
    localStorage.removeItem('carrinho')
    carrinho = []
    render()
})