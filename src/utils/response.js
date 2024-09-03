import { appLocalStorage, TOAST_SERVICE } from '@/utils';

export const RESPONSE = () => {
    const TOAST = TOAST_SERVICE();

    const setup = async ({
        apiFunction = () => {
            return { data: null };
        },
        toast = { isShow: false, type: '', msg: '' },
        isLoading = true
    }) => {
        if (isLoading) {
            appLocalStorage.value.isLoading = true;
        }

        let result;
        await apiFunction
            .then(({ data: res }) => {
                if (res.success) {
                    result = res;

                    if (toast.isShow) {
                        switch (toast.type) {
                            case 'POPUP':
                                StoreApp().onActionShowNotification({
                                    isShow: true,
                                    type: 'success',
                                    message: toast.msg ? toast.msg : res.message,
                                    icon: 'pi-check-circle'
                                });
                                break;
                            default:
                                TOAST.success(toast.msg ? toast.msg : res.message);
                                break;
                        }
                    }
                } else {
                    throw res.message;
                }
            })
            .catch((error) => {
                if (error?.response?.data?.message) {
                    result = error?.response?.data;
                    if (result.statusCode === 'TOKEN_EXPIRED') {
                        return;
                    }

                    switch (toast.type) {
                        case 'POPUP':
                            StoreApp().onActionShowNotification({
                                isShow: true,
                                type: 'error',
                                message: error?.response?.data?.message,
                                icon: 'pi-exclamation-triangle'
                            });
                            break;
                        default:
                            TOAST.error(error?.response?.data?.message);
                            break;
                    }
                } else {
                    TOAST.error(error);
                }
            })
            .finally(() => {
                appLocalStorage.value.isLoading = false;
            });

        return result;
    };
    return { setup };
};
