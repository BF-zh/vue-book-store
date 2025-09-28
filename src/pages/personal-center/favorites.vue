<script setup lang="ts">
definePage({
  name: 'favorites',
  meta: {
    name: '我的收藏',
  },
})

// 收藏数据
const favorites = ref([
  {
    id: 1,
    title: '深入浅出Vue.js',
    author: '刘博文',
    price: 89.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-04-20',
  },
  {
    id: 2,
    title: 'React实战',
    author: '陈天',
    price: 95.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-04-15',
  },
  {
    id: 3,
    title: 'Node.js实战',
    author: 'Mike Cantelon',
    price: 109.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-04-10',
  },
  {
    id: 4,
    title: 'Vue.js设计与实现',
    author: '霍春阳',
    price: 99.00,
    cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    date: '2023-04-05',
  },
])

// 删除收藏
function deleteFavorite(id: number) {
  ElMessageBox.confirm('确定要取消收藏这本书吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    favorites.value = favorites.value.filter(item => item.id !== id)
    ElMessage.success('已取消收藏')
  }).catch(() => {
    ElMessage.info('已取消操作')
  })
}

// 加入购物车
function addToCart(id: number) {
  ElMessage.success('已添加到购物车')
}

// 查看详情
function viewDetail(id: number) {
  ElMessage.info(`查看书籍 ${id} 的详情`)
}
</script>

<template>
  <div class="favorites-page">
    <el-card class="content-card">
      <template #header>
        <div class="card-header">
          <span>我的收藏</span>
        </div>
      </template>

      <div class="favorites-list">
        <div
          v-for="item in favorites"
          :key="item.id"
          class="favorite-item"
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
          <div class="favorite-date">
            收藏时间：{{ item.date }}
          </div>
          <div class="favorite-actions">
            <el-button type="primary" size="small" @click="viewDetail(item.id)">
              查看详情
            </el-button>
            <el-button type="success" size="small" @click="addToCart(item.id)">
              加入购物车
            </el-button>
            <el-button type="danger" size="small" @click="deleteFavorite(item.id)">
              取消收藏
            </el-button>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <el-empty
        v-if="favorites.length === 0"
        description="暂无收藏"
      />
    </el-card>
  </div>
</template>

<style scoped>
.favorites-page {
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

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.favorite-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  transition: all 0.3s;
}

.favorite-item:hover {
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

.favorite-date {
  color: #909399;
  margin-right: 15px;
  width: 150px;
}

.favorite-actions {
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
  .favorite-item {
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

  .favorite-date {
    width: 100%;
    margin-right: 0;
    margin-bottom: 15px;
  }

  .favorite-actions {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
