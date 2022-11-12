import axios from "axios";

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
    };
  },
  mutations: {
    setSelectedId(state, value) {
      state.selectedId = value;
    },
    // Recebe o objeto com os dados do colaborador
    // Em caso de edição de colaborador cadastrado ou novo cadastro
    saveCollab(state, collab) {
      // Traz as informações de CEP do colaborador
      let addressInfo = state.cepInfo;
      // Retira a key "complemento" do objeto
      let cleanInfo = {};
      for (const [key, value] of Object.entries(addressInfo)) {
        if (key !== "complemento") {
          cleanInfo[key] = value;
        }
      }
      // Objeto com as informações sobre o colaborador
      let collabObj = { ...collab, ...cleanInfo };
      try {
        state.saveSuccess = false;
        // Se localstorage estiver vazio
        if (localStorage.getItem("collaborators") === null) {
          let collaborators = [];
          collabObj.id = 1;
          collaborators.push(collabObj);
          localStorage.setItem("collaborators", JSON.stringify(collaborators));
          state.saveSuccess = true;
        } else {
          // Se localstorage contém uma lista
          let collabList = JSON.parse(localStorage.getItem("collaborators"));
          let already = false;
          // Verifica se já está cadastrado
          collabList.forEach((item) => {
            let firstName = item.nome.split(" ")[0];
            let collabFirstName = collabObj.nome.split(" ")[0];
            if (
              item.nascimento === collabObj.nascimento &&
              firstName === collabFirstName
            ) {
              already = true;
              // Etapa para casos de edição
              let index = collabList.indexOf(item);
              item = { ...collabObj };
              collabList[index] = item;
              localStorage.setItem("collaborators", JSON.stringify(collabList));
              state.saveSuccess = true;
            }
          });
          // Se não houver nenhum registro, insere e salva
          if (!already) {
            let index = collabList.length + 1;
            collabObj.id = index;
            collabList.push(collabObj);
            localStorage.setItem("collaborators", JSON.stringify(collabList));
            state.saveSuccess = true;
          }
        }
      } catch (e) {
        // Se der algum problema
        state.saveSuccess = false;
      }
    },

    // Obtém a lista de colaboradores
    // getCollabs(state) {
    //   let collabs = JSON.parse(localStorage.getItem("collaborators"));
    //   if (collabs !== null) {
    //     state.collabs = collabs;
    //   }
    // },
    delCollab(context, collab) {
        axios
        .delete(`http://localhost:3000/collaborators/${collab}`)
        .then((response) => {
          console.log(response)
          
        })
        .catch(() => {
          // No caso de qualquer outro erro na requisição
          context.commit("setMsgError", "Erro na exclusão colaboradores.");
        });

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
  },
  actions: {

    async getCollabs(context) {
      
      await axios
        .get("http://localhost:3000/collaborators")
        .then((response) => {
          this.state.collabs = response.data
          
        })
        .catch(() => {
          // No caso de qualquer outro erro na requisição
          context.commit("setMsgError", "Erro na consulta de colaboradores.");
        });

        return this.state.collabs
    },
      async getOneCollab(context, id) {
      
      await axios
        .get(`http://localhost:3000/collaborators/${id}`)
        .then((response) => {
          this.state.collabs = response.data
          
        })
        .catch(() => {
          // No caso de qualquer outro erro na requisição
          context.commit("setMsgError", "Erro na consulta do colaborador.");
        });

        return this.state.collabs
    },
    async DelCollab(context, user) {
      
      await axios
        .delete(`http://localhost:3000/collaborators/${user}`)
        .then((response) => {
          console.log(response)
          
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
      context.commit("setSaveSuccess", false);
      context.commit("setExists", false);
      context.commit("setResetCollabs");
      await axios.get("http://localhost:3000/collaborators").then((res) => {
        res.data.forEach((el) => {
          context.commit("setCollabs", el);
        });
      });

      context.state.collabs.forEach((el) => {
        if (el.email === colab.collab.email) {
          context.commit("setExists", true);
        }
      });

      if (context.state.exists) {
        context.commit("setMsgError", "Usuário já existe na base de dados");
        return false;
      }

      let payload = {
        nome: colab.collab.nome,
        genero: colab.collab.genero,
        nascimento: colab.collab.nascimento,
        telefone: colab.collab.telefone,
        bairro: colab.address.bairro,
        cargo: colab.collab.cargo,
        cep: colab.address.cep,
        complemento: colab.collab.complemento,
        email: colab.collab.email,
        localidade: colab.address.localidade,
        logradouro: colab.address.logradouro,
        numero: colab.collab.numero,
        referencia: colab.collab.referencia,
        uf: colab.address.uf,
      };
      await axios
        .post("http://localhost:3000/collaborators", payload)
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
