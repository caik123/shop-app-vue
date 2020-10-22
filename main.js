import Vue from 'vue'
import App from './App'
import {
	myRequest
} from './api/api.js'

Vue.prototype.$myRequest = myRequest
Vue.config.productionTip = false

App.mpType = 'app'

//时间过滤器
Vue.filter('formatDate',function(value){
	let date = new Date(value)
	let year = date.getFullYear()
	let month = (date.getMonth() + 1).toString().padStart(2, 0)
	let day = date.getDate().toString().padStart(2, 0)
	let hour = date.getHours().toString().padStart(2, '0')
	let minute = date.getMinutes().toString().padStart(2, '0')
	let second = date.getSeconds().toString().padStart(2, '0')
	// return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
	return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})

const app = new Vue({
	...App
})
app.$mount()
