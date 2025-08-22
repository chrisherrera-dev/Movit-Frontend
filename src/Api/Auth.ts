import axios from "axios";
import { CredentialResponse } from "@react-oauth/google"
import { AUTH } from '../Constants/endpoint'
import GenericResponse from '../Types/GenricResponse'
import { MOVIT_BK } from '../Config/index'
import { CreateAccount } from '../Types/Forms/CreateAccount'
import { StatusLogin } from "../Types/Forms/StatusLogin";

export const LoginGoogle = async (googleToken: CredentialResponse): Promise<GenericResponse<StatusLogin>> => {

    if(!googleToken.credential){
        throw new Error("No credential provided")
    }
    const formData = new FormData()

    formData.append('credential', googleToken.credential)
    
    const url = MOVIT_BK + AUTH.google_login

    const response = await axios.post<GenericResponse<StatusLogin>>(url, formData)

    return response.data
} 

export const LoginGitHub = async (code: string): Promise<GenericResponse<StatusLogin>> => {

    if(code === null){
        throw new Error("The github code is empty")
    }

    const url = `${MOVIT_BK}${AUTH.github_login}?code=${code}` 

    const response = await axios.post<GenericResponse<StatusLogin>>(url)

    return response.data
}

export const CreatAccount = async (user: CreateAccount): Promise<GenericResponse<StatusLogin>> => {

    const url = `${MOVIT_BK}${AUTH.native_create_account}`

    const response = await axios.post(url, user)

    return response.data
}

export const LoginNative = async (user: CreateAccount): Promise<GenericResponse<StatusLogin>> => {

    const url = `${MOVIT_BK}${AUTH.native_login}`
    
    const response = await axios.post(url, user)

    return response.data
}