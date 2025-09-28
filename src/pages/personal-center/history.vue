<script setup lang="ts">
definePage({
  name: 'history',
  meta: {
    name: '浏览记录',
  },
})

// 浏览记录数据
const browsingHistory = ref([
  {
    id: 1,
    title: 'Vue.js设计与实现',
    author: '霍春阳',
    price: 99.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-05-15',
  },
  {
    id: 2,
    title: 'JavaScript高级程序设计',
    author: 'Nicholas C. Zakas',
    price: 129.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-05-10',
  },
  {
    id: 3,
    title: '你不知道的JavaScript',
    author: 'Kyle Simpson',
    price: 79.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-05-01',
  },
  {
    id: 4,
    title: '深入浅出Vue.js',
    author: '刘博文',
    price: 89.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-04-28',
  },
  {
    id: 5,
    title: 'React实战',
    author: '陈天',
    price: 95.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-04-25',
  },
])

// 删除浏览记录
function deleteHistory(id: number) {
  ElMessageBox.confirm('确定要删除这条浏览记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    browsingHistory.value = browsingHistory.value.filter(item => item.id !== id)
    ElMessage.success('删除成功')
  }).catch(() => {
    ElMessage.info('已取消操作')
  })
}

// 清空浏览记录
function clearHistory() {
  ElMessageBox.confirm('确定要清空所有浏览记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    browsingHistory.value = []
    ElMessage.success('浏览记录已清空')
  }).catch(() => {
    ElMessage.info('已取消操作')
  })
}

// 再次查看
function viewAgain(id: number) {
  ElMessage.success('跳转到书籍详情页')
}

// 加入购物车
function addToCart(id: number) {
  ElMessage.success('已添加到购物车')
}
</script>

<template>
  <div class="history-page">
    <el-card class="content-card">
      <template #header>
        <div class="card-header">
          <span>浏览记录</span>
          <el-button type="danger" :disabled="browsingHistory.length === 0" @click="clearHistory">
            清空记录
          </el-button>
        </div>
      </template>

      <div class="history-list">
        <div
          v-for="item in browsingHistory"
          :key="item.id"
          class="history-item"
        >
          <div class="book-cover">
            <el-image
              :src="item.cover"
              fit="cover"
              :preview-src-list="[item.cover]"
              class="cover-image"
            />
          </div>
          <div class="book-info">
            <div class="book-title">
              {{ item.title }}
            </div>
            <div class="book-author">
              {{ item.author }}
            </div>
            <div class="book-price">
              ¥{{ item.price }}
            </div>
          </div>
          <div class="history-date">
            浏览时间：{{ item.date }}
          </div>
          <div class="history-actions">
            <el-button type="primary" size="small" @click="viewAgain(item.id)">
              再次查看
            </el-button>
            <el-button type="success" size="small" @click="addToCart(item.id)">
              加入购物车
            </el-button>
            <el-button type="danger" size="small" @click="deleteHistory(item.id)">
              删除
            </el-button>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <el-empty
        v-if="browsingHistory.length === 0"
        description="暂无浏览记录"
      />
    </el-card>
  </div>
</template>

<style scoped>
.history-page {
  padding: 20px 0;
}

.content-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.history-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  transition: all 0.3s;
}

.history-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.book-cover {
  width: 80px;
  height: 100px;
  margin-right: 15px;
}

.cover-image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.book-info {
  flex: 1;
  margin-right: 15px;
}

.book-title {
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 16px;
}

.book-author {
  color: #909399;
  font-size: 14px;
  margin-bottom: 5px;
}

.book-price {
  color: #fa541c;
  font-weight: 600;
  font-size: 16px;
}

.history-date {
  color: #909399;
  margin-right: 15px;
  width: 150px;
}

.history-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 120px;
}

:deep(.el-card__header) {
  background-color: #f5f7fa;
  font-weight: bold;
  padding: 15px 20px;
}

@media (max-width: 768px) {
  .history-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .book-cover {
    width: 100%;
    height: 200px;
    margin-right: 0;
    margin-bottom: 15px;
  }

  .book-info {
    margin-right: 0;
    width: 100%;
    margin-bottom: 15px;
  }

  .history-date {
    width: 100%;
    margin-right: 0;
    margin-bottom: 15px;
  }

  .history-actions {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
