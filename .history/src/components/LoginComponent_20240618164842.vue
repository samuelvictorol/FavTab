<template>
    <section id="login-page" class="relative animate__animated animate__fadeIn">
        <div class="column q-gutter-y-md q-pa-lg rounded-borders" id="login-form">
            <div class="text-h3 text-white q-pb-xs font-decorative-2">{{ creating ? 'Registrar-se' : 'Entrar' }}</div>
            <div v-if="mensagem.show" class="animate__animated animate__zoomIn column items-center justify-center  w100">
                <q-icon :name="mensagem.icon" :class="mensagem.color" size="md"/>
                <span :class="'text-bold text-center ' + mensagem.color">{{ mensagem.desc }}</span>
            </div>
            <q-input id="nome-input" color="grey-8" class="animate__animated animate__fadeInUp bg-white rounded-borders" v-model="loginFormData.nome" maxlength="200" v-if="creating" outlined dense label="Nome*"/>
            <q-input @keyup.enter="creating ? registrar() : login()" id="login-input" color="grey-8" class="bg-white rounded-borders" v-model="loginFormData.login" maxlength="15" outlined dense label="Login*"/>
            <q-input id="email-input" color="grey-8" class="animate__animated animate__fadeInDown bg-white rounded-borders" v-model="loginFormData.email" v-if="creating" maxlength="50" outlined dense label="Email*"/>
            <q-input @keyup.enter="creating ? registrar() : login()" color="grey-8" class="bg-white rounded-borders" v-model="loginFormData.senha" maxlength="15" outlined dense type="password" :label="creating ? 'Criar sua Senha*' : 'Senha*'"/>
            <div v-if="!loading" class="w100 column q-gutter-y-sm" >
                <q-btn @click="login()" v-if="!creating " :disable="checkLogin()" color="grey-9" label="Entrar"/>
                <q-btn @click="registrar()" v-if="creating" color="grey-9" :disable="checkCreate()" label="Criar Conta" icon-right="person_add"/>
                <q-btn @click="creating = !creating" color="orange-7" dense class="text-white" :label="creating ? 'Voltar' : 'Registre-se agora'"/>
                <q-btn id="cancelar-btn" @click="$emit('toggleLogin')" flat dense color="primary" label="cancelar"/>
            </div>
            <div v-if="loading" class="loading w100 row justify-center items-center">
                <q-spinner-bars
                color="green"
                size="2em"
              />
            </div>
        </div>
    </section>
</template>
<script lang="ts" setup>
import { api } from 'src/boot/axios'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const loading = ref(false)
const creating = ref<boolean>(false)

const loginFormData = ref({
    nome: '',
    login: '',
    email: '',
    senha: '',
} as any)

const mensagem = ref({
    show: false,
    desc: '',
    icon: '',
    color: 'text-white'
})

const checkCreate = () => {
    if(loginFormData.value.nome === '' || loginFormData.value.login === '' || loginFormData.value.email === '' || loginFormData.value.senha === '') {
        return true
    }
    return false
}

const checkLogin = () => {
    if(loginFormData.value.login === '' || loginFormData.value.senha === '') {
        return true
    }
    return false
}

async function registrar() {
    loginFormData.value.login = loginFormData.value.login.toLowerCase()
    await api.post('/usuario', loginFormData.value)
        .then(response => {
            api.post('/login', loginFormData.value)
                .then(res => {
                    mensagem.value.icon = 'person_add'
                    mensagem.value.desc = response.data.message
                    mensagem.value.color = 'text-green'
                    mensagem.value.show = true
                    loading.value = true
                    sessionStorage.clear()
                    sessionStorage.setItem('userLogado', JSON.stringify(res.data.response))
                    setTimeout(() => {
                        
                        window.location.reload()
                    }, 2000)
                })
        })
        .catch(error => {
            mensagem.value.icon = 'error'
            mensagem.value.desc = error.response.data.message
            mensagem.value.show = true
            loginFormData.value.login = ''
            loginFormData.value.email = ''
            loginFormData.value.senha = ''
            setTimeout(() => {
                mensagem.value.show = false
            }, 5000)
        })
        
//   router.replace('/app')
}

async function login() {
    loginFormData.value.login = loginFormData.value.login.toLowerCase()
    await api.post('/login', loginFormData.value)
        .then(response => {
            // adicionar loading
            sessionStorage.clear()
            sessionStorage.setItem('userLogado', JSON.stringify(response.data.response))
            mensagem.value.icon = 'login'
            mensagem.value.desc = response.data.message
            mensagem.value.color = 'text-green'
            mensagem.value.show = true
            loading.value = true
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        })
        .catch(error => {
            mensagem.value.show = true
            mensagem.value.desc = error.response.data.message
            mensagem.value.icon = 'error'
            mensagem.value.color = 'text-red'
            loginFormData.value.senha = ''
            setTimeout(() => {
                mensagem.value.show = false
            }, 3000)
        })
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
    z-index: 9999!important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: #191919cc;
    backdrop-filter: blur(5px);

}
#login-form {
    width: 340px;
    background: #000000;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #202020, #000000);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #202020, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}    


</style>
