import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { createApp, onMounted } from 'vue'
import { useStore } from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
