import { Acc, Cat, Session, User } from '@/type';
import axios from 'axios';
const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
export const getGoogleCode = () => {
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount');

    authUrl.searchParams.set('client_id', process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/userinfo.email');
    authUrl.searchParams.set('access_type', 'offline');
    window.location.href = authUrl.toString();
};

export const getUser = async (code: string) => {
    const userResponse = await api.get<Session['user']>('/oauth/google/user', {
        params: {
            code,
        },
    });
    return userResponse.data;
};

export const getNewToken = async (refresh: string) => {
    const newToken = await api.post<Session['token']>('/auth/refresh', {
        refresh,
    });
    return newToken.data;
};

export const getMe = async (access: string) => {
    const res = await api.get<User>(`/user/me`, {
        headers: {
            Authorization: `Bearer ${access}`,
        },
    });
    return res.data;
};

export const setNickName = async (param: { nickname: string }) => {
    const res = await api.post<boolean>('/user/nickname', param);
    return res.data;
};

export const getCats = async () => {
    const response = await api.get<Cat[]>('/common/cats');

    return response.data;
};

export const getAccessories = async () => {
    const response = await api.get<Acc[]>('/common/accessories');

    return response.data;
};

const APIs = {
    getGoogleCode,
    getUser,
    getMe,
    setNickName,
    getCats,
    getAccessories,
};

export default APIs;
