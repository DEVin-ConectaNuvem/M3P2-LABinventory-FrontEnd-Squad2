import axios from "axios";


export default {
    namespaced: true,
    state() {
        return {
            // Utilizado para disparar mensagem de finalização
            // no compenente ModalNewAccount
            success: false,
            account: null,
            users: [],
            existe: false,
        }
    },
    mutations: {
        setAccountUser(state, value) {
            state.account = value
        },
        setUsers(state, users) {
            state.users.push(users)
        },
        setExiste(state, value) {
            state.existe = value
        },
        setSuccess(state, value) {
            state.success = value
        }
    },
    actions: {
        // Cria uma nova conta de usuário
        // Parâmetro user é enviado pelo modal de criação de conta
        async setAccount(context, user) {
            context.commit('setSuccess', false)

            var headers = {
                "Content-Type": "application/json"
            }
            await axios.post("https://labinventory-backend-vjqcwqvuka-uc.a.run.app/users/create", user, headers)
            .then((response) => {
                if(response.status == 201) {
                    context.commit('setSuccess', true)
                }
                return true
            })
            .catch((e) => {
                console.error("error", e)
            })
            .finally(() => {

            })
        }
    }
}