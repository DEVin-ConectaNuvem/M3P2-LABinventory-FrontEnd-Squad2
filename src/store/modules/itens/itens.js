export default {
    namespaced: true,
    state() {
        return {
            sendItens: [], // Lista atual de itens
            item: {}, // Item selecionado para edição
            toEdit: null, // Código do patrimônio
            stats: {}, // Cálculos para SMALL CARDS no inventário
            saved: false
        }
    },
    mutations: {
        // Salva um objeto item novo ou editado no localStorage
        saveItem(state, item) {
            // Caso localStorage vazio, cria um array com objeto item e salva
            if (localStorage.getItem('itens') === null) {
                let itens = []
                itens.push(item)
                localStorage.setItem('itens', JSON.stringify(itens))
            } else { // Caso já exista um array objetos item
                let list = JSON.parse(localStorage.getItem('itens'))
                //No caso de item editado, apenas substitui o item
                let already = false
                list.forEach(prod => {
                    // Verifica se ao menos 3 keys são iguais
                    let matches = 0
                    for (const [key,] of Object.entries(prod)) {
                        if (prod[key] == item[key]) {
                            matches++
                            if (matches > 2) {
                                break
                            }
                        }
                    }
                    if (matches > 2) {
                        let index = list.indexOf(prod)
                        list[index] = item
                        state.saved = true
                        already = true
                    }
                })
                // Se não é um item editado, insere o novo objeto item no array
                if (!already) {
                    list.push(item)
                    state.saved = true
                }
                // Salva o array objetos item atualizado no localStorage
                localStorage.setItem('itens', JSON.stringify(list))
            }
        },
        // Lista atual de todos os itens
        getItens(state) {
            let allItens = JSON.parse(localStorage.getItem('itens'))
            state.sendItens = allItens
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
        }
    },
    getters: {
        // Retorna o último item selecionado para edição
        // Alimenta o modal Editar Item
        sendItemToEdit(state) {
            let itemToEdit = {}
            let itens = JSON.parse(localStorage.getItem('itens'))
            itens.forEach(item => {
                if (item.patrimonio == state.toEdit) {
                    itemToEdit = item
                }
            })
            return itemToEdit
        }
    }
}