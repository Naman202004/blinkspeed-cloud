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
  // Loading strategy states
  const [overrideFontRendering, setOverrideFontRendering] = useState(true);
  const [fontDisplayValue, setFontDisplayValue] = useState('swap');
  const [fontLoadingStrategy, setFontLoadingStrategy] = useState(false);

  // Compression and minification states
  const [fontSubsetting, setFontSubsetting] = useState(false);
  const [fontCompression, setFontCompression] = useState(false);
  const [optimizeGoogleFonts, setOptimizeGoogleFonts] = useState(false);

  // Dropdown visibility states
  const [showFontDisplayDropdown, setShowFontDisplayDropdown] = useState(false);

  // Refs for dropdowns
  const fontDisplayRef = useRef(null);

  const fontDisplayOptions = [
    { value: 'swap', label: 'Swap' },
    { value: 'auto', label: 'Auto' },
    { value: 'block', label: 'Block' },
    { value: 'fallback', label: 'Fallback' },
    { value: 'optional', label: 'Optional' },
  ];

  const fontDisplayDescriptions = {
    swap: 'Immediately displays text in a fallback font, then switches to the custom font once loaded. Known as "flash of unstyled text" (FOUT), this ensures quick text visibility, but may momentarily disrupt visual consistency.',
    auto: 'The browser decides the best strategy for font display.',
    block: 'Hides text until the font is loaded, preventing FOUT but potentially causing invisible text.',
    fallback: 'Similar to swap but with a shorter timeout, falling back to the system font if the custom font takes too long.',
    optional: 'Uses the custom font only if it\'s available quickly, otherwise uses the fallback font.',
  };

  // Click outside handler for dropdowns
  useEffect(() => {
    const handler = (e) => {
      if (fontDisplayRef.current && !fontDisplayRef.current.contains(e.target)) {
        setShowFontDisplayDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="min-h-screen px-6 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fonts</h1>
        <p className="text-sm text-gray-600">Adjust your font settings</p>
      </div>

      {/* Loading strategy Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Loading strategy</h2>

        {/* Override font rendering behavior */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Override font rendering behavior</h3>
              <p className="text-sm text-gray-600 mb-2">
                Specify how fonts are displayed during the load process, which can help to prevent visual disruptions, or 'flash of unstyled text', and improve the user's visual experience on a webpage.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setOverrideFontRendering(!overrideFontRendering)}
              className="focus:outline-none ml-4"
            >
              {overrideFontRendering ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>

          {/* Nested Options - Only show when toggle is ON */}
          {overrideFontRendering && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-700">Font-display value</label>
                <Info size={16} className="text-gray-400" />
              </div>
              <div className="relative" ref={fontDisplayRef}>
                <button
                  onClick={() => setShowFontDisplayDropdown(!showFontDisplayDropdown)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 min-w-[150px]"
                >
                  <span>{fontDisplayOptions.find(opt => opt.value === fontDisplayValue)?.label || 'Swap'}</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>
                {showFontDisplayDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    {fontDisplayOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setFontDisplayValue(option.value);
                          setShowFontDisplayDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {fontDisplayDescriptions[fontDisplayValue]}
              </p>
            </div>
          )}

          {/* Save Button */}
          {overrideFontRendering && (
            <div className="flex justify-end mt-6">
              <button
                disabled
                className="bg-gray-300 text-gray-500 px-6 py-2.5 rounded-md text-sm font-medium cursor-not-allowed"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Font loading strategy */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Font loading strategy</h3>
              <p className="text-sm text-gray-600 mb-2">
                Use this option to configure the method of loading fonts on your pages.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setFontLoadingStrategy(!fontLoadingStrategy)}
              className="focus:outline-none ml-4"
            >
              {fontLoadingStrategy ? (
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

      {/* Compression and minification Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Compression and minification</h2>

        {/* Font subsetting */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-gray-900">Font subsetting</h3>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  Recommended
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  Improves Core Web Vitals
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Removes unused glyphs(symbols) from a font file, thus reducing its size and improving the load time of a webpage.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setFontSubsetting(!fontSubsetting)}
              className="focus:outline-none ml-4"
            >
              {fontSubsetting ? (
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

        {/* Font compression */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-gray-900">Font compression</h3>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  Recommended
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  Improves Core Web Vitals
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Converts your fonts to WOFF2 format and reduces font size by up to 50%.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setFontCompression(!fontCompression)}
              className="focus:outline-none ml-4"
            >
              {fontCompression ? (
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

        {/* Optimize Google hosted fonts */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-gray-900">Optimize Google hosted fonts</h3>
                <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Optimize your Google fonts with BlinkSpeed by hosting them on our CDN.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setOptimizeGoogleFonts(!optimizeGoogleFonts)}
              className="focus:outline-none ml-4"
            >
              {optimizeGoogleFonts ? (
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
                This feature is available on Starter subscription.{' '}
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
