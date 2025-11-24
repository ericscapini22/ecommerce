let btnLogin = document.getElementById('btnLogin')

btnLogin.addEventListener('click', (e)=>{
    e.preventDefault()

    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    const dados = {
        email: email,
        senha: senha
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(resp => resp.json())
    .then(dados => {
        alert('Login realizado com sucesso!')

        localStorage.setItem('statusLog', true)
        localStorage.setItem('nome', dados.nome)
    })
    .catch((err)=>{
        console.error('Falha ao fazer login!',err)
        alert('Falha ao fazer login!')
    })
})