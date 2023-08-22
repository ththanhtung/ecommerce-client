import { axiosClient } from "./axios-client";

interface NewShopReq {
    name: string;
    email: string;
    password: string
}

interface ShopLoginReq {
    email: string;
    password: string
}

class AuthApi {
    CreateNewShop(newShop: NewShopReq){
        const url = '/shop/auth/signup';
        return axiosClient.post(url, newShop)
    }

    ShopLogin(loginInfo: ShopLoginReq){
        const url = '/shop/auth/login'
        return axiosClient.post(url, loginInfo)
    }
    GetRefreshToken(refreshToken: string){
        const url = '/shop/auth/refeshtoken'
        return axiosClient.post(url, {
            refeshToken: refreshToken
        })
    }
}

export default new AuthApi()