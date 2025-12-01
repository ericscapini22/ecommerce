let nomeUsuario = document.getElementById('nomeUsuario')
let msg = document.getElementById('msg')
let btnLogout = document.getElementById('btnLogout')

console.log(nomeUsuario)

// Recuperar token
let token = sessionStorage.getItem('token')

// Se não tiver token, volta para login
if (!token) {
    location.href = '../index.html'
}

// Recuperar nome e tipo de usuário
let nome = sessionStorage.getItem('nome')
let tipo = sessionStorage.getItem('tipo')
console.log(nome,tipo)

// Escrever nome na tela
if (nomeUsuario && nome) {
    nomeUsuario.innerHTML = nome
}

// Mensagem de boas-vindas
if (msg && nome) {
    msg.innerHTML = `Olá, ${nome}!`
    msg.style.fontSize = '1.2rem'
    msg.style.fontWeight = 'bold'
}

// Logout
btnLogout.addEventListener('click', (e) => {
    e.preventDefault()

    // Apagar sessão
    sessionStorage.clear()

    // Voltar para login
    location.href = '../index.html'
})