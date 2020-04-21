const moment = require("moment");
moment.locale("zh-cn");

module.exports = {
  title: "Asher's Blog",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  plugins: {
    "@vuepress/last-updated": {
      transformer: timestamp => moment(timestamp).format("LL")
    }
  },
  themeConfig: {
    logo: "/logo.jpg",
    sidebarDepth: 2,
    lastUpdated: "更新时间",
    smoothScroll: true,
    nav: [
      { text: "首页", link: "/" },
      { text: "Web基础", link: "/web/" },
      { text: "Vue", link: "/vue/" },
      { text: "React", link: "/react/" },
      { text: "Webpack", link: "/webpack/" },
      { text: "Node", link: "/node/" },
      {
        text: "其他",
        items: [
          { text: "数据结构", link: "/more/数据结构/" },
          { text: "算法", link: "/more/算法/" }
        ]
      },
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
      ],
      "/more/": [
        ["/more/数据结构/", "数据结构"],
        ["/more/算法/", "算法"]
      ]
    }
  },
  markdown: {
    //markdown
    lineNumbers: true //显示行号
  }
};
