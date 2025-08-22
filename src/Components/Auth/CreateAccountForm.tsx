import React, { useState } from 'react'
import logo from "../../assets/images/login/movit-logo.png"
import { FaEnvelope, FaUser, FaPhone, FaRegCalendarAlt, FaEye, FaEyeSlash } from "react-icons/fa"
import Input from '../Common/Input'
import Button from '../Common/Button'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CreateAccount } from '../../Types/Forms/CreateAccount'
import { toast } from 'react-toastify'
import { CreatAccount } from '../../Api/Auth'
import { MessageLogin } from '../../Types/Enum/MessageLogin'

function CreateAccountForm() {

  const [seePassword, setSeePassword] = useState(false)

  const { register, handleSubmit, formState: {errors} } = useForm<CreateAccount>()

  const onSubmit = async (data: CreateAccount) => {
    
    const res = await CreatAccount(data)
    
    toast(res.data.message)

    if(MessageLogin.AccountCreated === res.data.status){

      //lo llevo a la pagina
    }
    
  }

  const onError = () => toast("Please fill all required fields to create your account ❌")

  const changeStatePassword = () => setSeePassword(previous => !previous)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className='bg-white rounded-2xl p-5 border-2 border-black col-around 3xl:h-5/7 3xl:w-1/4'>

      <div className='w-full h-1/4 col-center'>
        <img src={logo} alt="movit logo" className='w-1/3 m-6'/>
        <p className=' text-primary responsive-text'>Create Account</p>
        <p className='text-sm text-gray-600 text-center mb-4'>
          Let’s get you set up with your new account.
        </p>

      </div>

      <div className='w-full h-1/2 col-around'>
         <Input type='email' placeholder='Email' icon={FaEnvelope} marginb={2} width={"w-4/5"} {...register("email", {required: true})}/>

         <Input type='text' placeholder='First Name' icon={FaUser} marginb={2} width={"w-4/5"} {...register("firstName", {required: true})}/>

         <Input type='text' placeholder='Last Name' icon={FaUser} marginb={2} width={"w-4/5"} {...register("lastName", {required: true})}/>

         <Input type={seePassword ? "text" : "password"} placeholder='Password' icon={FaUser} marginb={2} width={"w-4/5"} 
         iconPassword={seePassword ? FaEyeSlash : FaEye} togglePassword={changeStatePassword} {...register("password", {required: true})}/>

         <Input type='date' placeholder='Birthday' icon={FaRegCalendarAlt} width={"w-4/5"} {...register("birthday", {required: true})}/>

         <Input type='tel' placeholder='Phone' icon={FaPhone} optional={true} width={"w-4/5"} {...register("phone")}/>
      </div>

      <div className='w-full h-1/6 col-center'>
        <Button text='Create Account'/>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </p>

      </div>

    </form>
  )
}

export default CreateAccountForm
