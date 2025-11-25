let nomeUsuario = document.getElementById('nomeUsuario')
let btnLogout = document.getElementById('btnLogout')
let btnAtualizarProduto = document.getElementById('btnAtualizarProduto')
let resListar = document.getElementById('resListar')

console.log(nomeUsuario)

// Recuperar token
let token = sessionStorage.getItem('token')

// Se não tiver token, volta para login
if (!token) {
    location.href = '../index.html'
}

onload = () => {
    fetch(`http://localhost:3000/produto`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resp => resp.json())
        .then(dados => {
            resListar.innerHTML = ``
            dados.sort((a, b) => a.nome.localeCompare(b.nome))
            resListar.innerHTML += `<table>${gerarTabela(dados)}</table>`
        })
        .catch((err) => {
            console.log('Falha ao listar os produtos!', err)
            resListar.innerHTML += err.message
        })
}

btnAtualizarProduto.addEventListener('click', (e) => {
    e.preventDefault()

    let codProduto = Number(document.getElementById(codProduto).value)
    let nome = document.getElementById('nome').value
    let descricao = document.getElementById('descricao').value
    let modelo = document.getElementById('modelo').value
    let preco = document.getElementById('preco').value
    let imagem_url = document.getElementById('imagem_url').value

    const dados = {
        codProduto: codProduto,
        nome: nome,
        descricao: descricao,
        modelo: modelo,
        preco: preco,
        imagem_url: imagem_url
    }

    fetch(`http://localhost:3000/produto/${codProduto}`, {
        method: 'PUT',
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


function gerarTabela(dados) {
    let tab = `
        <thead>
            <th>Código</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Modelo</th>
            <th>Preço</th>
            <th>Imagem (link)</th>
        </thead>
    `
    tab += `<tbody>`
    dados.forEach(dad => {
        tab += `
            <tr>
                <td>${dad.codProduto}</td>
                <td>${dad.nome}</td>
                <td>${dad.descricao}</td>
                <td>${dad.modelo}</td>
                <td>${dad.preco}</td>
                <td>${dad.imagem_url}</td>
            </tr>
        `
    })
    tab += `</tbody>`

    return tab
}