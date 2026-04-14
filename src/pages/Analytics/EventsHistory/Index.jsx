import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Download,
  MessageCircle,
  ChevronDown,
  Plus,
  Zap,
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
  const [selectedEvents, setSelectedEvents] = useState({
    optimizationStarted: true,
    optimizationFailed: false,
    tagCreateEvents: false,
    purgeInvalidateEvents: false,
  });
  const [dateRange, setDateRange] = useState('Last 7 days');
  const [showDateRangeDropdown, setShowDateRangeDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const dateRangeRef = useRef(null);

  const dateRangeOptions = [
    'Last 7 days',
    'Last 30 days',
    'Last 90 days',
    'Last year',
    'Custom range',
  ];

  // Chart data - all at 0 for now
  const chartData = [
    { date: 'Jan 05', optimizationStarted: 0, optimizationFailed: 0, tagCreateEvents: 0, purgeInvalidateEvents: 0 },
    { date: 'Jan 06', optimizationStarted: 0, optimizationFailed: 0, tagCreateEvents: 0, purgeInvalidateEvents: 0 },
    { date: 'Jan 07', optimizationStarted: 0, optimizationFailed: 0, tagCreateEvents: 0, purgeInvalidateEvents: 0 },
    { date: 'Jan 08', optimizationStarted: 0, optimizationFailed: 0, tagCreateEvents: 0, purgeInvalidateEvents: 0 },
    { date: 'Jan 09', optimizationStarted: 0, optimizationFailed: 0, tagCreateEvents: 0, purgeInvalidateEvents: 0 },
    { date: 'Jan 10', optimizationStarted: 0, optimizationFailed: 0, tagCreateEvents: 0, purgeInvalidateEvents: 0 },
    { date: 'Jan 11', optimizationStarted: 0, optimizationFailed: 0, tagCreateEvents: 0, purgeInvalidateEvents: 0 },
    { date: 'Jan 12', optimizationStarted: 0, optimizationFailed: 0, tagCreateEvents: 0, purgeInvalidateEvents: 0 },
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

  const toggleEvent = (eventKey) => {
    setSelectedEvents((prev) => ({
      ...prev,
      [eventKey]: !prev[eventKey],
    }));
  };

  return (
    <div className="min-h-screen px-6 py-6">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events history</h1>
          <p className="text-sm text-gray-600">
            Track optimization requests sent to our service and executed API events.
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Event Summary Cards */}
        <div className="lg:col-span-1 space-y-4">
          {/* Optimization started */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Optimization started</h3>
              <input
                type="checkbox"
                checked={selectedEvents.optimizationStarted}
                onChange={() => toggleEvent('optimizationStarted')}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>

          {/* Optimization failed */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Optimization failed</h3>
              <input
                type="checkbox"
                checked={selectedEvents.optimizationFailed}
                onChange={() => toggleEvent('optimizationFailed')}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>

          {/* Tag create events */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Tag create events</h3>
              <input
                type="checkbox"
                checked={selectedEvents.tagCreateEvents}
                onChange={() => toggleEvent('tagCreateEvents')}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>

          {/* Purge & invalidate events */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Purge & invalidate events</h3>
              <input
                type="checkbox"
                checked={selectedEvents.purgeInvalidateEvents}
                onChange={() => toggleEvent('purgeInvalidateEvents')}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
        </div>

        {/* Right Column - Chart and Table */}
        <div className="lg:col-span-3 space-y-6">
          {/* Event Activity Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-base font-medium text-gray-900 mb-4">Event activity</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
                    ticks={[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      padding: '8px',
                    }}
                  />
                  {selectedEvents.optimizationStarted && (
                    <Line
                      type="monotone"
                      dataKey="optimizationStarted"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                      name="Optimization started"
                    />
                  )}
                  {selectedEvents.optimizationFailed && (
                    <Line
                      type="monotone"
                      dataKey="optimizationFailed"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                      name="Optimization failed"
                    />
                  )}
                  {selectedEvents.tagCreateEvents && (
                    <Line
                      type="monotone"
                      dataKey="tagCreateEvents"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                      name="Tag create events"
                    />
                  )}
                  {selectedEvents.purgeInvalidateEvents && (
                    <Line
                      type="monotone"
                      dataKey="purgeInvalidateEvents"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={false}
                      name="Purge & invalidate events"
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

          {/* Search Bar */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by URL, Event, Tag, Details"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Event Details Table */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">URL</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Event</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Tags</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Empty State */}
                  <tr>
                    <td colSpan={5} className="py-16">
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative mb-4">
                          {/* Dashed square with plus icon */}
                          <div className="w-24 h-24 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center bg-purple-50">
                            <Plus size={32} className="text-purple-600" />
                          </div>
                          {/* Lightning bolt icon */}
                          <div className="absolute -top-2 -right-2">
                            <Zap size={24} className="text-purple-400" />
                          </div>
                        </div>
                        <p className="text-base font-semibold text-gray-900 mb-2">
                          Currently, no data available
                        </p>
                        <p className="text-sm text-gray-600 text-center max-w-md">
                          This section will display data associated with your website once information becomes available.
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Download Log Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-1">Download log</h3>
                <p className="text-sm text-gray-600">Download usage for {dateRange}</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <Download size={16} className="text-gray-600" />
                <span>Log for current site (.csv)</span>
              </button>
            </div>
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
