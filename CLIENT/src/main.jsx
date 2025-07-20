import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './Context/AppContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
 
 
  <StrictMode>
     <BrowserRouter>
     <QueryClientProvider client={queryClient}>
      <ContextProvider>
                 <App />
      </ContextProvider>
     </QueryClientProvider>

    </BrowserRouter>
  </StrictMode>,
)
