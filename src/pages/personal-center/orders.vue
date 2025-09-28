<script setup lang="ts">
definePage({
  name: 'orders',
  meta: {
    name: '我的订单',
  },
})

// 订单数据
const orders = ref([
  {
    id: '20230515001',
    date: '2023-05-15',
    status: '已发货',
    total: 99.00,
    items: [
      {
        id: 1,
        title: 'Vue.js设计与实现',
        author: '霍春阳',
        price: 99.00,
        quantity: 1,
        cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      },
    ],
  },
  {
    id: '20230510002',
    date: '2023-05-10',
    status: '已完成',
    total: 208.00,
    items: [
      {
        id: 2,
        title: 'JavaScript高级程序设计',
        author: 'Nicholas C. Zakas',
        price: 129.00,
        quantity: 1,
        cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      },
      {
        id: 3,
        title: '你不知道的JavaScript',
        author: 'Kyle Simpson',
        price: 79.00,
        quantity: 1,
        cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      },
    ],
  },
  {
    id: '20230501003',
    date: '2023-05-01',
    status: '待发货',
    total: 89.00,
    items: [
      {
        id: 4,
        title: '深入浅出Vue.js',
        author: '刘博文',
        price: 89.00,
        quantity: 1,
        cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      },
    ],
  },
])

const activeStatus = ref('全部')

const statusOptions = [
  { label: '全部', value: '全部' },
  { label: '待发货', value: '待发货' },
  { label: '已发货', value: '已发货' },
  { label: '已完成', value: '已完成' },
  { label: '已取消', value: '已取消' },
]

// 根据状态过滤订单
const filteredOrders = computed(() => {
  if (activeStatus.value === '全部') {
    return orders.value
  }
  return orders.value.filter(order => order.status === activeStatus.value)
})

// 获取状态标签类型
function getStatusType(status: string) {
  switch (status) {
    case '已完成':
      return 'success'
    case '已取消':
      return 'info'
    case '待发货':
      return 'warning'
    case '已发货':
      return 'primary'
    default:
      return 'primary'
  }
}

// 取消订单
function cancelOrder(id: string) {
  ElMessageBox.confirm('确定要取消该订单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    const order = orders.value.find(o => o.id === id)
    if (order) {
      order.status = '已取消'
      ElMessage.success('订单已取消')
    }
  }).catch(() => {
    ElMessage.info('已取消操作')
  })
}

// 查看订单详情
function viewOrderDetail(id: string) {
  ElMessage.info(`查看订单 ${id} 的详情`)
}

// 再次购买
function buyAgain(id: string) {
  ElMessage.success('已添加到购物车')
}
</script>

<template>
  <div class="orders-page">
    <el-card class="content-card">
      <template #header>
        <div class="card-header">
          <span>我的订单</span>
        </div>
      </template>

      <!-- 订单状态筛选 -->
      <div class="status-filter">
        <el-radio-group v-model="activeStatus" size="small">
          <el-radio-button
            v-for="option in statusOptions"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-radio-button>
        </el-radio-group>
      </div>

      <!-- 订单列表 -->
      <div class="orders-list">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="order-item"
        >
          <div class="order-header">
            <div class="order-id">
              订单号：{{ order.id }}
            </div>
            <div class="order-date">
              {{ order.date }}
            </div>
            <div class="order-status">
              <el-tag :type="getStatusType(order.status)">
                {{ order.status }}
              </el-tag>
            </div>
          </div>

          <div class="order-items">
            <div
              v-for="(item, index) in order.items"
              :key="index"
              class="order-item-detail"
            >
              <div class="item-cover">
                <el-image
                  :src="item.cover"
                  fit="cover"
                  class="cover-image"
                />
              </div>
              <div class="item-info">
                <div class="item-title">
                  {{ item.title }}
                </div>
                <div class="item-author">
                  {{ item.author }}
                </div>
              </div>
              <div class="item-price">
                ¥{{ item.price }} x {{ item.quantity }}
              </div>
              <div class="item-total">
                ¥{{ (item.price * item.quantity).toFixed(2) }}
              </div>
            </div>
          </div>

          <div class="order-footer">
            <div class="order-total">
              总计：¥{{ order.total }}
            </div>
            <div class="order-actions">
              <el-button
                size="small"
                @click="viewOrderDetail(order.id)"
              >
                查看详情
              </el-button>
              <el-button
                v-if="order.status === '待发货' || order.status === '已发货'"
                size="small"
                type="danger"
                @click="cancelOrder(order.id)"
              >
                取消订单
              </el-button>
              <el-button
                v-if="order.status === '已完成' || order.status === '已取消'"
                size="small"
                type="primary"
                @click="buyAgain(order.id)"
              >
                再次购买
              </el-button>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <el-empty
          v-if="filteredOrders.length === 0"
          description="暂无订单"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.orders-page {
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

.status-filter {
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #ebeef5;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-item {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  overflow: hidden;
}

.order-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
}

.order-id {
  flex: 1;
  font-weight: 600;
}

.order-date {
  margin: 0 20px;
  color: #909399;
}

.order-items {
  padding: 15px;
  border-bottom: 1px solid #ebeef5;
}

.order-item-detail {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.order-item-detail:last-child {
  margin-bottom: 0;
}

.item-cover {
  width: 60px;
  height: 80px;
  margin-right: 15px;
}

.cover-image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.item-info {
  flex: 1;
  margin-right: 15px;
}

.item-title {
  font-weight: 600;
  margin-bottom: 5px;
}

.item-author {
  color: #909399;
  font-size: 14px;
}

.item-price {
  color: #909399;
  width: 120px;
  text-align: center;
}

.item-total {
  width: 100px;
  text-align: right;
  font-weight: 600;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.order-total {
  font-weight: 600;
  color: #fa541c;
}

.order-actions {
  display: flex;
  gap: 10px;
}

:deep(.el-card__header) {
  background-color: #f5f7fa;
  font-weight: bold;
  padding: 15px 20px;
}

@media (max-width: 768px) {
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .order-date {
    margin: 0;
  }

  .order-item-detail {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .item-cover {
    width: 100%;
    height: 150px;
  }

  .item-info {
    margin-right: 0;
  }

  .item-price,
  .item-total {
    width: 100%;
    text-align: left;
  }

  .order-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
