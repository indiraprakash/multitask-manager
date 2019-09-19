


const pluginsArray = [];
if(process.env.NODE_ENV !== 'test') {
  pluginsArray.push(
    [
      "transform-imports",
      {
        "vuetify": {
          "transform": "vuetify/es5/components/${member}",
          "preventFullImport": true
        }
      }
    ]
  );
}

module.exports = {
  "presets": [
    "@vue/app"
  ],
  "plugins": pluginsArray
}
