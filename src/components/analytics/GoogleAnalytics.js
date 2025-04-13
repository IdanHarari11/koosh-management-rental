'use client';

import Script from 'next/script';

export default function GoogleAnalytics({ measurementId }) {
  // אם אין מזהה מדידה, לא מטעין את הסקריפט
  if (!measurementId) return null;
  
  return (
    <>
      {/* סקריפט Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
} 