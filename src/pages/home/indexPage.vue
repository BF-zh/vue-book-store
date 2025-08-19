<script setup>
import { Search, ShoppingCart } from '@element-plus/icons-vue'
import CategorySidebar from '@/components/CategorySidebar.vue'

const searchQuery = ref('')
const cartCount = ref(0) // 假设购物车商品数量
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const type = reactive([{
  type: '',
}])

onMounted(async () => {
  // await
})
</script>

<template>
  <div class="bg-#ffffff flex h50px items-center">
    <el-col :span="14" :offset="4">
      <!-- <el-header class="header-main"> -->
      <el-row :gutter="20" align="middle">
        <el-col :span="4">
          <!-- <a href="/">
              <img src="https://via.placeholder.com/200x50.png?text=XHSD+Bookstore" alt="书店商城 Logo" class="h50px">
            </a> -->
        </el-col>

        <el-col :span="12">
          <el-input
            v-model="searchQuery"
            placeholder="输入搜索内容"
            class="w100%"
          >
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
        </el-col>

        <el-col :span="4" :offset="4">
          <el-button type="primary" plain class="w100%">
            <el-icon><ShoppingCart /></el-icon>
            <span>购物车 {{ cartCount }} 件</span>
          </el-button>
        </el-col>
      </el-row>
      <!-- </el-header> -->
    </el-col>
  </div>
  <el-col :span="14" :offset="4" class="mt10px">
    <el-row :gutter="15">
      <el-col :span="16">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 text="2xl" justify="center">
              {{ item }}
            </h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="8" class="bg-#ffffff">
        <div
          class="flex h50% w100%" style="align-items: center;justify-content: center;"
        >
          <el-avatar :size="50" :src="circleUrl" />
          <span>Hi,欢迎{{ name }}</span>
        </div>
        <hr>
        1111
      </el-col>
    </el-row>
    <h2 style="float: left;margin-top: 20px;">
      推荐图书
    </h2>
  </el-col>
</template>

<style scoped>
.header-main {
  background-color: #fff;
  border-bottom: 2px solid #e53935;
  height: auto;
  padding: 1rem 0;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
