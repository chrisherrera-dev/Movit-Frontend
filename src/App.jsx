import './App.css'
import './Styles/Components/Login.css'
import './Styles/General/General.css'
import AppRouter from './App/AppRouter'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <AppRouter/>
      <ToastContainer/>
    </>
  )
}

export default App
