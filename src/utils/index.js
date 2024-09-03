import router from '@/router';
import { COMMON } from '@/utils/common';
import { ENUM } from '@/utils/enum';
import { FORMAT } from '@/utils/format';
import { RESPONSE } from '@/utils/response';
import { TOAST_SERVICE } from '@/utils/toast';
import { VALIDATE } from '@/utils/validate';
import { useStorage } from '@vueuse/core';
// import CryptoJS from 'crypto-js';
import { io } from 'socket.io-client';
import { computed } from 'vue';

const socket = io(import.meta.env.VITE_BASE_URL_BE);

const appLocalStorage = useStorage('AppLocalStorage', ENUM.APP_LOCAL_STORAGE, localStorage, { mergeDefaults: true });

const decryptedData = computed(() => {
    if (appLocalStorage.value.userData) {
        // try {
        //     return CryptoJS.AES.decrypt(appLocalStorage.value.userData, import.meta.env.VITE_BASE_JWT_SECRET).toString(CryptoJS.enc.Utf8);
        // } catch (error) {
        //     onDeleteAppLocalStorage();
        // }
    } else {
        return '';
    }
});

const userData = computed(() => (decryptedData.value ? JSON.parse(decryptedData.value) : ENUM.USER_DATA));
const accessToken = computed(() => appLocalStorage.value.accessToken || '');
const refreshToken = computed(() => appLocalStorage.value.refreshToken || '');

const isLoading = computed(() => appLocalStorage.value.isLoading);
const innerWidth = computed(() => appLocalStorage.value.innerWidth || 1300);
const desktopScreen = computed(() => appLocalStorage.value.desktopScreen);
const mobileScreen = computed(() => appLocalStorage.value.mobileScreen);
const isScroll = computed(() => appLocalStorage.value.isScroll);
const elementId = computed(() => appLocalStorage.value.elementId);
const lang = computed(() => appLocalStorage.value.lang || 'vi');

const onDeleteAppLocalStorage = () => {
    appLocalStorage.value.isLoading = true;

    localStorage.removeItem('AppLocalStorage');
    appLocalStorage.value = ENUM.APP_LOCAL_STORAGE;

    setTimeout(() => {
        router.replace({ name: 'SignIn' });
        appLocalStorage.value.isLoading = false;
    }, 500);
};

export {
    accessToken,
    appLocalStorage,
    // -----------------------
    COMMON,
    desktopScreen,
    elementId,
    ENUM,
    FORMAT,
    innerWidth,
    isLoading,
    isScroll,
    lang,
    mobileScreen,
    onDeleteAppLocalStorage,
    refreshToken,
    RESPONSE,
    socket,
    TOAST_SERVICE,
    userData,
    VALIDATE
};
