<template>
    <div class="container p-4">

        <!-- CARDS DE ESTATÍSTICAS do inventário -->
        <div class="row data-card">
            <SmallCard 
            :icon="'fa-solid fa-users fa-3x'" 
            :data="allCollabs.length" 
            :footer="'Colaboradores'">
            </SmallCard>
            <SmallCard 
            :icon="'fa-solid fa-shapes fa-3x'" 
            :data="invStats.itens" 
            :footer="'Itens'">
            </SmallCard>
            <SmallCard 
            :icon="'fa-solid fa-coins fa-3x'" 
            :data="currency" 
            :footer="'Total'">
            </SmallCard>
            <SmallCard 
            :icon="'fa-solid fa-handshake-angle fa-3x'" 
            :data="invStats.emprestados" 
            :footer="'Emprestados'">
            </SmallCard>
        </div>

        <!-- BARRA DE BUSCA de item -->
        <div id="inv-search-div">
            <label 
            id="collab-search-title" 
            class="form-label">
            <h3>Buscar itens</h3>
            </label>
            <input 
            class="form-control" 
            type="text" 
            id="search-item" 
            placeholder="Digite para buscar..." 
            @input="setItems">
        </div>

        <!-- CARDS do inventário -->
        <div id="inv-cards">
            <div class="inv-card shadow" v-for="item in itemsLocal" :key="item.id">
                <MediumCard 
                cardType="inventory" 
                :img="item.url" 
                :first="item.descricao" 
                :second="item.marca" 
                :third="item.modelo" 
                :fourth="item.emprestado" 
                :method="editItem(item.patrimonio)" 
                @click="editItem(item.patrimonio)">
                </MediumCard>
            </div>
        </div>

        <!-- MODAL para edição de item -->
        <ModalEditItem></ModalEditItem>
    </div>
</template>
<script>

import ModalEditItem from './ModalEditItem.vue'
import MediumCard from '@/components/MediumCard.vue'
import SmallCard from '@/components/SmallCard.vue'

export default {

    components: {

        ModalEditItem,
        MediumCard,
        SmallCard
},
    data() {
        return {
            items: [], // Populado pelo mounted e depois pela barra de busca
            invStats: {} // Recebe as estatísticas da store
        }
    },
    methods: {
        editItem(num) {
            this.$store.commit('itens/editItem', num)
        },
        // Chamado pela barra de busca
        // Filtra os cards apresentados em tela
        setItems() {
            // Barra de busca
            let inputItem = document.getElementById('search-item')
            // Obtém a lista de itens na store
            let allItems = this.$store.state.itens.sendItens
            // Se o input estiver vazio
            if (inputItem == null){
                // Seta a lista completa
                this.items = allItems
            } else {
                // Se houver algum caracter,
                // Cria uma nova lista de itens vazia
                let filtered = []
                // Percorre a lista de itens
                allItems.forEach(item => {
                    // Em cada item percorre as keys 
                    // Se encontrar o caracter ou caracteres digitados
                    // insere o item na nova lista
                    for (const [key] of Object.entries(item)) {
                        // Transforma tudo para minúsculo e verifica se o caracter possui um index 
                        if (item[key].toLowerCase().indexOf(inputItem.value.toLowerCase()) !== -1) {
                            filtered.push(item)
                            break
                        }
                    }
                })
                // Define a nova lista
                this.items = filtered
            }
        }
    },
    computed: {
        // Retorna a lista atual de colaboradores
        allCollabs() {
            return this.$store.state.collaborators.collabs
        },
        itemsLocal() {
            return this.$store.state.itens.sendItens;
        },  
        // Retorna o valor total em style currency para os SMALL CARDS
        currency() {
            let formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
            });
            let str = this.invStats.total
            let curr = formatter.format(str)
            return curr
        }
    },
    // Carrega store com dados do localstorage
    // Calcula as estatísticas
    mounted() {
        // Obtém LISTA DE ITENS
        this.$store.commit('itens/getItens')
        // Gera as ESTATÍSTICAS dos SMALL CARDS
        this.$store.commit('itens/itemStats')
        // Popula lista de ESTATÍSTICAS
        this.invStats = this.$store.state.itens.stats
        // Obtém LISTA DE COLABORADORES
        this.$store.commit('collaborators/getCollabs')
        // Popula lista de ITENS
        this.items = this.$store.state.itens.sendItens
    }
}
</script>
<style scoped>
/* Div geral dos MEDIUM CARDS */
#inv-cards {
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
/* Div de cada MEDIUM CARD */
.inv-card {
    border-radius: 10px;
    margin: 15px;
}
/* Div geral dos SMALL CARDS */
.data-card {
    display:flex;
    justify-content: space-evenly;
}
/* Div da BARRA DE BUSCA */
#inv-search-div {
    padding: 20px;
}
</style>