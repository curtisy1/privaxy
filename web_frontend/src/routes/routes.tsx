import {Route} from "@tanstack/react-location";
import Dashboard from "./Dashboard";

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
        ],
    },
];

export default routes;