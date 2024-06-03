// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useSettingsStore = defineStore('settings', {
  actions: {
    setRepertorioViewHandle(value: string) {
      sessionStorage.setItem('repertorioViewHandle', value);
      localStorage.setItem('repertorioViewHandle', value);
    },
    getRepertorioViewHandle() {
        return localStorage.getItem('repertorioViewHandle');
    },
    setSongViewHandle(value: string) {
      localStorage.setItem('songViewHandle', value);
      sessionStorage.setItem('songViewHandle', value);
    },
    getSongViewHandle() {
        return sessionStorage.getItem('songViewHandle');
    },
  }
});
