import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import {
  ToggleLeft,
  ToggleRight,
  Info,
  ChevronDown,
  MessageCircle,
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate()
  // Remove render-blocking resources states
  const [removeRenderBlocking, setRemoveRenderBlocking] = useState(true);
  const [useResourceLoader, setUseResourceLoader] = useState(true);
  const [resourceLoadingStrategy, setResourceLoadingStrategy] = useState('styles-first');
  const [delayNonCritical, setDelayNonCritical] = useState(true);

  // Delayed scripts state
  const [delayedScripts, setDelayedScripts] = useState(false);

  // Combine JavaScript state
  const [combineJavaScript, setCombineJavaScript] = useState(false);

  // Optimize GTM state
  const [optimizeGTM, setOptimizeGTM] = useState(true);

  // Dropdown visibility states
  const [showResourceStrategyDropdown, setShowResourceStrategyDropdown] = useState(false);

  // Refs for dropdowns
  const resourceStrategyRef = useRef(null);

  const resourceStrategyOptions = ['Styles first', 'Scripts first', 'Parallel'];

  // Click outside handler for dropdowns
  useEffect(() => {
    const handler = (e) => {
      if (resourceStrategyRef.current && !resourceStrategyRef.current.contains(e.target)) {
        setShowResourceStrategyDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="min-h-screen px-6 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">JavaScript</h1>
        <p className="text-sm text-gray-600">Adjust your JavaScript settings</p>
      </div>

      {/* Remove render-blocking resources Section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-semibold text-gray-900">Remove render-blocking resources</h2>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  Recommended
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  Improves Core Web Vitals
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Removes render-blocking resources such as JavaScript, enabling the browser to render page content faster, thus improving page load times and performance.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setRemoveRenderBlocking(!removeRenderBlocking)}
              className="focus:outline-none ml-4"
            >
              {removeRenderBlocking ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>

          {/* Nested Options - Only show when toggle is ON */}
          {removeRenderBlocking && (
            <div className="pl-6 border-l-2 border-gray-200 space-y-6">
              {/* Use resource loader script checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="useResourceLoader"
                  checked={useResourceLoader}
                  onChange={(e) => setUseResourceLoader(e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <div className="flex-1">
                  <label htmlFor="useResourceLoader" className="text-base font-medium text-gray-900 cursor-pointer block mb-2">
                    Use resource loader script
                  </label>
                  <p className="text-sm text-gray-600 mb-4">
                    Optimizes the loading sequence of CSS & JavaScript for performance enhancement.
                  </p>

                  {/* Resource loading strategy dropdown - Only show when checkbox is checked */}
                  {useResourceLoader && (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm font-medium text-gray-700">Resource loading strategy</label>
                        <Info size={16} className="text-gray-400" />
                      </div>
                      <div className="relative mb-2" ref={resourceStrategyRef}>
                        <button
                          onClick={() => setShowResourceStrategyDropdown(!showResourceStrategyDropdown)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 min-w-[150px]"
                        >
                          <span>
                            {resourceLoadingStrategy === 'styles-first' ? 'Styles first' :
                             resourceLoadingStrategy === 'scripts-first' ? 'Scripts first' :
                             'Parallel'}
                          </span>
                          <ChevronDown size={16} className="text-gray-400" />
                        </button>
                        {showResourceStrategyDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            {resourceStrategyOptions.map((option) => (
                              <button
                                key={option}
                                onClick={() => {
                                  if (option.includes('Styles')) setResourceLoadingStrategy('styles-first');
                                  else if (option.includes('Scripts')) setResourceLoadingStrategy('scripts-first');
                                  else setResourceLoadingStrategy('parallel');
                                  setShowResourceStrategyDropdown(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-xs italic text-gray-500 mb-4">
                        *Loading styles first is the default and preferred way to go. Some styles can still be reported as render-blocking.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Delay non-critical resources checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="delayNonCritical"
                  checked={delayNonCritical}
                  onChange={(e) => setDelayNonCritical(e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <div className="flex-1">
                  <label htmlFor="delayNonCritical" className="text-base font-medium text-gray-900 cursor-pointer block mb-2">
                    Delay non-critical resources
                  </label>
                  <p className="text-sm text-gray-600">
                    Delays execution of scripts until user interacts with the page.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              disabled
              className="bg-gray-300 text-gray-500 px-6 py-2.5 rounded-md text-sm font-medium cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Delayed scripts Section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Delayed scripts</h2>
              <p className="text-sm text-gray-600 mb-2">
                Delays the loading of popular scripts (e.g., chat widget, pop-ups, analytics tools). Specify additional scripts you want to be loaded with a delay from the field below.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setDelayedScripts(!delayedScripts)}
              className="focus:outline-none ml-4"
            >
              {delayedScripts ? (
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
        </div>
      </div>

      {/* Combine JavaScript Section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Combine JavaScript</h2>
              <p className="text-sm text-gray-600 mb-2">
                Combine JS files to reduce network requests and boost rendering performance. Please note: due to the variability in JavaScript coding and interactions, this feature might not be compatible with all scripts. After enabling, do review your website to ensure it's functioning as expected.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setCombineJavaScript(!combineJavaScript)}
              className="focus:outline-none ml-4"
            >
              {combineJavaScript ? (
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
        </div>
      </div>

      {/* Optimize Google Tag Manager (GTM) Section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-semibold text-gray-900">Optimize Google Tag Manager (GTM)</h2>
                <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Improves page performance by optimizing how Google Tag Manager (GTM) loads and runs.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                Learn more
              </a>
            </div>
            <button
              onClick={() => setOptimizeGTM(!optimizeGTM)}
              className="focus:outline-none ml-4"
            >
              {optimizeGTM ? (
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
