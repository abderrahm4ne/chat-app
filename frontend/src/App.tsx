import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

import LandingPage from "./features/landing/LandingPage"
import RegisterPage from "./features/auth/RegisterPage"
import LoginPage from "./features/auth/LoginPage"
import SetupProfilePage from "./features/setup/SetupProfilePage"
import ChatPage from "./features/chat/ChatPage"

import { Toaster } from "react-hot-toast"

import { store } from "./store/store"
import { Provider } from "react-redux"

import { useGetMeQuery } from "./store/api/authApi"


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
        
        <Route path="setup-profile" element={<SetupProfilePage />} />

        <Route path="chat" element={<ChatPage />} />


        <Route path="*" element={<div>404 Not Found</div>} />

      </>
    )
  )

function AppProvider() {
  useGetMeQuery();
  return <RouterProvider router={router} />
}

function App() {

  return (
    <>
      <Toaster />
      <Provider store={store}>
        <AppProvider />
      </Provider>
    </>
)
}

export default App
