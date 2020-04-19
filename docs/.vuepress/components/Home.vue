<template>
  <div class="container">
    <div class="top">
      <div class="hexo">
        <h1 class="title">Asher's Blog</h1>
        <p class="desc">Web前端学习笔记，每天进步一点点，成长足迹看得见</p>
      </div>
      <mt-swipe :auto="400000" v-if="isMobile" style="height: 250px">
        <mt-swipe-item
          style="background: #084355; text-align: center"
          v-for="item in imgList"
          :key="item.path"
        >
          <img
            :src="$withBase(item.imgUrl)"
            height="150px"
            width="150px"
            @click="$router.push(item.path)"
          />
          <p style="color: #f2f5e5">{{item.label}}</p>
        </mt-swipe-item>
      </mt-swipe>
      <div class="carousel" v-if="!isMobile">
        <el-carousel height="300px" type="card" :interval="4000">
          <el-carousel-item v-for="item in imgList" :key="item.path">
            <div class="medium" @click="$router.push(item.path)">
              <img :src="$withBase(item.imgUrl)" />
              <p>{{item.label}}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="recent-update">
      <p style="font-size: 26px; font-weight: bolder;margin-bottom: -10px">最近更新</p>
      <el-divider></el-divider>
      <div v-for="(item,index) in tableData" :key="item.key">
        <el-row>
          <el-col :xs="4" :sm="4">
            <div style="text-align: center">{{++index}}</div>
          </el-col>
          <el-col :xs="12" :sm="16">
            <div
              @click="$router.push(item.path)"
              style="color: #087B84; cursor: pointer"
            >{{item.title}}</div>
          </el-col>
          <el-col :xs="8" :sm="4">
            <div>{{item.lastUpdated}}</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
    </div>
    <div class="footer">MIT Licensed | Copyright © 2020 Asher</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
      tableData: [],
      imgList: [
        { path: "/web/", imgUrl: "/js.png", label: "Web基础" },
        { path: "/vue/", imgUrl: "/vue.png", label: "Vue" },
        { path: "/react/", imgUrl: "/react.png", label: "React" },
        { path: "/webpack/", imgUrl: "/webpack.png", label: "Webpack" },
        { path: "/node/", imgUrl: "/node.png", label: "Node" },
        { path: "/other/", imgUrl: "/other.png", label: "其他" }
      ]
    };
  },
  beforeMount() {
    window.addEventListener("resize", this._isMobile);
  },
  mounted() {
    this._isMobile();
    this.tableData = this.$site.pages.filter(item => {
      return item.title;
    });
  },
  methods: {
    _isMobile() {
      this.isMobile = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
    }
  }
};
</script>

<style>
.container {
  position: absolute;
  left: 0;
  width: 100%;
  top: 0px;
}
.top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500px;
  background-color: #084355;
}

.hexo {
  height: 200px;
  color: #f2f5e5;
  text-align: center;
}

.title {
  font-size: 30px;
}

.desc {
  font-size: 20px;
}

.medium {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.medium img {
  height: 200px;
  width: 200px;
}

.medium p {
  color: rgb(214, 218, 206);
  font-size: 30px;
  margin-top: 15px;
}

.el-carousel__mask {
  background: #114859;
}

.el-carousel__mask :hover {
  background: #c4c9ce;
}

.el-carousel__item:nth-child(2n) {
  background-color: #17667e;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #114859;
}

.recent-update {
  max-width: 990px;
  margin: 20px auto;
}

.footer {
  text-align: center;
  margin-bottom: 20px;
}
</style>