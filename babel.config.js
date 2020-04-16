module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    // "@vue/app"
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
};
