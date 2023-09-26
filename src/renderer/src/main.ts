import { createApp } from 'vue'
import App from './App'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/dist/quasar.css'

createApp(App)
  .use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    lang: quasarLang
  })
  .mount('#app')
