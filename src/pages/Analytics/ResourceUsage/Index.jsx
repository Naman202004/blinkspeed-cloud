import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  MessageCircle,
  ChevronDown,
  Check,
} from 'lucide-react';
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
  const [dateRange, setDateRange] = useState('Last 7 days');
  const [showDateRangeDropdown, setShowDateRangeDropdown] = useState(false);
  
  const [selectedMetrics, setSelectedMetrics] = useState({
    cdnBandwidth: true,
    pageviews: true,
    images: true,
    css: true,
    javascript: true,
    fonts: true,
    other: true,
  });

  const dateRangeRef = useRef(null);

  const dateRangeOptions = [
    'Last 7 days',
    'Last 30 days',
    'Last 90 days',
    'Last year',
    'Custom range',
  ];

  // Pageviews and CDN bandwidth chart data
  const pageviewsChartData = [
    { date: 'Dec 11', cdnBandwidth: 0, pageviews: 0 },
    { date: 'Dec 14', cdnBandwidth: 0, pageviews: 0 },
    { date: 'Dec 17', cdnBandwidth: 0, pageviews: 0 },
    { date: 'Dec 20', cdnBandwidth: 0, pageviews: 0 },
    { date: 'Dec 23', cdnBandwidth: 0, pageviews: 0 },
    { date: 'Dec 26', cdnBandwidth: 0, pageviews: 0 },
    { date: 'Dec 29', cdnBandwidth: 0, pageviews: 0 },
    { date: 'Jan 01', cdnBandwidth: 0, pageviews: 0 },
    { date: 'Jan 04', cdnBandwidth: 0, pageviews: 0 },
    { date: 'Jan 07', cdnBandwidth: 0, pageviews: 0 },
  ];

  // CDN distribution chart data
  const cdnChartData = [
    { date: 'Jan 05', images: 0, css: 0, javascript: 0, media: 0, other: 0 },
    { date: 'Jan 06', images: 0, css: 0, javascript: 0, media: 0, other: 0 },
    { date: 'Jan 07', images: 0, css: 0, javascript: 0, media: 0, other: 0 },
    { date: 'Jan 08', images: 0, css: 0, javascript: 0, media: 0, other: 0 },
    { date: 'Jan 09', images: 0, css: 0, javascript: 0, media: 0, other: 0 },
    { date: 'Jan 10', images: 0, css: 0, javascript: 0, media: 0, other: 0 },
    { date: 'Jan 11', images: 0, css: 0, javascript: 0, media: 0, other: 0 },
    { date: 'Jan 12', images: 0, css: 0, javascript: 0, media: 0, other: 0 },
  ];

  // Click outside handler for dropdown
  useEffect(() => {
    const handler = (e) => {
      if (dateRangeRef.current && !dateRangeRef.current.contains(e.target)) {
        setShowDateRangeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleMetric = (metricKey) => {
    setSelectedMetrics((prev) => ({
      ...prev,
      [metricKey]: !prev[metricKey],
    }));
  };

  return (
    <div className="min-h-screen px-6 py-6">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resource usage</h1>
          <p className="text-sm text-gray-600">
            Monitor how many pageviews and CDN bandwidth your website generated.
          </p>
        </div>
        {/* Date Range Selector */}
        <div className="relative" ref={dateRangeRef}>
          <button
            onClick={() => setShowDateRangeDropdown(!showDateRangeDropdown)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            <span>{dateRange}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {showDateRangeDropdown && (
            <div className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[150px]">
              {dateRangeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setDateRange(option);
                    setShowDateRangeDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pageviews and CDN bandwidth Section */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Pageviews and CDN bandwidth</h2>
          <p className="text-sm text-gray-600">Track your site's desktop and mobile resource usage.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Summary Cards */}
          <div className="lg:col-span-1 space-y-4">
            {/* CDN bandwidth Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
              {selectedMetrics.cdnBandwidth && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
              <h3 className="text-sm font-medium text-gray-900 mb-3">CDN bandwidth</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">0 MB</p>
              <p className="text-sm text-gray-600">0% compared to the prior period</p>
            </div>

            {/* Pageviews Card */}
            <div
              onClick={() => toggleMetric('pageviews')}
              className="bg-white rounded-lg border border-gray-200 p-6 relative cursor-pointer hover:border-purple-300 transition-colors"
            >
              {selectedMetrics.pageviews && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
              <h3 className="text-sm font-medium text-gray-900 mb-3">Pageviews</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">0</p>
              <p className="text-sm text-gray-600">0% compared to the prior period</p>
            </div>
          </div>

          {/* Right Area - Line Chart */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pageviewsChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#9ca3af' }}
                    />
                    <YAxis
                      domain={[0, 5000]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#9ca3af' }}
                      ticks={[0, 1000, 2000, 3000, 4000, 5000]}
                      tickFormatter={(value) => {
                        if (value >= 1000) return `${value / 1000}K`;
                        return value.toString();
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        padding: '8px',
                      }}
                    />
                    {selectedMetrics.cdnBandwidth && (
                      <Line
                        type="monotone"
                        dataKey="cdnBandwidth"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                        name="CDN bandwidth"
                      />
                    )}
                    {selectedMetrics.pageviews && (
                      <Line
                        type="monotone"
                        dataKey="pageviews"
                        stroke="#9333ea"
                        strokeWidth={2}
                        dot={false}
                        name="Pageviews"
                      />
                    )}
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
      </div>

      {/* CDN distribution Section */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">CDN distribution</h2>
          <p className="text-sm text-gray-600">All values represented are in Megabytes (MB)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Summary Cards */}
          <div className="lg:col-span-1 space-y-4">
            {/* Images Card */}
            <div
              onClick={() => toggleMetric('images')}
              className="bg-white rounded-lg border border-gray-200 p-6 relative cursor-pointer hover:border-purple-300 transition-colors"
            >
              {selectedMetrics.images && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
              <h3 className="text-sm font-medium text-gray-900 mb-3">Images</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">0</p>
              <p className="text-sm text-gray-600">0% compared to the prior period</p>
            </div>

            {/* CSS Card */}
            <div
              onClick={() => toggleMetric('css')}
              className="bg-white rounded-lg border border-gray-200 p-6 relative cursor-pointer hover:border-purple-300 transition-colors"
            >
              {selectedMetrics.css && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
              <h3 className="text-sm font-medium text-gray-900 mb-3">CSS</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">0</p>
              <p className="text-sm text-gray-600">0% compared to the prior period</p>
            </div>

            {/* Javascript Card */}
            <div
              onClick={() => toggleMetric('javascript')}
              className="bg-white rounded-lg border border-gray-200 p-6 relative cursor-pointer hover:border-purple-300 transition-colors"
            >
              {selectedMetrics.javascript && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
              <h3 className="text-sm font-medium text-gray-900 mb-3">Javascript</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">0</p>
              <p className="text-sm text-gray-600">0% compared to the prior period</p>
            </div>

            {/* Fonts Card */}
            <div
              onClick={() => toggleMetric('fonts')}
              className="bg-white rounded-lg border border-gray-200 p-6 relative cursor-pointer hover:border-purple-300 transition-colors"
            >
              {selectedMetrics.fonts && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
              <h3 className="text-sm font-medium text-gray-900 mb-3">Fonts</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">0</p>
              <p className="text-sm text-gray-600">0% compared to the prior period</p>
            </div>

            {/* Other Card */}
            <div
              onClick={() => toggleMetric('other')}
              className="bg-white rounded-lg border border-gray-200 p-6 relative cursor-pointer hover:border-purple-300 transition-colors"
            >
              {selectedMetrics.other && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
              <h3 className="text-sm font-medium text-gray-900 mb-3">Other</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">0</p>
              <p className="text-sm text-gray-600">0% compared to the prior period</p>
            </div>
          </div>

          {/* Right Area - Line Chart */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cdnChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#9ca3af' }}
                    />
                    <YAxis
                      domain={[0, 500]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#9ca3af' }}
                      ticks={[0, 100, 200, 300, 400, 500]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        padding: '8px',
                      }}
                    />
                    {selectedMetrics.images && (
                      <Line
                        type="monotone"
                        dataKey="images"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        name="Images"
                      />
                    )}
                    {selectedMetrics.css && (
                      <Line
                        type="monotone"
                        dataKey="css"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        dot={false}
                        name="CSS"
                      />
                    )}
                    {selectedMetrics.javascript && (
                      <Line
                        type="monotone"
                        dataKey="javascript"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={false}
                        name="Javascript"
                      />
                    )}
                    <Line
                      type="monotone"
                      dataKey="media"
                      stroke="#ec4899"
                      strokeWidth={2}
                      dot={false}
                      name="Media"
                    />
                    {selectedMetrics.other && (
                      <Line
                        type="monotone"
                        dataKey="other"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        dot={false}
                        name="Other"
                      />
                    )}
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
      </div>

      {/* Resource usage detailed table Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Resource usage detailed table</h2>
          <button className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium">
            <span>View more</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Download log Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-1">Download log</h3>
            <p className="text-sm text-gray-600">Download usage for {dateRange}</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Download size={16} className="text-gray-600" />
              <span>Log for all sites (.csv)</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Download size={16} className="text-gray-600" />
              <span>Log for current site (.csv)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-purple-700 transition-colors z-50">
        <MessageCircle size={24} className="text-white" />
      </div>
    </div>
  );
};

export default Index;
