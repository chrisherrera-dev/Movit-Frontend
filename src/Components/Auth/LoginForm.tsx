

import addresbro from "../../assets/images/login/Address-bro.png"
import logo from "../../assets/images/login/movit-logo.png"
import { AUTH } from "../../Constants/endpoint"
import { GOOGLE_CLIENT_ID, GITHUB_CLIENT_ID } from '../../Config/index'
import { GoogleOAuthProvider ,GoogleLogin, CredentialResponse } from "@react-oauth/google"
import { FaUser, FaLock, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useSearchParams } from "react-router-dom"
import { LoginGoogle, LoginGitHub, LoginNative} from "../../Api/Auth"
import { useEffect } from "react"
import Input from "../Common/Input"
import Button from "../Common/Button"
import { useForm } from 'react-hook-form'
import { CreateAccount } from '../../Types/Forms/CreateAccount'
import { toast } from 'react-toastify'
import { useState } from "react"

function LoginForm() {

  const [seePassword, setSeePassword] = useState(false)

  const [params] = useSearchParams()

  const { register, handleSubmit, formState: {errors} } = useForm<CreateAccount>()

  useEffect(() => {
    
    const gitCode = params.get("code")
    
    if(gitCode != null) loginGitHub(gitCode)
  
  }, [])

  const loginGitHub = async (code:string) => {

    if(code === null) throw Error("GitHub code empty")

    const response = await LoginGitHub(code)
    
    console.log(response.data);
    
    toast(response.data.message)

  }

  const loginGoogle = async (credentialResponse: CredentialResponse) => {
    
    const response = await LoginGoogle(credentialResponse)

    console.log(response.data);
    
    toast(response.data.message)
  }

  const GetGitHubCode = () => {

    let redirectUri = window.location.origin + AUTH.github_login_front

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=user:email`
  }

  const onError = () => toast("Please fill all required fields to create your account ❌")

  const LogIn = async (data: CreateAccount) => {
    
    const res = await LoginNative(data)
    console.log(res.data.token);
    

    toast(res.data.message)
  } 

  const changeStatePassword = () => setSeePassword(previous => !previous)

  return (
    <div className='bg-white rounded-lg w-full h-3/4 p-2 shadow-2xl shadow-gray-300 border-2  border-black center-horizontal md:w-4/5 3xl:w-1/2'>
      
      <div className="bg-back_login md:w-1/2 h-full rounded-tl-lg rounded-bl-lg hidden sm:hidden md:block">

        <div className="relative h-1/5 w-full z-10">
          <img src={logo} alt="Movit logo" className="w-24 absolute left-10 top-8"/>
        </div>

        <div className="relative w-full h-4/5 z-20">
          <img src={addresbro} alt="delivery icon" className="absolute bottom-[-25px]"/>
        </div>

      </div>

      <div className="w-full md:w-1/2 h-full">

        <div className="w-full h-1/3 mt-10 col-center">

          <h3 className="relative top-3 font-bold text-primary responsive-text">WELCOME TO</h3>

          <img src={logo} alt="Movit logo" className="w-1/2 h-1/3 max-w-m-logo mt-5 mb-3 lg:w-1/3 lg:h-1/3 lg:min-w-m-logo"/>
          
          <p className="text-gray-600 responsive-text">Log in to start sending packages with us</p>

        </div>

        <form onSubmit={handleSubmit(LogIn, onError)} className="w-full h-1/3 col-center">
            
            <Input type="text" placeholder="Email or Username" icon={FaUser} {...register("email", {required: true}) }/>

            <Input type={seePassword ? "text" : "password"} iconPassword={seePassword ? FaEye : FaEyeSlash} togglePassword={changeStatePassword} 
              placeholder="Password" icon={FaLock} {...register("password", {required: true}) }/>

            <Button text="SIGN IN"/>

            <p className="text-gray-600 responsive-text">Don't have an account? <Link to={'/auth/create'} className="text-error font-bold">Sign Up Now</Link></p>
        </form>

        <div className="w-full h-1/4 col-around">

          <div className="flex items-center w-3/4 my-4">
            <span className="flex-grow h-px bg-gray-300"></span>
            <span className="mx-3 text-gray-500 text-sm">or</span>
            <span className="flex-grow h-px bg-gray-300"></span>
          </div>


          <p className="text-sm text-gray-600 responsive-text">Continue with social media</p>

          <ul className="center-horizontal space-x-5">
              <li className="center-horizontal icon">
                <GoogleOAuthProvider  clientId={GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                          type="icon"
                          shape="circle"
                          theme="filled_black"
                          size="medium"
                          onSuccess={loginGoogle}
                          onError={() => console.log("")}
                        />
                </GoogleOAuthProvider >
              </li>

              <li className="center-horizontal icon">
                <FaGithub className="text-black" onClick={GetGitHubCode}/>
              </li>
          </ul>
          
        </div>

      </div>

    </div>
  )
}

export default LoginForm
