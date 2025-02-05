import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export async function loginService(email: string, password: string) {
  try {
    const res = await axios.post('https://api.codingthailand.com/api/login', {
      email: email,
      password: password,
    });
    await SecureStore.setItemAsync('token', JSON.stringify(res.data));
  } catch (error) {
    throw error;
  }
}

export async function logoutService() {
  await SecureStore.deleteItemAsync('token');
}

export async function getProfileService() {
  try {
    let token: any;

    const tokenString = await SecureStore.getItemAsync('token');
    if (tokenString) {
      token = JSON.parse(tokenString);
    }

    const res = await axios.get('https://api.codingthailand.com/api/profile', {
      headers: {
        Authorization: 'Bearer ' + token.access_token,
      },
    });
    return res;
  } catch (error) {
    throw error; // 401
  }
}