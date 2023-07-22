import React from 'react'
import ReactDOM from 'react-dom/client'
import { Game } from './ui/game'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
)
