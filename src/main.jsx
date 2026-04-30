import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import CitiesIndex from './pages/CitiesIndex.jsx'
import CityGuide from './pages/CityGuide.jsx'
import SalaryCalculator from './pages/SalaryCalculator.jsx'
import VisaGuide from './pages/VisaGuide.jsx'
import { GuidesIndex, MovingToItaly, FindApartmentItaly, HealthcareItaly, BankAccountItaly } from './pages/Guides.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"                                    element={<App />} />
          <Route path="/cities"                             element={<CitiesIndex />} />
          <Route path="/cities/:cityId"                     element={<CityGuide />} />
          <Route path="/salary"                             element={<SalaryCalculator />} />
          <Route path="/visa"                               element={<VisaGuide />} />
          <Route path="/guide"                              element={<GuidesIndex />} />
          <Route path="/guide/moving-to-italy-2025"         element={<MovingToItaly />} />
          <Route path="/guide/find-apartment-italy"         element={<FindApartmentItaly />} />
          <Route path="/guide/healthcare-italy-expat"       element={<HealthcareItaly />} />
          <Route path="/guide/open-bank-account-italy"      element={<BankAccountItaly />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
