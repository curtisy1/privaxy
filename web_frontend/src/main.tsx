import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import 'braid-design-system/reset';
import anzTheme from 'braid-design-system/themes/apac';
import {BraidProvider} from 'braid-design-system';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BraidProvider theme={anzTheme}>
        <App/>
      </BraidProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
