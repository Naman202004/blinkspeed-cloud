import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  ChevronDown,
  Filter,
} from 'lucide-react';

const Index = () => {
  const [pluginEvent, setPluginEvent] = useState('Plugin Events');
  const [platformVersion, setPlatformVersion] = useState('Platform Version');
  const [blinkSpeedVersion, setBlinkSpeedVersion] = useState('BlinkSpeed Version');
  const [dateRange, setDateRange] = useState('Last 30 days');

  const [showPluginEventDropdown, setShowPluginEventDropdown] = useState(false);
  const [showPlatformVersionDropdown, setShowPlatformVersionDropdown] = useState(false);
  const [showBlinkSpeedVersionDropdown, setShowBlinkSpeedVersionDropdown] = useState(false);
  const [showDateRangeDropdown, setShowDateRangeDropdown] = useState(false);

  const pluginEventRef = useRef(null);
  const platformVersionRef = useRef(null);
  const blinkSpeedVersionRef = useRef(null);
  const dateRangeRef = useRef(null);

  const pluginEventOptions = ['All Events', 'Plugin Activated', 'Plugin Deactivated', 'Plugin Updated'];
  const platformVersionOptions = ['All Versions', 'WordPress 6.4', 'WordPress 6.3', 'WordPress 6.2'];
  const blinkSpeedVersionOptions = ['All Versions', 'v2.5.0', 'v2.4.0', 'v2.3.0'];
  const dateRangeOptions = [
    'Last 7 days',
    'Last 30 days',
    'Last 90 days',
    'Last year',
    'Custom range',
  ];

  // Click outside handler for dropdowns
  useEffect(() => {
    const handler = (e) => {
      if (pluginEventRef.current && !pluginEventRef.current.contains(e.target)) {
        setShowPluginEventDropdown(false);
      }
      if (platformVersionRef.current && !platformVersionRef.current.contains(e.target)) {
        setShowPlatformVersionDropdown(false);
      }
      if (blinkSpeedVersionRef.current && !blinkSpeedVersionRef.current.contains(e.target)) {
        setShowBlinkSpeedVersionDropdown(false);
      }
      if (dateRangeRef.current && !dateRangeRef.current.contains(e.target)) {
        setShowDateRangeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="min-h-screen px-6 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Plugin history</h1>
        <p className="text-sm text-gray-600">
          Monitor plugin events and BlinkSpeed version updates.
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Plugin Events Dropdown */}
        <div className="relative" ref={pluginEventRef}>
          <button
            onClick={() => setShowPluginEventDropdown(!showPluginEventDropdown)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            <span>{pluginEvent}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {showPluginEventDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[180px]">
              {pluginEventOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setPluginEvent(option);
                    setShowPluginEventDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Platform Version Dropdown */}
        <div className="relative" ref={platformVersionRef}>
          <button
            onClick={() => setShowPlatformVersionDropdown(!showPlatformVersionDropdown)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            <span>{platformVersion}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {showPlatformVersionDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[180px]">
              {platformVersionOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setPlatformVersion(option);
                    setShowPlatformVersionDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* BlinkSpeed Version Dropdown */}
        <div className="relative" ref={blinkSpeedVersionRef}>
          <button
            onClick={() => setShowBlinkSpeedVersionDropdown(!showBlinkSpeedVersionDropdown)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            <span>{blinkSpeedVersion}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {showBlinkSpeedVersionDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[180px]">
              {blinkSpeedVersionOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setBlinkSpeedVersion(option);
                    setShowBlinkSpeedVersionDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Range Dropdown */}
        <div className="relative ml-auto" ref={dateRangeRef}>
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

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Table Headers */}
        <div className="border-b border-gray-200">
          <div className="grid grid-cols-5 gap-4 px-6 py-3">
            <div className="text-sm font-medium text-gray-700">URL</div>
            <div className="text-sm font-medium text-gray-700">Plugin events</div>
            <div className="text-sm font-medium text-gray-700">Platform version</div>
            <div className="text-sm font-medium text-gray-700">BlinkSpeed version</div>
            <div className="text-sm font-medium text-gray-700">Date</div>
          </div>
        </div>

        {/* Empty State */}
        <div className="py-16">
          <div className="flex flex-col items-center justify-center">
            {/* Stacked Cards Illustration */}
            <div className="relative mb-6 w-24 h-24">
              {/* Bottom Card */}
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-100 rounded-lg opacity-40 transform rotate-[-3deg]"></div>
              {/* Middle Card */}
              <div className="absolute bottom-1 left-1 w-20 h-20 bg-purple-200 rounded-lg opacity-60 transform rotate-[2deg]"></div>
              {/* Top Card with Filter Icon */}
              <div className="absolute bottom-2 left-2 w-20 h-20 bg-purple-300 rounded-lg flex items-center justify-center shadow-sm">
                <Filter size={28} className="text-purple-600" />
              </div>
            </div>

            {/* Message */}
            <p className="text-base font-semibold text-purple-700 mb-2">
              Sorry, we could not find any results for your filter selection.
            </p>
            <p className="text-sm text-gray-600 text-center max-w-md">
              Please try a different set of filters to narrow down the results. If you're still having trouble finding what you need, please{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                contact our support team
              </a>{' '}
              for assistance.
            </p>
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
