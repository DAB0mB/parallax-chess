import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Game3D } from './ui/game'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Game3D />
  </React.StrictMode>,
)
