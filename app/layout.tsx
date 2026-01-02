import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = 'https://www.levbrands.com.br'; 

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    template: '%s | LEV BRANDS',
    default: 'LEV BRANDS | Desenvolvimento de Sites e Sistemas Web',
  },

  description:
    'Agência especializada em desenvolvimento de sites, sistemas web, landing pages de alta conversão e soluções digitais sob medida em Manaus (AM).',

  keywords: [
    'LEV BRANDS',
    'criação de sites manaus',
    'desenvolvimento web manaus',
    'agência de sites manaus',
    'sistemas web personalizados',
    'programador manaus',
    'landing page alta conversão',
    'criação de software',
    'next.js',
    'area do cliente manaus',
    'dashboard administrativo',
    'tecnologia manaus',
  ],

  openGraph: {
    title: 'LEV BRANDS | Soluções Digitais em Manaus',
    description:
      'Transformamos seu negócio com sites rápidos, sistemas exclusivos e design estratégico. Atendendo Manaus e região.',
    url: '/',
    siteName: 'LEV BRANDS',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'LEV BRANDS - Desenvolvimento Web e Tecnologia',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'LEV BRANDS | Desenvolvimento Web e Sistemas',
    description:
      'Criação de sites e sistemas web de alta performance em Manaus.',
    images: ['/og-image.png'],
  },

  icons: {
    icon: '/favicon.ico', 
    apple: '/apple-icon.png',
  },
};

// Estrutura de Dados Estruturados (Schema.org) para Negócio Local
const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService", // Mais adequado para agências/serviços técnicos
  "@id": `${BASE_URL}/#localbusiness`,
  "name": "LEV BRANDS",
  "url": BASE_URL,
  "logo": `${BASE_URL}/logo.png`,
  "image": `${BASE_URL}/og-image.png`,
  "description":
    "Empresa de tecnologia especializada em desenvolvimento de sites, sistemas web, dashboards e landing pages em Manaus.",
  "telephone": "+55 92 98422-8634", // ATENÇÃO: Atualize com seu número real
  "priceRange": "$$",

  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Endereço Comercial, S/N", // Pode deixar genérico se não tiver escritório físico público
    "addressLocality": "Manaus",
    "addressRegion": "AM",
    "postalCode": "69000-000", // CEP Geral de Manaus ou específico
    "addressCountry": "BR"
  },

  "areaServed": [
    {
      "@type": "City",
      "name": "Manaus",
    }
  ],
  
  // Redes Sociais (Preencha quando tiver)
  "sameAs": [
    "https://www.instagram.com/levbrands/",
    
  ],

  // Ofertas de Serviço Específicas para Manaus (Ótimo para SEO Local)
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "@id": `${BASE_URL}/servicos#sites`,
        "name": "Criação de Sites Institucionais em Manaus",
        "description": "Desenvolvimento de sites profissionais, rápidos e otimizados para empresas em Manaus - AM.",
        "areaServed": {
          "@type": "City",
          "name": "Manaus",
        },
        "provider": {
          "@type": "ProfessionalService",
          "name": "LEV BRANDS",
          "image": `${BASE_URL}/logo.png`
        }
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "@id": `${BASE_URL}/servicos#sistemas`,
        "name": "Desenvolvimento de Sistemas Web em Manaus",
        "description": "Criação de softwares, dashboards e sistemas administrativos personalizados em Manaus.",
        "areaServed": {
          "@type": "City",
          "name": "Manaus",
        },
        "provider": {
          "@type": "ProfessionalService",
          "name": "LEV BRANDS"
        }
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "@id": `${BASE_URL}/servicos#landing-pages`,
        "name": "Criação de Landing Pages em Manaus",
        "description": "Páginas de alta conversão para campanhas de marketing e vendas em Manaus.",
        "areaServed": {
          "@type": "City",
          "name": "Manaus",
        },
        "provider": {
          "@type": "ProfessionalService",
          "name": "LEV BRANDS"
        }
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Injeção do Schema JSON-LD para o Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      
      <body className={`${inter.variable} antialiased bg-black text-white font-sans`}>
        {children}
      </body>
    </html>
  );
}