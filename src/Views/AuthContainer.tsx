import { Outlet} from 'react-router-dom'
import loginWave from '../assets/images/login/wave-haikei.png'

function AuthContainer() {
  return (
    <div style={{backgroundImage: `url(${loginWave})`}} className='h-screen w-full flex justify-center items-center bg-no-repeat bg-cover bg-center bg-success p-5' > 
      <Outlet/>
    </div>
  )
}

export default AuthContainer
