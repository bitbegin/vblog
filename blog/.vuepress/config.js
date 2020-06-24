const path = require("path");
module.exports = (options, context, api) => {
  return {
    title: 'bitbegin',
    description: 'bitbegin blog',
    theme: '@vuepress/theme-blog', // OR shortcut: @vuepress/blog
    themeConfig: {
      modifyBlogPluginOptions(blogPluginOptions) {
        return blogPluginOptions
      },
      nav: [
        {
          text: 'Blog',
          link: '/',
        },
        {
          text: 'Tags',
          link: '/tag/',
        },
      ],
      footer: {
        contact: [
          {
            type: 'github',
            link: 'https://github.com/bitbegin',
          },
        ],
        copyright: [
          {
            text: 'MIT',
            link: '',
          },
        ],
      },
      lengthPerPage: 8,
    },
    alias: {
      "@assets": path.resolve(__dirname, "../image")
    },
  }
}
