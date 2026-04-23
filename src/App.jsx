import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useStore } from './state/store'
import { fetchAllCountries } from './api/countries'
import Topbar from './components/Topbar'
import SearchSection from './components/SearchSection'
import HistoryBar from './components/HistoryBar'
import Dashboard from './components/Dashboard'

const queryClient = new QueryClient()

function AppInner() {
  const setAllCountries = useStore(s => s.setAllCountries)

  useEffect(() => {
    fetchAllCountries()
      .then(setAllCountries)
      .catch(console.error)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'var(--sand)' }}>
      <Topbar />
      <SearchSection />
      <HistoryBar />
      <Dashboard />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  )
}
