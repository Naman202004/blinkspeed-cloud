import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import W3OptimizeLogo from "../../assets/Logo/W3OptimizeLogo.webp";

const Index = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const email = 'jangirtansh@gmail.com'; // This would come from the login page in a real app

  // Gmail Logo SVG
  const GmailIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
      />
    </svg>
  );

  // Outlook Logo SVG
  const OutlookIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#0078D4"
        d="M7.5 21H2.352c-.828 0-1.5-.672-1.5-1.5V4.5c0-.828.672-1.5 1.5-1.5H7.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5zM22.5 9.75h-6c-.414 0-.75.336-.75.75v3c0 .414.336.75.75.75h6c.414 0 .75-.336.75-.75v-3c0-.414-.336-.75-.75-.75zM12 2.25L6 6v12l6 3.75L18 18V6l-6-3.75z"
      />
    </svg>
  );

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6 && /^\d$/.test(char)) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        {/* Back Link */}
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Logo */}
        <div className="flex justify-center">
          <div className="p-[8px_0_16px_8px]">
            <img src={W3OptimizeLogo} alt="Logo" className="max-w-[170px]" />
          </div>
        </div>

        {/* Title and Instructions */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Check your email for a code</h2>
          <p className="text-base text-gray-600">
            We've sent a 6-digit code to{' '}
            <span className="font-semibold text-purple-700">{email}</span>. Please check your email inbox.
          </p>
        </div>

        {/* OTP Input Fields */}
        <div className="flex items-center justify-center gap-2">
          {otp.map((digit, index) => (
            <React.Fragment key={index}>
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                  digit
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              {index === 2 && (
                <span className="text-gray-400 text-xl font-semibold mx-1">-</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Email Client Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => window.open('https://mail.google.com', '_blank')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <GmailIcon />
            <span className="text-sm font-medium text-[#EA4335]">Open Gmail</span>
          </button>
          <button
            onClick={() => window.open('https://outlook.live.com', '_blank')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <OutlookIcon />
            <span className="text-sm font-medium text-[#0078D4]">Open Outlook</span>
          </button>
        </div>

        {/* Resend Code Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Can't find your code?{' '}
            <button className="text-blue-600 hover:text-blue-700 underline font-medium">
              Get a new code.
            </button>
          </p>
        </div>

        {/* Contact Link */}
        <div className="text-center">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 underline">
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
