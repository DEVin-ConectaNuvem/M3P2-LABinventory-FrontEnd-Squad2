import { useCookies } from "vue3-cookies";
const cookies = useCookies().cookies;
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      // Mensagem de erro para os inputs do login
      errorMsg: null,
      logoutMsg: null,
      success: false,
      user: null,
      users: [],
      url_auth: null,
    };
  },
  actions: {
    // Autenticação do login
    // Parâmetro "user" enviado pelo commit do login
    async authentication(context, user) {
      context.commit("setSuccess", false);
      context.commit("setUser", null);

      await axios.post("http://localhost:5000/users/login", user)
      .then((response) => {
        if(response.data.status_code !== 401) {
          context.commit("setSuccess", true);
          context.commit("setUser", {
            "name": response.data.name,
            "email": response.data.email,
            "token": response.data.token,
          });
          cookies.set("logged", {
                  "name": response.data.name,
                  "email": response.data.email,
                  "token": response.data.token,
                  "status": true,
                });
            
        }
        context.commit("setMsgError", response.data.error);
        
      })
      .catch((e) => {
        console.error(e)
      })
    },
    async getUrlAuth(context) {
      context.commit("setURL", null);
      await axios.post("http://localhost:5000/users/auth/google")
      .then((response) => {
        context.commit("setURL", response.data.url);
      })   
    }
  },
  mutations: {
    setURL(state, url) {
      state.url_auth = url
    },
    setMsgError(state, msg) {
      state.errorMsg = msg;
    },
    setUsers(state, user) {
      state.users.push(user);
    },
    setSuccess(state, value) {
      state.success = value;
    },
    setUser(state, user) {
      state.user = user;
    },
    logOutUser(state) {
      // Verifica se o usuário está deslogado
      // por motivo de cookie apagado
      let check = cookies.get("logged");
      if (check !== null) {
        // Se houver um cookie, a chave status torna-se false
        check.status = false;
        cookies.set("logged", check);
        // O state então armazena o sinal de logout true
        state.logoutMsg = "Logout efetuado com sucesso.";
      }
      // Se o cookie foi apagado
      if (check === null) {
        // o state armazena o sinal
        //state.alreadyLogout = true
        state.logoutMsg = "Você já efetuou o logout!";
      }
    },
  },
  getters: {
    setLogoutMsg(state) {
      return state.logoutMsg;
    },
  },
};
