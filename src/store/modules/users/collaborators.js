import axios from "axios";
import { useCookies } from "vue3-cookies";
const cookies = useCookies().cookies;

export default {
  namespaced: true,
  state() {
    return {
      saveSuccess: false,
      exists: false,
      cepInfo: {},
      errorMsg: "",
      errorCep: "",
      collabs: [],
      selectedId: null,
      totalCollabs: 0,
      editUser: false,
    };
  },
  mutations: {
    setEditUser(state, status) {
      state.editUser = status;
    },
    setSelectedId(state, value) {
      state.selectedId = value;
    },
    setCepInfo(state, info) {
      state.cepInfo = {
        localidade: info.localidade,
        bairro: info.bairro,
        logradouro: info.logradouro,
        uf: info.uf,
      };
    },
    setSaveSuccess(state, value) {
      state.saveSuccess = value;
    },
    setExists(state, value) {
      state.exists = value;
    },
    setCollabs(state, colab) {
      state.collabs.push(colab);
    },
    setResetCollabs(state) {
      state.collabs = [];
    },
    setMsgError(state, msg) {
      state.errorMsg = msg;
    },
    setMsgErrorCep(state, msg) {
      state.errorCep = msg;
    },
    totalCollabsStats(state, total) {
      state.totalCollabs = total;
    },
  },
  actions: {
    async getCollabs(context) {
      let headers = { 
        headers: {
            'Authorization': "Bearer" + cookies.get("logged").token,
            'Access-Control-Allow-Origin': "http://localhost:5000/collabs/",
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '86400'
        }
    }
      context.commit("setResetCollabs")
      await axios
        .get("http://localhost:5000/collabs/", headers)
        .then((response) => {
          response.data.records.forEach((e) => {
            context.commit("setCollabs", e)
          })
        })
        .catch(() => {
          // No caso de qualquer outro erro na requisição
          context.commit("setMsgError", "Erro na consulta de colaboradores.");
        });
      context.commit("totalCollabsStats", context.state.collabs.length);
      return true
    },
    async getOneCollab(context, id) {
      await axios
        .get(`http://localhost:5000/collabs/${id}`, { 
          headers: {
              'Authorization': "Bearer" + cookies.get("logged").token,
              'Access-Control-Allow-Origin': "http://localhost:5000/collabs",
              'Access-Control-Allow-Methods': 'GET',
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Max-Age': '86400'
          }
      })
        .then((response) => {
          this.state.collabs = response.data.records;
        })
        .catch(() => {
          // No caso de qualquer outro erro na requisição
          context.commit("setMsgError", "Erro na consulta do colaborador.");
        });

      return this.state.collabs;
    },
    async DelCollab(context, user) {
      await axios
        .delete(`http://localhost:5000/collabs/${user}`, { 
          headers: {
              'Authorization': "Bearer" + cookies.get("logged").token,
              'Access-Control-Allow-Origin': "http://localhost:5000/collabs",
              'Access-Control-Allow-Methods': 'DELETE',
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Max-Age': '86400'
          }
      })
        .then(() => {
          context.dispatch("getCollabs")
        })
        .catch(() => {
          // No caso de qualquer outro erro na requisição
          context.commit("setMsgError", "Erro na exclusão colaboradores.");
        });
    },

    // Recebe o CEP do novo ou colaborador editado
    // Verifica se o CEP é válido
    async cepInfo(context, cep) {
      context.commit("setMsgErrorCep", "");
      // Verifica se o CEP é válido
      let headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      };
      await axios
        .get(`https://viacep.com.br/ws/${cep}/json/`, headers)
        .then((response) => {
          context.commit("setCepInfo", response.data);
          //console.log(context.state.cepInfo);
        })
        .catch(() => {
          // No caso de qualquer outro erro na requisição
          context.commit("setMsgErrorCep", "CEP inválido.");
        });
      // Reseta o errorMsg para false após 5 seg.
      // para não ficar aparecendo no input
      setTimeout(() => {
        context.state.errorMsg = false;
      }, 5000);
    },
    async saveCollab(context, colab) {
      let collab = {...colab.collab, ...colab.address}
      // Zerando variáveis de controle
      context.commit("setSaveSuccess", false);
      context.commit("setExists", false);
      context.commit("setResetCollabs");
      // Se flag edit estiver true, entra no bloco pra requisição put
      if (context.state.editUser) {
        console.log(colab)
        await axios
          .put(`http://localhost:5000/collabs/edit/${colab.id}`, colab, { 
            headers: {
                'Authorization': "Bearer" + cookies.get("logged").token,
                'Access-Control-Allow-Origin': "http://localhost:5000/collabs/edit/",
                'Access-Control-Allow-Methods': 'PUT',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '86400'
            }
        })
          .then(() => {
            context.commit("setSaveSuccess", true);
            context.commit("setEditUser", false);
          });
          context.dispatch("getCollabs")
          return true
        // se flag edit estiver false, entra no bloco post
      } else {
    //     // Fazendo requisição pra coletar todos os colabs do banco
    //   await axios.get("http://localhost:5000/collabs", { 
    //     headers: {
    //         'Authorization': "Bearer" + cookies.get("logged").token,
    //         'Access-Control-Allow-Origin': "http://localhost:5000/collabs",
    //         'Access-Control-Allow-Methods': 'GET',
    //         'Access-Control-Allow-Headers': '*',
    //         'Access-Control-Max-Age': '86400'
    //     }
    // }).then((res) => {
    //     res.data.records.forEach((el) => {
    //       context.commit("setCollabs", el);
    //     });
    //   });
      // // Verifica se email ja se encontra cadastrado no banco
      // context.state.collabs.forEach((el) => {
      //   if (el.email === colab.collab.email) {
      //     context.commit("setExists", true);
      //   }
      // });

      // // Se email existir, seta mensagem de erro e retorna false
      // if (context.state.exists) {
      //   context.commit("setMsgError", "Usuário já existe na base de dados");
      //   return false;
      // }
      }
      // Se email não existir no banco, colaborador é cadastrado
      // let payload = {
      //   nome: colab.collab.nome,
      //   genero: colab.collab.genero,
      //   nascimento: colab.collab.nascimento,
      //   telefone: colab.collab.telefone,
      //   bairro: colab.address.bairro,
      //   cargo: colab.collab.cargo,
      //   cep: colab.address.cep,
      //   complemento: colab.collab.complemento,
      //   email: colab.collab.email,
      //   localidade: colab.address.localidade,
      //   logradouro: colab.address.logradouro,
      //   numero: colab.collab.numero,
      //   referencia: colab.collab.referencia,
      //   uf: colab.address.uf,
      // };
      await axios
        .post("http://localhost:5000/collabs/", collab, { 
          headers: {
              'Authorization': "Bearer" + cookies.get("logged").token,
              'Access-Control-Allow-Origin': "http://localhost:5000/collabs/",
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Max-Age': '86400'
          }
      })
        .then(() => {
          context.commit("setSaveSuccess", true);
          return true;
        })
        .catch((e) => {
          context.commit("setMsgError", "Erro ao cadastrar usuário", e);
          return false;
        });
    },
  },
  getters: {
    sendErrorMsg(state) {
      return state.errorMsg;
    },
    sendCollabs(state) {
      return state.collabs;
    },
    sendSelectedId(state) {
      return state.selectedId;
    },
  },
};
