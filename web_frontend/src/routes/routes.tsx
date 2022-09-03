import {Route} from "@tanstack/react-location";
import Dashboard from "./Dashboard";
import Requests from "./Requests";
import Settings from "./Settings";

const routes: Route[] = [
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
  {
    path: '/settings',
    element: <Settings/>,
    id: 'settings',
  },
];

export default routes;