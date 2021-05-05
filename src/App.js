import { Suspense, lazy } from 'react';

import Header from 'components/Header'
import Loading from 'components/Loading'

import './App.css'

const Home = lazy(() => import('pages/Home'));

function App() {
  return(
    <div className="app">
      <Header />
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    </div>
  )
}

export default App
