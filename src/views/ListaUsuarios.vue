<template>

<div class="container p-4">
    <!-- Barra de busca -->
    <div id="listcollab-header">
        <label 
        id="collab-search-title" 
        class="form-label"><h3>Buscar um colaborador</h3>
        </label>
        <input 
        class="form-control" 
        type="text" 
        id="search-user" 
        placeholder="Digite para buscar..." 
        @input="setCollabs">
    </div>
    <!-- CARDS de colaboradores -->
    <div id="collab-cards">
        <div  class="cards shadow" v-for="collab in collabs" :key="collab.id">
            <!-- Componente CARD tamanho médio -->
            <MediumCard
            cardType="user-list" 
            :img="collab.email" 
            :first="collab.nome" 
            :second="collab.email" 
            :third="`(${collab.telefone.substring(0, 2)}) ${collab.telefone.substring(2, 3)} ${collab.telefone.substring(3, 11)}`" 
            :fourth="collab.cargo" 
            @click="collabDetails(collab)">
            </MediumCard>
        </div>
    </div>
    <ModalColaboradores></ModalColaboradores>
</div>
</template>
<script>

import ModalColaboradores from './ModalColaboradores.vue'
import MediumCard from '@/components/MediumCard.vue'

export default {

    components: {

        ModalColaboradores,
        MediumCard
    },
    data() {
        return {
            // Inicialmente populada pelo mounted, depois pela barra de busca
            collabs: [] 
        }
    },
    methods: {
        // Chamado pelos CARDS, que trazem o item
        // Para setar na store o id do colaborador a ser editado
        collabDetails(item) {
            // Retorna o id de uma seleção de colaborador anterior a atual
            let oldValue = this.$store.getters['collaborators/sendSelectedId']
            // Se o colaborador selecionado é o mesmo
            if(oldValue == item.id){
                // Reseta o id na store para null, que era a condição inicial
                this.$store.commit('collaborators/setSelectedId', null)
            }else{
                // Se for um colaborador diferente, state.selectedId recebe o id atual
                this.$store.commit('collaborators/setSelectedId', item.id)
            }
        },
        // Recebe o input da barra de busca de colaborador
        setCollabs() {
            // Barra de busca
            let inputUser = document.getElementById('search-user')
            // Obtém a lista de colaboradores na store
            let allUsers = this.$store.getters['collaborators/sendCollabs']
            // Se a barra de busca estiver vazia
            if (inputUser == null){
                // Os colaborares são a lista completa
                this.collabs = allUsers
            } else { // Se o input conter algum caracter
                let filtered = []
                // Percorre-se o array em busca do caracter
                allUsers.forEach(user => {
                    
                    for (const [key] of Object.entries(user)) {
                        // Cada valor referente às keys do objeto de cada colaborador
                        let userKey = user[key]
                        // Se houver tipo number, transforma para str
                        if (typeof user[key] !== 'string') {
                            userKey = String(userKey)
                        }
                        // Transforma o caracter ou caracteres digitados para minúsculo
                        // Verifica se a busca pelo seu index na string retorna != -1
                        if (userKey.toLowerCase().indexOf(inputUser.value.toLowerCase()) !== -1) {
                            // Se sim, insere o objeto do colaborador na lista
                            filtered.push(user)
                            break
                        }
                    }
                })
                // Seta a lista de colaboradores a ser exibida em tela
                this.collabs = filtered
            }
        }
    },
    mounted() {
        // Popula a lista de colaboradores na store (state.collabs)
        this.$store.commit('collaborators/getCollabs')
        // Retorna aqui a lista de colaboradores atual
        this.collabs = this.$store.getters['collaborators/sendCollabs']
    }
}
</script>

<style scoped>
/* Div de cada CARD */
.cards {
    margin: 15px;
    border-radius: 10px;
}
/* Div geral de todos os CARDS */
#collab-cards {
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    border-radius: 10px;
}
/* Div da BARRA DE BUSCA */
#listcollab-header {
    margin-bottom: 40px;
    margin-top: 40px;
}
/* Título da BARRA DE BUSCA */
#collab-search-title {
    font-size: 1.5em;
}
</style>