import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { GameUI } from './3d/ui'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameUI />
  </React.StrictMode>,
)
