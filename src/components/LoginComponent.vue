<template>
    <section id="login-page" class="animate__animated animate__fadeIn">
        <div class="column q-gutter-y-md q-pa-lg rounded-borders" id="login-form">
            <div class="text-h3 q-pb-md">{{ creating ? 'Registrar-se' : 'Entrar' }}</div>
            <q-input color="grey-9" v-model="loginFormData.login" maxlength="15" outlined dense label="Login*"/>
            <q-input color="grey-9" v-model="loginFormData.email" v-if="creating" maxlength="50" outlined dense label="Email*"/>
            <q-input color="grey-9" v-model="loginFormData.password" maxlength="15" outlined dense type="password" label="Senha*"/>
            <q-input color="grey-9" v-model="loginFormData.confirmPassword" v-if="creating" maxlength="15" outlined dense label="Confirmar Senha*"/>
            <q-btn @click="login()" v-if="!creating" color="primary" label="Entrar"/>
            <q-btn v-if="creating" color="green-6" label="Criar"/>
            <q-btn @click="creating = !creating" color="orange-8" class="text-white" :label="creating ? 'Voltar' : 'Registre-se agora'"/>
            <q-btn @click="$emit('toggleLogin')" flat dense color="primary" label="cancelar"/>
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
html{
    overflow-x: hidden!important;
}
#login-page
{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999!important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 99.9vh;
    width: 99vw;
    background: #19191960;
    backdrop-filter: blur(5px);

}
#login-form {
    width: 340px;
    background-color: white;
}

</style>
