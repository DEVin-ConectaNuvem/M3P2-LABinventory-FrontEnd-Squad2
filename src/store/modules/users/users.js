export default {
    namespaced: true,
    state() {
        return {
            // Utilizado para disparar mensagem de finalização
            // no compenente ModalNewAccount
            success: false
        }
    },
    mutations: {
        // Cria uma nova conta de usuário
        // Parâmetro user é enviado pelo modal de criação de conta
        setAccount(state, user) {
            let users = JSON.parse(localStorage.getItem('users'))
            // Caso a lista users seja apagada do localstorage,
            // recria-se aqui
            if (users === null) {
                let setUsers = []
                localStorage.setItem('users', JSON.stringify(setUsers))
                users = JSON.parse(localStorage.getItem('users'))
            }
            //Se o email já estiver cadastrado, "registered" recebe true
            let registered = false
            // Verifica se a conta já está criada
            if (users.length > 0) {
                users.forEach( item => {
                  if (item.email == user.email) {
                      registered = true
                  }
                })
            }
            // Se não houver o registro, cria a conta
            // Armazena no localstorage
            if (!registered) {
                users.push(user)
                let newUser = JSON.stringify(users)
                localStorage.setItem('users', newUser)
                state.success = true
            }
        }
    }
}