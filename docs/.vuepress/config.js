const moment = require("moment");
moment.locale("zh-cn");

module.exports = {
  title: "Asher's Blog",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  // base: "/vuepress-blog/",
  plugins: {
    "@vuepress/last-updated": {
      transformer: timestamp => moment(timestamp).format("LL")
    },
    // "@vuepress/back-to-top": true
  },
  themeConfig: {
    logo: "/logo.jpg",
    sidebarDepth: 2,
    lastUpdated: "更新时间",
    nav: [
      { text: "首页", link: "/" },
      { text: "Web基础", link: "/web/" },
      { text: "Vue", link: "/vue/" },
      { text: "React", link: "/react/" },
      { text: "Webpack", link: "/webpack/" },
      { text: "Node", link: "/node/" },
      { text: "其他", link: "/more/" },
      { text: "GitHub", link: "https://github.com/Asher0923/vuepress-blog" }
    ],
    sidebar: {
      "/web/": [
        ["/web/", "HTML"],
        ["/web/css", "CSS"],
        {
          title: "JavaScript",
          collapsable: false,
          children: [
            ["/web/javaScript/类型转换", "类型转换"],
            ["/web/javaScript/闭包", "闭包"]
          ]
        }
      ]
    }
  },
  markdown: {
    //markdown
    lineNumbers: true //显示行号
  }
};
