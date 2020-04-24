<template>
  <div>
    <h3 class="text-base text-primary my-1">
      Stats
    </h3>
    <TransferMoney
      :visible="isTransferMoneyVisible"
      @close="isTransferMoneyVisible = false"
    />
    <Row class="money-storage">
      <Column
        span="14"
        class="pr-1"
      >
        <Row
          class="mb-2 money-storage-half"
        >
          <Card
            :content="totalAmount | formatCurrency"
            title="Total"
          />
        </Row>
        <Row
          class="mb-2 money-storage-half"
        >
          <Card
            :content="totalSpent | formatCurrency"
            title="Spent"
          />
        </Row>
      </Column>
      <Column
        span="10"
        class="pl-1"
      >
        <Row
          v-for="storage in storages"
          :key="storage.id"
          class="mb-2"
        >
          <Card
            :content="storage.amount | formatCurrency"
            :title="storage.name"
          />
        </Row>
      </Column>
    </Row>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import { mapState } from 'vuex'
import TransferMoney from './TransferMoney.vue'

export default {
  name: 'Stats',
  components: {
    Card,
    TransferMoney,
  },
  data() {
    return {
      isTransferMoneyVisible: false,
    }
  },
  computed: {
    ...mapState(['totalAmount', 'totalSpent', 'storages']),
  },
}
</script>

<style lang="sass">
.money-storage
  .money-storage-half
    height: 116px

  .storage
    height: 100%
</style>
