import {defineRule} from 'vee-validate'

export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

export const requiredField = defineRule('required', campo =>{
    if(!campo || campo.length === 0){
        return 'Campo obrigatório!!'
    }
    return true
});

export const minPasswordLength = defineRule('minLength',  (campo, [target]) =>{
    
    if(campo.length < target ){
        return 'A senha deve conter no mínimo de 8 caracteres'
    }
    return true
});

export const requiredEmail = defineRule('emailValidation',campo =>{
    if(!validateEmail(campo)){
        return 'Email inválido!!'
    } 
    return true
});

export const equalPasswords = defineRule('confirmed', (value, [target], ctx) => {
    if (value === ctx.form[target]) {
      return true;
    }
    return 'Senhas diferentes!!';
});

export const lengthCep = defineRule('lengthCep', (campo, [target]) =>{
    if(campo.length < target){
        return 'Cep inválido!!'
    }
})