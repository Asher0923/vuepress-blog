const moment = require("moment");
moment.locale("zh-cn");

module.exports = {
  title: "Asher's Blog",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  dest: "./dist",
  plugins: {
    "@vuepress/last-updated": {
      transformer: timestamp => moment(timestamp).format("L")
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
        ["/web/", "概览"],
        ["/web/html", "HTML"],
        ["/web/css", "CSS"],
        {
          title: "JavaScript",
          collapsable: false,
          children: [
            ["/web/javaScript/类型转换", "类型转换"],
            ["/web/javaScript/闭包", "闭包"],
            ["/web/javaScript/原型链", "原型链"],
            ["/web/javaScript/拷贝", "拷贝"],
            ["/web/javaScript/继承", "继承"],
            ["/web/javaScript/this", "this"],
            ["/web/javaScript/防抖节流", "防抖节流"],
            ["/web/javaScript/模块化", "模块化"],
            ["/web/javaScript/设计模式", "设计模式"],
            ["/web/javaScript/EventLoop", "Event Loop"],
            ["/web/javaScript/DOM", "DOM"]
          ]
        },
        ["/web/ES6", "ES6"],
        ["/web/http", "HTTP"],
        ["/web/路由", "路由"]
      ],
      "/more/": [
        {
          title: "数据结构",
          collapsable: false,
          children: [
            ["/more/数据结构/", "概览"],
            ["/more/数据结构/栈和队列", "栈和队列"],
            ["/more/数据结构/二叉树", "二叉树"],
            ["/more/数据结构/链表", "链表"]
          ]
        },
        {
          title: "算法",
          collapsable: false,
          children: [
            ["/more/算法/", "概览"],
            ["/more/算法/排序", "排序"],
            ["/more/算法/搜索", "搜索"]
          ]
        }
      ],
      "/webpack/": [["/webpack/", "Webpack"]],
      "/node/": [["/node/", "Node"]],
      "/react/": [
        ["/react/", "React入门"],
        ["/react/redux", "Redux"],
        ["/react/hooks", "Hooks"]
      ],
      "/vue/": [
        ["/vue/", "Vue入门"],
        ["/vue/vueRouter", "Vue Router"],
        ["/vue/vuex", "Vuex"]
      ]
    }
  },
  markdown: {
    lineNumbers: true //显示行号
  }
};
