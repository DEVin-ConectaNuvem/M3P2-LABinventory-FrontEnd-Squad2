import { defineRule } from 'vee-validate'

export default {
        required: defineRule('required', value => {
            if (!value) {
                return 'Campo obrigatório.'
            }
            return true
        }),
        // Verifica se está no formato XX9999-999
        patrimonycheck: defineRule('patrimonycheck', value => {
            let regexp = /^[A-Z]{1}[A-Z]{1}[0-9]{4}-[0-9]{3}$/
            if (!regexp.test(value)) {
                return 'Código inválido.'
            }
            return true
        }),
        // Verifica se está no formato 9999,99
        pricecheck: defineRule('pricecheck', value => {
            let regexp = /^[0-9]{1,},[0-9]{2}$/
            if (!regexp.test(value)) {
                return 'Valor inválido.'
            }
            return true
        }),
        urlcheck: defineRule('urlcheck', url => {
            // Valida o formato da URL
            let regexp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
            if(!regexp.test(url)) {
                return 'URL inválida.'
            }
            // Valida se a URL gera uma imagem de largura diferente de 0px
            // let img = document.createElement('img')
            // img.src = url
            // setTimeout(() => {
            //     if (img.width == 0) {
            //         return 'URL falhou.'
            //     }
            // }, 1000)
            
            return true
        })
}