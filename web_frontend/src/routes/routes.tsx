import {Route} from "@tanstack/react-location";
import Dashboard from "./Dashboard";
import Requests from "./Requests";

const routes: Route[] = [
  {
    path: '/',
    id: 'privaxy',
    children: [
      {
        path: '/',
        element: <Dashboard/>,
        id: 'dashboard'
      },
      {
        path: '/requests',
        element: <Requests/>,
        id: 'requests'
      },
    ],
  },
];

export default routes;