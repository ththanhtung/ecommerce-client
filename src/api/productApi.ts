import { axiosClient } from "./axios-client"

class ProductAPI {
    getProducts(){
        const url = '/product'
        return axiosClient.get(url)
    }
    getOneProduct(productId: string = '') {
        const url = `product/${productId}`
        return axiosClient.get(url)
    }
}

export default new ProductAPI