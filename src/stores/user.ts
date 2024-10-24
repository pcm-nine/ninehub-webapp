import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  // Data
  const clientId = ref<string>('YOUR_CLIENT_ID');
  const clientSecret = ref<string>('YOUR_CLIENT_SECRET');
  const userData = ref<object>({});

  // Functions

  return {
    // Data
    clientId,
    clientSecret,
    userData,

    // Functions
  };
});

export default useUserStore;
