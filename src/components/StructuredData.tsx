export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "株式会社富楽ファイン",
    "alternateName": ["フラクファイン", "ふらくふぁいん", "Furaku Fine"],
    "url": "https://furakufine.co.jp",
    "logo": "https://furakufine.co.jp/logo.png",
    "description": "千葉県を拠点に映像制作・動画制作を行う会社。採用動画、PR動画、集客動画など企業の想いを映像で届けます。",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "千葉県",
      "addressCountry": "JP"
    },
    "sameAs": [],
    "knowsAbout": [
      "映像制作",
      "動画制作",
      "採用動画",
      "PR動画",
      "集客動画",
      "広報支援",
      "SNS運用代行"
    ],
    "areaServed": [
      {
        "@type": "State",
        "name": "千葉県"
      },
      {
        "@type": "State",
        "name": "東京都"
      }
    ]
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "株式会社富楽ファイン",
    "image": "https://furakufine.co.jp/og-image.jpg",
    "url": "https://furakufine.co.jp",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "千葉県",
      "addressCountry": "JP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.6073,
      "longitude": 140.1063
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "serviceType": [
      "映像制作",
      "動画制作",
      "採用動画制作",
      "PR動画制作",
      "イベント撮影",
      "SNS運用代行"
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ホーム",
        "item": "https://furakufine.co.jp"
      }
    ]
  }

  const videoProductionServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "映像制作サービス",
    "provider": {
      "@type": "Organization",
      "name": "株式会社富楽ファイン"
    },
    "areaServed": {
      "@type": "State",
      "name": "千葉県"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "映像制作サービス",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "採用動画制作",
            "description": "企業の魅力を伝える採用ブランディング動画の制作"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "PR動画制作",
            "description": "商品・サービスの魅力を伝えるPR動画の制作"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "集客動画制作",
            "description": "集客力を高める動画コンテンツの制作"
          }
        }
      ]
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoProductionServiceSchema) }}
      />
    </>
  )
}