<script setup lang="ts">
import type { IBooks } from '@/types'
import { ArrowLeft, Search } from '@element-plus/icons-vue'
import { getBook } from '@/api/book'
import { getAllBookType } from '@/api/classify'

const route = useRoute()
const router = useRouter()

// 分类筛选
// const selectedCategory = ref('亲子/家教')
// 搜索关键词
const searchParams = reactive({
  selectedCategory: route.query.category as string || '全部',
  keyword: route.query.keyword as string || '',
})

// 搜索输入框的值
const searchInput = ref(searchParams.keyword)

// 书籍列表和加载状态
const loading = ref(false)

// 分类列表
const categories = reactive([
  {
    value: '全部',
    label: '全部',
  },
])

// 分页相关
const pageParams = ref({
  currentPage: 1,
  pageSize: 20,
  total: 0,
  records: [] as Omit<IBooks, 'id'>[],
})

// 获取分类列表
async function fetchCategories() {
  try {
    const res = await getAllBookType('')
    if (res.code === 200) {
      res.data.forEach(k => categories.push({ value: k.bookType, label: k.bookType }))
    }
  }
  catch (error) {
    ElMessage.error('获取分类列表失败')
  }
}

// 获取搜索结果
async function fetchSearchResults() {
  loading.value = true
  try {
    const res = await getBook({
      currentPage: pageParams.value.currentPage,
      pageSize: pageParams.value.pageSize,
      bookId: '',
      bookType: searchParams.selectedCategory === '全部' ? '' : searchParams.selectedCategory,
      keywords: searchInput.value,
      bookStatus: 1,
    })
    pageParams.value = res.data
  }
  catch (error) {
    ElMessage.error('搜索过程中出现错误')
  }
  finally {
    loading.value = false
  }
}

// 查看书籍详情
function viewBookDetails(bookId: string) {
  router.push(`/book/${bookId}`)
}

// 返回主页
function goBackToHome() {
  router.push('/home')
}

// 执行搜索
async function handleSearch() {
  if (!searchInput.value.trim() && !searchParams.selectedCategory) {
    ElMessage.warning('请输入搜索关键词或选择分类')
    return
  }
  await fetchSearchResults()

  // router.push({
  //   path: '/search',
  //   query: {
  //     keyword: searchInput.value || undefined,
  //     category: searchParams.selectedCategory || undefined,
  //   },
  // })
}

// 重置筛选条件
async function resetFilters() {
  searchInput.value = ''
  searchParams.selectedCategory = ''
  searchParams.keyword = ''
  await fetchSearchResults()
  // router.push('/search')
}

// 分类选择变化
function handleCategoryChange() {
  handleSearch()
}

// 监听路由变化
watch(() => route.query, (newQuery) => {
  searchInput.value = (newQuery.keyword as string) || ''
  searchParams.selectedCategory = (newQuery.category as string) || ''
  pageParams.value.currentPage = 1
  fetchSearchResults()
}, { immediate: true })

// 页面标题
definePage({
  name: 'search',
  meta: {
    title: '搜索结果',
    requiresAuth: false,
  },
})

// 获取分类列表
onMounted(async () => {
  await fetchCategories()
  await fetchSearchResults()
  if (pageParams.value.records.length === 0 && searchParams.keyword) {
    ElMessage.info(`未找到包含"${searchParams.keyword}"的书籍`)
  }
})
</script>

<template>
  <div class="search-page">
    <div class="search-header">
      <div class="container">
        <div class="header-top">
          <el-button type="primary" plain class="back-button" @click="goBackToHome">
            <el-icon><ArrowLeft /></el-icon>
            返回主页
          </el-button>
          <h1 class="page-title">
            搜索结果
          </h1>
        </div>

        <div class="search-section">
          <div class="search-form">
            <el-input
              v-model="searchInput"
              placeholder="输入书名、作者或类型进行搜索"
              class="search-input"
              size="large"
              @keyup.enter="handleSearch"
            >
              <template #append>
                <el-button :icon="Search" size="large" @click="handleSearch" />
              </template>
            </el-input>
          </div>

          <div class="filters">
            <div class="filter-item">
              <span class="filter-label">分类筛选：</span>
              <el-select
                v-model="searchParams.selectedCategory"
                placeholder="请选择分类"
                clearable
                class="category-select"
                @change="handleCategoryChange"
              >
                <el-option
                  v-for="category in categories"
                  :key="category.value"
                  :label="category.label"
                  :value="category.value"
                />
              </el-select>
            </div>

            <el-button class="reset-button" @click="resetFilters">
              重置筛选
            </el-button>
          </div>

          <div class="search-info">
            <span v-if="searchParams.keyword" class="keyword">关键词: "{{ searchParams.keyword }}"</span>
            <span v-if="searchParams.selectedCategory" class="category">分类: "{{ searchParams.selectedCategory }}"</span>
            <span class="count">共找到 {{ pageParams.total }} 本相关书籍</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="search-content">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading">
          <el-skeleton :rows="5" animated />
        </div>

        <!-- 搜索结果 -->
        <div v-else>
          <!-- 无结果 -->
          <div v-if="pageParams.total === 0 && (searchParams.keyword || searchParams.selectedCategory)" class="no-results">
            <el-empty description="未找到相关书籍">
              <p class="empty-text">
                尝试使用其他关键词或分类筛选
              </p>
              <el-button type="primary" @click="resetFilters">
                重置筛选条件
              </el-button>
            </el-empty>
          </div>

          <!-- 结果列表 -->
          <div v-else class="results">
            <div class="book-list">
              <el-row :gutter="20">
                <el-col
                  v-for="book in pageParams.records"
                  :key="book.bookId"
                  :xs="12"
                  :sm="8"
                  :md="6"
                  :lg="4"
                  class="book-item"
                >
                  <el-card
                    shadow="hover"
                    class="book-card"
                    @click="viewBookDetails(book.bookId)"
                  >
                    <div class="book-cover">
                      <img
                        :src="book.bookImage || 'https://via.placeholder.com/200x300?text=No+Cover'"
                        :alt="book.bookName"
                        class="cover-img"
                      >
                    </div>
                    <div class="book-info">
                      <div class="book-title" :title="book.bookName">
                        {{ book.bookName }}
                      </div>
                      <div class="book-author" :title="book.bookAuthor">
                        {{ book.bookAuthor }}
                      </div>
                      <div class="book-price">
                        <span class="current-price">¥{{ book.bookPrice }}</span>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>

            <!-- 分页 -->
            <div v-if="pageParams.total > pageParams.pageSize" class="pagination">
              <el-pagination
                v-model:current-page="pageParams.currentPage"
                v-model:page-size="pageParams.pageSize"
                :page-sizes="[20, 40, 60, 100]"
                :small="false"
                :background="true"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageParams.total"
                @size-change="fetchSearchResults"
                @current-change="fetchSearchResults"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-page {
  min-height: 600px;
}

.search-header {
  background-color: #f5f5f5;
  padding: 20px 0;
  margin-bottom: 30px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-top {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  margin-right: 20px;
}

.page-title {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.search-section {
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.search-form {
  margin-bottom: 15px;
}

.search-input {
  width: 100%;
  max-width: 600px;
}

.filters {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

.category-select {
  width: 200px;
}

.reset-button {
  margin-left: auto;
}

.search-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #666;
  flex-wrap: wrap;
  gap: 10px;
}

.keyword, .category {
  color: #e53935;
  font-weight: 500;
}

.count {
  font-weight: 500;
}

.book-list {
  margin-bottom: 30px;
}

.book-item {
  margin-bottom: 20px;
}

.book-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.book-cover {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 10px;
}

.cover-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.book-info {
  text-align: center;
}

.book-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-author {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-price {
  font-size: 16px;
  color: #e53935;
  font-weight: bold;
}

.current-price {
  font-size: 16px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.no-results {
  text-align: center;
  padding: 50px 0;
}

.empty-text {
  margin-bottom: 20px;
  color: #666;
}

.loading {
  padding: 30px 0;
}

@media (max-width: 768px) {
  .header-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .back-button {
    margin-bottom: 15px;
  }

  .filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .reset-button {
    margin-left: 0;
  }

  .search-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
