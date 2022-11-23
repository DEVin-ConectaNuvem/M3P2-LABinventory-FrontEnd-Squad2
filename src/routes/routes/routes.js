import UserLogin from "../../views/UserLogin.vue";
import CadastroUsuario from "../../views/CadastroUsuario.vue";
import Template from "../../views/TemplateView.vue";
import InventoryBook from "../../views/InventoryBook.vue";
import EmprestaItem from "../../views/EmprestaItem.vue";
import CadastroItem from "../../views/CadastroItem.vue";
import ListaUsuarios from "../../views/ListaUsuarios.vue";
import { useCookies } from "vue3-cookies";

const cookies = useCookies().cookies;

const routes = [
  // Rota principal, se já estiver logado
  // Envia para /users
  {
    path: "/",
    component: UserLogin,
    meta: {title: "DevInventory - Anyway"},
    beforeEnter: (to) => {
      let check1 = cookies.get("logged");
      if (check1 !== null) {
        if (check1.status === true) {
          return (to.path = "/users/inventario");
        }
      }
      return true;
    },
  },
  // Antes de entrar verifica está logado
  // Se não, envia para login
  {
    path: "/users/:token?/:name?",
    component: Template,
    beforeEnter: (to) => {
      if (to.params.token && to.params.name) {
        cookies.set("logged", {
          name: to.params.name,
          token: to.params.token,
          status: true,
        });
        let toast = require("vue-toast-notification")
        toast.useToast().info(`Bem-vindo(a), ${cookies.get("logged").name}!`, {position: 'top-right'})
        return (to.path = "/users/inventario");
      }
      let check2 = cookies.get("logged");
      if (check2 !== null) {
        if (!check2.status === true) {
          return (to.path = "/");
        }
      }
      return true;
    },
    children: [
      { path: "colaboradores", component: ListaUsuarios, meta: {title: "Colaboradores"} },
      { path: "inventario", component: InventoryBook, meta: {title: "Inventário"} },
      { path: "emprestar", component: EmprestaItem, meta: {title: "Empréstimos"} },
      { path: "cadastro-item", component: CadastroItem, meta: {title: "Cadastro Item"} },
      { path: "cadastro-colaborador", component: CadastroUsuario, meta: {title: "Cadastro Colaborador"} },
    ],
  },
];

export default routes;
