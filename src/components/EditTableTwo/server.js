import req from '../../utils/request'

export function getUserList() {
    return req({
        // `url` 是用于请求的服务器 URL
        url: '/list',

        // `method` 是创建请求时使用的方法
        method: 'get', // 默认是 get

		//需要传递到服务器的 参数
		params:''
    })
}
