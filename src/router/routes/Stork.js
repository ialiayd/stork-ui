// ** React Imports
import { lazy } from "react"
const Home = lazy(() => import("../../views/pages/stork/pages/Home"))

const AppRoutes = [
  {
    element: <Home />,
    path: "/home/",
    meta: {
      publicRoute: true,
      layout: "blank",
    },
  },
]

export default AppRoutes
