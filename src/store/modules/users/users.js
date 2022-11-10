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
            context.commit('setUsers', [])
            context.commit("setExiste", false)
            context.commit('setSuccess', false)

            await axios.get("http://localhost:3000/users")
            .then((response) => {
                response.data.forEach(element => {
                    context.commit('setUsers', element)
                });
            })
            
            context.state.users.forEach(element => {
                if(element.email === user.email) {
                    context.commit("setExiste", true)
                }
            });

            if(context.state.existe) {
                context.commit('setSuccess', false)
                return false
            }
            var headers = {
                "Content-Type": "application/json"
            }
            await axios.post("http://localhost:3000/users", user, headers)
            .then(() => {
                context.commit("setUsers", user)
                context.commit('setSuccess', true)
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