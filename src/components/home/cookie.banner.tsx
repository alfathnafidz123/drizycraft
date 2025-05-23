'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const VIPBanner = dynamic(() => import('@/components/home/vip.banner'));

export default function CookieConsentModal() {
  const [showConsent, setShowConsent] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [cookieBannerClosed, setCookieBannerClosed] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');

    if (consent === 'true') {
      setConsentGiven(true);
      setCookieBannerClosed(true);
    } else if (!consent) {
      setShowConsent(true);
    } else if (consent === 'false') {
      setCookieBannerClosed(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365, path: '/' });
    setConsentGiven(true);
    setShowConsent(false);
    setCookieBannerClosed(true);
  };

  const declineCookies = () => {
    Cookies.set('cookieConsent', 'false', { expires: 365, path: '/' });
    setConsentGiven(false);
    setShowConsent(false);
    setCookieBannerClosed(true);
  };

  const closeBanner = () => {
    setShowConsent(false);
    setCookieBannerClosed(true);
  };

  return (
    <>
      {consentGiven && <GoogleAnalytics gaId="G-5YWS2KPHSX" />}

      {showConsent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-4 bottom-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 z-50 max-w-lg md:w-full bg-white/70 backdrop-blur-md rounded-xl shadow-xl p-6 font-inter-regular"
        >
          <div className="relative">
            <button
              onClick={closeBanner}
              aria-label="Close"
              className="absolute -top-6 -right-3 text-gray-500 hover:text-gray-700 text-3xl md:text-3xl"
            >
              &times;
            </button>

            <h2
              id="cookie-consent-title"
              className="text-base font-extrabold text-gray-900"
            >
              Hi! We use cookies to improve your experience.
            </h2>

            <p className="text-sm font-bold text-gray-800 mt-2">
              By continuing, you accept our cookie policy.
            </p>

            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-blue-600 hover:underline inline-flex items-center mt-1"
            >
              Learn more <span className="ml-1">›</span>
            </a>

            <div className="flex flex-col sm:flex-row justify-end sm:gap-3 gap-2 mt-6">
              <button
                onClick={acceptCookies}
                aria-label="Accept all cookies"
                className="px-4 py-2 rounded-full text-sm font-bold text-white bg-[#008ECC] hover:bg-[#007bbf] transition w-full sm:w-auto"
              >
                Accept All
              </button>

              <button
                onClick={declineCookies}
                aria-label="Decline cookies"
                className="px-5 py-2 rounded-full text-sm font-bold text-gray-900 border border-[#008ECC] bg-white/30 hover:bg-white/50 transition w-full sm:w-auto"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {cookieBannerClosed && <VIPBanner />}
    </>
  );
}
