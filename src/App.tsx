import React from 'react'
import './index.css'
import './App.css'
import Dashboard from './components/Dashboard'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

const router: any = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello dashboard</div>,
  },
  {
    path: "/add-team",
    Component: React.lazy(() => import('./components/NewTeam')),
  },
  {
    path: "/teams",
    Component: React.lazy(() => import('./components/Teams')),
  },
  {
    path: "/team/:teamId",
    Component: React.lazy(() => import('./components/Team')),
  },
]);

function App() {


  return (
    <>
      <Dashboard>
        <RouterProvider router={router} />
      </Dashboard>
    </>
  )
}

export default App
