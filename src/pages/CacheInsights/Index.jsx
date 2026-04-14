import React, { useState } from 'react';
import {
  Info,
  ToggleLeft,
  ToggleRight,
  MessageCircle,
  ArrowUpRight,
  Target,
  Search,
  ChevronDown,
  Plus,
  MousePointerClick,
  Star,
} from 'lucide-react';
import Modal from '../../components/Common/Modal';

const Index = () => {
  const [testMode, setTestMode] = useState(false);
  const [showPurgeModal, setShowPurgeModal] = useState(false);
  const [activeTab, setActiveTab] = useState('cache-insights');

  return (
    <div className="min-h-screen px-6 py-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          {activeTab === 'cache-insights' ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Cache Insights</h1>
              <p className="text-sm text-gray-600">Adjust your cache settings</p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Page optimization status</h1>
              <p className="text-sm text-gray-600">
                Monitor your cached pages and their optimization status, device specifics, tags, and last optimized time. Purge cache or analyze page results.
              </p>
            </>
          )}
        </div>
        <button
          onClick={() => setShowPurgeModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Purge cache
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('cache-insights')}
          className={`pb-3 px-1 text-sm font-medium transition-colors ${
            activeTab === 'cache-insights'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Cache insights
        </button>
        <button
          onClick={() => setActiveTab('page-optimization')}
          className={`pb-3 px-1 text-sm font-medium transition-colors ${
            activeTab === 'page-optimization'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Page optimization status <span className="ml-1">0</span>
        </button>
      </div>

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'cache-insights' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Optimization Status */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-base font-medium text-gray-900 mb-4">Optimization status</h2>
            
            {/* Metrics */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-600">Total pages found</span>
                  <Info size={14} className="text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-600">Cache hit ratio</span>
                  <Info size={14} className="text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-900">0%</span>
              </div>
            </div>

            {/* Circular Progress */}
            <div className="flex items-center justify-center my-8">
              <div className="relative w-36 h-36">
                <svg className="transform -rotate-90 w-36 h-36" viewBox="0 0 128 128">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-gray-200"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">0</span>
                </div>
              </div>
            </div>

            {/* Status List */}
            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  <span className="text-sm text-gray-700">Optimization complete</span>
                </div>
                <span className="text-sm font-medium text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                  <span className="text-sm text-gray-700">Scheduled for optimization</span>
                </div>
                <span className="text-sm font-medium text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                  <span className="text-sm text-gray-700 flex items-center gap-1.5">
                    Not eligible for optimization
                    <Info size={14} className="text-gray-400" />
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="text-sm text-gray-700 flex items-center gap-1.5">
                    Optimization failed
                    <Info size={14} className="text-gray-400" />
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Total Cache Size */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-base font-medium text-gray-900 mb-4">Total cache size</h2>
            
            {/* Metric */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600">Total cache size</span>
                <Info size={14} className="text-gray-400" />
              </div>
              <span className="text-sm font-medium text-gray-900">0 B</span>
            </div>

            {/* Circular Progress */}
            <div className="flex items-center justify-center my-8">
              <div className="relative w-36 h-36">
                <svg className="transform -rotate-90 w-36 h-36" viewBox="0 0 128 128">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-gray-200"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">0</span>
                </div>
              </div>
            </div>

            {/* Cache Type Breakdown */}
            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                  <span className="text-sm text-gray-700">HTML cache</span>
                </div>
                <span className="text-sm font-medium text-gray-900">0 B</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  <span className="text-sm text-gray-700">JavaScript cache</span>
                </div>
                <span className="text-sm font-medium text-gray-900">0 B</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  <span className="text-sm text-gray-700">CSS cache</span>
                </div>
                <span className="text-sm font-medium text-gray-900">0 B</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-600"></span>
                  <span className="text-sm text-gray-700">Fonts cache</span>
                </div>
                <span className="text-sm font-medium text-gray-900">0 B</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span className="text-sm text-gray-700">Images cache</span>
                </div>
                <span className="text-sm font-medium text-gray-900">0 B</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Cache Warmup Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-gray-900">Cache warmup</h2>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                Recommended
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Automatically pre-caches your website's page content for faster loading.{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                Learn more
              </a>
            </p>

            <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
              <div className="flex items-start gap-2">
                <ArrowUpRight size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-700">
                  Unlock Advanced Cache warmup via sitemap.{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                    Upgrade here
                  </a>
                </p>
              </div>
            </div>

            <button className="w-full bg-purple-600 text-white font-medium py-2.5 px-4 rounded-md text-sm hover:bg-purple-700 transition-colors">
              Enable
            </button>
          </div>

          {/* Test Mode Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-base font-medium text-gray-900 mb-4">Test mode</h2>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-700">Test mode</span>
              <button
                onClick={() => setTestMode(!testMode)}
                className="focus:outline-none"
              >
                {testMode ? (
                  <ToggleRight size={24} className="text-purple-600" />
                ) : (
                  <ToggleLeft size={24} className="text-gray-300" />
                )}
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              Test BlinkSpeed's features without affecting your visitors' experience.
            </p>

            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
              Learn more
            </a>
          </div>
        </div>
      </div>
      ) : (
        <div>
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Status
                <ChevronDown size={16} className="text-gray-500" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Device type
                <ChevronDown size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by URL or Tag"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="bg-gray-50 border border-gray-200 rounded-t-lg">
            <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-gray-700">
              <div className="col-span-3">URL</div>
              <div className="col-span-2">Optimization status</div>
              <div className="col-span-1">Device</div>
              <div className="col-span-2 flex items-center gap-1">
                Tags
                <Info size={14} className="text-gray-400" />
              </div>
              <div className="col-span-2">Last updated</div>
              <div className="col-span-2">Action</div>
            </div>
          </div>

          {/* Empty State */}
          <div className="bg-white border-x border-b border-gray-200 rounded-b-lg p-12">
            <div className="flex flex-col items-center justify-center">
              {/* Illustration */}
              <div className="relative mb-6">
                {/* Card with Plus */}
                <div className="w-32 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center shadow-md relative">
                  <Plus size={32} className="text-purple-600" />
                  {/* Sparkles */}
                  <div className="absolute -top-2 -right-2">
                    <Star size={16} className="text-purple-500 fill-purple-500" />
                  </div>
                  <div className="absolute -bottom-1 -left-1">
                    <Star size={12} className="text-purple-400 fill-purple-400" />
                  </div>
                  <div className="absolute top-1/2 -right-4">
                    <Star size={14} className="text-purple-500 fill-purple-500" />
                  </div>
                </div>
                {/* Mouse Cursor */}
                <div className="absolute -bottom-4 right-8">
                  <MousePointerClick size={24} className="text-gray-600" />
                </div>
              </div>

              {/* Empty State Message */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No pages have been optimized yet
              </h3>
              <p className="text-sm text-gray-600 text-center max-w-md">
                Once you connect your website to BlinkSpeed and enable Cache warmup this section will display a list of all your pages with their optimization status, device specifics, tags, and last optimized time.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-purple-700 transition-colors z-50">
        <MessageCircle size={24} className="text-white" />
      </div>

      {/* Purge Cache Modal */}
      <Modal
        isOpen={showPurgeModal}
        onClose={() => setShowPurgeModal(false)}
        title="Are you sure you want to purge your cache?"
        description="It will take us a few minutes to re-optimize all your pages and start serving optimized content to your visitors."
        primaryButtonText="Purge cache now"
        secondaryButtonText="I will do it later"
        onPrimaryClick={() => {
          console.log('Purging cache...');
          setShowPurgeModal(false);
        }}
        onSecondaryClick={() => setShowPurgeModal(false)}
      />
    </div>
  );
};

export default Index;
