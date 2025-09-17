import './styles/main.scss'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/*<Route path="/plans" element={<PlansPage />} />*/}
      {/*<Route path="/summary" element={<SummaryPage />} />*/}
    </Routes>
  )
}

export default App
