<script setup lang="ts">
import type { IBooks } from '@/types'
import { ArrowLeft } from '@element-plus/icons-vue'
// import { useRouter } from 'vue-router'
import { getBook } from '@/api/book'

const route = useRoute('/book/[bookId]')
const router = useRouter()
const bookId = route.params.bookId as string

const bookStore = useBookStore()
// 图书详情数据
const bookDetail = ref<Omit<IBooks, 'id'> | null>(null)
const loading = ref(true)

// 获取图书详情
async function fetchBookDetail() {
  try {
    loading.value = true
    bookStore.searchBookParams.bookId = bookId
    bookStore.searchBookParams.pageSize = 1
    bookStore.searchBookParams.currentPage = 1
    const res = await getBook(bookStore.searchBookParams)
    if (res.code === 200) {
      bookDetail.value = res.data.records[0]
    }
    else {
      ElMessage.error(res.message || '获取图书详情失败')
      bookDetail.value = null
    }
  }
  catch (error) {
    console.error('获取图书详情失败:', error)
  }
  finally {
    loading.value = false
  }
}

// 加入购物车
function addToCart() {
  if (bookDetail.value) {
    ElMessage.success(`已将《${bookDetail.value.bookName}》加入购物车`)
  }
}

// 立即购买
function buyNow() {
  if (bookDetail.value) {
    ElMessage.success(`正在购买《${bookDetail.value.bookName}》`)
  }
}

// 返回主页
function goHome() {
  router.go(-1)
}

onMounted(() => {
  fetchBookDetail()
})

onUnmounted(() => {
  bookStore.searchBookParams.bookId = ''
})
</script>

<template>
  <div class="product-details">
    <!-- 返回主页标签 -->
    <div class="back-to-home">
      <el-button type="primary" link @click="goHome">
        <el-icon><ArrowLeft /></el-icon>
        返回主页
      </el-button>
    </div>

    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-skeleton-item variant="image" style="width: 100%; height: 500px" />
          </el-col>
          <el-col :span="14">
            <el-skeleton-item variant="h1" style="width: 80%; height: 30px;" />
            <br><br>
            <el-skeleton-item variant="text" style="width: 60%; height: 20px;" />
            <br><br>
            <el-skeleton-item variant="text" style="width: 40%; height: 20px;" />
            <br><br>
            <el-skeleton-item variant="text" style="width: 30%; height: 20px;" />
            <br><br>
            <el-skeleton-item variant="text" style="width: 50%; height: 20px;" />
            <br><br>
            <el-skeleton-item variant="text" style="width: 70%; height: 40px;" />
          </el-col>
        </el-row>
      </template>

      <template #default>
        <div v-if="bookDetail">
          <el-row :gutter="30">
            <!-- 图书封面 -->
            <el-col :span="10">
              <div class="book-cover">
                <el-image
                  :src="bookDetail.bookImage || 'https://picsum.photos/id/24/300/400'"
                  class="cover-image"
                  fit="cover"
                  :preview-src-list="[bookDetail.bookImage || 'https://picsum.photos/id/24/300/400']"
                />
              </div>
            </el-col>

            <!-- 图书信息 -->
            <el-col :span="14">
              <div class="book-info">
                <h1 class="book-title">
                  {{ bookDetail.bookName }}
                </h1>

                <div class="book-meta">
                  <p class="book-author">
                    作者：<span>{{ bookDetail.bookAuthor }}</span>
                  </p>
                  <p class="book-press">
                    出版社：<span>{{ bookDetail.bookPress }}</span>
                  </p>
                  <p class="book-type">
                    分类：<span>{{ bookDetail.bookType }}</span>
                  </p>
                </div>

                <div class="book-price-section">
                  <div class="price-row">
                    <span class="price-label">价格：</span>
                    <span class="current-price">¥{{ bookDetail.bookPrice }}</span>
                    <!-- <span class="original-price">¥{{ (bookDetail.bookPrice * 1.2).toFixed(2) }}</span> -->
                  </div>

                  <div class="sales-info">
                    <span>库存：{{ bookDetail.bookNum }} 本</span>
                    <span class="status" :class="{ 'in-stock': bookDetail.bookStatus === 1 || bookDetail.bookStatus === '上架' }">
                      {{ bookDetail.bookStatus === 1 || bookDetail.bookStatus === '上架' ? '有货' : '无货' }}
                    </span>
                  </div>
                </div>

                <div class="book-actions">
                  <el-button
                    type="primary"
                    size="large"
                    class="buy-button"
                    :disabled="bookDetail.bookStatus !== 1 && bookDetail.bookStatus !== '上架'"
                    @click="buyNow"
                  >
                    立即购买
                  </el-button>
                  <el-button
                    type="success"
                    size="large"
                    class="cart-button"
                    :disabled="bookDetail.bookStatus !== 1 && bookDetail.bookStatus !== '上架'"
                    @click="addToCart"
                  >
                    加入购物车
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 图书详情 -->
          <el-row class="book-description-row">
            <el-col :span="24">
              <el-card class="book-description">
                <template #header>
                  <div class="card-header">
                    <span>商品详情</span>
                  </div>
                </template>
                <div class="description-content">
                  <el-descriptions :column="1" border>
                    <el-descriptions-item label="书名">
                      {{ bookDetail.bookName }}
                    </el-descriptions-item>
                    <el-descriptions-item label="作者">
                      {{ bookDetail.bookAuthor }}
                    </el-descriptions-item>
                    <el-descriptions-item label="出版社">
                      {{ bookDetail.bookPress }}
                    </el-descriptions-item>
                    <el-descriptions-item label="分类">
                      {{ bookDetail.bookType }}
                    </el-descriptions-item>
                    <el-descriptions-item label="价格">
                      ¥{{ bookDetail.bookPrice }}
                    </el-descriptions-item>
                    <el-descriptions-item label="库存">
                      {{ bookDetail.bookNum }} 本
                    </el-descriptions-item>
                    <el-descriptions-item label="上架状态">
                      <el-tag :type="bookDetail.bookStatus === 1 || bookDetail.bookStatus === '上架' ? 'success' : 'danger'">
                        {{ bookDetail.bookStatus === 1 || bookDetail.bookStatus === '上架' ? '在售' : '已下架' }}
                      </el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="创建时间">
                      {{ bookDetail.createTime }}
                    </el-descriptions-item>
                    <el-descriptions-item v-if="bookDetail.updateTime" label="更新时间">
                      {{ bookDetail.updateTime }}
                    </el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <div v-else class="no-data">
          <el-empty description="未找到该图书信息" />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped lang="scss">
.back-to-home {
  margin-bottom: 20px;
}

.product-details {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.book-cover {
  .cover-image {
    width: 100%;
    max-width: 350px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.book-info {
  .book-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }

  .book-meta {
    margin-bottom: 25px;

    p {
      margin: 8px 0;
      font-size: 16px;
      color: #666;

      span {
        color: #333;
        font-weight: 500;
      }
    }
  }

  .book-price-section {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;

    .price-row {
      margin-bottom: 15px;

      .price-label {
        font-size: 16px;
        color: #666;
      }

      .current-price {
        font-size: 28px;
        font-weight: bold;
        color: #e53935;
      }

      .original-price {
        font-size: 16px;
        color: #999;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }

    .sales-info {
      display: flex;
      align-items: center;
      gap: 20px;

      .status {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 14px;
        color: #fff;
        background-color: #f56c6c;

        &.in-stock {
          background-color: #67c23a;
        }
      }
    }
  }

  .book-actions {
    display: flex;
    gap: 20px;

    .buy-button, .cart-button {
      flex: 1;
      height: 50px;
      font-size: 16px;
    }
  }
}

.book-description-row {
  margin-top: 30px;

  .book-description {
    .card-header {
      font-size: 20px;
      font-weight: bold;
    }

    .description-content {
      padding: 20px 0;
    }
  }
}

.no-data {
  text-align: center;
  padding: 50px 0;
}
</style>
