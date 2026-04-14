import React, { useState, useEffect, useRef } from 'react';
import {
  ToggleLeft,
  ToggleRight,
  Info,
  ChevronDown,
  MessageCircle,
} from 'lucide-react';

const Index = () => {
  // Caching Section States
  const [optimizeOnlyUrls, setOptimizeOnlyUrls] = useState(false);
  const [minifyResources, setMinifyResources] = useState(true);
  const [optimizeUrls, setOptimizeUrls] = useState(false);
  const [dynamicQueue, setDynamicQueue] = useState(false);
  const [instantCacheRecompilation, setInstantCacheRecompilation] = useState(true);
  const [cacheAjaxUrls, setCacheAjaxUrls] = useState(false);
  const [includeDefaultIgnoredParams, setIncludeDefaultIgnoredParams] = useState(true);
  const [customIgnoredParams, setCustomIgnoredParams] = useState('');
  const [excludedResources, setExcludedResources] = useState(false);
  const [excludedUrls, setExcludedUrls] = useState(false);
  const [excludeFromOptimizationByCookie, setExcludeFromOptimizationByCookie] = useState(false);

  // Dynamic content cookies state
  const [dynamicCookies, setDynamicCookies] = useState([
    { id: 1, name: 'wp_no_cache_cookie', value: 'no_cache', group: 'no-group' },
  ]);
  const [newCookie, setNewCookie] = useState({ name: '', value: '', group: 'no-group' });
  const [showGroupDropdowns, setShowGroupDropdowns] = useState({});

  // Refs for dropdowns
  const groupDropdownRefs = useRef({});

  const groupOptions = ['No group', 'Group 1', 'Group 2', 'Group 3'];

  // Click outside handler for dropdowns
  useEffect(() => {
    const handler = (e) => {
      Object.keys(groupDropdownRefs.current).forEach((key) => {
        if (groupDropdownRefs.current[key] && !groupDropdownRefs.current[key].contains(e.target)) {
          setShowGroupDropdowns((prev) => ({ ...prev, [key]: false }));
        }
      });
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleAddCookie = () => {
    if (newCookie.name && newCookie.value) {
      setDynamicCookies([
        ...dynamicCookies,
        { id: Date.now(), ...newCookie },
      ]);
      setNewCookie({ name: '', value: '', group: 'no-group' });
    }
  };

  const handleDeleteCookie = (id) => {
    setDynamicCookies(dynamicCookies.filter((cookie) => cookie.id !== id));
  };

  const handleAddIgnoredParam = () => {
    if (customIgnoredParams.trim()) {
      // In a real app, this would add to a list
      console.log('Adding ignored parameter:', customIgnoredParams);
      setCustomIgnoredParams('');
    }
  };

  return (
    <div className="min-h-screen px-6 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cache</h1>
        <p className="text-sm text-gray-600">Adjust your cache settings</p>
      </div>

      {/* Caching Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Caching</h2>

        {/* Customize cache expiration time */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <h3 className="text-base font-semibold text-gray-900 mb-2">Customize cache expiration time</h3>
          <p className="text-sm text-gray-600 mb-2">
            Fine-tune your website performance by defining a cache lifespan for your cache.
          </p>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
            View example
          </a>
          {/* Subscription Callout */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                This feature is available on Plus subscription.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Upgrade here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Optimize only URLs */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Optimize only URLs</h3>
              <p className="text-sm text-gray-600 mb-2">
                Focus optimization on specific URLs manually (Premium). This allows precise control over site performance.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setOptimizeOnlyUrls(!optimizeOnlyUrls)}
              className="focus:outline-none ml-4"
            >
              {optimizeOnlyUrls ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>
          {/* Subscription Callout */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                This feature is available on Plus subscription.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Upgrade here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Minify resources */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Minify resources</h3>
              <p className="text-sm text-gray-600 mb-2">
                Enable or disable minification of JavaScript, CSS and HTML resources.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setMinifyResources(!minifyResources)}
              className="focus:outline-none ml-4"
            >
              {minifyResources ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Optimize urls */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Optimize urls</h3>
              <p className="text-sm text-gray-600 mb-2">
                Prevents render-blocking for critical page-rendering, enhancing page load speed and user experience.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setOptimizeUrls(!optimizeUrls)}
              className="focus:outline-none ml-4"
            >
              {optimizeUrls ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>
          {/* Subscription Callout */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                This feature is available on Plus subscription.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Upgrade here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic queue */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-gray-900">Dynamic queue</h3>
                <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Prioritizes urgent optimization in the queue for improved user visibility.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                Learn more
              </a>
            </div>
            <button
              onClick={() => setDynamicQueue(!dynamicQueue)}
              className="focus:outline-none ml-4"
            >
              {dynamicQueue ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>
          {/* Subscription Callout */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                This feature is available on Plus subscription.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Upgrade here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Instant cache recompilation */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-gray-900">Instant cache recompilation</h3>
                <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Automatically rebuilds cache when it expires, to ensure your site optimized at all times.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                Learn more
              </a>
            </div>
            <button
              onClick={() => setInstantCacheRecompilation(!instantCacheRecompilation)}
              className="focus:outline-none ml-4"
            >
              {instantCacheRecompilation ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>
          {/* Subscription Callout */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                This feature is available on Plus subscription.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Upgrade here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Cache AJAX URLs */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Cache AJAX URLs</h3>
              <p className="text-sm text-gray-600 mb-2">
                Choose specific AJAX URLs for caching, enhancing their load speed and performance.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setCacheAjaxUrls(!cacheAjaxUrls)}
              className="focus:outline-none ml-4"
            >
              {cacheAjaxUrls ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>
          {/* Subscription Callout */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                This feature is available on Plus subscription.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Upgrade here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Ignored parameters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <h3 className="text-base font-semibold text-gray-900 mb-2">Ignored parameters</h3>
          <p className="text-sm text-gray-600 mb-4">
            Specify a list of URL parameters that do not modify the page content and can be safely ignored to avoid the creation of unnecessary cache files.
          </p>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline mb-4 block">
            View example
          </a>

          <div className="flex items-start gap-3 mb-4">
            <input
              type="checkbox"
              id="includeDefaultIgnoredParams"
              checked={includeDefaultIgnoredParams}
              onChange={(e) => setIncludeDefaultIgnoredParams(e.target.checked)}
              className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <div className="flex-1">
              <label htmlFor="includeDefaultIgnoredParams" className="text-base font-medium text-gray-900 cursor-pointer block mb-2">
                Include default ignored parameters
              </label>
              <p className="text-sm text-gray-600">
                Ignore default parameters (such as UTMs) from the creation of new caching pages.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Read the complete list here
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom ignored parameters
            </label>
            <textarea
              value={customIgnoredParams}
              onChange={(e) => setCustomIgnoredParams(e.target.value)}
              placeholder="Example 1: ?_ga&#10;Example 2: utm_*"
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
            />
          </div>

          <button
            onClick={handleAddIgnoredParam}
            className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Must include headers */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-base font-semibold text-gray-900">Must include headers</h3>
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
              New
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Specify a list of HTTP response headers that must be present in optimized pages.
          </p>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
            Learn more
          </a>
          {/* Subscription Callout */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                This feature is available on Plus subscription.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Upgrade here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Cache reset */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <h3 className="text-base font-semibold text-gray-900 mb-2">Cache reset</h3>
          <p className="text-sm text-gray-600 mb-4">
            Reset and purge your page cache in full. Expect longer cache rebuild time.
          </p>
          <button className="bg-purple-600 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
            Start cache reset
          </button>
        </div>

        {/* Background purge */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-base font-semibold text-gray-900">Background purge</h3>
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
              New
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Minimizes user disturbance by building a new cache in the background before the old one is replaced.
          </p>
          {/* Subscription Callout */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                This feature is available on Plus subscription.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Upgrade here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exclusions Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Exclusions</h2>

        {/* Excluded resources */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Excluded resources</h3>
              <p className="text-sm text-gray-600 mb-2">
                Specify the JavaScript, CSS, images, and other files you do not want to get optimized.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setExcludedResources(!excludedResources)}
              className="focus:outline-none ml-4"
            >
              {excludedResources ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Excluded URLs */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Excluded URLs</h3>
              <p className="text-sm text-gray-600 mb-2">
                Specify the pages you do not want to get optimized. Can be simultaneously used with Optimize Only URLs.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                Learn more
              </a>
            </div>
            <button
              onClick={() => setExcludedUrls(!excludedUrls)}
              className="focus:outline-none ml-4"
            >
              {excludedUrls ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cookies Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Cookies</h2>

        {/* Dynamic content cookies */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <h3 className="text-base font-semibold text-gray-900 mb-2">Dynamic content cookies</h3>
          <p className="text-sm text-gray-600 mb-4">
            Configure dynamic content cache files based on specific cookie values, ensuring the correct version of a page is served to each visitor.
          </p>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline mb-4 block">
            View example
          </a>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Cookie name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Cookie value</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Group</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {dynamicCookies.map((cookie) => (
                  <tr key={cookie.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={cookie.name}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-gray-50"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={cookie.value}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-gray-50"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative" ref={(el) => (groupDropdownRefs.current[`existing-${cookie.id}`] = el)}>
                        <button
                          onClick={() => setShowGroupDropdowns((prev) => ({ ...prev, [`existing-${cookie.id}`]: !prev[`existing-${cookie.id}`] }))}
                          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 w-full"
                        >
                          <span>{cookie.group === 'no-group' ? 'No group' : cookie.group}</span>
                          <ChevronDown size={14} className="text-gray-400" />
                        </button>
                        {showGroupDropdowns[`existing-${cookie.id}`] && (
                          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            {groupOptions.map((option) => (
                              <button
                                key={option}
                                onClick={() => {
                                  setDynamicCookies(dynamicCookies.map((c) =>
                                    c.id === cookie.id
                                      ? { ...c, group: option === 'No group' ? 'no-group' : option.toLowerCase().replace(' ', '-') }
                                      : c
                                  ));
                                  setShowGroupDropdowns((prev) => ({ ...prev, [`existing-${cookie.id}`]: false }));
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDeleteCookie(cookie.id)}
                        className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={newCookie.name}
                      onChange={(e) => setNewCookie({ ...newCookie, name: e.target.value })}
                      placeholder="Cookie name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={newCookie.value}
                      onChange={(e) => setNewCookie({ ...newCookie, value: e.target.value })}
                      placeholder="Cookie value"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="relative" ref={(el) => (groupDropdownRefs.current['new'] = el)}>
                      <button
                        onClick={() => setShowGroupDropdowns((prev) => ({ ...prev, new: !prev.new }))}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 w-full"
                      >
                        <span>{newCookie.group === 'no-group' ? 'No group' : newCookie.group}</span>
                        <ChevronDown size={14} className="text-gray-400" />
                      </button>
                      {showGroupDropdowns['new'] && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          {groupOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setNewCookie({ ...newCookie, group: option === 'No group' ? 'no-group' : option.toLowerCase().replace(' ', '-') });
                                setShowGroupDropdowns((prev) => ({ ...prev, new: false }));
                              }}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={handleAddCookie}
                      className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="bg-purple-600 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
            Save
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Exclude from optimization by cookie</h3>
              <p className="text-sm text-gray-600 mb-2">
                Specify which cookies will trigger an exclusion from optimization.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setExcludeFromOptimizationByCookie(!excludeFromOptimizationByCookie)}
              className="focus:outline-none ml-4"
            >
              {excludeFromOptimizationByCookie ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-teal-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                This feature is available on Plus subscription.{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Upgrade here
                </a>
              </p>
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
