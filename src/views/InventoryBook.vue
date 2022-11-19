<template>
  <div class="container p-4">
    <!-- CARDS DE ESTATÍSTICAS do inventário -->
    <div class="row data-card">
      <SmallCard
        :icon="'fa-solid fa-users fa-3x'"
        :data="allCollabs"
        :footer="'Colaboradores'"
      >
      </SmallCard>
      <SmallCard
        :icon="'fa-solid fa-shapes fa-3x'"
        :data="invStats.itens"
        :footer="'Itens'"
      >
      </SmallCard>
      <SmallCard
        :icon="'fa-solid fa-coins fa-3x'"
        :data="currency"
        :footer="'Total'"
      >
      </SmallCard>
      <SmallCard
        :icon="'fa-solid fa-handshake-angle fa-3x'"
        :data="invStats.emprestados"
        :footer="'Emprestados'"
      >
      </SmallCard>
    </div>

    <!-- BARRA DE BUSCA de item -->
    <div id="inv-search-div">
      <label id="collab-search-title" class="form-label">
        <h3>Buscar itens</h3>
      </label>
      <input
        class="form-control"
        type="text"
        id="search-item"
        placeholder="Digite para buscar..."
        v-model="searchBar"
        @input="setItems"
      />
    </div>

    <!-- CARDS do inventário -->
    <div id="inv-cards">
      <div class="inv-card shadow" v-for="item in items" :key="item._id.$oid">
        <MediumCard
          cardType="inventory"
          :img="item.url"
          :first="item.descricao"
          :second="item.marca"
          :third="item.modelo"
          :fourth="item.emprestado"
          :method="editItem(item.patrimonio)"
          @click="editItem(item.patrimonio)"
        >
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
import { mapActions } from 'vuex'

export default {

    components: {

        ModalEditItem,
        MediumCard,
        SmallCard
},
    data() {
        return {
            items: [], // Populado pelo mounted e depois pela barra de busca
            invStats: {}, // Recebe as estatísticas da store
            searchBar: ''
        }
    },
    methods: {
        ...mapActions(["itens/getItens"]),
        editItem(num) {
            this.$store.commit('itens/editItem', num)
        },
 
        // Chamado pela barra de busca
        // Filtra os cards apresentados em tela
        setItems() {
            if(this.searchBar !== '') {
                let search = () => {
                return this.itemsLocal.filter(item =>
                item.titulo
                .toLowerCase()
                .includes(this.searchBar.toLowerCase()) || 
                item.marca
                .toLowerCase()
                .includes(this.searchBar.toLowerCase()) ||
                item.descricao
                .toLowerCase()
                .includes(this.searchBar.toLowerCase()) ||
                item.modelo
                .toLowerCase()
                .includes(this.searchBar.toLowerCase())
                );
            } 
            if(search) {
                this.items = search(this.searchBar);
                let count = 0
                if(this.items.length === 0) {
                    count++
                    if (count > 0) {
                        this.$toast.clear();
                    }
                    this.$toast.error('Item não econtrado! Tente outro.', {
                        position: 'top'
                    });
                }
            } 
        } else {
            this.items = this.itemsLocal;
        }
    }
},
    computed: {
        // Retorna a lista atual de colaboradores
        allCollabs() {
            return this.$store.state.collaborators.totalCollabs;
        },
        itemsLocal() {
            return this.$store.state.itens.sendItens;
        },
        stats() {
            return this.$store.state.itens.stats;
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
    watch: {
        itemsLocal() {
            this.items = this.$store.getters['itens/getItems'];
        },
        stats() {
            this.invStats = this.$store.getters['itens/getStats'];
        },
    },
    mounted() {
        // Obtém LISTA DE ITENS
        this["itens/getItens"]()
        // Popula lista de ESTATÍSTICAS
        this.invStats = this.$store.state.itens.stats
        // Obtém LISTA DE COLABORADORES
        this.$store.dispatch('collaborators/getCollabs')
        // Popula lista de ITENS
        this.items = this.$store.getters['itens/getItems']
    },
    updated() {
        // Gera as ESTATÍSTICAS dos SMALL CARDS
        this.$store.commit('itens/itemStats')
    },
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
  display: flex;
  justify-content: space-evenly;
}
/* Div da BARRA DE BUSCA */
#inv-search-div {
  padding: 20px;
}
</style>