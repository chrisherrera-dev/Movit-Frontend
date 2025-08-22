import { BrowserRouter, Routes,Route, Router, Navigate, replace } from "react-router-dom"
import AuthContainer from "../Views/AuthContainer"
import LoginForm from "../Components/Auth/LoginForm"
import CreateAccountForm from "../Components/Auth/CreateAccountForm"

function AppRouter() {
  return (
    <div>
      
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Navigate to={"/auth/login"}/>}/>

          <Route path="/auth" element={<AuthContainer/>}>
            <Route index element={<Navigate to="login"/>}/>
            <Route path="login" element={<LoginForm/>}/>
            <Route path="create" element={<CreateAccountForm/>}/>
          </Route>

        </Routes>

      </BrowserRouter>

    </div>
  )
}

export default AppRouter
