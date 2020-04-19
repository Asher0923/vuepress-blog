module.exports = {
  title: "Asher's Blog",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  dest: "./dist",
  base:'vuepress-blog-asher/',
  themeConfig: {
    logo: "/logo.jpg",
    sidebarDepth: 2,
    lastUpdated: "Last Updated",
    nav: [
      { text: "首页", link: "/" },
      { text: "Web基础", link: "/web/" },
      { text: "Vue", link: "/vue/" },
      { text: "React", link: "/react/" },
      { text: "Webpack", link: "/webpack/" },
      { text: "Node", link: "/node/" },
      { text: "其他", link: "/more/" },
      { text: "GitHub", link: "https://baidu.com" }
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
