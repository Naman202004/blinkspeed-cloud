import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {
  ChevronUp,
  Zap,
  Hash,
  ToggleLeft,
  ToggleRight,
  Info,
  ExternalLink,
  MessageCircle,
  Eye,
  EyeOff,
  Copy,
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('general');
  const [speedInsiders, setSpeedInsiders] = useState(false);
  const [additionalDomains, setAdditionalDomains] = useState(false);
  const [badgeTheme, setBadgeTheme] = useState('light');
  const [selectedMode, setSelectedMode] = useState('custom');
  const [showApiSecret, setShowApiSecret] = useState(false);

  const optimizationModes = [
    {
      id: 'standard',
      icon: ChevronUp,
      title: 'Standard',
      description: 'Standard optimization features enabled for your site. Ideal choice for maximum stability.',
      buttonText: 'Select mode',
      buttonType: 'outline',
    },
    {
      id: 'medium',
      icon: ChevronUp,
      title: 'Medium',
      description: 'Adds image lazy loading to standard optimizations. Uses built-in browser techniques for loading resources.',
      buttonText: 'Select mode',
      buttonType: 'outline',
    },
    {
      id: 'strong',
      icon: ChevronUp,
      title: 'Strong',
      description: 'Includes smart resource loading on top of Medium optimizations. Balances speed boost with stability.',
      buttonText: 'Select mode',
      buttonType: 'outline',
    },
    {
      id: 'ludicrous',
      icon: Zap,
      title: 'Ludicrous',
      badge: 'Available on Starter',
      badgeColor: 'green',
      description: 'Applies deferred JS and advanced resource loading for optimal performance and Core Web Vitals.',
      buttonText: 'Upgrade',
      buttonType: 'outline',
    },
    {
      id: 'custom',
      icon: Hash,
      title: 'Custom',
      description: 'Activated when manual setups are made. Ideal for advanced BlinkSpeed optimizations.',
      buttonText: 'Active mode',
      buttonType: 'solid',
      isActive: true,
    },
  ];

  return (
    <div className="min-h-screen px-6 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">General</h1>
        <p className="text-sm text-gray-600">Manage your settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-3 px-1 text-sm font-medium transition-colors ${
            activeTab === 'general'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('webhooks')}
          className={`pb-3 px-1 text-sm font-medium transition-colors ${
            activeTab === 'webhooks'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Webhooks
        </button>
        <button
          onClick={() => setActiveTab('api-keys')}
          className={`pb-3 px-1 text-sm font-medium transition-colors ${
            activeTab === 'api-keys'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          API keys
        </button>
      </div>

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'general' ? (
        <div>
      {/* Optimization Modes Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Optimization modes</h2>
          <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            See modes comparison
          </a>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Select from our range of predefined optimization modes to boost your site's performance.
        </p>

        {/* Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {optimizationModes.map((mode) => {
            const Icon = mode.icon;
            const isActive = mode.isActive || selectedMode === mode.id;
            return (
              <div
                key={mode.id}
                className={`bg-white rounded-lg border p-6 shadow-sm ${
                  isActive
                    ? 'border-purple-600 border-2'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={20} className="text-purple-600" />
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-gray-900">{mode.title}</h3>
                    {mode.badge && (
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${
                          mode.badgeColor === 'green'
                            ? 'bg-green-100 text-green-700'
                            : ''
                        }`}
                      >
                        {mode.badge}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{mode.description}</p>
                <button
                  onClick={() => setSelectedMode(mode.id)}
                  className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    mode.buttonType === 'solid'
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'border border-purple-600 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {mode.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Speed Insiders Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Speed insiders</h2>
            <p className="text-sm text-gray-600">
              Sign up to be among the first to try new features before their public release.{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                Learn more about our Speed Insiders Program
              </a>
              .
            </p>
          </div>
          <button
            onClick={() => setSpeedInsiders(!speedInsiders)}
            className="focus:outline-none ml-4"
          >
            {speedInsiders ? (
              <ToggleRight size={24} className="text-purple-600" />
            ) : (
              <ToggleLeft size={24} className="text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Additional Domains Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Additional domains</h2>
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
              New
            </span>
          </div>
          <button
            onClick={() => setAdditionalDomains(!additionalDomains)}
            className="focus:outline-none"
          >
            {additionalDomains ? (
              <ToggleRight size={24} className="text-purple-600" />
            ) : (
              <ToggleLeft size={24} className="text-gray-300" />
            )}
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Specify additional domain names pointing to the same website.{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 underline">
            Learn more
          </a>
        </p>
      </div>

      {/* Additional Domains Upgrade Callout */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            This feature is available on Pro subscription.{' '}
            <button
              type="button"
              onClick={() => navigate('/pricing')}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Upgrade here
            </button>
          </p>
        </div>
      </div>

      {/* BlinkSpeed Badge Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">BlinkSpeed badge</h2>
        <p className="text-sm text-gray-600 mb-6">
          As a free plan user you get a BlinkSpeed badge in the footer of your site.
        </p>

        {/* Radio Buttons */}
        <div className="space-y-4">
          {/* Light Theme */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="badgeTheme"
              value="light"
              checked={badgeTheme === 'light'}
              onChange={(e) => setBadgeTheme(e.target.value)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-900">Light</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3 flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">BlinkSpeed</span>
                <span className="text-xs text-gray-600">
                  Automated page speed optimizations for fast site performance
                </span>
              </div>
            </div>
          </label>

          {/* Dark Theme */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="badgeTheme"
              value="dark"
              checked={badgeTheme === 'dark'}
              onChange={(e) => setBadgeTheme(e.target.value)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-900">Dark</span>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-md p-3 flex items-center gap-2">
                <span className="text-sm font-semibold text-white">BlinkSpeed</span>
                <span className="text-xs text-gray-300">|</span>
                <span className="text-xs text-gray-300">
                  Automated page speed optimizations for fast site performance
                </span>
              </div>
            </div>
          </label>

          {/* Disabled */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="badgeTheme"
              value="disabled"
              checked={badgeTheme === 'disabled'}
              onChange={(e) => setBadgeTheme(e.target.value)}
              className="mt-1"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900">Disabled</span>
            </div>
          </label>
        </div>
      </div>

      {/* Badge Removal Upgrade Callout */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            To remove the badge, upgrade to a paid subscription.{' '}
            <button
              type="button"
              onClick={() => navigate('/pricing')}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Upgrade here
            </button>
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          disabled
          className="bg-gray-300 text-gray-500 px-6 py-2.5 rounded-md text-sm font-medium cursor-not-allowed"
        >
          Save
        </button>
      </div>
      </div>
      ) : activeTab === 'webhooks' ? (
        <div className="space-y-6">
          {/* Clearing cache Webhook */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Clearing cache</h2>
            <p className="text-sm text-gray-600 mb-4">
              Activated when cache purge is initiated from our system. Use it to alert your integration about purge events.
            </p>
            <div className="mb-4">
              <input
                type="text"
                value="https://speedwp.trackme.host/?blinkWebhook=cache_clear&token=99d3d18615899986f0b8a..."
                readOnly
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 cursor-not-allowed"
              />
            </div>
            <button
              disabled
              className="bg-gray-200 text-gray-500 px-6 py-2.5 rounded-md text-sm font-medium cursor-not-allowed"
            >
              Save
            </button>
          </div>

          {/* Cache ready notifications Webhook */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Cache ready notifications</h2>
            <p className="text-sm text-gray-600 mb-4">
              Activated when cache for a URL is ready. Use it to alert your integration when an optimized version of a URL is ready.
            </p>
            <div className="mb-4">
              <input
                type="text"
                value="https://speedwp.trackme.host/?blinkWebhook=cache_ready&token=99d3d18615899986f0b8a..."
                readOnly
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 cursor-not-allowed"
              />
            </div>
            <button
              disabled
              className="bg-gray-200 text-gray-500 px-6 py-2.5 rounded-md text-sm font-medium cursor-not-allowed"
            >
              Save
            </button>
          </div>

          {/* Config changes Webhook */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Config changes</h2>
            <p className="text-sm text-gray-600 mb-4">
              Activated upon configuration changes. Utilize it to auto-fetch an updated version of your config.
            </p>
            <div className="mb-4">
              <input
                type="text"
                value="https://speedwp.trackme.host/?blinkWebhook=config&token=99d3d18615899986f0b8a..."
                readOnly
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 cursor-not-allowed"
              />
            </div>
            <button
              disabled
              className="bg-gray-200 text-gray-500 px-6 py-2.5 rounded-md text-sm font-medium cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - API Keys Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">API keys</h2>
              <p className="text-sm text-gray-600 mb-6">
                Your API Site ID and Secret keys are listed below.
              </p>

              {/* Site URL Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site URL
                </label>
                <input
                  type="text"
                  value="speedwp.trackme.host"
                  readOnly
                  disabled
                  className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 cursor-not-allowed"
                />
              </div>

              {/* Site Name Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site name
                </label>
                <input
                  type="text"
                  value="W3speedup - Elementor WooCommerce WordPress Theme"
                  readOnly
                  disabled
                  className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 cursor-not-allowed"
                />
              </div>

              {/* API Key Field */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  API key
                  <Info size={16} className="text-gray-400" />
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="QNnayEWlvubhjZooIYEJEOJwmibQZeny"
                    readOnly
                    disabled
                    className="flex-1 px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 cursor-not-allowed"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('QNnayEWlvubhjZooIYEJEOJwmibQZeny');
                    }}
                    className="px-4 py-2.5 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <Copy size={16} />
                    Copy
                  </button>
                </div>
              </div>

              {/* API Secret Key Field */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  API secret key
                  <Info size={16} className="text-gray-400" />
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type={showApiSecret ? 'text' : 'password'}
                      value={showApiSecret ? 'QNnayEWlvubhjZooIYEJEOJwmibQZeny' : '•••••••••••••••••••••••••••••••'}
                      readOnly
                      disabled
                      className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 cursor-not-allowed pr-10"
                    />
                    <button
                      onClick={() => setShowApiSecret(!showApiSecret)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      type="button"
                    >
                      {showApiSecret ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('QNnayEWlvubhjZooIYEJEOJwmibQZeny');
                    }}
                    className="px-4 py-2.5 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <Copy size={16} />
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - API Documentation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              {/* API Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-mono font-semibold">{'{api}'}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                API documentation
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Integrate with BlinkSpeed using our REST API. Our developer documentation includes all available endpoints, authentication methods, and sample code to help you get started.
              </p>

              {/* Button */}
              <button className="w-full mb-4 px-4 py-2.5 border-2 border-purple-600 text-purple-600 bg-white rounded-md text-sm font-medium hover:bg-purple-50 transition-colors">
                Visit developer documentation
              </button>

              {/* Footer Link */}
              <p className="text-sm text-gray-600 text-center">
                Need help?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-purple-700 transition-colors z-50">
        <MessageCircle size={24} className="text-white" />
      </div>
    </div>
  );
};

export default Index;
