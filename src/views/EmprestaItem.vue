<template>
    <div class="container p-5">
    <h3>Buscar por patrimônio</h3>

        <!-- BARRA DE BUSCA -->
        <div class="container p-4">
        <div class="container">
            <div class="row mb-3" >
                <div class="col-12">
                    <label 
                    id="collab-search-title" 
                    class="form-label">
                    <h3>Buscar itens</h3>
                    </label>
                    <input 
                    class="form-control shadow" 
                    id="search-item" 
                    type="text"
                    placeholder="Digite para buscar..."
                    v-model="barraPesquisa" 
                    @input="setItems">
                </div>
            </div>
        </div>
        <div class="container mt-5 mb-5">
            <h3>Situação atual</h3>
        </div>

        <!-- TABELA DE ITENS e situação -->
        <div class="container">
            <table class="table table-hover table-borderless align-middle">
                <thead>
                    <tr>
                    <th scope="col">Patrimônio</th>
                    <th scope="col">Título</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Emprestado para</th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                    v-for="(item, index) in (barraPesquisa ? items : itemsLocal)" 
                    :key="item.patrimonio" 
                    @click="editItem(item.patrimonio)">
                        <td 
                        data-bs-toggle="modal" 
                        data-bs-target="#editItemModal">
                        <span>{{ item.patrimonio }}</span></td>
                        <td 
                        data-bs-toggle="modal" 
                        data-bs-target="#editItemModal">
                        <span>{{ item.titulo }}</span></td>
                        <td 
                        data-bs-toggle="modal" 
                        data-bs-target="#editItemModal">
                        <span>{{ item.categoria }}</span></td>
                        <td>
                            <select 
                            :id="index" 
                            class="form-select shadow" 
                            @input="emprestar(item, index)">
                                <option disabled selected>
                                {{ item.emprestado }}
                                </option>
                                <option 
                                v-for="name in allCollabs" 
                                :value="name.nome" 
                                :key="name.nome">
                                {{name.nome}}
                                </option>
                                <option 
                                v-show="item.emprestado !== 'Item disponível'" 
                                value="Item disponível">
                                Item disponível
                                </option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>

        <!-- Modal para edição de item -->
        <ModalEditItem></ModalEditItem>

    </div>
</template>

<script>

import ModalEditItem from './ModalEditItem.vue'

export default {

    components: {
   
        ModalEditItem
},
    data() {
        return {
            items: [], // Populado pelo mounted e depois pela barra de busca
            barraPesquisa: ''
        }
    },
    methods: {
        setItems() {
            
            if(this.barraPesquisa !== '') {
                let pesquisa = () => {
                return this.itemsLocal.filter(item =>
                    item.patrimonio
                    .toLowerCase()
                        .includes(this.barraPesquisa.toLowerCase()));
                } 
                if(pesquisa) {
                this.items = pesquisa(this.barraPesquisa);
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
        },
        // Chamado pelo select input da tabela
        async emprestar(item, index) {

            // valor do select input
            let nome = document.getElementById(`${index}`).value
            // Insere key "emprestado: colaborador" no item
            item.emprestado = nome
            item._id = Object.values(item._id)[0]
            this.$store.dispatch('itens/flagItem', item)
            let msg1 = "O item está disponível"
            let msg2 = `Item emprestado para ${nome}`
            this.$toast.info(nome !== msg1 ? msg2 : msg1, {position: 'top'})
        },
        editItem(num) {
            this.$store.commit('itens/editItem', num)
        },
    },
    computed: {
        // Retorna a lista atual de colaboradores
        allCollabs() {
            return this.$store.state.collaborators.collabs;
        },
        itemsLocal() {
            return this.$store.state.itens.sendItens;
        },
    },
    // Carrega as stores com o localstorage
    // Popula items
    mounted() {
        this.$store.dispatch('itens/getItens')
        this.$store.dispatch('collaborators/getCollabs')
    }
}
</script>
<style scoped>
h3 {
    margin-bottom: 10px;
}
.form-select {
    margin-right: 10px;
}

th {
    font-size: 1.2em;
    margin-bottom: 20px;
}
td:hover {
    cursor: pointer;
}

</style>