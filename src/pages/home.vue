<script setup lang="ts">
import type { IBooks, UserInfo } from '@/types'
import { ArrowRight, ArrowUp, ShoppingCart } from '@element-plus/icons-vue'
import { BookApi, classifyApi, UserApi } from '@/api'
// 路由实例
const router = useRouter()
const bookStore = useBookStore()
// 状态管理
const searchInput = ref('')
const showMobileMenu = ref(false)
const activeCategory = ref('全部')
const isLoggedIn = ref(false) // 模拟用户登录状态
const cartItemCount = ref(0) // 模拟购物车商品数量

// 分类导航滚动相关
const categoryNavRef = ref<HTMLElement | null>(null)
const showLeftArrow = ref(false)
const showRightArrow = ref(true)

const userInfo = ref<UserInfo>()

// 分类列表
const categoryList = ref([
  { label: '全部书籍', value: '全部' },
])

// Banner数据
const bannerList = ref([
  {
    image: 'https://picsum.photos/id/24/1200/300',
    title: '书香阅读季 - 全场图书8折起',
  },
  {
    image: 'https://picsum.photos/id/20/1200/300',
    title: '新书上架 - 探索未知世界',
  },
  {
    image: 'https://picsum.photos/id/42/1200/300',
    title: '限时特惠 - 精选图书5折封顶',
  },
])

// 书籍数据（模拟）
// const books = ref([
//   {
//     id: 1,
//     title: 'Vue.js 实战（第3版）',
//     author: 'John Doe',
//     price: 89.99,
//     originalPrice: 109.99,
//     discount: '8.2',
//     cover: 'https://picsum.photos/id/24/200/300',
//     category: 'tech',
//     isNew: false,
//   },
//   {
//     id: 2,
//     title: 'Node.js 深入浅出',
//     author: 'Jane Doe',
//     price: 79.99,
//     originalPrice: 99.99,
//     discount: '8.0',
//     cover: 'https://picsum.photos/id/20/200/300',
//     category: 'tech',
//     isNew: false,
//   },
//   {
//     id: 3,
//     title: 'Python编程：从入门到实践',
//     author: 'Eric Matthes',
//     price: 75.99,
//     originalPrice: 89.99,
//     discount: '8.4',
//     cover: 'https://picsum.photos/id/42/200/300',
//     category: 'tech',
//     isNew: false,
//   },
//   {
//     id: 4,
//     title: '活着',
//     author: '余华',
//     price: 39.80,
//     originalPrice: 45.00,
//     discount: '8.8',
//     cover: 'https://picsum.photos/id/10/200/300',
//     category: 'literature',
//     isNew: false,
//   },
//   {
//     id: 5,
//     title: '百年孤独',
//     author: '加西亚·马尔克斯',
//     price: 59.00,
//     originalPrice: 69.50,
//     discount: '8.5',
//     cover: 'https://picsum.photos/id/15/200/300',
//     category: 'literature',
//     isNew: false,
//   },
//   {
//     id: 6,
//     title: '人类简史：从动物到上帝',
//     author: '尤瓦尔·赫拉利',
//     price: 68.00,
//     originalPrice: 79.00,
//     discount: '8.6',
//     cover: 'https://picsum.photos/id/25/200/300',
//     category: 'social',
//     isNew: false,
//   },
//   {
//     id: 7,
//     title: '高效能人士的七个习惯',
//     author: '史蒂芬·柯维',
//     price: 58.00,
//     originalPrice: 68.00,
//     discount: '8.5',
//     cover: 'https://picsum.photos/id/30/200/300',
//     category: 'management',
//     isNew: false,
//   },
//   {
//     id: 8,
//     title: '小王子',
//     author: '安托万·德·圣-埃克苏佩里',
//     price: 29.80,
//     originalPrice: 35.00,
//     discount: '8.5',
//     cover: 'https://picsum.photos/id/35/200/300',
//     category: 'children',
//     isNew: false,
//   },
//   {
//     id: 9,
//     title: '2024 Web前端开发实战',
//     author: '张小明',
//     price: 99.00,
//     originalPrice: 129.00,
//     discount: '7.7',
//     cover: 'https://picsum.photos/id/40/200/300',
//     category: 'tech',
//     isNew: true,
//   },
//   {
//     id: 10,
//     title: '深度学习入门：基于Python的理论与实现',
//     author: '斋藤康毅',
//     price: 69.00,
//     originalPrice: 89.00,
//     discount: '7.8',
//     cover: 'https://picsum.photos/id/45/200/300',
//     category: 'tech',
//     isNew: true,
//   },
//   {
//     id: 11,
//     title: '平凡的世界（全三册）',
//     author: '路遥',
//     price: 108.00,
//     originalPrice: 128.00,
//     discount: '8.4',
//     cover: 'https://picsum.photos/id/50/200/300',
//     category: 'literature',
//     isNew: true,
//   },
//   {
//     id: 12,
//     title: '思考，快与慢',
//     author: '丹尼尔·卡尼曼',
//     price: 69.00,
//     originalPrice: 89.00,
//     discount: '7.8',
//     cover: 'https://picsum.photos/id/55/200/300',
//     category: 'social',
//     isNew: true,
//   },
// ])

const books = ref<Omit<IBooks, 'id'>[]>([])

// 计算属性：新书推荐
const newBooks = computed(() => {
  return books.value.filter(book => book.isNew)
})

async function loadBooks() {
  bookStore.searchBookParams.bookType = activeCategory.value === '全部' ? '' : activeCategory.value
  bookStore.searchBookParams.pageSize = 12
  bookStore.searchBookParams.currentPage = 1
  bookStore.searchBookParams.bookStatus = 1
  try {
    const res = await BookApi.getBook(bookStore.searchBookParams)
    books.value = res.data.records
  }
  catch (e: any) {
    ElMessage.error(e.message || '获取书籍列表失败')
    books.value = []
  }
}

// 生命周期钩子
onMounted(async () => {
  categoryList.value = [{ label: '全部书籍', value: '全部' }]

  try {
    const res = await classifyApi.getAllBookType('')
    res.data.forEach((item) => {
      categoryList.value.push({ label: item.bookType, value: item.bookType })
    })
    await loadBooks()
    const userRes = await UserApi.getUserInfo()
    userInfo.value = userRes.data
    isLoggedIn.value = true
    // 添加滚动事件监听
    if (categoryNavRef.value) {
      categoryNavRef.value.addEventListener('scroll', checkScroll)
      // 初始检查
      checkScroll()
    }
  }
  catch (e: any) {
    ElMessage.error(e.message || '获取书籍分类失败')
  }
})

onUnmounted(() => {
  // 移除滚动事件监听
  if (categoryNavRef.value) {
    categoryNavRef.value.removeEventListener('scroll', checkScroll)
  }

  // localStorage.removeItem('__USER_AUTH__')
})
// 查看书籍详情
function viewBookDetails(bookId: string) {
  router.push(`/book/${bookId}`)
}

// 按分类筛选书籍
async function filterBooksByCategory(category: string) {
  activeCategory.value = category
  await loadBooks()
}

// 重置筛选
function resetFilter() {
  activeCategory.value = '全部'
  searchInput.value = ''
}

// 搜索书籍
function handleSearch() {
  if (!searchInput.value.trim()) {
    ElMessage.warning('请输入搜索关键词')
    return
  }
  const keyword = searchInput.value
  router.push({
    path: '/book/search',
    query: { keyword },
  })
}

// 加入购物车
function addToCart(book: any) {
  // 实际项目中可调用购物车接口
  ElMessage({
    message: `${book.title} 已加入购物车`,
    type: 'success',
  })
}

// 检查滚动状态
function checkScroll() {
  if (categoryNavRef.value) {
    const { scrollLeft, scrollWidth, clientWidth } = categoryNavRef.value
    showLeftArrow.value = scrollLeft > 0
    showRightArrow.value = scrollLeft < scrollWidth - clientWidth - 1
  }
}

// 导航方法
function goToHome() {
  router.push('/home')
}

function goToCart() {
  router.push('/cart')
}

function goToUserCenter() {
  router.push('/personal-center')
}

function goToLogin() {
  router.push('/login')
}

function goToRegister() {
  router.push('/register')
}

function viewAllBooks() {
  router.push(`/book/search?category=${activeCategory.value}`)
}

function viewNewBooks() {
  router.push('/books?type=new')
}
// 回到顶部
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// 用户菜单操作
function handleCommand(command: string) {
  switch (command) {
    case 'profile':
      goToUserCenter()
      break
    case 'login':
      goToLogin()
      break
    case 'register':
      goToRegister()
      break
    case 'logout':
      isLoggedIn.value = false
      ElMessage.success('已退出登录')
      localStorage.removeItem('__USER_AUTH__')
      break
    case 'cart':
      goToCart()
      break
  }
}

// 页面配置
definePage({
  name: 'home',
  meta: {
    title: '书香书店 - 首页',
    requiresAuth: false,
  },
})
</script>

<template>
  <div class="bookstore-home bg-[#f5f5f5] flex flex-col min-h-screen">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm top-0 sticky z-30">
      <div class="mx-auto px-4 py-3 container flex items-center justify-between">
        <!-- logo区域 -->
        <div class="flex cursor-pointer items-center space-x-2" @click="goToHome">
          <!-- <ElIcon class="text-2xl text-[#ff2442]">
            <i class="ep-book" />
            <ep-book />
          </ElIcon> -->
          <span class="text-xl text-[#333] font-bold">书香书店</span>
        </div>

        <!-- 搜索区域 -->
        <div class="mx-4 flex-1 max-w-md relative">
          <el-input
            v-model="searchInput"
            placeholder="搜索书籍、作者..."
            class="rounded-full border-none bg-[#f5f5f5] w-full focus:shadow-md"
            prefix-icon="Search"
            @keyup.enter="handleSearch"
          />
          <ElButton
            type="primary"
            class="border-none bg-[#ff2442] absolute hover:bg-[#e01f3d] -translate-y-1/2"
            @click="handleSearch"
          >
            搜索
          </ElButton>
        </div>

        <!-- 用户功能区 -->
        <div class="flex items-center space-x-4">
          <!-- 购物车按钮 -->
          <ElButton
            class="text-white border-[#ff2442] bg-[#ff2442] relative hover:border-[#e01f3d] hover:bg-[#e01f3d]"
            @click="goToCart"
          >
            <div class="flex items-center">
              <ElIcon class="mr-1">
                <ShoppingCart />
              </ElIcon>
              <span>购物车</span>
            </div>
            <span
              v-if="cartItemCount > 0"
              class="text-xs text-[#ff2442] font-bold border-2 border-[#ff2442] rounded-full bg-white flex h-5 w-5 items-center justify-center absolute -right-2 -top-2"
            >
              {{ cartItemCount }}
            </span>
          </ElButton>

          <!-- 用户头像下拉菜单 -->
          <ElDropdown @command="handleCommand">
            <div class="flex cursor-pointer items-center">
              <div class="border-2 border-gray-300 rounded-full bg-gray-100 flex h-9 w-9 shadow-sm items-center justify-center">
                <img v-if="userInfo?.imageUrl" :src="userInfo?.imageUrl" class="rounded-full h-9 w-9">
              </div>
            </div>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem v-if="!isLoggedIn" command="login">
                  登录
                </ElDropdownItem>
                <ElDropdownItem v-if="!isLoggedIn" command="register">
                  注册
                </ElDropdownItem>
                <template v-else>
                  <ElDropdownItem command="profile">
                    个人主页
                  </ElDropdownItem>
                  <ElDropdownItem command="cart">
                    购物车
                  </ElDropdownItem>
                  <ElDropdownItem divided command="logout">
                    退出登录
                  </ElDropdownItem>
                </template>
              </ElDropdownMenu>
            </template>
          </ElDropdown>

          <!-- 移动端菜单按钮 -->
          <ElIcon
            class="text-xl text-[#666] cursor-pointer hover:text-[#ff2442] md:hidden"
            @click="showMobileMenu = !showMobileMenu"
          >
            <!-- <Memo /> -->
          </ElIcon>
        </div>
      </div>

      <!-- 主要分类导航 -->
      <div class="border-b border-t border-gray-100 hidden md:block">
        <div class="mx-auto container">
          <div class="custom-scrollbar py-3 flex overflow-x-auto">
            <div
              v-for="(item, index) in categoryList"
              :key="index"
              class="text-sm font-medium px-4 py-1 border-r border-gray-200 flex-shrink-0 cursor-pointer whitespace-nowrap last:border-r-0 hover:bg-gray-50"
              :class="{ 'text-[#ff2442]': activeCategory === item.value }"
              @click="filterBooksByCategory(item.value)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- 移动端分类菜单 -->
      <!-- <ElDrawer
        v-model="showMobileMenu"
        direction="top"
        size="300px"
        class="md:hidden"
      >
        <div class="p-4">
          <div class="mt-4 flex flex-col space-y-4">
            <a
              v-for="(item, index) in categoryList"
              :key="index"
              class="text-[#333] font-medium py-2 border-b border-[#eee] hover:text-[#ff2442]"
              @click="() => {
                filterBooksByCategory(item.value);
                showMobileMenu = false;
              }"
            >
              {{ item.label }}
            </a>
          </div>
        </div>
      </ElDrawer> -->
    </header>

    <!-- 主内容区域 -->
    <main class="flex-1">
      <!-- 轮播Banner -->
      <ElCarousel
        height="280px"
        class="mb-6"
        indicator-position="outside"
        autoplay
        :interval="5000"
      >
        <ElCarouselItem v-for="(banner, index) in bannerList" :key="index">
          <img
            :src="banner.image"
            :alt="banner.title"
            class="mx-auto rounded-lg h-full max-w-6xl w-full object-cover"
          >
        </ElCarouselItem>
      </ElCarousel>

      <!-- 分类标签 - 移动端和桌面端适配 -->
      <div class="mx-auto mb-8 px-4 container">
        <div class="scrollbar-hide pb-2 flex overflow-x-auto space-x-3">
          <ElTag
            v-for="(item, index) in categoryList"
            :key="index"
            :type="activeCategory === item.value ? 'danger' : 'info'"
            class="text-sm py-1.5 cursor-pointer whitespace-nowrap"
            effect="plain"
            @click="filterBooksByCategory(item.value)"
          >
            {{ item.label }}
          </ElTag>
        </div>
      </div>

      <!-- 书籍展示区域 -->
      <div class="mx-auto mb-12 px-4 container">
        <!-- 区域标题 -->
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-xl text-[#333] font-bold">
            {{ activeCategory === '全部' ? '全部书籍' : categoryList.find(c => c.value === activeCategory)?.label }}
          </h2>
          <ElButton
            link
            class="text-[#ff2442] hover:text-[#e01f3d] hover:bg-transparent"
            @click="viewAllBooks"
          >
            查看全部
            <ElIcon class="ml-1">
              <ArrowRight />
            </ElIcon>
          </ElButton>
        </div>

        <!-- 书籍卡片网格 -->
        <div class="gap-4 grid grid-cols-2 sm:gap-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xl:grid-cols-6">
          <ElCard
            v-for="book in books"
            :key="book.bookId"
            class="book-card group cursor-pointer transition-shadow duration-300 overflow-hidden hover:shadow-lg"
            @click="viewBookDetails(book.bookId)"
          >
            <!-- 书籍封面 -->
            <div class="bg-[#f9f9f9] aspect-[2/3] relative overflow-hidden">
              <img
                :src="book.bookImage"
                :alt="book.bookName"
                class="book-cover h-full w-full transition-transform duration-500 object-cover group-hover:scale-105"
              >
              <!-- 折扣标签 -->
              <!-- <ElTag
                v-if="book.discount"
                class="text-white border-none bg-[#ff2442] left-2 top-2 absolute"
              >
                {{ book.discount }}折
              </ElTag> -->
            </div>

            <!-- 书籍信息 -->
            <div class="p-3">
              <!-- 书名（溢出省略） -->
              <h3 class="text-sm text-[#333] font-medium mb-1 h-10 line-clamp-2">
                {{ book.bookName }}
              </h3>

              <!-- 作者（溢出省略） -->
              <p class="text-xs text-[#999] mb-2 line-clamp-1">
                {{ book.bookAuthor }}
              </p>

              <!-- 价格区域 -->
              <div class="flex items-center">
                <span class="text-sm text-red-500 font-bold">¥{{ book.bookPrice.toFixed(2) }}</span>
                <!-- <span
                  v-if="book.originalPrice"
                  class="text-xs text-[#999] ml-2 line-through"
                >
                  ¥{{ book.originalPrice.toFixed(2) }}
                </span> -->
              </div>

              <!-- 加入购物车按钮（hover显示） -->
              <ElButton
                class="text-[#ff2442] mt-2 border-[#ffccd5] bg-[#fff0f2] w-full hidden hover:bg-[#ffe6eb] group-hover:block"
                size="small"
                @click.stop="addToCart(book)"
              >
                <ElIcon class="mr-1">
                  <ShoppingCart />
                </ElIcon>
                加入购物车
              </ElButton>
            </div>
          </ElCard>

          <!-- 无数据提示 -->
          <div v-if="books.length === 0" class="py-12 flex flex-col col-span-full items-center justify-center">
            <ElEmpty description="暂无相关书籍" class="text-[#999]">
              <ElIcon class="text-4xl text-[#ccc] mb-4">
                <i class="ep-book" />
              </ElIcon>
            </ElEmpty>
            <ElButton
              link
              class="text-[#ff2442] mt-4"
              @click="resetFilter"
            >
              查看全部书籍
            </ElButton>
          </div>
        </div>
      </div>

      <!-- 新书推荐区域 -->
      <div class="mb-12 py-10 bg-white">
        <div class="mx-auto px-4 container">
          <div class="mb-6 flex items-center justify-between">
            <h2 class="text-xl text-[#333] font-bold">
              新书推荐
            </h2>
            <ElButton
              link
              class="text-[#ff2442] hover:text-[#e01f3d] hover:bg-transparent"
              @click="viewNewBooks"
            >
              更多新书
              <ElIcon class="ml-1">
                <ArrowRight />
              </ElIcon>
            </ElButton>
          </div>

          <!-- 横向滚动书籍列表 -->
          <div class="scrollbar-hide pb-4 flex overflow-x-auto space-x-4">
            <ElCard
              v-for="book in newBooks"
              :key="book.bookId"
              class="book-card group min-w-[180px] cursor-pointer transition-shadow duration-300 overflow-hidden hover:shadow-lg"
              @click="viewBookDetails(book.bookId)"
            >
              <div class="bg-[#f9f9f9] aspect-[2/3] relative overflow-hidden">
                <img
                  :src="book.bookImage"
                  :alt="book.bookName"
                  class="book-cover h-full w-full transition-transform duration-500 object-cover group-hover:scale-105"
                >
                <ElTag class="text-white border-none bg-[#4cd263] left-2 top-2 absolute">
                  新书
                </ElTag>
              </div>

              <div class="p-3">
                <h3 class="text-sm text-[#333] font-medium mb-1 h-10 line-clamp-2">
                  {{ book.bookName }}
                </h3>
                <p class="text-xs text-[#999] mb-2 line-clamp-1">
                  {{ book.bookAuthor }}
                </p>
                <div class="flex items-center">
                  <span class="text-sm text-red-500 font-bold">¥{{ book.bookPrice.toFixed(2) }}</span>
                </div>
              </div>
            </ElCard>
          </div>
        </div>
      </div>
    </main>
    <div class="bottom-6 right-6 fixed z-50">
      <ElButton
        circle
        @click="scrollToTop"
      >
        <ElIcon><ArrowUp /></ElIcon>
      </ElButton>
    </div>
  </div>
</template>

<style scoped>
/* 基础样式 */
.bookstore-home {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 滚动条美化 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 书籍卡片样式优化 */
.book-card {
  border-radius: 8px !important;
  border: none !important;
  background-color: #fff !important;
}

/* 购物车按钮悬停效果 */
.cart-button:hover {
  background-color: #e01f3d !important;
  border-color: #e01f3d !important;
}

/* 用户头像悬停效果 */
.user-avatar:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .el-carousel {
    height: 180px !important;
  }

  .book-card {
    min-width: 140px !important;
  }
}

@media (max-width: 480px) {
  .el-carousel {
    height: 140px !important;
  }

  .book-card {
    min-width: 120px !important;
  }

  .book-cover {
    height: 160px !important;
  }
}
/* 基础样式 */
.bookstore-home {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 自定义滚动条样式 */
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.custom-scrollbar {
  -ms-overflow-style: auto;
  scrollbar-width: auto;
}

/* 隐藏其他滚动条 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 书籍卡片样式优化 */
.book-card {
  border-radius: 8px !important;
  border: none !important;
  background-color: #fff !important;
}

/* 购物车按钮悬停效果 */
.cart-button:hover {
  background-color: #e01f3d !important;
  border-color: #e01f3d !important;
}

/* 用户头像悬停效果 */
.user-avatar:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .el-carousel {
    height: 180px !important;
  }

  .book-card {
    min-width: 140px !important;
  }
}

@media (max-width: 480px) {
  .el-carousel {
    height: 140px !important;
  }

  .book-card {
    min-width: 120px !important;
  }

  .book-cover {
    height: 160px !important;
  }
}
</style>
