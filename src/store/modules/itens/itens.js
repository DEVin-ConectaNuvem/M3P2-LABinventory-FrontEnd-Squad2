import axios from "axios";
import { useCookies } from "vue3-cookies";
const cookies = useCookies().cookies;

export default {
    namespaced: true,
    state() {
        return {
            sendItens: [], // Lista atual de itens
            item: {}, // Item selecionado para edição
            toEdit: null, // Código do patrimônio
            stats: {}, // Cálculos para SMALL CARDS no inventário
            edit: false,
            errorMsg: '',
            itens: [],
            exists: false
        }
    },
    mutations: {
        setExists(state, value) {
            state.exists = value;
          },
        getItem(state, patr) {
            state.sendItens.forEach(item => {
                if (item.patrimonio == patr) {
                    state.item = item
                }
            })
        },
        editItem(state, patr) {
            state.toEdit = patr
        },
        setItens(state, itens){
            state.itens.push(itens)
        },
        
        // Calcula estatísticas para SMALL CARDS
        itemStats(state) {
            // Quantidade de itens
            state.stats.itens = state.sendItens.length
            // Valor total dos itens
            var totalValue = 0
            state.sendItens.forEach((e) => {
                totalValue = totalValue + e.valor
            })
            state.stats.total = totalValue
            // Verifica no array de itens quantos estão emprestados
            let emprestados = 0
            state.sendItens.forEach(item => {
                if (item.emprestado !== "Item disponível" && item.emprestado !== "") {
                    emprestados++
                }
            })
            state.stats.emprestados = emprestados  
        },
        setMsgError(state, msg) {
            state.errorMsg = msg;
          },
        setSendItens(state, itens) {
            state.sendItens = itens
        }
    },
    actions: {
        // Salva um objeto item novo ou editado no localStorage
        async saveItem(context, item) {
            context.commit("setExists", false);
            await axios.get("https://labinventory-backend-vjqcwqvuka-uc.a.run.app/items/", {
                headers: {
                    'Authorization': cookies.get("logged").token,
                }
            })
            .then(response => {
                response.data.records.forEach(item => {
                    context.commit("setItens", item);
                });
            });

            await axios.post("https://labinventory-backend-vjqcwqvuka-uc.a.run.app/items/", item, {
                headers: {
                    'Authorization': "Bearer" + cookies.get("logged").token,
                    'Access-Control-Allow-Origin': "https://labinventory-backend-vjqcwqvuka-uc.a.run.app/items/",
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Max-Age': '86400'
                }
            })
            .then(() => {
                return true;
            })
            .catch(e => {
                context.commit("setExists", true);
                context.commit('setMsgError', e.response.data.error);
                return false;
            })
        },

        async saveItemedit(context, item) {
            await axios.patch(`https://labinventory-backend-vjqcwqvuka-uc.a.run.app/items/?_id=${item._id}`, item, {
                headers: {
                  'Authorization': "Bearer" + cookies.get("logged").token,
                  'Access-Control-Allow-Origin': "*"
                }}).then((response) => {
                    context.dispatch("getItens")
                    let toast = require("vue-toast-notification")
                    toast.useToast().info(response.data.sucesso, {position: 'top-right'})
                })
        },
        // Deleta um objeto item do array de itens pelo código de patrimônio
        async delItem(context, patr) {
            await axios.delete(`https://labinventory-backend-vjqcwqvuka-uc.a.run.app/items/${patr}`, {
                headers: {
                    'Authorization': "Bearer" + cookies.get("logged").token,
                    'Access-Control-Allow-Origin': "https://labinventory-backend-vjqcwqvuka-uc.a.run.app/items",
                    'Access-Control-Allow-Methods': 'DELETE',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Max-Age': '86400'
                }
            })
            .then(() => {
                context.dispatch("getItens")
                return true
            })
            .catch((e) => {
                console.error("error", e)
            })
            return true
        },
        // Insere key "emprestado: colaborador no item"
        flagItem(context, item) {
            axios.patch(`https://labinventory-backend-vjqcwqvuka-uc.a.run.app/items/?_id=${item._id}`, item, {
                headers: {
                    'Authorization': "Bearer" + cookies.get("logged").token,
                    'Access-Control-Allow-Origin': "*"
                }})
                .then(() => {
                    context.dispatch("getItens")
                    return true
                })
                .catch((e) => {
                    console.error("error", e)
                })
            
        },
        async getItens(context) {
            await axios.get("https://labinventory-backend-vjqcwqvuka-uc.a.run.app/items/", {
                headers: {
                  'Authorization': cookies.get("logged").token,
                }})
            .then((response) => {
                context.commit("setSendItens", response.data.records)
            })
            .catch(() => {
                // No caso de qualquer outro erro na requisição
                context.commit("setMsgError", "Erro na consulta dos itens.");
              });
        },
    },
    getters: {
        // Retorna o último item selecionado para edição
        // Alimenta o modal Editar Item
        sendItemToEdit(state) {
            let itemToEdit = {}
            state.sendItens.forEach(item => {
                if (item.patrimonio == state.toEdit) {
                    itemToEdit = item
                }
            })
            return itemToEdit
        },
        getItems(state) {
            return state.sendItens;
        },
        getStats(state) {
            return state.stats;
        },
        sendErrorMsg(state) {
            return state.errorMsg;
          },
    }
}
    

    