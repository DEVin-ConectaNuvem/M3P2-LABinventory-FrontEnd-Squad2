import { defineRule } from 'vee-validate'
//import axios from 'axios'
export default {
        required: defineRule('required', value => {
            if (!value) {
                return 'Campo obrigatório.'
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
        // Verifica se tem ao menos duas palavras
        namecheck: defineRule('namecheck', name => {
            let parts = name.split(' ')
            if (parts.length < 2 || parts[1].length == 0) {
                return 'Informe o nome completo'
            }
            return true
        }),
        // Verifica se a data é menor que a atual
        birthdate: defineRule('birthcheck', value => {
            let now = new Date()
            let day = String(now.getDate()).length > 1 ? String(now.getDate()) : `0${String(now.getDate())}`
            let month = String(now.getMonth()).length > 1 ? String(now.getMonth() + 1) : `0${String(now.getMonth() + 1)}`
            let year = String(now.getFullYear())
            let checkDate = new Date(`${year}-${month}-${day}` + " 00:00:00")
            let birth = new Date(value + " 00:00:00")
            if (Date.parse(birth) > Date.parse(checkDate)) {
                return 'Data inválida.'
            }
            return true
        }),
        // Verifica se tem 11 dígitos
        phonecheck: defineRule('phonecheck', value => {
            if(value.length < 14){
                return "Favor digitar um telefone válido"
            }
            return true
        }),
}