<template>
    <div class="cadastroItem">
    <!-- TÍTULO e SWITCH -->
        <div class="header">
            <p>Preencha os campos para cadastrar</p>
            <div>
                <span id="switch-editar">Editar</span>
                <label class="switch">
                    <input type="checkbox" @click="edit">
                    <span class="slider round"></span>
                </label>
             </div>
        </div>
        <!-- FORM Cadastro de Item -->
        <div class="container">
            <newitem-form 
            @submit="saveItem" 
            id="newitem-form" 
            :validation-schema="schema" 
            v-slot="{ errors }">
                <div class="row mb-2">
                    <div class="col-3">
                        <label class="form-label">Código de patrimônio</label>
                        <newitem-field 
                        type="text" 
                        class="form-control" 
                        name="patrimonio" 
                        v-model="item.patrimonio" 
                        :disabled="disabled" 
                        placeholder="XX9999-999"/>
                        <span 
                        class="text-danger" 
                        v-text="errors.patrimonio" 
                        v-show="errors.patrimonio">
                        </span>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Título</label>
                        <newitem-field 
                        type="text" 
                        class="form-control" 
                        name="titulo" 
                        v-model="item.titulo" 
                        :disabled="disabled"/>
                        <span 
                        class="text-danger" 
                        v-text="errors.titulo" 
                        v-show="errors.titulo">
                        </span>
                    </div>
                    <div class="col-3">
                        <label class="form-label">Categoria</label>
                        <newitem-field 
                        as="select" 
                        class="form-select" 
                        name="categoria" 
                        v-model="item.categoria" 
                        :disabled="disabled">
                            <option value="Eletrônicos">Eletrônicos</option>
                            <option value="Móveis">Móvel</option>
                            <option value="Acessórios">Acessórios</option>
                        </newitem-field>
                        <span 
                        class="text-danger" 
                        v-text="errors.categoria" 
                        v-show="errors.categoria">
                        </span>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-3">
                        <label class="form-label">Valor R$</label>
                        <newitem-field 
                        type="text" 
                        class="form-control" 
                        name="valor" 
                        v-model="item.valor" 
                        :disabled="disabled" 
                        placeholder="9999,99" />
                        <span 
                        class="text-danger" 
                        v-text="errors.valor" 
                        v-show="errors.valor" >
                        </span>
                    </div>
                    <div class="col-9">
                        <label class="form-label">URL do produto</label>
                        <newitem-field 
                        type="text" 
                        class="form-control" 
                        name="url" 
                        v-model="item.url" 
                        :disabled="disabled"/>
                        <span 
                        class="text-danger" 
                        v-text="errors.url" 
                        v-show="errors.url">
                        </span>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-6">
                        <label class="form-label">Marca</label>
                        <newitem-field 
                        type="text" 
                        class="form-control" 
                        name="marca" 
                        v-model="item.marca" 
                        :disabled="disabled"/>
                        <span 
                        class="text-danger" 
                        v-text="errors.marca" 
                        v-show="errors.marca">
                        </span>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Modelo</label>
                        <newitem-field 
                        type="text" 
                        class="form-control" 
                        name="modelo" 
                        v-model="item.modelo" 
                        :disabled="disabled"/>
                        <span 
                        class="text-danger" 
                        v-text="errors.modelo" 
                        v-show="errors.modelo">
                        </span>
                    </div>
                </div>
                <div class="row mb-2">
                <div class="col-12">
                    <label class="form-label">Descrição</label>
                    <textarea 
                    id="text-area"
                    class="form-control" 
                    name="descricao" 
                    rows="3" 
                    v-model="item.descricao" 
                    :disabled="disabled">
                    </textarea>
                </div>
                </div>
                <div class="modal-footer">
                <button 
                class="btn btn-outline-info" 
                type="button" 
                @click="cleanForm">
                Limpar
                </button>
                <button 
                type="submit" 
                class="btn btn-info">
                Salvar
                </button>
                </div>
          </newitem-form>
        </div>
    </div>
</template>
<script>

import { Form, Field } from 'vee-validate'
import rules from '../validations/validateitens'
import {mapMutations, mapState} from 'vuex'

rules

export default {

    components: {

        "newitem-form": Form,
        "newitem-field": Field,
    },
    data() {
        return {
            schema: {
                patrimonio: 'required|patrimonycheck',
                titulo: 'required',
                categoria: 'required',
                valor: 'required|pricecheck',
                url: 'required|urlcheck',
                marca: 'required',
                modelo: 'required'
            },
            item: {}, // Recebe os inputs
            disabled: true, // Inputs desabilitados
            // confirmError: 'Código de patrimônio já existe',
        }
    },
    methods: {
        ...mapMutations(["itens/editItem"]),
        saveItem() {
            this.item.emprestado = 'Item disponível'
            this.$store.dispatch('itens/saveItem', {...this.item})
            .then(() => {
                if (this.exists) {
                    this.$toast.error(this.msgError, { position: "top" });
                } else {
                    this.$toast.info("Item inserido com sucesso!", {
                    position: "top",
                    });
                    this.cleanForm();
                }
            });
        },
        cleanForm() {
            let form = document.getElementById('newitem-form')
            form.reset() 
        },
        // habilita/desabilita edição dos campos
        edit() {
            if (this.disabled) {
                this.disabled = false
            } else {
                this.disabled = true
            }
        }
    },
    computed:{
        itemsLocal(){
            return this.$store.state.itens.sendItens;
        },
        // showConfirmError() {
        //     if (this.itemsLocal.patrimonio != this.item.patrimonio) {
        //         return true
        //     } else {
        //         return false
        //     }
        //     },
        ...mapState({
            exists: (state) => state.itens.exists,
            msgError: (state) => state.itens.errorMsg,
            toEdit: (state) => state.itens.toEdit
        })
    },
    watch: {
        itemsLocal() {
            this.items = this.$store.getters['itens/getItems'];
        }
    }
}
</script>
<style scoped>
/* TÍTULO */
p {
    font-size: 1.8em;
    margin-bottom: 40px;
}
/* Span ao lado do SWITCH */
#switch-editar {
    margin: 6px;
}
/* Form LABELS */
.form-label {
    margin-bottom: 2px;
    font-size: 1em;
}
/* TÍTULO E SWITCH div */
.header {
    display: flex; 
    flex-direction: row; 
    justify-content: space-between;
}
/* Div GERAL */
.cadastroItem {
    padding: 50px;
    min-height: 100%;
}
/* FORM div */
.container
 {
     text-align: left;
     background-color: aliceblue;
     padding: 30px;
 }
/* SWITCH */
 .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: rgb(7, 201, 239);
}
input:focus + .slider {
  box-shadow: 0 0 1px rgb(7, 201, 239);
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
</style>