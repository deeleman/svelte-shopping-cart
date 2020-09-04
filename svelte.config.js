const sass = require('node-sass');
const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: sveltePreprocess({
    postcss: true,
    scss: {
      includePaths: ['src/sass'],
      postcss: {
        plugins: [require('autoprefixer')],
      },
    },
    alias: {
      entries: {
        'shopping-cart': 'src/app'
      }
    },
    style: async ({ content, attributes }) => {
      if (attributes.type !== 'text/scss') {
        return;
      }

      const result = await sass.renderSync({
        data: content,
        sourceMap: 'style.css.map',
        omitSourceMapUrl: true,
      });

      return {
        code: result.css.toString('utf8'),
        map: result.map.toString('utf8'),
      };
    },
  }),
};