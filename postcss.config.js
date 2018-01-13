module.exports = {
  plugins: {
    'postcss-import': {
      addModulesDirectories: [ `${__dirname}/node_modules/` ],
      path: [ `${__dirname}/routes/` ],
    },
    'postcss-custom-properties': {},
    'autoprefixer': {},
  },
  sourceMap: true
}
