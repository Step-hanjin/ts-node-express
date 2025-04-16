import { createApp } from 'vue'
import PrimeVue from  "primevue/config"
import './style.css'
import App from './App.vue'

const app = createApp(App);
app.use(PrimeVue, 
    {
        theme: {
            // preset: AudioParam,
            // options: {
            //     prefix: 'p',
            //     darkModeSelctor: 'system',
            //     cssLayer: false
            // },
            // Unstyled mode instructs the components not to add any built-in style classes so that they can be styled using custom css or libraries like Tailwind and Bootstrap. 
            unstyled: true
        }
    }
);

app.mount('#app')
