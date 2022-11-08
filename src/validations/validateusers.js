import { defineRule } from 'vee-validate'

export default {
        required: defineRule('required', value => {
            if (!value) {
                return 'Campo obrigatório.'
            }
            return true
        }),
        // Verifica se tem ao menos 8 caracteres
        password: defineRule('password', value => {
            if (value.length < 8) {
                return 'A senha deve possuir no mínimo 8 caracteres'
            }
            return true
        }),
        // Verifica se é um formato de email válido
        emailcheck: defineRule ('emailcheck', email => {
            let regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            if (!regexp.test(email)) {
                return 'Email inválido.'
            }
            return true
        }),
}