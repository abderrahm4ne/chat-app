import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { useEffect } from "react"

import LandingPage from "./features/landing/LandingPage"
import RegisterPage from "./features/auth/RegisterPage"
import LoginPage from "./features/auth/LoginPage"
import SetupProfilePage from "./features/setup/SetupProfilePage"
import ChatPage from "./features/chat/ChatPage"

import { Toaster } from "react-hot-toast"

import { store } from "./store/store"
import { Provider } from "react-redux"
import { useAppDispatch, useAppSelector } from "./store/hooks/hooks"

import { useGetMeQuery } from "./store/api/authApi"
import { socket } from "./store/socket"
import { setOnlineUsers } from "./store/slices/chatSlice"


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="" element={
            <LandingPage />
          }/>

        <Route path="register" element={
            <RegisterPage />
        }/>

        <Route path="login" element={
            <LoginPage />
          }/>
        
        <Route path="setup-profile" element={<SetupProfilePage />} />

        <Route path="chat" element={<ChatPage />} />


        <Route path="*" element={<div>404 Not Found</div>} />

      </>
    )
  )

function AppProvider() {
  useGetMeQuery();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => (state.auth.user))

  useEffect(() => {
    if (authUser) {
      if (authUser?._id) {
        socket.io.opts.query = {
          userId: authUser._id,
        }
        socket.connect()
        
        socket.on("getOnlineUsers", users => {
          dispatch(setOnlineUsers(users))
        })
      }

      return () => {
        socket.off("getOnlineUsers")
        socket.disconnect()
      }
    }
  }, [authUser?._id])
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
