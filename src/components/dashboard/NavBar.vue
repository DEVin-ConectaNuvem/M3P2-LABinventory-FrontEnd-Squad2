<template>
<div class="navbar-div">
    <!-- TÍTULO: referente a rota renderizada -->
    <div id="title">
        <p class="current-route">{{path}}</p>
    </div>
    <!-- USER: nome e imagem -->
    <div id="user">
        <span v-text="userName"></span>
        <vue-gravatar class="gravatar" :email="user" size="40"/>
    </div>

</div>
</template>
<script>
import { useCookies } from 'vue3-cookies'

const cookies = useCookies().cookies

export default {
    data() {
        
        return {
            user: 'teste@teste.com', // Modificado pelo mounted
            userName: 'Username' // Modificado pelo mounted
        }
    },
    computed: {
        // Retorna o nome da rota atual
        path() {
            let pathInfo = this.$router.currentRoute.value.fullPath
            let currPath = pathInfo.split('/')[2]
            let splitName = currPath.split('-')
            let firstName = splitName[0]
            let secondName = splitName[1]
            let name1 = `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} de ${secondName}`
            let name2 = `${firstName.charAt(0).toUpperCase() + firstName.slice(1)}`
            return splitName.length > 1 ? name1 : name2 
            // try {
            //     // Se for children
                
            // } catch (e) {
            //     // Se for nome simples
            //     let pathInfo = this.$router.currentRoute.value.fullPath
            //     let currPath = pathInfo.split('/')[1]
            //     return currPath.charAt(0).toUpperCase() + currPath.slice(1)
            // }
        },
    },
    mounted() {
        this.user = cookies.get('logged').email
        this.userName = cookies.get('logged').name
    }
}
</script>
<style scoped>
/* Div GERAL */
.navbar-div {
    position: sticky;
    top: 0;
    padding-left: 20px;
    padding-right: 20px;
    background-color: rgb(14, 34, 63);
    display: flex; 
    flex-direction: row; 
    justify-content: space-between;
    align-items: center;
}
/* TÍTULO */
p {
    color: rgb(7, 201, 239);
    font-size: 1.5em;
    margin: 0;
    margin-top: 10px;
    margin-bottom: 10px;
}
/* USER NAME */
span {
    color: rgb(7, 201, 239);
    margin-right: 10px;
}
/* USER IMAGE */
.gravatar {
    border-radius: 50%;
}
</style>