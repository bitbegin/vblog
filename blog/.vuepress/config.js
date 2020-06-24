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
    plugins: {
      '@vssue/vuepress-plugin-vssue': {
        // set `platform` rather than `api`
        platform: 'github',
  
        // all other options of Vssue are allowed
        owner: 'bitbegin',
        repo: 'vblog',
        clientId: 'c2966ccb603490eb18b5',
        clientSecret: '3eaa35e727fec188d8b8fe43af31b76aaee55962',
      },
    },
  }
}
