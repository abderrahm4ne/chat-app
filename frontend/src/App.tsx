import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

import LandingPage from "./features/landing/LandingPage"
import RegisterPage from "./features/auth/RegisterPage"
import LoginPage from "./features/auth/LoginPage"

import { store } from "./store/store"
import { Provider } from "react-redux"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="" element={
          <div 
          className="min-h-screen min-w-screen flex items-center justify-center">
            <LandingPage />
          </div>
          }/>

        <Route path="register" element={
          <div 
          className="min-h-screen min-w-screen flex items-center justify-center px-4 py-8 bg-gray-200">
            <RegisterPage />
          </div>
        }/>

        <Route path="login" element={
          <div 
          className="min-h-screen min-w-screen flex items-center justify-center px-4 py-8 bg-gray-200">
            <LoginPage />
          </div>
          }/>

      </>
    )
  )


  return <Provider store={store}><RouterProvider router={router} /></Provider>
}

export default App
