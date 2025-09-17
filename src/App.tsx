import './styles/main.scss'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import HomePage from './pages/HomePage.tsx'
import PlansPage from './pages/PlansPage.tsx'
import SummaryPage from './pages/SummaryPage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Route>
    </Routes>
  )
}

export default App
