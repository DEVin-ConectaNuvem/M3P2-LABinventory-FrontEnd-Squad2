import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            sendItens: [], // Lista atual de itens
            item: {}, // Item selecionado para edição
            toEdit: null, // Código do patrimônio
            stats: {}, // Cálculos para SMALL CARDS no inventário
            edit: false
        }
    },
    mutations: {
        
        // Lista atual de todos os itens
        getItens(state) {
            axios.get("http://localhost:3000/itens")
            .then((response) => {
                state.sendItens = response.data;
            })
        },
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
        
        // Calcula estatísticas para SMALL CARDS
        itemStats(state) {
            // Quantidade de itens
            state.stats.itens = state.sendItens.length
            // Valor total dos itens
            state.stats.total = state.sendItens.reduce((acc, item) =>
                Number(item.valor.replace(',', '.')) + acc, 0
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

    },
    actions: {
        // Salva um objeto item novo ou editado no localStorage
        async saveItem(context, item) {

            // await axios.get("http://localhost:3000/itens")
            // .then((response) => {
            //     context.state.sendItens = response.data;
            // })
            let count = 0
            await context.state.sendItens.forEach(element => {
                if(element.patrimonio === context.state.toEdit && element.patrimonio === item.patrimonio) {
                    count++
                    axios.patch(`http://localhost:3000/itens/${element.id}`, item, headers)
                    .then(() => {
                        context.commit("getItens")
                    })
                    .catch((e) => {
                        console.error("error", e)
                    })
                }
                
                else if(element.patrimonio === item.patrimonio) {
                    count++
                }
            });
            if (count == 0) {
                var headers = {
                    "Content-Type": "application/json"
                }
                axios.post("http://localhost:3000/itens", item, headers)
                .then(() => {
                    return true
                })
                .catch((e) => {
                    console.error("error", e)
                })
                .finally(() => {
                })
            }
            
        },
        // Deleta um objeto item do array de itens pelo código de patrimônio
        async delItem(context, patr) {
            await axios.get("http://localhost:3000/itens")
            .then((response) => {
                context.state.sendItens = response.data;
            })
            context.state.sendItens.forEach(element => {
                if(element.patrimonio === patr) {
                    axios.delete(`http://localhost:3000/itens/${element.id}`)
                    .then(() => {
                        context.commit("getItens")
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
            var headers = {
                "Content-Type": "application/json"
            }
            context.state.sendItens.forEach(item => {
                if (item.patrimonio === itemEmprestado.itemWhich.patrimonio) {
                    item.emprestado = itemEmprestado.itemTo
                    axios.put(`http://localhost:3000/itens/${item.id}`, item, headers)
                        .then(() => {
                            context.commit("getItens")
                            return true
                        })
                        .catch((e) => {
                            console.error("error", e)
                        })
                }
            })
            
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
        }
    }
}