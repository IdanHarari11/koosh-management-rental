'use client';

import Script from 'next/script';

export default function GoogleTagManager({ gtmId }) {
  if (!gtmId) return null;
  
  return (
    <>
      {/* קוד GTM לחלק ה-head */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  );
}

// נפרד מהקומפוננטה העיקרית כדי לאפשר הוספה בנפרד לחלק ה-body
export function GoogleTagManagerNoScript({ gtmId }) {
  if (!gtmId) return null;
  
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
} 