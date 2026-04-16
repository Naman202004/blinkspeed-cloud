import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {
  ToggleLeft,
  ToggleRight,
  Info,
  MessageCircle,
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate()
  // HTML Section States
  const [keepHtmlComments, setKeepHtmlComments] = useState(false);
  const [minifyJsonLd, setMinifyJsonLd] = useState(false);
  const [htmlNormalization, setHtmlNormalization] = useState(false);

  // CSS Section States
  const [generateCriticalCss, setGenerateCriticalCss] = useState(true);
  const [removeFontFaceFromCritical, setRemoveFontFaceFromCritical] = useState(false);
  const [includeCssSelectors, setIncludeCssSelectors] = useState('');
  const [excludeCssSelectors, setExcludeCssSelectors] = useState('');

  const [customCss, setCustomCss] = useState(false);

  const [removeUnusedCss, setRemoveUnusedCss] = useState(false);

  const [combineCss, setCombineCss] = useState(true);
  const [mergeScreenAndAllMedia, setMergeScreenAndAllMedia] = useState(true);

  const [extractLargeInlineCss, setExtractLargeInlineCss] = useState(false);

  return (
    <div className="min-h-screen px-6 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HTML & CSS</h1>
        <p className="text-sm text-gray-600">Adjust your HTML and CSS settings</p>
      </div>

      {/* HTML Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">HTML</h2>

        {/* Keep HTML comments */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Keep HTML comments</h3>
              <p className="text-sm text-gray-600 mb-2">
                Preserves developer comments in your cached HTML files. While usually excluded to minimize file size, these comments can aid in debugging and understanding your site's code structure. Enable this feature when a detailed HTML view is necessary.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setKeepHtmlComments(!keepHtmlComments)}
              className="focus:outline-none ml-4"
            >
              {keepHtmlComments ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Minify JSON for linking data */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Minify JSON for linking data</h3>
              <p className="text-sm text-gray-600 mb-2">
                In addition to improving speed, streamlined JSON-LD can enhance SEO, as search engines use this data to better understand and index your content. Enable this feature for a dual boost in speed and discoverability.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setMinifyJsonLd(!minifyJsonLd)}
              className="focus:outline-none ml-4"
            >
              {minifyJsonLd ? (
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

        {/* HTML normalization */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-gray-900">HTML normalization</h3>
                <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Adds pre-parsing stage that seamlessly normalizes the HTML. This step effectively addresses issues with misaligned elements in the DOM tree, ensuring a smoother, more reliable web experience.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                Learn more
              </a>
            </div>
            <button
              onClick={() => setHtmlNormalization(!htmlNormalization)}
              className="focus:outline-none ml-4"
            >
              {htmlNormalization ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CSS Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">CSS</h2>

        {/* Generate critical CSS */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-gray-900">Generate critical CSS</h3>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  Recommended
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  Improves Core Web Vitals
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Automatically identifies and inlines the CSS needed to display the above-the-fold content quickly. Simultaneously, it asynchronously loads the non-critical CSS, allowing for faster overall page load time.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setGenerateCriticalCss(!generateCriticalCss)}
              className="focus:outline-none ml-4"
            >
              {generateCriticalCss ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>

          {generateCriticalCss && (
            <div className="space-y-4">
              {/* Remove @font-face rules checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="removeFontFaceFromCritical"
                  checked={removeFontFaceFromCritical}
                  onChange={(e) => setRemoveFontFaceFromCritical(e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <div className="flex-1">
                  <label htmlFor="removeFontFaceFromCritical" className="text-base font-medium text-gray-900 cursor-pointer block mb-2">
                    Remove @font-face rules from the critical CSS
                  </label>
                  <p className="text-sm text-gray-600">
                    Prevent font files from being loaded during the initial rendering of the page, improving the font loading speed and Largest Contentful Paint.
                  </p>
                </div>
              </div>

              {/* Include CSS selectors textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Include CSS selectors in the critical CSS
                </label>
                <textarea
                  value={includeCssSelectors}
                  onChange={(e) => setIncludeCssSelectors(e.target.value)}
                  placeholder="Example 1: .container"
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Exclude CSS selectors textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exclude CSS selectors in the critical CSS
                </label>
                <textarea
                  value={excludeCssSelectors}
                  onChange={(e) => setExcludeCssSelectors(e.target.value)}
                  placeholder="Example 1: .container"
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
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

        {/* Custom CSS */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Custom CSS</h3>
              <p className="text-sm text-gray-600 mb-2">
                Specify custom CSS rules which will be applied to the optimized pages.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                Learn more
              </a>
            </div>
            <button
              onClick={() => setCustomCss(!customCss)}
              className="focus:outline-none ml-4"
            >
              {customCss ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Remove unused CSS */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Remove unused CSS</h3>
              <p className="text-sm text-gray-600 mb-2">
                Removes the unused CSS from the optimized CSS files for faster rendering.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setRemoveUnusedCss(!removeUnusedCss)}
              className="focus:outline-none ml-4"
            >
              {removeUnusedCss ? (
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

        {/* Combine CSS */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-gray-900">Combine CSS</h3>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  Recommended
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  Improves Core Web Vitals
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Combine CSS files to reduce the number of network requests and improve your rendering.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setCombineCss(!combineCss)}
              className="focus:outline-none ml-4"
            >
              {combineCss ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>

          {combineCss && (
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="mergeScreenAndAllMedia"
                checked={mergeScreenAndAllMedia}
                onChange={(e) => setMergeScreenAndAllMedia(e.target.checked)}
                className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <div className="flex-1">
                <label htmlFor="mergeScreenAndAllMedia" className="text-base font-medium text-gray-900 cursor-pointer block mb-2">
                  Merge screen and all media styles
                </label>
                <p className="text-sm text-gray-600">
                  Combines styles for both 'screen' and 'all' media into a single group, instead of creating separate files.
                </p>
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

        {/* Extract Large Inline CSS */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-gray-900">Extract Large Inline CSS</h3>
                <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Inline CSS over 30KB is moved to an external file to prevent render-blocking and improve initial page load time.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                Learn more
              </a>
            </div>
            <button
              onClick={() => setExtractLargeInlineCss(!extractLargeInlineCss)}
              className="focus:outline-none ml-4"
            >
              {extractLargeInlineCss ? (
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
