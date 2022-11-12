<template>
<div class="container">
  <div class="modal fade" id="collabModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Conta</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <collab-form id="collab-form" :validation-schema="schema" v-slot="{ errors }">
                <!-- Primeira linha: NOME e GÊNERO -->
                <div class="row mb-1">
                    <div class="col-8">
                        <label class="form-label">Nome completo</label>
                        <collab-field 
                        type="text" 
                        class="form-control" 
                        name="name" 
                        v-model="collab.nome"/>
                        <span 
                        class="text-danger" 
                        v-text="errors.name" 
                        v-show="errors.name">
                        </span>
                    </div>
                    <div class="col-4">
                        <label class="form-label">Gênero</label>
                        <collab-field 
                        as="select" 
                        class="form-select" 
                        name="genre" 
                        v-model="collab.genero">
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </collab-field>
                        <span 
                        class="text-danger" 
                        v-text="errors.genre" 
                        v-show="errors.genre">
                        </span>
                    </div>
                </div>
                <!-- Segunda linha: EMAIL e TELEFONE -->
                <div class="row mb-1">
                    <div class="col-8">
                        <label class="form-label">E-mail</label>
                        <collab-field 
                        type="email" 
                        class="form-control" 
                        name="email" 
                        v-model="collab.email" />
                        <span 
                        class="text-danger" 
                        v-text="errors.email" 
                        v-show="errors.email">
                        </span>
                    </div>
                    <div class="col-4">
                        <label class="form-label">Telefone</label>
                        <collab-field 
                        type="text" 
                        class="form-control" 
                        name="phone" 
                        v-model="collab.telefone" />
                        <span 
                        class="text-danger" 
                        v-text="errors.phone" 
                        v-show="errors.phone">
                        </span>
                    </div>
                </div>
                <!-- Terceira linha: DATA NASCIMENTO e CARGO -->
                <div class="row">
                    <div class="col-6">
                        <label class="form-label">Data de nascimento</label>
                        <collab-field 
                        type="date" 
                        class="form-control" 
                        name="birth" 
                        v-model="collab.nascimento"/>
                        <span 
                        class="text-danger" 
                        v-text="errors.birth" 
                        v-show="errors.birth">
                        </span>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Cargo</label>
                        <collab-field 
                        as="select" 
                        class="form-select" 
                        name="job" 
                        v-model="collab.cargo">
                            <option value="Front-end dev">Front-end dev</option>
                            <option value="Back-end dev">Back-end dev</option>
                            <option value="Fullstack dev">Fullstack dev</option>
                            <option value="DevOps">DevOps</option>
                        </collab-field>
                        <span 
                        class="text-danger" 
                        v-text="errors.job" 
                        v-show="errors.job">
                        </span>
                    </div>
                </div>
                
                <h5 class="mt-3">Dados de endereço</h5>
                <!-- Quarta linha: CEP, CIDADE, ESTADO -->
                <div class="row mb-1">
                    <div class="col-4">
                        <label class="form-label">CEP</label>
                        <collab-field 
                        type="text" 
                        class="form-control" 
                        name="cep" 
                        v-model="cepNum" 
                        @input=getCepInfo />
                        <span 
                        class="text-danger" 
                        v-text="errors.cep" 
                        v-show="errors.cep">
                        </span>
                        <span 
                        class="text-danger" 
                        v-text="errorMsg" 
                        v-show="errorMsg">
                        </span>
                    </div>
                    <div class="col-5">
                        <label class="form-label">Cidade</label>
                        <collab-field 
                        id='localidade' 
                        type="text" 
                        class="form-control" 
                        name="city" readonly/>
                    </div>
                    <div class="col-3">
                        <label class="form-label">Estado</label>
                        <collab-field 
                        id='uf' 
                        type="text" 
                        class="form-control" 
                        name="state" readonly/>
                    </div>
                </div>
                <!-- Quinta linha: LOGRADOURO e NÚMERO -->
                <div class="row mb-1">
                    <div class="col-9">
                        <label class="form-label">Logradouro</label>
                        <collab-field 
                        id='logradouro' 
                        type="text" 
                        class="form-control" 
                        name="street" readonly/>
                    </div>
                    <div class="col-3">
                        <label class="form-label">Número</label>
                        <collab-field 
                        type="text" 
                        class="form-control" 
                        name="num" v-model="collab.numero" />
                        <span 
                        class="text-danger" 
                        v-text="errors.num" 
                        v-show="errors.num">
                        </span>
                    </div>
                </div>
                <!-- Sexta linha: COMPLEMENTO e BAIRRO -->
                <div class="row mb-1">
                    <div class="col-6">
                        <label class="form-label">Complemento</label>
                        <collab-field 
                        type="text" 
                        class="form-control" 
                        name="complement" 
                        v-model="collab.complemento"/>
                        <span 
                        class="text-danger" 
                        v-text="errors.complement" 
                        v-show="errors.complement">
                        </span>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Bairro</label>
                        <collab-field 
                        id='bairro' 
                        type="text" 
                        class="form-control" 
                        name="zone" readonly/>
                    </div>
                </div>
                <!-- Sétima linha: PONTO DE REFERêNCIA -->
                <div class="row">
                    <div class="col-12">
                        <label class="form-label">Ponto de referência</label>
                        <collab-field 
                        type="text" 
                        class="form-control" 
                        name="ref" 
                        v-model="collab.referencia"/>
                        <span 
                        class="text-danger" 
                        v-text="errors.ref" 
                        v-show="errors.ref">
                        </span>
                    </div>
                </div>
            </collab-form>
        </div>
        <!-- Botões SAIR e SALVAR -->
        <div class="modal-footer">
        <button 
          type="button" 
          class="btn btn-outline-danger" 
          data-bs-dismiss="modal" 
          @click="delCollab">
          Excluir
          </button>
          <button 
          type="button" 
          class="btn btn-outline-info" 
          data-bs-dismiss="modal" 
          @click="cleanForm">
          Sair
          </button>
          <button 
          type="button" 
          class="btn btn-info" 
          @click="saveCollab">
          Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import { Form, Field } from 'vee-validate'
import rules from '../validations/validatecollab'

rules

export default {

    components: {

        "collab-form": Form,
        "collab-field": Field,
    },
    data() {
        return {
            schema: {
                name: 'required|namecheck',
                genre: 'required',
                birth: 'required|birthcheck',
                phone: 'required|phonecheck',
                email: 'required|emailcheck',
                job: 'required',
                cep: 'required',
                num: 'required',
                complement: 'required',
                ref: 'required'
            },
            collab: {}, // Dados do colaborador a ser editado, os dados irão popular os inputs
            cepNum: null, // Recebe o CEP o do claborador a ser editado, popula o input
        }
    },
    watch: {
        // Quando o modal para edição de colaboradores é chamado
        // esta computada é alterada com o id do colaborador
        getSelectedId(newId) {
            
            this.$store.dispatch('collaborators/getOneCollab', newId)
            .then((response) => {
                this.collab = response
               this.$store.state.collaborators.collabs = response
            })
            
            
        }
    },
    methods: {
        // Quando o input de CEP tiver mais que 7 caracteres
        // Envia o CEP para store
        getCepInfo() {
            if(this.cepNum.length >= 8) {
                this.$store.dispatch('collaborators/cepInfo', this.cepNum)
            }
        },
        // Envia o objeto com os dados do colaborador para a store
        saveCollab() {
            this.$store.commit('collaborators/saveCollab', {...this.collab})
            let form = document.getElementById('collab-form')
            form.reset()
            let saved = this.$store.state.collaborators.saveSuccess
            if (saved) {
              location.reload()
              this.$loading.show()
              this.$toast.info('Item salvo!', {position: 'top-right'})
            }
        },
        delCollab() {
            let idColab = this.$store.getters['collaborators/sendSelectedId']
            console.log('Modal')
            console.log(idColab)
            this.$store.commit('collaborators/delCollab', idColab)
            location.reload()
        },
        cleanForm() {
            let form = document.getElementById('collab-form')
            form.reset() 
            this.collab = {}
            this.cepNum = null
        },
    },
    computed: {
        // Retorna as mensagens de erro para o input de CEP
        errorMsg() {
            return this.$store.getters['collaborators/sendErrorMsg']
        },
        // Retorna id do colaborador selecionado para edição em ListaUsuarios.vue
        getSelectedId(){
            let selectedId = this.$store.getters['collaborators/sendSelectedId']
            return selectedId
        }
    },
}
</script>

<style scoped>

.form-label {
    margin-bottom: 1px;
}

</style>
