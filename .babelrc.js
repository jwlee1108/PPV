module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: [ 'last 1 version', 'ie >= 11' ]
      }
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime']
  ]
}
