/* import { mount } from "@vue/test-utils";
import UserLogin from "../../src/views/UserLogin.vue";

jest.mock("vue3-cookies", () => ({
    useCookies: jest.fn(() => ({
        cookies: {get: jest.fn(() => ({
            status: null
        }))}
    }))
}))

describe("user login", () => {
    it("deve retornar campo obrigatório quando não informar um e-mail", async () => {
        const wrapper = mount(UserLogin);
    
        const emailInput = wrapper.find('input[type="email"]');
        await emailInput.setValue("");
  
        const passwordInput = wrapper.find('input[type="password"]');
        await passwordInput.setValue("abcd1234");

            
        expect(wrapper.text()).toMatch("Campo obrigatório");
    });

    it("deve retornar campo obrigatório quando não informar uma senha", async () => {
        const wrapper = shallowMount(UserLogin);
    
        const emailInput = wrapper.find('input[type="email"]');
        await emailInput.setValue("amm@email.com");
  
        const passwordInput = wrapper.find('input[type="password"]');
        await passwordInput.setValue("");
    
        expect(wrapper.text()).toMatch("Campo obrigatório");
    });

    it("deve fazer login com sucesso quando informado um e-mail e senha válidos", async () => {
      const wrapper = shallowMount(UserLogin);
  
      const emailInput = wrapper.find('input[type="email"]');
      await emailInput.setValue("amm@email.com");

      const passwordInput = wrapper.find('input[type="password"]');
      await passwordInput.setValue("abcd1234");
  
      expect(wrapper.text()).toMatch("Bem-vindo(a)");
    });
}); */
