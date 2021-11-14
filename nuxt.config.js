import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#E24F55'
  },
  css: ['assets/css/main.css'],
  markdown: {
    remarkPlugins: ['remark-squeeze-paragraphs', 'remark-slug', 'remark-autolink-headings', 'remark-external-links', 'remark-footnotes', 'remark-attr'],
    prism: {
    }
  },
  i18n: {
    locales: () => [{
      code: 'en',
      iso: 'en-US',
      file: 'en-US.js',
      name: 'English'
    }, {
      code: 'pl',
      iso: 'pl-PL',
      file: 'pl-PL.js',
      name: 'Polski'
    }],
    defaultLocale: 'en'
  },
})
