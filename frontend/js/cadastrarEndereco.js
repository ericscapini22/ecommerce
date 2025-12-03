const formEndereco = document.querySelector("form")
const inputCEP = document.getElementById('cep')

const idPedido = localStorage.getItem('idPedido')

//   VALIDAÇÃO DE SESSÃO

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

async function buscarCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = await response.json()

        if (data.erro) {
            alert("CEP não encontrado!")
            return
        }

        document.getElementById("logradouro").value = data.logradouro
        document.getElementById("bairro").value = data.bairro
        document.getElementById("localidade").value = data.localidade
        document.getElementById("uf").value = data.uf

    } catch (err) {
        console.error("Erro ao consultar CEP:", err)
    }
}

formEndereco.addEventListener("submit", async (e) => {
    e.preventDefault()

    const dados = {
        idPedido,
        cep: cep.value,
        logradouro: logradouro.value,
        numero: numero.value,
        complemento: complemento.value,
        bairro: bairro.value,
        localidade: localidade.value,
        uf: uf.value
    }

    try {
        const resp = await fetch("http://localhost:3000/entrega", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        })

        const resultado = await resp.json()

        if (!resp.ok) {
            alert(resultado.message || "Erro ao salvar endereço")
            return
        }

        alert("Endereço salvo com sucesso! 🚚✨")
        
        // Redirecionar para página de sucesso
        window.location = "./pedidoFinalizado.html"

    } catch (err) {
        console.error("ERRO NO ENVIO:", err)
        alert("Erro ao cadastrar endereço!")
    }
})

inputCEP.addEventListener("blur", () => {
    // Remove todos os caracteres que não sejam números do campo CEP
    const cep = inputCEP.value.replace(/\D/g, "")

    // Um CEP válido possui exatamente 8 dígitos
    if (cep.length === 8) {
        // Se o formato estiver correto, chama a função que buscará os dados do endereço
        buscarCEP(cep)
    }
})
