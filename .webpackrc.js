const path=require('path')

// 错误设置
// module.exports = (webpackConfig) => {
//   const config = Object.create(webpackConfig);
//   config.resolve = {
//     extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
//     alias: {
//       '@': `${__dirname}/src/`,
//       'static': `${__dirname}/src/static/`,
//       'utils': `${__dirname}/src/utils/`,
//       '$config': `${__dirname}/src/config/`,
//       'views': `${__dirname}/src/views/`,
//       'services': `${__dirname}/src/services/`,
//       'components': `${__dirname}/src/components/`,
//       '$common': `${__dirname}/src/common`,
//       'models': `${__dirname}/src/models/`,
//       'src': `${__dirname}/src`
//     }
//   };
//   console.dir(config,{depth:10})
//   return config;
// }
//
// console.log(1234)
const webpackConfig={
  alias: {
    '@': path.resolve(__dirname,'/src/'),
    static: `${__dirname}/src/static/`,
    utils: `${__dirname}/src/utils/`,
    config: `${__dirname}/src/config`,
    views: `${__dirname}/src/views/`,
    routes: `${__dirname}/src/routes/`,
    services: `${__dirname}/src/services/`,
    components: `${__dirname}/src/components/`,
    common: `${__dirname}/src/common`,
    models: `${__dirname}/src/models/`,
    src: `${__dirname}/src`
  }
}
export default webpackConfig
