import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

import LandingPage from "./features/landing/LandingPage"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="" element={<div className="min-h-screen min-w-screen flex items-center justify-center"><LandingPage /></div>} />
      </>
    )
  )


  return <RouterProvider router={router} />
}

export default App
