import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {
  Target,
  Database,
  Clock,
  Info,
  ToggleLeft,
  ToggleRight,
  MessageCircle,
} from 'lucide-react';
import Modal from '../../components/Common/Modal';
import { getEffectivePlanId, useSites } from '../../context/SitesContext.jsx';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const Index = () => {
  const [cacheWarmup, setCacheWarmup] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [showPurgeModal, setShowPurgeModal] = useState(false);
  const navigate = useNavigate()
  const { currentSite } = useSites()
  const effectivePlan = getEffectivePlanId(currentSite)
  const subscriptionHeading =
    effectivePlan === 'free'
      ? 'Free subscription'
      : `${effectivePlan.charAt(0).toUpperCase()}${effectivePlan.slice(1)} subscription`

  const graphData = [
    { date: 'Dec 11', pageviews: 0, bandwidth: 0 },
    { date: 'Dec 14', pageviews: 0, bandwidth: 0 },
    { date: 'Dec 17', pageviews: 0, bandwidth: 0 },
    { date: 'Dec 20', pageviews: 0, bandwidth: 0 },
    { date: 'Dec 23', pageviews: 0, bandwidth: 0 },
    { date: 'Dec 26', pageviews: 0, bandwidth: 0 },
    { date: 'Dec 29', pageviews: 0, bandwidth: 0 },
    { date: 'Jan 01', pageviews: 0, bandwidth: 0 },
    { date: 'Jan 04', pageviews: 0, bandwidth: 0 },
    { date: 'Jan 07', pageviews: 0, bandwidth: 0 },
  ];

  return (
    <div className="min-h-screen px-6 py-6">
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-full">
        {/* Row 1 - Left Column: Service Results */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full h-full flex flex-col">
            <h2 className="text-base font-medium text-gray-900 mb-5">Service results</h2>
            
            <div className="space-y-3.5">
              {/* Cache Hit Ratio */}
              <div className="p-3.5 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target size={20} className="text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-2xl font-bold text-gray-900 mb-0.5">0%</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1.5">
                      Cache hit ratio
                      <Info size={14} className="text-gray-400 flex-shrink-0" />
                    </p>
                  </div>
                </div>
              </div>

              {/* Cache Size */}
              <div className="p-3.5 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Database size={20} className="text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-2xl font-bold text-gray-900 mb-0.5">0 Bytes</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1.5">
                      Cache size
                      <Info size={14} className="text-gray-400 flex-shrink-0" />
                    </p>
                  </div>
                </div>
              </div>

              {/* Last Purge */}
              <div className="p-3.5 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-2xl font-bold text-gray-900 mb-0.5">3 months ago</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1.5">
                      Last purge
                      <Info size={14} className="text-gray-400 flex-shrink-0" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 1 - Middle Column: Optimization Status */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full h-full flex flex-col">
            <h2 className="text-base font-medium text-gray-900 mb-4">Optimization status</h2>
            
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600 flex items-center gap-1">
                Total pages found
                <Info size={14} className="text-gray-400" />
              </p>
              <span className="text-sm font-medium text-gray-900">0</span>
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

        {/* Right Column - Spans 2 rows */}
        <div className="lg:col-span-1 lg:row-span-2 space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-base font-medium text-gray-900 mb-4">Quick actions</h2>
            
            <div className="space-y-4">
              {/* Cache Warmup Toggle */}
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-gray-700">Cache warmup</span>
                  <Info size={14} className="text-gray-400" />
                </div>
                <button
                  onClick={() => setCacheWarmup(!cacheWarmup)}
                  className="focus:outline-none"
                >
                  {cacheWarmup ? (
                    <ToggleRight size={24} className="text-purple-600" />
                  ) : (
                    <ToggleLeft size={24} className="text-gray-300" />
                  )}
                </button>
              </div>

              {/* Test Mode Toggle */}
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-gray-700">Test mode</span>
                  <Info size={14} className="text-gray-400" />
                </div>
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

              {/* Optimization Mode */}
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-gray-700">Optimization mode</span>
                  <Info size={14} className="text-gray-400" />
                </div>
                <span className="text-sm font-medium text-purple-600">Custom</span>
              </div>

              {/* Purge Cache Button */}
              <button
                onClick={() => setShowPurgeModal(true)}
                className="w-full border border-purple-600 rounded-md py-2.5 text-sm text-purple-600 font-medium hover:bg-purple-50 transition-colors mt-5"
              >
                Purge cache
              </button>
            </div>
          </div>

          {/* Free Subscription Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-gray-900">{subscriptionHeading}</h2>
              <span className="text-sm text-gray-500">2 websites</span>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">speedwp.trackme.host</p>

            <div className="space-y-4">
              {/* Page Views */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm text-gray-700">Page views</span>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: '0%' }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs text-gray-500">0</span>
                  <span className="text-xs text-gray-500">1,000</span>
                </div>
              </div>

              {/* CDN Bandwidth */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm text-gray-700">CDN Bandwidth</span>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">0 Bytes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: '0%' }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs text-gray-500">0 Bytes</span>
                  <span className="text-xs text-gray-500">1 GB</span>
                </div>
              </div>

              {/* Next Reset */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-700 mb-0.5">Next reset</p>
                  <p className="text-sm font-semibold text-gray-900">Jan 14, 2026</p>
                </div>
                <span className="text-sm text-gray-500">in 5 days</span>
              </div>

              {/* Upgrade Button */}
              <button
                type="button"
                onClick={() => navigate('/pricing')}
                className="w-full bg-purple-600 text-white rounded-md py-2.5 text-sm font-medium hover:bg-purple-700 transition-colors mt-5"
              >
                Upgrade subscription
              </button>
            </div>
          </div>
        </div>

        {/* Service Usage Log Card - Spans 2 columns (Left + Middle), positioned in row 2 */}
        <div className="lg:col-span-2 lg:row-start-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-medium text-gray-900">Service usage log</h2>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                See more
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-5">Last 30 days</p>
            
            {/* Graph Area */}
            <div className="h-48 bg-gray-50 rounded-lg border border-gray-200 relative overflow-hidden w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData} margin={{ top: 15, right: 15, left: 35, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    interval={0}
                    padding={{ left: 0, right: 0 }}
                  />
                  <YAxis
                    domain={[0, 5000]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    ticks={[0, 1000, 2000, 3000, 4000, 5000]}
                    width={35}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      padding: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pageviews"
                    stroke="#9333ea"
                    strokeWidth={2}
                    dot={false}
                    name="Pageviews"
                  />
                  <Line
                    type="monotone"
                    dataKey="bandwidth"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    name="CDN Bandwidth"
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
                    iconType="line"
                    iconSize={8}
                    formatter={(value) => (
                      <span className="text-xs text-gray-500">
                        • {value}
                      </span>
                    )}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

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
          // Handle purge cache action here
          console.log('Purging cache...');
          setShowPurgeModal(false);
          // Add your purge cache logic here
        }}
        onSecondaryClick={() => setShowPurgeModal(false)}
      />
    </div>
  );
};

export default Index;
