<template>
  <div class="cadastroUsuario">
    <div class="header">
      <p>Preencha os campos para cadastrar</p>
      <div id="switch-div">
        <span id="switch-editar">Editar</span>
        <label class="switch">
          <input type="checkbox" @click="edit" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <!-- FORM Cadastro de Colaborador -->
    <div class="container">
      <h5>Dados pessoais</h5>
      <collab-form
        id="collab-form"
        :validation-schema="schema"
        v-slot="{ errors }"
      >
        <div class="row mb-2">
          <div class="col-6">
            <label class="form-label">Nome completo</label>
            <collab-field
              type="text"
              class="form-control"
              name="name"
              v-model="collab.nome"
              :disabled="disabled"
            />
            <span class="text-danger" v-text="errors.name" v-show="errors.name">
            </span>
          </div>
          <div class="col-3">
            <label class="form-label">Gênero</label>
            <collab-field
              as="select"
              class="form-select"
              name="genre"
              v-model="collab.genero"
              :disabled="disabled"
            >
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </collab-field>
            <span
              class="text-danger"
              v-text="errors.genre"
              v-show="errors.genre"
            >
            </span>
          </div>
          <div class="col-3">
            <label class="form-label">Data de nascimento</label>
            <collab-field
              type="date"
              class="form-control"
              name="birth"
              v-model="collab.nascimento"
              :disabled="disabled"
            />
            <span
              class="text-danger"
              v-text="errors.birth"
              v-show="errors.birth"
            >
            </span>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-4">
            <label class="form-label">Telefone</label>
            <collab-field
              type="text"
              class="form-control"
              name="phone"
              v-mask="['(##) ####-####', '(##) #####-####']"
              v-model="collab.telefone"
              placeholder="ex.: 41993166596"
              :disabled="disabled"
            />
            <span
              class="text-danger"
              v-text="errors.phone"
              v-show="errors.phone"
            >
            </span>
          </div>
          <div class="col-4">
            <label class="form-label">E-mail</label>
            <collab-field
              type="email"
              class="form-control"
              name="email"
              v-model="collab.email"
              :disabled="disabled"
            />
            <span
              class="text-danger"
              v-text="errors.email"
              v-show="errors.email"
            >
            </span>
          </div>
          <div class="col-4">
            <label class="form-label">Cargo</label>
            <collab-field
              as="select"
              class="form-select"
              name="job"
              v-model="collab.cargo"
              :disabled="disabled"
            >
              <option value="Front-end dev">Front-end dev</option>
              <option value="Back-end dev">Back-end dev</option>
              <option value="Fullstack dev">Fullstack dev</option>
              <option value="DevOps">DevOps</option>
            </collab-field>
            <span class="text-danger" v-text="errors.job" v-show="errors.job">
            </span>
          </div>
        </div>
        <h5>Dados de endereço</h5>
        <div class="row mb-2">
          <div class="col-4">
            <label class="form-label">CEP</label>
            <collab-field
              type="text"
              class="form-control"
              name="cep"
              v-mask="'#####-###'"
              v-model="cepNum"
              :disabled="disabled"
            />
            <span class="text-danger" v-text="errors.cep" v-show="errors.cep">
            </span>
            <span class="text-danger" v-text="cepError" v-show="cepError">
            </span>
          </div>
          <div class="col-6">
            <label class="form-label">Cidade</label>
            <collab-field
              v-model="address.localidade"
              id="localidade"
              type="text"
              class="form-control"
              name="city"
              readonly
            />
          </div>
          <div class="col-2">
            <label class="form-label">Estado</label>
            <collab-field
              v-model="address.uf"
              id="uf"
              type="text"
              class="form-control"
              name="state"
              readonly
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-10">
            <label class="form-label">Logradouro</label>
            <collab-field
              v-model="address.logradouro"
              type="text"
              class="form-control"
              name="logradouro"
              :disabled="disabled"
            />
          </div>
          <div class="col-2">
            <label class="form-label">Número</label>
            <collab-field
              type="text"
              class="form-control"
              name="num"
              v-mask="'######'"
              v-model="collab.numero"
              :disabled="disabled"
            />
            <span class="text-danger" v-text="errors.num" v-show="errors.num">
            </span>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-4">
            <label class="form-label">Complemento</label>
            <collab-field
              type="text"
              class="form-control"
              name="complement"
              v-model="collab.complemento"
              :disabled="disabled"
            />
          </div>
          <div class="col-4">
            <label class="form-label">Bairro</label>
            <collab-field
              id="bairro"
              v-model="address.bairro"
              type="text"
              class="form-control"
              name="zone"
              :disabled="disabled"
            />
          </div>
          <div class="col-4">
            <label class="form-label">Ponto de referência</label>
            <collab-field
              type="text"
              class="form-control"
              name="ref"
              v-model="collab.referencia"
              :disabled="disabled"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-info" type="button" @click="cleanForm">
            Limpar
          </button>
          <button
            @click.prevent="saveCollab"
            type="submit"
            class="btn btn-info"
          >
            Salvar
          </button>
        </div>
      </collab-form>
    </div>
  </div>
</template>
<script>
import { Form, Field } from "vee-validate";
import rules from "../validations/validatecollab";
import { mask } from "vue-the-mask";
import { mapState } from "vuex";

rules;

export default {
  directives: {
    mask,
  },

  components: {
    "collab-form": Form,
    "collab-field": Field,
  },
  data() {
    return {
      cidade: "",
      schema: {
        name: "required|namecheck",
        genre: "required",
        birth: "required|birthcheck",
        phone: "required|phonecheck",
        email: "required|emailcheck",
        job: "required",
        cep: "required",
        localidade: "required",
      },
      collab: {}, // Recebe os inputs
      address: {},
      disabled: true, // Inputs desabilitados
      cepNum: null, // Recebe o input de CEP
    };
  },
  watch: {
    cepNum() {
      if (this.cepNum.length == 9) {
        this.getCepInfo();
      }
    },
  },
  methods: {
    // Chamado quando houver 8 caracteres ou mais no input CEP
    getCepInfo() {
      // Valida o CEP e preenche os campos relacionados
      this.$store.dispatch("collaborators/cepInfo", this.cepNum).then(() => {
        this.address = {
          cep: this.cepNum,
          localidade: this.cepInfo.localidade,
          bairro: this.cepInfo.bairro,
          logradouro: this.cepInfo.logradouro,
          uf: this.cepInfo.uf,
        };
      });
    },
    // Salva o colaborador na lista no json server
    saveCollab() {
      let collab = {
        collab: this.collab,
        address: this.address,
      };
      this.$store
        .dispatch("collaborators/saveCollab", { ...collab })
        .then(() => {
          if (this.exists) {
            this.$toast.error(this.msgError, { position: "top" });
          } else {
            this.$toast.info("Colaborador inserido com sucesso!", {
              position: "top",
            });
            this.cleanForm();
            this.$router.push("/users/colaboradores")
          }
        });
    },
    cleanForm() {
      this.collab = {};
      this.address = {};
    },
    // Acionado pelo switch button,
    // Habilita/desabilita edição dos campos
    edit() {
      if (this.disabled) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
  },
  computed: {
    ...mapState({
      cepInfo: (state) => state.collaborators.cepInfo,
      exists: (state) => state.collaborators.exists,
      msgError: (state) => state.collaborators.errorMsg,
    }),
    // Retorna Msg erro de CEP
    cepError() {
      return this.$store.getters["collaborators/errorCep"];
    },
  },
};
</script>
<style scoped>
/* Título e SWITCH editar */
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
/* Span ao lado do SWITCH */
#switch-editar {
  margin: 6px;
}
/* Título */
p {
  font-size: 1.8em;
}
/* SUB-TÍTULOS */
h5 {
  margin-bottom: 15px;
  font-weight: 500;
}
/* DIV GERAL */
.cadastroUsuario {
  padding: 50px;
  min-height: 100%;
}
/* DIV FORM */
.container {
  text-align: left;
  padding: 30px;
}
/* labels FORM */
.form-label {
  margin-bottom: 2px;
  font-size: 1em;
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
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
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