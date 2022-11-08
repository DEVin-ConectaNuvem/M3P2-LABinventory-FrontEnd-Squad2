<template>
  <div class="side-bar p-2" :style="sidebar">

    <!-- DEVINVENTORY LOGO -->
    <div class="sb-icon text-center">
      <img
        id="logo"
        src="../../assets/InventaryLogonobg.png"
        alt="DevInventary Logo"
      />
    </div>

    <!-- BUTTONS toggleSideBar=true-->
    <div class="btns-div" v-show="toggleSideBar">
      <SideBarButtons
        title="Geral"
        icon1="fa-solid fa-chart-simple"
        btn1="Inventário"
        :method1="inventario"
        icon2="fa-solid fa-arrow-right-from-bracket"
        btn2="Sair"
        :method2="sair"
      />

      <SideBarButtons
        title="Colaboradores"
        icon1="fa-solid fa-user-plus"
        btn1="Cadastrar"
        :method1="cadastraUser"
        icon2="fa-solid fa-list"
        btn2="Listar"
        :method2="listaUsers"
      />

      <SideBarButtons
        title="Itens"
        icon1="fa-solid fa-circle-plus"
        btn1="Cadastrar"
        :method1="cadastraItens"
        icon2="fa-solid fa-share-nodes"
        btn2="Emprestar"
        :method2="emprestaItens"
      />
    </div>

    <!-- BUTTONS toggleSideBar=false-->
    <div class="text-center" v-show="!toggleSideBar">
      <div class="col mb-5">
        <SmallIcon icon="fa-solid fa-chart-simple" :method="inventario" />
        <SmallIcon icon="fa-solid fa-arrow-right-from-bracket" :method="sair" />
      </div>
      <div class="col mb-5">
        <SmallIcon icon="fa-solid fa-user-plus" :method="cadastraUser" />
        <SmallIcon icon="fa-solid fa-list" :method="listaUsers" />
      </div>
      <div class="col mb-5">
        <SmallIcon icon="fa-solid fa-circle-plus" :method="cadastraItens" />
        <SmallIcon icon="fa-solid fa-share-nodes" :method="emprestaItens" />
      </div>
    </div>

    <!-- div geral do switch -->
    <div id="switchDiv">
      <!-- body do switch -->
      <div id="switchBody" @click="toggleSwitch">
        <!-- Switch circle -->
        <div id="switchCircle"></div>
      </div>
    </div>

  </div>
</template>
<script>
import SideBarButtons from "./SideBarButtons.vue"
import SmallIcon from "../SmallIcon.vue"

export default {

  components: {

    SideBarButtons, 
    SmallIcon

    },
  methods: {

    // Hide/show sidebar
    toggleSwitch() {

      // Switch circle
      let switchCircle = document.getElementById("switchCircle")
      let switchDiv = document.getElementById("switchDiv")
      let logoImg = document.getElementById("logo")

      // Se não tiver classe switchCircle, adiciona
      if (switchCircle.className != "switchCircle") {
        switchCircle.className = "switchCircle"
        switchDiv.style.justifyContent = "center"
        logoImg.style.width = "60px"

      } else {
        // Se houver, apaga
        switchCircle.className = ""
        switchDiv.style.justifyContent = "right"
        logoImg.style.width = "auto"
      }
      this.$store.commit("template/controlSideBar")
    },
    inventario() {
      this.$router.push("/users/inventario")
    },
    sair() {
      this.$store.commit("auth/logOutUser")
      this.$toast.info(this.$store.getters["auth/setLogoutMsg"], {position: 'top-left'})
      this.$router.push("/")
    },
    cadastraUser() {
      this.$router.push("/users/cadastro-colaborador")
    },
    listaUsers() {
      this.$router.push("/users/colaboradores")
    },
    cadastraItens() {
      this.$router.push("/users/cadastro-item")
    },
    emprestaItens() {
      this.$router.push("/users/emprestar")
    },
  },
  computed: {

    // Retorna o estilo do sideBar
    sidebar() {
      return this.$store.getters["template/sidebar"]
    },
    // Controla o sideBar e tipos de botões
    toggleSideBar() {
      return this.$store.state.template.toggleSideBar
    }

  },
}
</script>
<style scoped>
label {
  color: rgb(7, 201, 239);
}
/* Div geral do switch */
#switchDiv {
  display: flex;
  justify-content: flex-end;
}
/* Corpo do switch, alinha o switch para esquerda */
#switchBody {
  display: flex;
  justify-content: left; /* alinha na esquerda */
  align-items: center; /* alinha na vertical */
  width: 50px;
  height: 28px;
  border: 1px solid rgb(7, 201, 239);
  border-radius: 34px;
}
/* Switch circle */
#switchCircle {
  width: 21px;
  height: 21px;
  margin-left: 3px;
  background-color: rgb(7, 201, 239);
  border-radius: 50%;
  transition: all 0.4s;
}
/* Ao clicar adiciona esta classe, que move para direita */
.switchCircle {
  margin-left: 24px !important;
}

/*Cor do ícones no sidebar*/
#sb-fa-icon {
  color: #2196f3;
}

/*Div geral do sidebar*/
.side-bar {
  position: sticky;
  top: 0;
  background-color: rgb(14, 34, 63);
  padding-right: 10px;
}
</style>
