import axios from 'axios'

//页面数据
export function queryPage(payload) {
    return axios({
        url: 'https://gateway.test.vevor.net/scp-vendor-service/controller-OperateDocument/front/queryPage',
        method: 'post',
        params: payload,
        headers: {
            Authorization: 'Bearer 322e9beb-01e8-494e-8303-d621b5b05ede',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });
}
