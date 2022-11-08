import { useCookies } from 'vue3-cookies'
const cookies = useCookies().cookies

export default {
    namespaced: true,
    state() {
        return {
            // Mensagem de erro para os inputs do login
            errorMsg: null,
            logoutMsg: null
        }
    },
    mutations: {
        // Autenticação do login
        // Parâmetro "user" enviado pelo commit do login
        authUser(state, user) {
            let match = 0 // Se > 0, usuário está cadastrado
            let users = JSON.parse(localStorage.getItem('users'))
            // Caso a lista users seja apagada do localstorage,
            // recria-se aqui
            if (users === null) {
                localStorage.setItem('users', JSON.stringify([]))
                users = JSON.parse(localStorage.getItem('users'))
            }
            if (users.length > 0) {
                users.forEach(element => {
                    if (user.email == element.email) {
                        match += 1
                        //let index = users.indexOf(element)
                        if (user.password == element.password) {
                            let userAuth = {name: element.name, email: element.email, status: true}
                            cookies.set('logged', userAuth)
                        } else {
                            state.errorMsg = 'E-mail ou senha incorreta.'
                        }
                    }
                });
            }
            // Se não caiu nos casos anteriores, criar conta
            if (match === 0 || users.length === 0) {
                console.log('auth não passei 3')
                state.errorMsg = 'Você deve criar uma conta antes de efetuar o login.'
            }
        },
        logOutUser(state) {
            // Verifica se o usuário está deslogado
            // por motivo de cookie apagado
            let check = cookies.get('logged')
            if (check !== null) {
                // Se houver um cookie, a chave status torna-se false
                check.status = false
                cookies.set('logged', check)
                // O state então armazena o sinal de logout true
                state.logoutMsg = 'Logout efetuado com sucesso.'
            }
            // Se o cookie foi apagado
            if (check === null) {
                // o state armazena o sinal
                //state.alreadyLogout = true
                state.logoutMsg = 'Você já efetuou o logout!'
            }
        }
    },
    getters: {
        setLogoutMsg(state) {
            return state.logoutMsg
        },
    }
}