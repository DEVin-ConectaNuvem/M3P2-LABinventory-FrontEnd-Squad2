<template>
    <div class="row">
        <div class="col-7">
            <div class="container text-center">
                <img 
                id="inventory-img" 
                src="../assets/loginimg.png" 
                alt="Inventário">
            </div>
            <div class="lab365">
                <img 
                id="lab365-img" 
                src="../assets/lab365logo.png" 
                alt="LAB365">
            </div>
        </div>

        <div class="col-5">
            <div class="container">
                <div class="criar-conta">
                    <span>Não possui uma conta?</span>
                    <button
                    id="create-account" 
                    class="btn btn-outline-info" 
                    data-bs-toggle="modal" 
                    data-bs-target="#newAccountModal">
                    Criar conta</button>
                </div>
                <div class="form">
                    <h2>Login</h2>
                    <login-form 
                    id="loginform" 
                    @submit="auth" 
                    :validation-schema="schema" 
                    v-slot="{ errors }">
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <login-field 
                            type="email" 
                            class="form-control" 
                            name="email" 
                            v-model="user.email"/>
                            <span 
                            class="text-danger" 
                            v-text="errors.email" 
                            v-show="showMailError">
                            </span>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Senha</label>
                            <login-field 
                            type="password" 
                            class="form-control" 
                            name="password" 
                            v-model="user.password"/>
                            <span 
                            class="text-danger" 
                            v-text="errors.password" 
                            v-show="showPassError">
                            </span>
                        </div>
                        <button 
                        class="btn btn-outline-info" 
                        type="button" 
                        @click="cleanForm">
                        Limpar
                        </button>
                        <button 
                        type="submit" 
                        class="btn btn-info">
                        Entrar
                        </button>
                    </login-form>
                    <div class="alternative">
                        <button 
                        id="google" 
                        class="btn btn-outline-info" 
                        @click="inProgress">
                        Entrar com Google
                        </button>
                        <p><router-link 
                        id="forgot-link" 
                        to="/" 
                        @click="inProgress">
                        Esqueceu a senha?
                        </router-link></p>
                    </div>
                </div>
            </div>
            <div class="logo">
                <img 
                id="dev-inv-img" 
                src="../assets/InventaryLogonobg.png" 
                alt="Devinventory logo">
            </div>
        </div>
    </div>
    <ModalNewAccount></ModalNewAccount>
</template>
<script>
import { Form, Field } from 'vee-validate'
import rules from '../validations/validateusers'
import { useCookies } from 'vue3-cookies'
import ModalNewAccount from './ModalNewAccount.vue'
import { mapActions, mapState } from 'vuex'

const cookies = useCookies().cookies
rules

export default {
    data() {
        return {
            schema: {
                email: 'required',
                password: 'required',
            },
            user: {}
        }
    },
    components: {
        "login-form": Form,
        "login-field": Field,
        ModalNewAccount
    },
    methods: {
        ...mapActions(["auth/authentication"]),
        auth() {
            this['auth/authentication']({
                "email": this.user.email,
                "password": this.user.password
            }).then(() => {
                if(this.success) {
                    this.$router.push('/users/inventario')
                    this.$toast.info(`Bem-vindo(a), ${this.userLogged.name}!`, {position: 'top-right'})

                } else {
                    this.$toast.error(this.errorMsg)
                }
            })
        },
        cleanForm() {
            let form = document.getElementById('loginform')
            form.reset()
        },
        inProgress() {
            this.$toast.info(`Pedimos desculpas...as funcionalidades "Entrar com Google" e "Esqueceu senha?" estão em construção.`, {position: 'top-left'});
        }
    },
    computed: {
        ...mapState({
            success: (state) => state.auth.success,
            errorMsg: (state) => state.auth.errorMsg,
            userLogged: (state) => state.auth.user
        }),
        showMailError() {
            // Torna a visualização da mensagem de erro responsiva
            if (this.user.email) {
                if (this.user.email.length > 0) {
                    return false
                }
            }
            return true
        },
        showPassError() {
            // Torna a visualização da  mensagem de erro responsiva
            if (this.user.password) {
                if (this.user.password.length > 0) {
                    return false
                }
            }
            return true
        },
    },
    mounted() {
        // Cria listas de users e itens vazias no localstorage, caso não existam
        if (localStorage.getItem('users') === null) {
            let users = []
            localStorage.setItem('users', JSON.stringify(users))
        }
        if (localStorage.getItem('itens') === null) {
            let itens = []
            localStorage.setItem('itens', JSON.stringify(itens))
        }
        // Se usuário já estiver logado, envia para o inventário
        if (cookies.get('logged') !== null) {
            if (cookies.get('logged').status === true) {
                this.$router.push('/users/inventario')
            }
        } 
    }
}
</script>
<style scoped>
/* Div geral */
.row {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 100%;
}
/* Coluna da imagem grande */
.col-7 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 150px 20px 10px 10px;
    background-color: aliceblue;
}
/* Div da Coluna de login */
.col-5 {
    background-color: rgb(14, 34, 63);
    padding-right: 40px;
    padding-left: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
/* Imagem grande */
#inventory-img {
    max-width: 450px;
}
/* Imagem pequena LAB365 */
#lab365-img {
    max-width: 90px;
}
/* Devinventory logo */
#dev-inv-img {
    max-width: 150px;
}
/* Div da imagem LAB365 */
.lab365 {
    text-align: right;
}
/* Botões */
.btn {
    margin: 4px;
}
/* Div do botão criar conta */
.criar-conta {
    text-align: right;
    margin-bottom: 30px;
}
/* Div do form */
#loginform {
    margin-top: 40px;
    margin-bottom: 40px;
    padding-right: 80px;
}
/* Div do botão Entrar com Google e esqueceu senha? */
.alternative {
    display:block;
    text-align: center;
    padding-right:70px;
}
/* Div do devinvetory logo */
.logo {
    text-align: right;
    
}
/* Botão Entrar com Google */
#google {
    margin-bottom: 20px;
}
h2, .form-label, #forgot-link {
    color: rgb(7, 201, 239);
    margin-bottom: 1px;
}
</style>