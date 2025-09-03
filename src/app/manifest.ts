import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NetGauge',
    short_name: 'NetGauge',
    description: 'An internet speed test app to measure your network performance.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [],
  }
}
