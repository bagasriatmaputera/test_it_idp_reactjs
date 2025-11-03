import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardKPI from './pages/Dashboard'
import CustomersPages from './pages/CustomersPages'
import ProductPage from './pages/ProductsPage'
import OrderDetailPage from './pages/OrderDetailPage'
import SummaryPage from './pages/SummaryPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardKPI></DashboardKPI>} />
          <Route path='/customers' element={<CustomersPages/>} />
          <Route path='/products' element={<ProductPage/>} />
          <Route path='/orders' element={<OrderDetailPage/>} />
          <Route path='/summary' element={<SummaryPage/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
