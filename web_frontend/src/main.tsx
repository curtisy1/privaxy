import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import 'braid-design-system/reset';
import anzTheme from 'braid-design-system/themes/apac';
import {BraidProvider} from 'braid-design-system';
import routes from "./routes/routes";
import {ReactLocation, Router} from "@tanstack/react-location";

const queryClient = new QueryClient();
const location = new ReactLocation();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BraidProvider theme={anzTheme}>
        <Router
          routes={routes}
          location={location}
        >
        </Router>
      </BraidProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
