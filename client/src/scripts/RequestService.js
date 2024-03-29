import axios from 'axios';

const url = process.env.REACT_APP_BACKEND_URL
    ? `${process.env.REACT_APP_BACKEND_URL}/api/`
    : 'api/';

axios.interceptors.request.use(
    config => {
        const allowedOrigins = [url];
        const token = localStorage.getItem('lunchToken');
        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

class RequestService {

    static setToken(token) {
        axios.defaults.headers.Authorization = token;
    }
    static getUrl() {
        return url;
    }

    static login = async (username, password) => {
        return new Promise ((resolve) => {
            axios.post(url + "login", {
                username: username,
                password: password
            })
            .then (response => {
                this.setToken(response.data.token);
                localStorage.setItem(
                    'lunchToken', JSON.stringify(response.data.token)
                )
                resolve(true);
            })
            .catch (error => {
                resolve(false);
            });
        });
    }

    static getRequest(endPoint) {
        return new Promise ((resolve,reject) => {
            axios.get(url + endPoint).then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            });
        });
    }

    static sendRequest(endPoint, obj) {
        return axios.post(url + endPoint, {
            obj
        });
    }

    static putRequest(endPoint, obj) {
        return axios.put(url + endPoint, {
            obj
        });
    }

    static getDataRequest(endPoint) {
        return new Promise ((resolve,reject) => {
            axios.get(url + endPoint).then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            });
        });
    }

    static sendDataRequest(endPoint, json) {
        return axios({
            method: 'post',
            url: url + endPoint,
            data: json,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }

    static deleteRequest(endPoint, id) {
        return axios.delete(`${url}${endPoint}/${id}`);
    }
}

export default RequestService;