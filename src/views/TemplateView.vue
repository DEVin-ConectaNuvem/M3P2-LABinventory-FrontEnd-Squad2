<template>
  <div class="template">
    <proj-sidebar></proj-sidebar>
    <!-- main traz o estilo da tela de conteúdos -->
    <div class="router" :style="main">
      <proj-navbar></proj-navbar>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

import SideBar from "../components/dashboard/SideBar"
import NavBar from '../components/dashboard/NavBar'

export default {
  components: {
    "proj-sidebar": SideBar,
    'proj-navbar': NavBar
  },
  computed: {
    // Quando o SideBar reduzir o width, 
    // o width do main será recalculado na store
    main() {
      return this.$store.getters['template/main']
    },
  },
}
</script>
<style scoped>

/* Alinha o SideBar e main lado a lado */
.template {
  background-color: aliceblue;
  display: flex; 
  flex-direction: row; 
}

</style>
