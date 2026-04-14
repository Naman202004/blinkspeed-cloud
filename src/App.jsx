import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import { RequireAuth } from './components/auth/RequireAuth'
import { GuestOnly } from './components/auth/GuestOnly'
import Login from './pages/login/Index'
import OauthComplete from './pages/login/OauthComplete'
import Register from './pages/register/Index'
import Verification from './pages/verification/Index'
import Dashboard from './pages/Dashboard/Index'
import AddWebsite from './pages/AddWebsite/Index'
import CacheInsights from './pages/CacheInsights/Index'
import Integrations from './pages/Integrations/Index'
import General from './pages/CacheSettings/General/Index'
import ImagesAndMedia from './pages/CacheSettings/Images&Media/Index'
import Javascript from './pages/CacheSettings/Javascript/Index'
import HtmlAndCss from './pages/CacheSettings/Html&Css/Index'
import Fonts from './pages/CacheSettings/Fonts/Index'
import Cache from './pages/CacheSettings/Cache/Index'
import EventsHistory from './pages/Analytics/EventsHistory/Index'
import ResourceUsage from './pages/Analytics/ResourceUsage/Index'
import PluginHistory from './pages/Analytics/PluginHistory/Index'
import AdminPricingPlans from './pages/AdminPricingPlans/Index.jsx'
import Checkout from './pages/Checkout/Index.jsx'
import CheckoutSuccess from './pages/Checkout/Success.jsx'

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestOnly>
            <Login />
          </GuestOnly>
        }
      />
      <Route
        path="/register"
        element={
          <GuestOnly>
            <Register />
          </GuestOnly>
        }
      />
      <Route
        path="/login/oauth-complete"
        element={
          <GuestOnly>
            <OauthComplete />
          </GuestOnly>
        }
      />
      <Route path="/verification" element={<Verification />} />

      <Route element={<RequireAuth />}>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-website" element={<AddWebsite />} />
          <Route path="/cache-insights" element={<CacheInsights />} />

          <Route path="/cache-settings/general" element={<General />} />
          <Route path="/cache-settings/images-and-media" element={<ImagesAndMedia />} />
          <Route path="/cache-settings/javascript" element={<Javascript />} />
          <Route path="/cache-settings/html-and-css" element={<HtmlAndCss />} />
          <Route path="/cache-settings/fonts" element={<Fonts />} />
          <Route path="/cache-settings/cache" element={<Cache />} />

          <Route path="/analytics/events-history" element={<EventsHistory />} />
          <Route path="/analytics/resource-usage" element={<ResourceUsage />} />
          <Route path="/analytics/plugin-history" element={<PluginHistory />} />

          <Route path="/integrations" element={<Integrations />} />
          <Route path="/admin/pricing-plans" element={<AdminPricingPlans />} />

          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
