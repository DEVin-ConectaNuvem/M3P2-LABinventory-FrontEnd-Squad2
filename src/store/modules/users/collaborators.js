import axios from "axios"

export default {
    namespaced: true,
    state() {
        return {
            saveSuccess: false,
            cepInfo: {},
            errorMsg: false,
            collabs: [],
            selectedId: null
        }
    },
    mutations: {
        setSelectedId(state, value) {
            state.selectedId = value
        },
        // Recebe o objeto com os dados do colaborador
        // Em caso de edição de colaborador cadastrado ou novo cadastro
        saveCollab(state, collab) {
            // Traz as informações de CEP do colaborador
            let addressInfo = state.cepInfo
            // Retira a key "complemento" do objeto
            let cleanInfo = {}
            for (const [key, value] of Object.entries(addressInfo)) {
                if (key !== 'complemento') {
                    cleanInfo[key] = value
                }
            }
            // Objeto com as informações sobre o colaborador
            let collabObj = {...collab, ...cleanInfo}
            try {
                state.saveSuccess = false
                // Se localstorage estiver vazio
                if (localStorage.getItem('collaborators') === null) {
                    let collaborators = []
                    collabObj.id = 1
                    collaborators.push(collabObj)
                    localStorage.setItem('collaborators', JSON.stringify(collaborators))
                    state.saveSuccess = true
                } else {
                    // Se localstorage contém uma lista
                    let collabList = JSON.parse(localStorage.getItem('collaborators'))
                    let already = false
                    // Verifica se já está cadastrado
                    collabList.forEach(item => {
                        let firstName = item.nome.split(' ')[0]
                        let collabFirstName = collabObj.nome.split(' ')[0]
                        if (item.nascimento === collabObj.nascimento && firstName === collabFirstName) {
                            already = true
                            // Etapa para casos de edição
                            let index = collabList.indexOf(item)
                            item = {...collabObj}
                            collabList[index] = item
                            localStorage.setItem('collaborators', JSON.stringify(collabList))
                            state.saveSuccess = true
                        }
                    })
                    // Se não houver nenhum registro, insere e salva
                    if (!already) {
                        let index = collabList.length + 1
                        collabObj.id = index
                        collabList.push(collabObj)
                        localStorage.setItem('collaborators', JSON.stringify(collabList))
                        state.saveSuccess = true
                    } 
                }
            } catch(e) {
                // Se der algum problema
                state.saveSuccess = false
            }
        },
        // Obtém a lista de colaboradores
        getCollabs(state) {
            let collabs = JSON.parse(localStorage.getItem('collaborators'))
            if (collabs !== null) {
                state.collabs = collabs
            }

        },
        delCollab(state, collab) {
            let allCollabs = JSON.parse(localStorage.getItem('collaborators'))
            // Filtra o array pelo telefone
            let newCollabs = allCollabs.filter(item => item.telefone !== collab)
            // Salva o array atualizado no localStorage
            localStorage.setItem('collaborators', JSON.stringify(newCollabs))
            location.reload()
        }
    },
    actions: {
        // Recebe o CEP do novo ou colaborador editado
        // Verifica se o CEP é válido
        cepInfo(context, cep) {
            // Verifica se o CEP é válido
            axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(response => {

                if (response.data.erro === 'true') {
                    context.state.errorMsg = 'CEP inválido.'
                } else {
                    // Se válido, popula os inputs relacionados ao CEP
                    let localidade = document.getElementById('localidade')
                    let bairro = document.getElementById('bairro')
                    let logradouro = document.getElementById('logradouro')
                    let uf = document.getElementById('uf')
                    localidade.value = response.data.localidade
                    bairro.value = response.data.bairro
                    logradouro.value = response.data.logradouro
                    uf.value = response.data.uf
                    // State. cepInfo recebe o objeto com informações do CEP
                    context.state.cepInfo = response.data
                }
            }).catch(() => {
                // No caso de qualquer outro erro na requisição
                context.state.errorMsg = 'CEP inválido.'
            })
            // Reseta o errorMsg para false após 5 seg. 
            // para não ficar aparecendo no input
            setTimeout(() => {context.state.errorMsg = false}, 5000)
        }
    },
    getters: {
        sendErrorMsg(state) {
            return state.errorMsg
        },
        sendCollabs(state) {
            return state.collabs
        },
        sendSelectedId(state) {
            return state.selectedId
        }
    }
}