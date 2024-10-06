import WeatherPage from './Weather/weather.jsx'
import Chat from './components/chat/chat.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherPage />
  </StrictMode>,
)
