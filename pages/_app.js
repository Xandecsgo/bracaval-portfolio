import '@/styles/reset.css'
import '@/styles/globals.css'
import Header from '../components/header';
import Footer from '../components/footer';
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
  <>
  <Head>
  <link rel="shortcut icon" href="/static/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />  
      </Head>
      <Header />
  <Component {...pageProps} />
      <Footer />
  </>
  )
}