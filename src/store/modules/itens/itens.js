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
        
        // Lista atual de todos os itens
        
        // Deve-se chamar getItens primeiro
        // Seta state.item pelo código de patrimônio
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
            state.stats.total = state.sendItens.reduce((acc, item) =>
                Number(item.valor) + acc, 0
            )
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

        async saveItem(context, item) {
            context.commit("setExists", false);
                await axios.get("http://localhost:5000/items/", {
                    headers: {
                        'Authorization': cookies.get("logged").token,
                        'Access-Control-Allow-Origin': "http://localhost:5000/items/",
                        'Access-Control-Allow-Methods': 'POST, GET',
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Max-Age': '86400'
                    }
                })
                .then((response) => {
                    response.data.records.forEach((element) => {
                        context.commit("setItens", element)
                    });
                })
                context.state.itens.forEach((el) =>{
                    if(el.patrimonio === item.patrimonio){
                        context.commit("setExists", true);
                    }
                });

                if (context.state.exists) {
                    context.commit("setMsgError", "Patrimonio já existe na base de dados");
                    return false;
                  }
                  
            axios.post("http://localhost:5000/items/create/", item, {
                headers: {
                    'Authorization': cookies.get("logged").token,
                    'Access-Control-Allow-Origin': "http://localhost:5000/items/create",
                    'Access-Control-Allow-Methods': 'POST, GET',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Max-Age': '86400'
                }
            })
            .then(() => {
                return true
            })
            .catch((e) => {
                console.error("error", e)
            }) 
        },

        async saveItemedit(context, item) {
            item.valor = item.valor.replace(",", ".")
            await axios.patch(`http://localhost:5000/items/?_id=${item._id}`, item, {
                headers: {
                  'Authorization': cookies.get("logged").token,
                  'Access-Control-Allow-Origin': "http://localhost:5000/items/",
                  'Access-Control-Allow-Methods': 'POST, GET, PATCH',
                  'Access-Control-Allow-Headers': '*',
                  'Access-Control-Max-Age': '86400'
                }})
                .then((response) => {
                    context.dispatch("getItens")
                    let toast = require("vue-toast-notification")
                    toast.useToast().info(response.data.sucesso, {position: 'top-right'})
                })
            
        },
        // Deleta um objeto item do array de itens pelo código de patrimônio
        async delItem(context, patr) {
            await axios.get("http://localhost:5000/items/", {
                headers: {
                    'Authorization': cookies.get("logged").token,
                    'Access-Control-Allow-Origin': "http://localhost:5000/items/",
                    'Access-Control-Allow-Methods': 'POST, GET',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Max-Age': '86400'
                }
            })
            .then((response) => {
                context.state.sendItens = response.data;
            })
            context.state.sendItens.forEach(element => {
                if(element.patrimonio === patr) {
                    axios.delete(`http://localhost:3000/itens/${element.id}`)
                    .then(() => {
                        context.dispatch("getItens")
                        return true
                    })
                    .catch((e) => {
                        console.error("error", e)
                    })
                    return true
                }
            });
        },
        // Insere key "emprestado: colaborador no item"
        flagItem(context, itemEmprestado) {
           
            context.state.sendItens.forEach(item => {
                if (item.patrimonio === itemEmprestado.itemWhich.patrimonio) {
                    item.emprestado = itemEmprestado.itemTo
                    axios.put(`http://localhost:5000/items/${item.id}`, item, {
                        headers: {
                            'Authorization': cookies.get("logged").token,
                            'Access-Control-Allow-Origin': "http://localhost:5000/items/create",
                            'Access-Control-Allow-Methods': 'POST, GET, PUT',
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
                }
            })
        },
        async getItens(context) {
            await axios.get("http://localhost:5000/items/", { 
                headers: {
                    'Authorization': cookies.get("logged").token,
                    'Access-Control-Allow-Origin': "http://localhost:5000/items/create",
                    'Access-Control-Allow-Methods': 'POST, GET',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Max-Age': '86400'
                }
            })
            .then((response) => {
                context.state.sendItens = response.data.records;
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