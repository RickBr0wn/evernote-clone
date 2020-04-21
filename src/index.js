import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Store from './Contexts/NotesContext'

ReactDOM.render(
  <Store>
    <App />
  </Store>,
  document.getElementById('root')
)
