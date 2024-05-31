// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useSettingsStore = defineStore('settings', {
  actions: {
    setRepertorioViewHandle(value: string) {
      sessionStorage.setItem('repertorioViewHandle', value);
    },
    getRepertorioViewHandle() {
        return sessionStorage.getItem('repertorioViewHandle');
    }
  }
});
