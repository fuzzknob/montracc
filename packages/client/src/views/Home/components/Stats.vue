<template>
  <div>
    <h3 class="text-base text-primary my-1">
      Stats
    </h3>
    <TransferMoney
      :visible="isTransferMoneyVisible"
      :storage="targetStorage"
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
            @click="handleStorageClick(storage)"
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
      targetStorage: null,
    }
  },
  computed: {
    ...mapState(['storages']),
    totalAmount() {
      if (!this.storages.length) {
        return 0
      }
      return this.storages.reducer((accum, storage) => accum + storage.amount, 0)
    },
    totalSpent() {
      if (!this.expenditures.length) {
        return 0
      }
      return this.expenditures.reducer((accum, expenditure) => accum + expenditure.spent, 0)
    },
  },
  methods: {
    handleStorageClick(storage) {
      this.isTransferMoneyVisible = true
      this.targetStorage = storage
    },
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
