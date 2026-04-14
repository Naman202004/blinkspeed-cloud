import React, { useState } from 'react';
import {
  MessageCircle,
  Search,
} from 'lucide-react';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('Security');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Security', count: 4 },
    { name: 'Plugins', count: 35 },
    { name: 'Builders & Themes', count: 27 },
    { name: 'Platforms', count: 2 },
    { name: 'Hostings', count: 38 },
    { name: 'Others', count: 7 },
  ];

  const integrations = [
    // Security (4)
    {
      id: 1,
      name: 'Cloudflare',
      category: 'Security',
      logo: (
        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-200">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">CF</span>
          </div>
        </div>
      ),
      description: 'Connect your Cloudflare API to BlinkSpeed to synchronize both caches for best performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 2,
      name: 'Sucuri',
      category: 'Security',
      logo: (
        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center border border-green-200">
          <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
        </div>
      ),
      description: 'If your website is protected by Sucuri, configure API access, so BlinkSpeed can sync both caches and ensure the best possible performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 3,
      name: 'Reverse Proxy (Varnish, NGINX, etc.)',
      category: 'Security',
      logo: (
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center border border-green-200">
            <span className="text-green-700 font-bold text-lg">N</span>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
            <span className="text-blue-700 font-bold text-xs">V</span>
          </div>
        </div>
      ),
      description: 'If you are using a reverse proxy (like Varnish or NGINX) use this option to configure its settings, so BlinkSpeed can synchronize both caches for best performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 4,
      name: 'Advanced Math Captcha',
      category: 'Security',
      logo: (
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
          </div>
        </div>
      ),
      description: 'Set up the Advanced Math CAPTCHA integration and enjoy enhanced spam protection without sacrificing load times or user experience.',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    // Plugins (35)
    {
      id: 5,
      name: 'WooCommerce',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-200">
          <span className="text-purple-600 font-bold text-xs">WC</span>
        </div>
      ),
      description: 'Optimize your WooCommerce store with BlinkSpeed for faster page loads and better conversion rates. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 6,
      name: 'Yoast SEO',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center border border-green-200">
          <span className="text-green-600 font-bold text-xs">YS</span>
        </div>
      ),
      description: 'Integrate Yoast SEO with BlinkSpeed to maintain optimal SEO performance while accelerating your site. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 7,
      name: 'Contact Form 7',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
          <span className="text-blue-600 font-bold text-xs">CF7</span>
        </div>
      ),
      description: 'Ensure your Contact Form 7 forms work seamlessly with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 8,
      name: 'Elementor',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-200">
          <span className="text-orange-600 font-bold text-xs">EL</span>
        </div>
      ),
      description: 'Optimize Elementor-built pages with BlinkSpeed for lightning-fast load times. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 9,
      name: 'WP Rocket',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center border border-red-200">
          <span className="text-red-600 font-bold text-xs">WR</span>
        </div>
      ),
      description: 'Combine WP Rocket with BlinkSpeed for maximum caching performance and speed. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 10,
      name: 'Gravity Forms',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-200">
          <span className="text-indigo-600 font-bold text-xs">GF</span>
        </div>
      ),
      description: 'Integrate Gravity Forms with BlinkSpeed to maintain form functionality while optimizing performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 11,
      name: 'WPML',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center border border-teal-200">
          <span className="text-teal-600 font-bold text-xs">WP</span>
        </div>
      ),
      description: 'Optimize multilingual sites with WPML and BlinkSpeed working together seamlessly. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 12,
      name: 'Advanced Custom Fields',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center border border-pink-200">
          <span className="text-pink-600 font-bold text-xs">ACF</span>
        </div>
      ),
      description: 'Ensure ACF fields are properly optimized with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 13,
      name: 'bbPress',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center border border-yellow-200">
          <span className="text-yellow-600 font-bold text-xs">BB</span>
        </div>
      ),
      description: 'Optimize your bbPress forums with BlinkSpeed for faster community interactions. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 14,
      name: 'BuddyPress',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center border border-cyan-200">
          <span className="text-cyan-600 font-bold text-xs">BP</span>
        </div>
      ),
      description: 'Enhance BuddyPress social networks with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 15,
      name: 'Polylang',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-200">
          <span className="text-emerald-600 font-bold text-xs">PL</span>
        </div>
      ),
      description: 'Optimize Polylang multilingual sites with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 16,
      name: 'The Events Calendar',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-violet-50 rounded-lg flex items-center justify-center border border-violet-200">
          <span className="text-violet-600 font-bold text-xs">EC</span>
        </div>
      ),
      description: 'Speed up your event listings with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 17,
      name: 'LearnDash',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-200">
          <span className="text-amber-600 font-bold text-xs">LD</span>
        </div>
      ),
      description: 'Optimize your LearnDash LMS courses with BlinkSpeed for faster loading. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 18,
      name: 'MemberPress',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center border border-rose-200">
          <span className="text-rose-600 font-bold text-xs">MP</span>
        </div>
      ),
      description: 'Enhance MemberPress membership sites with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 19,
      name: 'Easy Digital Downloads',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center border border-sky-200">
          <span className="text-sky-600 font-bold text-xs">EDD</span>
        </div>
      ),
      description: 'Optimize EDD digital storefronts with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 20,
      name: 'WPForms',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-lime-50 rounded-lg flex items-center justify-center border border-lime-200">
          <span className="text-lime-600 font-bold text-xs">WF</span>
        </div>
      ),
      description: 'Integrate WPForms with BlinkSpeed to maintain form functionality while optimizing speed. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 21,
      name: 'All in One SEO',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-fuchsia-50 rounded-lg flex items-center justify-center border border-fuchsia-200">
          <span className="text-fuchsia-600 font-bold text-xs">AI</span>
        </div>
      ),
      description: 'Combine All in One SEO with BlinkSpeed for optimal SEO and performance. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 22,
      name: 'Rank Math',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-200">
          <span className="text-orange-600 font-bold text-xs">RM</span>
        </div>
      ),
      description: 'Optimize Rank Math SEO sites with BlinkSpeed for better rankings and speed. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 23,
      name: 'MonsterInsights',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-200">
          <span className="text-indigo-600 font-bold text-xs">MI</span>
        </div>
      ),
      description: 'Integrate MonsterInsights analytics with BlinkSpeed without affecting tracking. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 24,
      name: 'OptinMonster',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center border border-red-200">
          <span className="text-red-600 font-bold text-xs">OM</span>
        </div>
      ),
      description: 'Optimize OptinMonster popups with BlinkSpeed for better conversion rates. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 25,
      name: 'Thrive Themes',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-200">
          <span className="text-purple-600 font-bold text-xs">TT</span>
        </div>
      ),
      description: 'Enhance Thrive Themes pages with BlinkSpeed optimization for faster loads. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 26,
      name: 'Beaver Builder',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
          <span className="text-blue-600 font-bold text-xs">BB</span>
        </div>
      ),
      description: 'Optimize Beaver Builder layouts with BlinkSpeed for improved performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 27,
      name: 'Divi Builder',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center border border-teal-200">
          <span className="text-teal-600 font-bold text-xs">DB</span>
        </div>
      ),
      description: 'Speed up Divi Builder pages with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 28,
      name: 'Visual Composer',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center border border-pink-200">
          <span className="text-pink-600 font-bold text-xs">VC</span>
        </div>
      ),
      description: 'Optimize Visual Composer pages with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 29,
      name: 'WP Bakery',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center border border-yellow-200">
          <span className="text-yellow-600 font-bold text-xs">WB</span>
        </div>
      ),
      description: 'Enhance WP Bakery page builder with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 30,
      name: 'Mailchimp',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center border border-cyan-200">
          <span className="text-cyan-600 font-bold text-xs">MC</span>
        </div>
      ),
      description: 'Integrate Mailchimp email marketing with BlinkSpeed without affecting functionality. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 31,
      name: 'ConvertKit',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-200">
          <span className="text-emerald-600 font-bold text-xs">CK</span>
        </div>
      ),
      description: 'Optimize ConvertKit integrations with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 32,
      name: 'ActiveCampaign',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-violet-50 rounded-lg flex items-center justify-center border border-violet-200">
          <span className="text-violet-600 font-bold text-xs">AC</span>
        </div>
      ),
      description: 'Integrate ActiveCampaign with BlinkSpeed for optimal email marketing performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 33,
      name: 'Zapier',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-200">
          <span className="text-amber-600 font-bold text-xs">ZP</span>
        </div>
      ),
      description: 'Connect Zapier automations with BlinkSpeed for seamless integrations. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 34,
      name: 'Google Analytics',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center border border-rose-200">
          <span className="text-rose-600 font-bold text-xs">GA</span>
        </div>
      ),
      description: 'Integrate Google Analytics with BlinkSpeed without affecting tracking accuracy. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 35,
      name: 'Facebook Pixel',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center border border-sky-200">
          <span className="text-sky-600 font-bold text-xs">FB</span>
        </div>
      ),
      description: 'Optimize Facebook Pixel tracking with BlinkSpeed for better ad performance. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 36,
      name: 'Pinterest Pixel',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-lime-50 rounded-lg flex items-center justify-center border border-lime-200">
          <span className="text-lime-600 font-bold text-xs">PT</span>
        </div>
      ),
      description: 'Integrate Pinterest Pixel with BlinkSpeed for enhanced e-commerce tracking. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 37,
      name: 'TikTok Pixel',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-fuchsia-50 rounded-lg flex items-center justify-center border border-fuchsia-200">
          <span className="text-fuchsia-600 font-bold text-xs">TT</span>
        </div>
      ),
      description: 'Optimize TikTok Pixel tracking with BlinkSpeed for better ad performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 38,
      name: 'Google Tag Manager',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-200">
          <span className="text-orange-600 font-bold text-xs">GTM</span>
        </div>
      ),
      description: 'Integrate Google Tag Manager with BlinkSpeed for optimal tag management. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 39,
      name: 'Hotjar',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-200">
          <span className="text-indigo-600 font-bold text-xs">HJ</span>
        </div>
      ),
      description: 'Optimize Hotjar heatmaps with BlinkSpeed without affecting user behavior tracking. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 40,
      name: 'WP Super Cache',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200">
          <span className="text-slate-600 font-bold text-xs">WSC</span>
        </div>
      ),
      description: 'Combine WP Super Cache with BlinkSpeed for enhanced caching performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 41,
      name: 'W3 Total Cache',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-stone-50 rounded-lg flex items-center justify-center border border-stone-200">
          <span className="text-stone-600 font-bold text-xs">W3</span>
        </div>
      ),
      description: 'Integrate W3 Total Cache with BlinkSpeed for optimal caching strategies. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 42,
      name: 'Autoptimize',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-neutral-50 rounded-lg flex items-center justify-center border border-neutral-200">
          <span className="text-neutral-600 font-bold text-xs">AO</span>
        </div>
      ),
      description: 'Optimize Autoptimize settings with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 43,
      name: 'ShortPixel',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-200">
          <span className="text-zinc-600 font-bold text-xs">SP</span>
        </div>
      ),
      description: 'Integrate ShortPixel image optimization with BlinkSpeed for faster loads. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 44,
      name: 'Smush',
      category: 'Plugins',
      logo: (
        <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
          <span className="text-gray-600 font-bold text-xs">SM</span>
        </div>
      ),
      description: 'Optimize Smush image compression with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    // Builders & Themes (27)
    {
      id: 45,
      name: 'Astra Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-200">
          <span className="text-purple-600 font-bold text-xs">AT</span>
        </div>
      ),
      description: 'Optimize Astra theme sites with BlinkSpeed for lightning-fast performance. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 46,
      name: 'GeneratePress',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
          <span className="text-blue-600 font-bold text-xs">GP</span>
        </div>
      ),
      description: 'Enhance GeneratePress themes with BlinkSpeed optimization for better speed. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 47,
      name: 'OceanWP',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center border border-teal-200">
          <span className="text-teal-600 font-bold text-xs">OW</span>
        </div>
      ),
      description: 'Optimize OceanWP themes with BlinkSpeed for improved performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 48,
      name: 'Neve Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center border border-pink-200">
          <span className="text-pink-600 font-bold text-xs">NV</span>
        </div>
      ),
      description: 'Speed up Neve theme sites with BlinkSpeed optimization. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 49,
      name: 'Kadence Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center border border-yellow-200">
          <span className="text-yellow-600 font-bold text-xs">KT</span>
        </div>
      ),
      description: 'Optimize Kadence themes with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 45,
      name: 'Avada Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center border border-cyan-200">
          <span className="text-cyan-600 font-bold text-xs">AV</span>
        </div>
      ),
      description: 'Enhance Avada theme performance with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 51,
      name: 'Divi Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-200">
          <span className="text-emerald-600 font-bold text-xs">DT</span>
        </div>
      ),
      description: 'Optimize Divi theme sites with BlinkSpeed for faster loading times. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 47,
      name: 'Beaver Themer',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-violet-50 rounded-lg flex items-center justify-center border border-violet-200">
          <span className="text-violet-600 font-bold text-xs">BT</span>
        </div>
      ),
      description: 'Speed up Beaver Themer layouts with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 53,
      name: 'Genesis Framework',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-200">
          <span className="text-amber-600 font-bold text-xs">GF</span>
        </div>
      ),
      description: 'Optimize Genesis Framework themes with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 49,
      name: 'Storefront Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center border border-rose-200">
          <span className="text-rose-600 font-bold text-xs">ST</span>
        </div>
      ),
      description: 'Enhance WooCommerce Storefront themes with BlinkSpeed optimization. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 55,
      name: 'Flatsome Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center border border-sky-200">
          <span className="text-sky-600 font-bold text-xs">FT</span>
        </div>
      ),
      description: 'Optimize Flatsome e-commerce themes with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 56,
      name: 'Shopkeeper Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-lime-50 rounded-lg flex items-center justify-center border border-lime-200">
          <span className="text-lime-600 font-bold text-xs">SK</span>
        </div>
      ),
      description: 'Speed up Shopkeeper WooCommerce themes with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 57,
      name: 'WoodMart Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-fuchsia-50 rounded-lg flex items-center justify-center border border-fuchsia-200">
          <span className="text-fuchsia-600 font-bold text-xs">WM</span>
        </div>
      ),
      description: 'Optimize WoodMart WooCommerce themes with BlinkSpeed for faster loads. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 58,
      name: 'The7 Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-200">
          <span className="text-orange-600 font-bold text-xs">T7</span>
        </div>
      ),
      description: 'Enhance The7 multipurpose themes with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 54,
      name: 'Jupiter Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-200">
          <span className="text-indigo-600 font-bold text-xs">JP</span>
        </div>
      ),
      description: 'Optimize Jupiter X themes with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 60,
      name: 'Enfold Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center border border-red-200">
          <span className="text-red-600 font-bold text-xs">EF</span>
        </div>
      ),
      description: 'Speed up Enfold themes with BlinkSpeed optimization for improved performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 61,
      name: 'Salient Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-200">
          <span className="text-purple-600 font-bold text-xs">SL</span>
        </div>
      ),
      description: 'Optimize Salient creative themes with BlinkSpeed for faster loading. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 62,
      name: 'Bridge Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
          <span className="text-blue-600 font-bold text-xs">BR</span>
        </div>
      ),
      description: 'Enhance Bridge multipurpose themes with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 58,
      name: 'Impreza Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center border border-teal-200">
          <span className="text-teal-600 font-bold text-xs">IM</span>
        </div>
      ),
      description: 'Optimize Impreza themes with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 64,
      name: 'X Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center border border-pink-200">
          <span className="text-pink-600 font-bold text-xs">XT</span>
        </div>
      ),
      description: 'Speed up X Theme sites with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 65,
      name: 'Betta Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center border border-yellow-200">
          <span className="text-yellow-600 font-bold text-xs">BT</span>
        </div>
      ),
      description: 'Optimize Betta themes with BlinkSpeed for improved performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 61,
      name: 'Zakra Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center border border-cyan-200">
          <span className="text-cyan-600 font-bold text-xs">ZK</span>
        </div>
      ),
      description: 'Enhance Zakra themes with BlinkSpeed optimization for better speed. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 67,
      name: 'Blocksy Theme',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-200">
          <span className="text-emerald-600 font-bold text-xs">BL</span>
        </div>
      ),
      description: 'Optimize Blocksy themes with BlinkSpeed for faster loading times. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 68,
      name: 'Kadence Blocks',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-violet-50 rounded-lg flex items-center justify-center border border-violet-200">
          <span className="text-violet-600 font-bold text-xs">KB</span>
        </div>
      ),
      description: 'Speed up Kadence Blocks with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 69,
      name: 'Gutenberg Blocks',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-200">
          <span className="text-amber-600 font-bold text-xs">GB</span>
        </div>
      ),
      description: 'Optimize Gutenberg block editor with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 65,
      name: 'Spectra (Astra Blocks)',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center border border-rose-200">
          <span className="text-rose-600 font-bold text-xs">SP</span>
        </div>
      ),
      description: 'Enhance Spectra blocks with BlinkSpeed optimization for improved speed. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 71,
      name: 'Stackable Blocks',
      category: 'Builders & Themes',
      logo: (
        <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center border border-sky-200">
          <span className="text-sky-600 font-bold text-xs">SB</span>
        </div>
      ),
      description: 'Optimize Stackable Gutenberg blocks with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    // Platforms (2)
    {
      id: 72,
      name: 'WordPress',
      category: 'Platforms',
      logo: (
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
          <span className="text-blue-600 font-bold text-xs">WP</span>
        </div>
      ),
      description: 'BlinkSpeed is fully optimized for WordPress sites, providing maximum performance improvements. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 73,
      name: 'WooCommerce',
      category: 'Platforms',
      logo: (
        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-200">
          <span className="text-purple-600 font-bold text-xs">WC</span>
        </div>
      ),
      description: 'Optimize WooCommerce stores with BlinkSpeed for faster checkout and better conversions. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    // Hostings (38)
    {
      id: 74,
      name: 'SiteGround',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-200">
          <span className="text-orange-600 font-bold text-xs">SG</span>
        </div>
      ),
      description: 'Optimize SiteGround hosting with BlinkSpeed for enhanced performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 70,
      name: 'WP Engine',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-200">
          <span className="text-indigo-600 font-bold text-xs">WPE</span>
        </div>
      ),
      description: 'Integrate WP Engine hosting with BlinkSpeed for optimal WordPress performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 76,
      name: 'Kinsta',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center border border-red-200">
          <span className="text-red-600 font-bold text-xs">KS</span>
        </div>
      ),
      description: 'Enhance Kinsta hosting performance with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 72,
      name: 'Bluehost',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
          <span className="text-blue-600 font-bold text-xs">BH</span>
        </div>
      ),
      description: 'Optimize Bluehost hosting with BlinkSpeed for better site speed. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 78,
      name: 'HostGator',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center border border-green-200">
          <span className="text-green-600 font-bold text-xs">HG</span>
        </div>
      ),
      description: 'Speed up HostGator hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 79,
      name: 'DreamHost',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-200">
          <span className="text-purple-600 font-bold text-xs">DH</span>
        </div>
      ),
      description: 'Optimize DreamHost hosting with BlinkSpeed for improved performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 80,
      name: 'A2 Hosting',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center border border-teal-200">
          <span className="text-teal-600 font-bold text-xs">A2</span>
        </div>
      ),
      description: 'Enhance A2 Hosting performance with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 81,
      name: 'InMotion Hosting',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center border border-pink-200">
          <span className="text-pink-600 font-bold text-xs">IM</span>
        </div>
      ),
      description: 'Optimize InMotion Hosting with BlinkSpeed for better site speed. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 77,
      name: 'Hostinger',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center border border-yellow-200">
          <span className="text-yellow-600 font-bold text-xs">HS</span>
        </div>
      ),
      description: 'Speed up Hostinger hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 83,
      name: 'Namecheap',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center border border-cyan-200">
          <span className="text-cyan-600 font-bold text-xs">NC</span>
        </div>
      ),
      description: 'Optimize Namecheap hosting with BlinkSpeed for enhanced performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 84,
      name: 'GoDaddy',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-200">
          <span className="text-emerald-600 font-bold text-xs">GD</span>
        </div>
      ),
      description: 'Enhance GoDaddy hosting with BlinkSpeed optimization for better speed. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 85,
      name: 'Cloudways',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-violet-50 rounded-lg flex items-center justify-center border border-violet-200">
          <span className="text-violet-600 font-bold text-xs">CW</span>
        </div>
      ),
      description: 'Optimize Cloudways cloud hosting with BlinkSpeed for maximum performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 86,
      name: 'DigitalOcean',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-200">
          <span className="text-amber-600 font-bold text-xs">DO</span>
        </div>
      ),
      description: 'Enhance DigitalOcean hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 82,
      name: 'AWS',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center border border-rose-200">
          <span className="text-rose-600 font-bold text-xs">AWS</span>
        </div>
      ),
      description: 'Optimize AWS hosting with BlinkSpeed for scalable performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 88,
      name: 'Google Cloud',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center border border-sky-200">
          <span className="text-sky-600 font-bold text-xs">GC</span>
        </div>
      ),
      description: 'Speed up Google Cloud hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 89,
      name: 'Azure',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-lime-50 rounded-lg flex items-center justify-center border border-lime-200">
          <span className="text-lime-600 font-bold text-xs">AZ</span>
        </div>
      ),
      description: 'Optimize Azure hosting with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 90,
      name: 'Vultr',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-fuchsia-50 rounded-lg flex items-center justify-center border border-fuchsia-200">
          <span className="text-fuchsia-600 font-bold text-xs">VL</span>
        </div>
      ),
      description: 'Enhance Vultr hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 91,
      name: 'Linode',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-200">
          <span className="text-orange-600 font-bold text-xs">LN</span>
        </div>
      ),
      description: 'Optimize Linode hosting with BlinkSpeed for improved speed. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 92,
      name: 'Pantheon',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-200">
          <span className="text-indigo-600 font-bold text-xs">PN</span>
        </div>
      ),
      description: 'Speed up Pantheon hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 93,
      name: 'Flywheel',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center border border-red-200">
          <span className="text-red-600 font-bold text-xs">FW</span>
        </div>
      ),
      description: 'Optimize Flywheel hosting with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 94,
      name: 'Pressable',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-200">
          <span className="text-purple-600 font-bold text-xs">PR</span>
        </div>
      ),
      description: 'Enhance Pressable hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 95,
      name: 'Liquid Web',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
          <span className="text-blue-600 font-bold text-xs">LW</span>
        </div>
      ),
      description: 'Optimize Liquid Web hosting with BlinkSpeed for improved speed. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 91,
      name: 'Nexcess',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center border border-teal-200">
          <span className="text-teal-600 font-bold text-xs">NX</span>
        </div>
      ),
      description: 'Speed up Nexcess hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 97,
      name: 'WPX Hosting',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center border border-pink-200">
          <span className="text-pink-600 font-bold text-xs">WPX</span>
        </div>
      ),
      description: 'Optimize WPX Hosting with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 98,
      name: 'Rocket.net',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center border border-yellow-200">
          <span className="text-yellow-600 font-bold text-xs">RN</span>
        </div>
      ),
      description: 'Enhance Rocket.net hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 99,
      name: 'Convesio',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center border border-cyan-200">
          <span className="text-cyan-600 font-bold text-xs">CV</span>
        </div>
      ),
      description: 'Optimize Convesio hosting with BlinkSpeed for improved performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 100,
      name: 'GridPane',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-200">
          <span className="text-emerald-600 font-bold text-xs">GP</span>
        </div>
      ),
      description: 'Speed up GridPane hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 96,
      name: 'RunCloud',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-violet-50 rounded-lg flex items-center justify-center border border-violet-200">
          <span className="text-violet-600 font-bold text-xs">RC</span>
        </div>
      ),
      description: 'Optimize RunCloud hosting with BlinkSpeed for better speed. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 102,
      name: 'Plesk',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-200">
          <span className="text-amber-600 font-bold text-xs">PL</span>
        </div>
      ),
      description: 'Enhance Plesk hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 103,
      name: 'cPanel',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center border border-rose-200">
          <span className="text-rose-600 font-bold text-xs">CP</span>
        </div>
      ),
      description: 'Optimize cPanel hosting with BlinkSpeed for improved performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 99,
      name: 'DirectAdmin',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center border border-sky-200">
          <span className="text-sky-600 font-bold text-xs">DA</span>
        </div>
      ),
      description: 'Speed up DirectAdmin hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 105,
      name: 'WHM',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-lime-50 rounded-lg flex items-center justify-center border border-lime-200">
          <span className="text-lime-600 font-bold text-xs">WHM</span>
        </div>
      ),
      description: 'Optimize WHM hosting with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 106,
      name: 'ServerPilot',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-fuchsia-50 rounded-lg flex items-center justify-center border border-fuchsia-200">
          <span className="text-fuchsia-600 font-bold text-xs">SP</span>
        </div>
      ),
      description: 'Enhance ServerPilot hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 107,
      name: 'MilesWeb',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-200">
          <span className="text-orange-600 font-bold text-xs">MW</span>
        </div>
      ),
      description: 'Optimize MilesWeb hosting with BlinkSpeed for improved speed. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 108,
      name: 'HostArmada',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-200">
          <span className="text-indigo-600 font-bold text-xs">HA</span>
        </div>
      ),
      description: 'Speed up HostArmada hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 109,
      name: 'ChemiCloud',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center border border-red-200">
          <span className="text-red-600 font-bold text-xs">CC</span>
        </div>
      ),
      description: 'Optimize ChemiCloud hosting with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 110,
      name: 'FastComet',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-200">
          <span className="text-purple-600 font-bold text-xs">FC</span>
        </div>
      ),
      description: 'Enhance FastComet hosting with BlinkSpeed optimization. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 111,
      name: 'GreenGeeks',
      category: 'Hostings',
      logo: (
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
          <span className="text-blue-600 font-bold text-xs">GG</span>
        </div>
      ),
      description: 'Optimize GreenGeeks hosting with BlinkSpeed for improved performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    // Others (7)
    {
      id: 112,
      name: 'CDN Integration',
      category: 'Others',
      logo: (
        <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center border border-teal-200">
          <span className="text-teal-600 font-bold text-xs">CDN</span>
        </div>
      ),
      description: 'Integrate any CDN service with BlinkSpeed for enhanced global performance. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 113,
      name: 'Image Optimization',
      category: 'Others',
      logo: (
        <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center border border-pink-200">
          <span className="text-pink-600 font-bold text-xs">IO</span>
        </div>
      ),
      description: 'Optimize images automatically with BlinkSpeed for better performance. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 109,
      name: 'Lazy Loading',
      category: 'Others',
      logo: (
        <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center border border-yellow-200">
          <span className="text-yellow-600 font-bold text-xs">LL</span>
        </div>
      ),
      description: 'Enable lazy loading with BlinkSpeed for improved page load times. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 115,
      name: 'Database Optimization',
      category: 'Others',
      logo: (
        <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center border border-cyan-200">
          <span className="text-cyan-600 font-bold text-xs">DB</span>
        </div>
      ),
      description: 'Optimize your database queries with BlinkSpeed for faster response times. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
    {
      id: 116,
      name: 'Minification',
      category: 'Others',
      logo: (
        <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-200">
          <span className="text-emerald-600 font-bold text-xs">MIN</span>
        </div>
      ),
      description: 'Minify CSS, JavaScript, and HTML with BlinkSpeed for smaller file sizes. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 112,
      name: 'Gzip Compression',
      category: 'Others',
      logo: (
        <div className="w-12 h-12 bg-violet-50 rounded-lg flex items-center justify-center border border-violet-200">
          <span className="text-violet-600 font-bold text-xs">GZ</span>
        </div>
      ),
      description: 'Enable Gzip compression with BlinkSpeed for reduced bandwidth usage. Learn more',
      badge: { text: 'Auto compatible', color: 'bg-green-100 text-green-700' },
      buttonText: 'Learn more',
    },
    {
      id: 118,
      name: 'Browser Caching',
      category: 'Others',
      logo: (
        <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-200">
          <span className="text-amber-600 font-bold text-xs">BC</span>
        </div>
      ),
      description: 'Configure browser caching with BlinkSpeed for improved user experience. Learn more',
      badge: { text: 'Compatible', color: 'bg-blue-100 text-blue-700' },
      buttonText: 'View settings',
    },
  ];

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesCategory = integration.category === activeCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen px-6 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Integrations</h1>
        <p className="text-sm text-gray-600">
          Enhance your performance by using BlinkSpeed with your favorite third-party tools.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-6 border-b border-gray-200 flex-1">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeCategory === category.name
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{category.name}</span>
              <span
                className={`ml-2 px-2 py-0.5 rounded text-xs ${
                  activeCategory === category.name
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-shrink-0">{integration.logo}</div>
              <span
                className={`px-2.5 py-1 rounded text-xs font-medium ${integration.badge.color}`}
              >
                {integration.badge.text}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {integration.name}
            </h3>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {integration.description.split('Learn more')[0]}
              {integration.description.includes('Learn more') && (
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 underline ml-1"
                >
                  Learn more
                </a>
              )}
            </p>

            <button className="w-full mt-auto px-4 py-2.5 border border-purple-200 bg-white text-purple-600 rounded-md text-sm font-medium hover:bg-purple-50 transition-colors">
              {integration.buttonText}
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-6 right-6 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-purple-700 transition-colors z-50">
        <MessageCircle size={24} className="text-white" />
      </div>
    </div>
  );
};

export default Index;
