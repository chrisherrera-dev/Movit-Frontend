import './App.css'
import './styles/Components/Login.css'
import './styles/General/General.css'
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
