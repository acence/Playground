import axios from 'axios';

class Ajax {
    static executeRequest(method, url, data) {
        return axios[method](url, data)
            .catch(function () { //parameters: error
                //console.log(error);
            });
    }

    static get(url) {
        return Ajax.executeRequest('get', url);
    }
    static post(url, data) {
        return Ajax.executeRequest('post', url, data);
    }
    static put(url, data) {
        return Ajax.executeRequest('put', url, data);
    }
    static delete(url) {
        return Ajax.executeRequest('delete', url);
    }
}

export default Ajax;