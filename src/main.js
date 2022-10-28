import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
// import 'ant-design-vue/dist/antd.css'
import 'ant-design-vue/lib/message/style/index.css'
import Upload from 'ant-design-vue/lib/upload/index.js'
import 'ant-design-vue/lib/upload/style/index.css'

import { createFromIconfontCN } from '@ant-design/icons-vue';
import axios from 'axios';

let app = createApp(App);

const Custom = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2934828_yq48xetf7gi.js'
})
app.component('CustomIcon',Custom)

app.use(router);
app.use(store);
app.use(Upload);
app.config.globalProperties.$axios = axios

//开发环境
// app.config.globalProperties.HTTP_Config = {
// 	protocol: 'http://',
// 	domain: 'www.5mblog.cn'
//     // domain: location.host
// }
//线上环境 （适配www.和@.）
app.config.globalProperties.HTTP_Config = {
    protocol: '',
    domain: ''
}
app.mount('#app');