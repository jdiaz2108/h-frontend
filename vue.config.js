const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

// module.exports = {
//   configureWebpack: {
//     plugins: [
//       new PrerenderSPAPlugin(
//         // (REQUIRED) Absolute path to static root
//         path.join(__dirname, 'dist'),
//         // (REQUIRED) List of routes to prerender
//         [
//           '/', 
//           '/mapa',
//           '/login',
//           '/register'
//         ],
//         // (OPTIONAL) Compatible options from v2.
//       )
//     ]
//   }
// }