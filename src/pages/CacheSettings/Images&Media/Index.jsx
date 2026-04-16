import React, { useState, useEffect, useRef } from 'react';
import {
  ToggleLeft,
  ToggleRight,
  Info,
  ChevronDown,
  MessageCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()
  // Lazy Load Section States
  const [lazyLoadImages, setLazyLoadImages] = useState(false);
  const [lazyLoadIframes, setLazyLoadIframes] = useState(true);
  const [lazyLoadVideos, setLazyLoadVideos] = useState(true);

  // Images & Video Section States
  const [imageOptimization, setImageOptimization] = useState(true);
  const [imageQuality, setImageQuality] = useState('high');
  const [animatedImageOptimization, setAnimatedImageOptimization] = useState(false);

  // Adaptive Image Sizing State
  const [adaptiveImageSizing, setAdaptiveImageSizing] = useState(false);

  // Video Facades Section States
  const [videoFacades, setVideoFacades] = useState(true);
  const [youtubeQuality, setYoutubeQuality] = useState('auto');
  const [vimeoQuality, setVimeoQuality] = useState('640px');
  const [detectThemeVideoOverlays, setDetectThemeVideoOverlays] = useState(false);

  // LCP Preload State
  const [lcpPreload, setLcpPreload] = useState(false);

  // Dropdown visibility states
  const [showImageQualityDropdown, setShowImageQualityDropdown] = useState(false);
  const [showYoutubeDropdown, setShowYoutubeDropdown] = useState(false);
  const [showVimeoDropdown, setShowVimeoDropdown] = useState(false);

  // Refs for dropdowns
  const imageQualityRef = useRef(null);
  const youtubeRef = useRef(null);
  const vimeoRef = useRef(null);

  // Click outside handler for dropdowns
  useEffect(() => {
    const handler = (e) => {
      if (imageQualityRef.current && !imageQualityRef.current.contains(e.target)) {
        setShowImageQualityDropdown(false);
      }
      if (youtubeRef.current && !youtubeRef.current.contains(e.target)) {
        setShowYoutubeDropdown(false);
      }
      if (vimeoRef.current && !vimeoRef.current.contains(e.target)) {
        setShowVimeoDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const imageQualityOptions = ['High - 80%', 'Medium - 60%', 'Low - 40%'];
  const youtubeOptions = ['Auto', 'HD', 'SD', 'Low'];
  const vimeoOptions = ['640px', '960px', '1280px', '1920px'];

  return (
    <div className="min-h-screen px-6 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Images & Media</h1>
        <p className="text-sm text-gray-600">Adjust your image and media settings</p>
      </div>

      {/* Lazy Load Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Lazy load</h2>

        {/* Lazy load images */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-base font-medium text-gray-900">Lazy load images</label>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  Recommended
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  Improves Core Web Vitals
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Delays the loading of outside of the screen visible area images until required, optimizing initial page load times and enhancing site speed.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setLazyLoadImages(!lazyLoadImages)}
              className="focus:outline-none ml-4"
            >
              {lazyLoadImages ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Lazy load iframes */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <label className="text-base font-medium text-gray-900 mb-2 block">Lazy load iframes</label>
              <p className="text-sm text-gray-600 mb-2">
                Delay the loading of off-screen iframes (incl. videos) until they need to be displayed on user's screen, improving initial page load times and overall site speed.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setLazyLoadIframes(!lazyLoadIframes)}
              className="focus:outline-none ml-4"
            >
              {lazyLoadIframes ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Lazy load self-hosted videos */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-base font-medium text-gray-900">Lazy load self-hosted videos</label>
                <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Defers loading of self-hosted videos to speed up page load and reduce resource use.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                Learn more
              </a>
            </div>
            <button
              onClick={() => setLazyLoadVideos(!lazyLoadVideos)}
              className="focus:outline-none ml-4"
            >
              {lazyLoadVideos ? (
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

      {/* Images & Video Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Images & Video</h2>

        {/* Image optimization */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <label className="text-base font-medium text-gray-900">Image optimization</label>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  Recommended
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  Improves Core Web Vitals
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Decreases the image file size while maintaining its quality, leading to faster loading times.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setImageOptimization(!imageOptimization)}
              className="focus:outline-none ml-4"
            >
              {imageOptimization ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>

          {imageOptimization && (
            <>
              <div className="flex items-center gap-4 mb-2">
                <div className="relative" ref={imageQualityRef}>
                  <button
                    onClick={() => setShowImageQualityDropdown(!showImageQualityDropdown)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 min-w-[150px]"
                  >
                    <span>{imageQualityOptions.find(opt => opt.includes(imageQuality === 'high' ? '80%' : imageQuality === 'medium' ? '60%' : '40%')) || 'High - 80%'}</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  {showImageQualityDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      {imageQualityOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            if (option.includes('80%')) setImageQuality('high');
                            else if (option.includes('60%')) setImageQuality('medium');
                            else setImageQuality('low');
                            setShowImageQualityDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                  Preview compression
                </a>
              </div>
              <p className="text-sm text-gray-600">
                Set your custom image quality in percentage. A higher number means higher quality (smaller optimization) and a smaller number applies larger optimization but may impact the image quality.
              </p>
            </>
          )}
        </div>

        {/* Animated image optimization */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start gap-3 mb-2">
            <input
              type="checkbox"
              id="animatedImageOptimization"
              checked={animatedImageOptimization}
              onChange={(e) => setAnimatedImageOptimization(e.target.checked)}
              className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <label htmlFor="animatedImageOptimization" className="text-base font-medium text-gray-900 cursor-pointer">
                  Animated image optimization
                </label>
                <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
                  New
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Optimizes animated GIFs and PNGs, reducing their size while maintaining quality.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                Learn more
              </a>
            </div>
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

        {/* Save Button */}
        <div className="flex justify-end mb-6">
          <button
            disabled
            className="bg-gray-300 text-gray-500 px-6 py-2.5 rounded-md text-sm font-medium cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>

      {/* Adaptive Image Sizing Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Adaptive image sizing</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">
                Image files are resized to match their container dimensions, reducing image file size.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setAdaptiveImageSizing(!adaptiveImageSizing)}
              className="focus:outline-none ml-4"
            >
              {adaptiveImageSizing ? (
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
      </div>

      {/* Video Facades Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Video facades</h2>
          <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
            New
          </span>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">
                Improves your loading speed by displaying a video facade and deferring the load of YouTube, Vimeo and Wistia videos until user plays them.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View example
              </a>
            </div>
            <button
              onClick={() => setVideoFacades(!videoFacades)}
              className="focus:outline-none ml-4"
            >
              {videoFacades ? (
                <ToggleRight size={24} className="text-purple-600" />
              ) : (
                <ToggleLeft size={24} className="text-gray-300" />
              )}
            </button>
          </div>

          {videoFacades && (
            <>
              {/* YouTube Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                <div className="relative" ref={youtubeRef}>
                  <button
                    onClick={() => setShowYoutubeDropdown(!showYoutubeDropdown)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 min-w-[150px]"
                  >
                    <span>{youtubeQuality}</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  {showYoutubeDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      {youtubeOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setYoutubeQuality(option);
                            setShowYoutubeDropdown(false);
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

              {/* Vimeo Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Vimeo</label>
                <div className="relative" ref={vimeoRef}>
                  <button
                    onClick={() => setShowVimeoDropdown(!showVimeoDropdown)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 min-w-[150px]"
                  >
                    <span>{vimeoQuality}</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  {showVimeoDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      {vimeoOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setVimeoQuality(option);
                            setShowVimeoDropdown(false);
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

              {/* Detect theme video overlays checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="detectThemeVideoOverlays"
                  checked={detectThemeVideoOverlays}
                  onChange={(e) => setDetectThemeVideoOverlays(e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <div className="flex-1">
                  <label htmlFor="detectThemeVideoOverlays" className="text-base font-medium text-gray-900 cursor-pointer block mb-2">
                    Detect theme video overlays
                  </label>
                  <p className="text-sm text-gray-600">
                    Some themes allow configuring an overlay for embedded videos. When this setting is enabled, BlinkSpeed will display that overlay instead of the video thumbnail, enhancing loading performance.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              className="bg-purple-600 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* LCP Preload Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">LCP preload</h2>
          <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
            New
          </span>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
            Improves Core Web Vitals
          </span>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">
                Improves your Core Web Vitals by automatically identifying and preloading the LCP element.
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
                Learn more
              </a>
            </div>
            <button
              onClick={() => setLcpPreload(!lcpPreload)}
              className="focus:outline-none ml-4"
            >
              {lcpPreload ? (
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
      </div>

      {/* Chat Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-purple-700 transition-colors z-50">
        <MessageCircle size={24} className="text-white" />
      </div>
    </div>
  );
};

export default Index;
