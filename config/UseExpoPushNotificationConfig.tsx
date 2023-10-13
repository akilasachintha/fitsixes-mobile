import {Platform} from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {addDataToLocalStorage} from "@helpers/asyncStorage";
import {THEME} from "@constants/THEME";

const PROJECT_ID: string = "6dc7409c-c616-4299-a47a-08af5748547c";
const CHANNEL_NAME: string = 'default';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

async function getPermissions(): Promise<boolean> {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    return finalStatus === 'granted';
}

async function registerForPushNotificationsAsync(): Promise<string | undefined> {
    if (!Device.isDevice) {
        alert('Must use physical device for Push Notifications');
        return;
    }

    const hasPermissions = await getPermissions();
    if (!hasPermissions) {
        alert('Failed to get push token for push notification!');
        return;
    }

    const token = (await Notifications.getExpoPushTokenAsync({projectId: PROJECT_ID})).data;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(CHANNEL_NAME, {
            name: CHANNEL_NAME,
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: THEME.COLORS.primary,
        });
    }

    return token;
}


export default function useExpoPushNotificationConfig() {
    const storeDeviceToken = async (): Promise<string> => {
        try {
            const response = await registerForPushNotificationsAsync();
            if (response) {
                await addDataToLocalStorage('deviceToken', response);
                return response;
            } else {
                await addDataToLocalStorage('deviceToken', '');
                return '';
            }
        } catch (error) {
            console.error('Error storing token:', error);
            return '';
        }
    };

    return {
        storeToken: storeDeviceToken
    };
}
