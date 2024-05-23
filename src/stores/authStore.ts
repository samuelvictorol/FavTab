// src/stores/authStore.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: sessionStorage.getItem('userLogado') == undefined ? false : true
  }),
  actions: {
    login() {
      this.isAuthenticated = true;
      sessionStorage.setItem('userLogado', 'true');
    },
    logout() {
      this.isAuthenticated = false;
      sessionStorage.removeItem('userLogado');
    },
    getInfoNome() {
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        return user.nome;
      }
      return null; // Ou um valor padrão, se necessário
    },
    getInfoLogin(){
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        return user.login;
      }
      return null; // Ou um valor padrão, se necessário
    },
    getInfoImg(){
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        return user.user_image;
      }
      return null; // Ou um valor padrão, se necessário
    }
  }
});
