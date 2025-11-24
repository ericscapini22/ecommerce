let btnLogin = document.getElementById('btnLogin')

btnLogin.addEventListener('click', (e)=>{
    e.preventDefault()

    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    if (!email || !senha) {
        res.innerHTML = `Preencha todos os campos!`
        res.style.color = 'red'
        res.style.textAlign = 'center'
        return
    }

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

        console.log(dados)
            console.log('nome', dados.usuario.nome)
            console.log('tipo', dados.usuario.tipo)

            if (!dados.token) {
                res.innerHTML = dados.message || 'Erro ao fazer login!'
                res.style.color = 'red'
                res.style.textAlign = 'center'
                return
            }

            // Salvar token 
            sessionStorage.setItem('token', dados.token)
            // Salvar nome
            sessionStorage.setItem('nome', dados.usuario.nome)
            sessionStorage.setItem('tipo', dados.usuario.tipo)

            // res.innerHTML = `<br>`
            // res.innerHTML += `<hr>`
            // res.innerHTML += `<br>`
            // res.innerHTML += `Login realizado com sucesso!`
            // res.style.color = 'white'
            // res.style.textAlign = 'center'
            // res.style.fontWeight = 'bold'

            // setTimeout(() => {
            //     // Redirecionar conforme tipo
            //     if (dados.usuario.tipo === 'ADMIN') {
            //         location.href = './pages/home.html'
            //     } else {
            //         location.href = './pages/loja.html'
            //     }
            // }, 1500)
    })
    .catch((err)=>{
        console.error('Falha ao fazer login!',err)
        alert('Falha ao fazer login!')
    })
})