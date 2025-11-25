let nomeUsuario = document.getElementById('nomeUsuario')
let btnLogout = document.getElementById('btnLogout')
let btnCadProduto = document.getElementById('btnCadProduto')

console.log(nomeUsuario)

// Recuperar token
let token = sessionStorage.getItem('token')

// Se não tiver token, volta para login
if (!token) {
    location.href = '../index.html'
}

btnCadProduto.addEventListener('click', (e) => {
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let descricao = document.getElementById('descricao').value
    let modelo = document.getElementById('modelo').value
    let preco = document.getElementById('preco').value
    let imagem_url = document.getElementById('imagem_url').value

    const dados = {
        nome: nome,
        descricao: descricao,
        modelo: modelo,
        preco: preco,
        imagem_url: imagem_url
    }

    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    })
        .then(resp => resp.json())
        .then(dados => {
            alert('Produto cadastrado com sucesso!')
        })
        .catch((err) => {
            console.error('Falha ao cadastrar produto!', err)
            alert('Falha ao cadastrar produto!')
        })
})

// Recuperar nome e tipo de usuário
let nome = sessionStorage.getItem('nome')
let tipo = sessionStorage.getItem('tipo')
console.log(nome, tipo)

// Escrever nome na tela
if (nomeUsuario && nome) {
    nomeUsuario.innerHTML = `Usuário: ${nome}`
}

// Logout
btnLogout.addEventListener('click', (e) => {
    e.preventDefault()

    // Apagar sessão
    sessionStorage.clear()

    // Voltar para login
    location.href = '../index.html'
})