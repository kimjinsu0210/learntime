import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Router from "./shared/Router"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router />
    </QueryClientProvider>
  )
}

export default App;
