import './globals.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/themes/primeone-light.css'  
import { Poppins } from 'next/font/google'
import { Metadata } from 'next';

const popinsFont = Poppins({ weight:['400', '600', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Adopciones Gora ',
  description: 'Adopciones'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className='h-full' id="id" lang="es">
      <head>
        <script async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6282415433232444"
          crossOrigin="anonymous">
        </script>
      </head>
      <body className={popinsFont.className}>{children}</body>
    </html>
  )
}
