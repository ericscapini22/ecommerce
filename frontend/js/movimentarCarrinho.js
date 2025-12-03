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

//   ELEMENTOS DE TELA

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

//   CARRINHO

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

//   RENDERIZAÇÃO DA TABELA

function render() {
    area.innerHTML = ""

    if (carrinho.length === 0) {
        area.innerHTML = `<p class="carrinho-vazio">🛒 Carrinho vazio</p>`
        totalTxt.textContent = "Total: R$ 0,00"
        return
    }

    let total = 0
    let html = ""

    carrinho.forEach((item, index) => {
        const preco = Number(item.preco)
        const qtd = Number(item.qtd)
        const subtotal = preco * qtd
        total += subtotal

        html += `
        <div class="item-card">
            <div class="item-info">
                <h3>${item.nome}</h3>
                <p>Preço: <span>R$ ${preco.toFixed(2)}</span></p>
                <p>Quantidade: <span>${qtd}</span></p>
                <p class="subtotal">Subtotal: R$ ${subtotal.toFixed(2)}</p>
            </div>
            <img src="${item.imagem_url}" class="img_carrinho" style="width:90px; object-fit:cover; border-radius:6px;">
            <button class="btn-remover" onclick="removerItem(${index})">X</button>
        </div>
        `
    })

    area.innerHTML = html
    totalTxt.textContent = `Total: R$ ${total.toFixed(2)}`
}
render()

function removerItem(index) {
    carrinho.splice(index, 1)
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
    render()
}

//   BOTÕES

btnVoltar.addEventListener('click', () => location.href = './loja.html')

btnLimpar.addEventListener('click', () => {
    localStorage.removeItem('carrinho')
    carrinho = []
    render()
})

btnFinalizar.addEventListener('click', async () => {
    if (carrinho.length === 0) {
        alert("Carrinho vazio!")
        return
    }

    const token = sessionStorage.getItem('token')

    let dados = {
        itens: carrinho
    }

    const resp = await fetch('http://localhost:3000/finalizar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    })

    const resultado = await resp.json()

    if (resp.ok) {
        alert(`Pedido Finalizado! Código Número: ${resultado.codPedido}`)

        localStorage.setItem('idPedido', resultado.codPedido)

        localStorage.removeItem('carrinho')
        location.href = './entrega.html'
    } else {
        alert("Erro: " + resultado.message)
    }
})