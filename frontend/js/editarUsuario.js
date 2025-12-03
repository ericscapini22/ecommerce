let token = sessionStorage.getItem('token')
let nome = sessionStorage.getItem('nome')

if (!token) {
    location.href = '../index.html'
}

let nomeUsuario = document.getElementById('nomeUsuario')
let btnLogout = document.getElementById('btnLogout')

const nomeInput = document.getElementById('nome')
const emailInput = document.getElementById('email')
const telefoneInput = document.getElementById('telefone')
const cpfInput = document.getElementById('cpf')
const identidadeInput = document.getElementById('identidade')
const btnEditar = document.getElementById('btnEditarUsuario')
const btnApagar = document.getElementById('btnApagarUsuario')

// Email e CPF só leitura
emailInput.setAttribute('readonly', true)
cpfInput.setAttribute('readonly', true)

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

async function carregarDadosUsuario() {
    try {
        const resp = await fetch('http://localhost:3000/usuario/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!resp.ok) throw new Error('Erro ao buscar dados!')

        const usuario = await resp.json()

        nomeInput.value = usuario.nome
        emailInput.value = usuario.email
        telefoneInput.value = usuario.telefone
        cpfInput.value = usuario.cpf
        identidadeInput.value = usuario.identidade || ''

    } catch (err) {
        alert(err.message)
    }
}

carregarDadosUsuario()

btnEditar.addEventListener('click', async (e) => {
    e.preventDefault()

    const valoresAtualizados = {
        nome: nomeInput.value,
        telefone: telefoneInput.value,
        identidade: identidadeInput.value
    }

    try {
        const resp = await fetch('http://localhost:3000/usuario/me', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(valoresAtualizados)
        })

        const data = await resp.json()
        if (!resp.ok) throw new Error(data.message)

        alert("Dados atualizados com sucesso!")
        sessionStorage.setItem('nome', valoresAtualizados.nome)
        nomeUsuario.textContent = valoresAtualizados.nome

    } catch (err) {
        alert("Erro ao atualizar: " + err.message)
    }
})

btnApagar.addEventListener('click', async () => {
    if (!confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível! ⛔")) {
        return
    }

    try {
        const resp = await fetch('http://localhost:3000/usuario/me', {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await resp.json()
        // Verifica se a resposta da requisição não foi bem-sucedida (status HTTP de erro).
        // Caso seja um erro, lança uma exceção utilizando a mensagem retornada pela API.
        if (!resp.ok) throw new Error(data.message)


        sessionStorage.clear()
        localStorage.clear()

        document.body.innerHTML = "<h2 style='color:white; text-align:center;'>Excluindo conta...</h2>"

        // Redireciona SEM chance de código continuar executando
        window.location.replace('../index.html')
        return
    } catch (err) {
        alert("Erro ao apagar conta: " + err.message)
    }
})