import '@fortawesome/fontawesome-free/css/all.min.css'
import './style.css'
import App from './App'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
)