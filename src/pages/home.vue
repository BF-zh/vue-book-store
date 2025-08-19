<!-- src/pages/Home.vue -->
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import Header from '@/components/Header.vue'

definePage({
  name: 'home',
})
const router = useRouter()
const input = ref('')

const books = ref([
  { id: 1, title: 'Vue.js 实战', author: 'John Doe', price: 99.99, cover: '/path/to/book-cover1.jpg' },
  { id: 2, title: 'Node.js 深入浅出', author: 'Jane Doe', price: 79.99, cover: '/path/to/book-cover2.jpg' },
  // 更多书籍数据
])

function viewBookDetails(id: number) {
  router.push(`/book/${id}`)
}

onMounted(() => {
  router.push({ path: '/home/indexPage' })
})
</script>

<template>
  <div class="h100vh" style="background-color: rgb(240, 243, 239);">
    <Header />
    <!-- <el-main> -->
    <div class="content">
      <router-view />
      <!-- <el-row :gutter="20">
          <el-col :span="14" :offset="4">
          </el-col>
          <el-col :span="12" :offset="6">
              <el-input v-model="input" placeholder="请输入搜索的书" />
              <el-button :icon="Search" />
            </el-col>
            <el-col v-for="book in books" :key="book.id" :span="14" :offset="4">
              <el-card class="book-card">
                <img class="book-cover" :src="book.cover" alt="book-cover">
                <div class="book-info">
                  <h3>{{ book.title }}</h3>
                  <p>{{ book.author }}</p>
                  <p>{{ book.price | currency }}</p>
                  <el-button type="primary" @click="viewBookDetails(book.id)">
                    查看详情
                  </el-button>
                </div>
              </el-card>
            </el-col>
        </el-row> -->
    </div>
    <!-- </el-main> -->
  </div>
</template>

<style scoped>
.content {
  /* padding: 20px; */
  text-align: center;
  background-color: rgb(240, 243, 239);
}

.book-card {
  cursor: pointer;
}

.book-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.book-info {
  margin-top: 10px;
  text-align: center;
}
</style>
