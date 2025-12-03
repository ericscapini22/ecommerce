let token = sessionStorage.getItem('token')
let nome = sessionStorage.getItem('nome')

if (!token) {
    location.href = '../index.html'
}

let nomeUsuario = document.getElementById('nomeUsuario')
let btnLogout = document.getElementById('btnLogout')

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

let btnVoltarLoja = document.getElementById('btnVoltarLoja')

btnVoltarLoja.addEventListener('click', () => {
    window.location.href = './loja.html'
})

async function carregarUltimoPedido() {
    try {
        const resp = await fetch('http://localhost:3000/finalizar/me', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (!resp.ok) {
            throw new Error("Erro ao buscar pedidos!")
        }

        const pedidos = await resp.json()

        if (pedidos.length === 0) {
            document.querySelector('.info-pedido').innerHTML = "<p>Nenhum pedido encontrado!</p>"
            return
        }

        const pedido = pedidos[0] // Último pedido

        document.getElementById('numPedido').textContent   = pedido.codPedido
        document.getElementById('dataPedido').textContent  = new Date(pedido.createdAt).toLocaleDateString('pt-BR')
        document.getElementById('totalPago').textContent   = `R$ ${Number(pedido.valorTotal).toFixed(2)}`
        
    } catch (err) {
        console.error(err)
        alert(err.message)
    }
}

carregarUltimoPedido()