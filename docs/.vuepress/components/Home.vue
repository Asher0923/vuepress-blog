<template>
  <div class="container">
    <div class="top">
      <div class="hexo">
        <h1 class="title">Asher's Blog</h1>
        <p class="desc">Web前端学习笔记，每天进步一点点，成长足迹看得见</p>
      </div>
      <mt-swipe :auto="4000" v-if="isMobile" style="height: 250px">
        <mt-swipe-item style="background: #548780">
          <img src="/web.png" height="150px" width="150px" />
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="/python.png" height="200px" width="200px" />
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="/other.png" height="200px" width="200px" />
        </mt-swipe-item>
      </mt-swipe>
      <div class="carousel" v-if="!isMobile">
        <el-carousel height="300px" type="card" :interval="4000">
          <el-carousel-item>
            <div class="medium" @click="$router.push('/web/')">
              <img src="/js.png" />
              <p>Web基础</p>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="medium">
              <img src="/vue.png" />
              <p>Vue</p>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="medium">
              <img src="/react.png" />
              <p>React</p>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="medium">
              <img src="/webpack.png" />
              <p>Webpack</p>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="medium">
              <img src="/node.png" />
              <p>Node</p>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="medium">
              <img src="/other.png" />
              <p>其他</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false
    };
  },
  beforeMount() {
    window.addEventListener("resize", this._isMobile);
  },
  mounted() {
    this._isMobile();
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
.container{
    position: absolute;
    left: 0;
    width: 100%;
    top: 0px
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

.carousel {
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
</style>