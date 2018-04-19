import axios from 'axios';

class Ajax {
    static get(url) {
        return axios.get(url);
    }
}

export default Ajax;