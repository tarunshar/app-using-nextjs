/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  transpilePackages: ['@mui/x-charts'],
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  },
  async rewrites() {
    return [
      {
        source: '/login_api/',
        destination: 'https://learnkoodsapi.onrender.com/login_api/'
      },
      {
        source: '/api/token/',
        destination: 'https://learnkoodsapi.onrender.com/api/token/'
      },
      {
        source: '/user_api/',
        destination: 'https://learnkoodsapi.onrender.com/user_api/'
      },
      {
        source: '/jobs_api/',
        destination: 'https://learnkoodsapi.onrender.com/jobs_api/'
      },
      {
        source: '/auth/token/',
        destination: 'http://gateway-test.apps.ocp4.pacosta.com/auth/token/'
      },
      {
        source: '/auth/refresh-token/',
        destination: 'http://gateway-test.apps.ocp4.pacosta.com/auth/refresh-token/'
      },
      {
        source: '/user_service/api/getUserRoles/',
        destination: 'http://gateway-test.apps.ocp4.pacosta.com/user_service/api/getUserRoles/'
      },
      {
        source: '/user_service/api/version/',
        destination: 'http://gateway-test.apps.ocp4.pacosta.com/user_service/api/version/'
      },
      {
        source: '/vendor/uploadInvoice/customExceptin/',
        destination: 'http://gateway-test.apps.ocp4.pacosta.com/vendor/uploadInvoice/customExceptin/'
      },
      {
        source: '/searchSus/',
        destination: 'http://11.0.0.108:9090/searchSus/'
      },
      {
        source: '/signal/',
        destination: 'http://11.0.0.108:9090/signal/'
      },
      {
        source: '/registerPOI/',
        destination: 'http://11.0.0.108:9090/registerPOI/'
      },
      {
        source: '/addRelation/',
        destination: 'http://11.0.0.108:9090/addRelation/'
      },
      {
        source: '/associates/incident/',
        destination: 'http://11.0.0.108:9090/associates/incident/'
      },
      {
        source: '/addPointData/',
        destination: 'http://11.0.0.108:9090/addPointData/'
      },
      {
        source: '/claros/facerec/imgprocess/',
        destination: 'http://11.0.0.108:8080/claros/facerec/imgprocess/'
      },
      {
        source: '/autoSuggestName/',
        destination: 'http://11.0.0.108:9090/autoSuggestName/'
      },
      {
        source: '/googlenews/rss',
        destination: 'https://news.google.com/rss/search?q=terrorist+india&hl=en-IN&gl=IN&ceid=IN:en'
      }
    ]
  }
}
