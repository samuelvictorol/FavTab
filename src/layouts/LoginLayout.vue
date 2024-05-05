<template>
    <section id="login-page">
        <div class="column q-gutter-y-md q-pa-lg bg-blue-1 rounded-borders" id="login-form">
            <div class="text-h4 q-pb-md">{{ creating ? 'Registrar-se' : 'Entrar' }}</div>
            <q-input v-model="loginFormData.login" maxlength="15" outlined dense label="Login*"/>
            <q-input v-model="loginFormData.email" v-if="creating" maxlength="50" outlined dense label="Email*"/>
            <q-input v-model="loginFormData.password" maxlength="15" outlined dense type="password" label="Senha*"/>
            <q-input v-model="loginFormData.confirmPassword" v-if="creating" maxlength="15" outlined dense label="Confirmar Senha*"/>
            <q-btn @click="login()" v-if="!creating" color="primary" label="Entrar"/>
            <q-btn v-if="creating" color="green-6" label="Criar"/>
            <q-btn @click="creating = !creating" class="text-black" :label="creating ? 'Voltar' : 'Registre-se agora'"/>

        </div>
    </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const creating = ref<boolean>(false)
const loginFormData = ref({
    login: '',
    email: '',
    password: '',
    confirmPassword: ''
} as any)

function login() {
  router.replace('/app')
}

</script>
<style scoped>
#login-page
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: #0F2027;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
#login-form {
    width: 340px;
    background-color: white;
}

</style>
