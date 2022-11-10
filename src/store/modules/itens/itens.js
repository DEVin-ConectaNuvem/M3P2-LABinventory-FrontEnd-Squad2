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
        // Insere key "emprestado: colaborador no item"
        flagItem(state, itemEmprestado) {
            let itens = JSON.parse(localStorage.getItem('itens'))
            itens.forEach(item => {
                if (item.patrimonio === itemEmprestado.itemWhich.patrimonio) {
                    item.emprestado = itemEmprestado.itemTo
                }
            })
            localStorage.setItem('itens', JSON.stringify(itens))
        },
        editItem(state, patr) {
            state.toEdit = patr
        },
        // Deleta um objeto item do array de itens pelo código de patrimônio
        delItem(state, patr) {
            let allItens = JSON.parse(localStorage.getItem('itens'))
            // Filtra o array pelo cod. patrimonio
            let newItens = allItens.filter(item => item.patrimonio !== patr)
            // Salva o array objetos item atualizado no localStorage
            localStorage.setItem('itens', JSON.stringify(newItens))
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

            await axios.get("http://localhost:3000/itens")
            .then((response) => {
                context.state.sendItens = response.data;
            })
            context.state.sendItens.forEach(element => {
                if(element.patrimonio === context.state.toEdit) {
                    context.state.edit = true
                    item.patrimonio = context.state.toEdit
                    axios.put(`http://localhost:3000/itens/${element.id}`, item, headers)
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
            if(!context.state.edit) {
                
                var headers = {
                    "Content-Type": "application/json"
                }
                await axios.post("http://localhost:3000/itens", item, headers)
                .then(() => {
                    return true
                })
                .catch((e) => {
                    console.error("error", e)
                })
                .finally(() => {
                })
            }
            context.state.edit = false
            
        }
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
        }
    }
}