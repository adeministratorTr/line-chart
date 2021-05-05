import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Header from 'components/Header'
import Loading from 'components/Loading'

import './App.css'

const Home = lazy(() => import('pages/Home'));

// Create react-query client
const queryClient = new QueryClient();

function App() {
  return(
    <QueryClientProvider client={queryClient}>
      <div className='app'>
        <Header />
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      </div>
    </QueryClientProvider>
  )
}

export default App
