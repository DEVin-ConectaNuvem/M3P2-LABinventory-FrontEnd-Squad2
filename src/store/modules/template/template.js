export default {

    namespaced: true,
    state() {
        return {
          
            sidebarWidth: 300,
            toggleSideBar: true // Controlador hide/show SideBar
        }
    },
    mutations: {
      // Controla o SWITCH para esconder SideBar
      controlSideBar(state) {
        if (state.toggleSideBar) {
          state.sidebarWidth = 70
          state.toggleSideBar = false
        } else {
          state.sidebarWidth = 300
          state.toggleSideBar = true
        }
      },
    },
    getters: {
      // Retorna o estilo do SideBar
      sidebar(state) {
          return `width: ${state.sidebarWidth}px; height: 100vh; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.4s`
        },

      // Retorna o estilo da div de conteúdos conforme a largura do SideBar
      main(state) {
          return `width: calc(100% - ${state.sidebarWidth}px); height: 100%;`
      },
    }
}