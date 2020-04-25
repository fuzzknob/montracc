<template>
  <div>
    <SpentModal
      :visible="isSpendModalVisible"
      :expenditure="targetExpenditure"
      @close="isSpendModalVisible = false"
    />
    <h3 class="text-base text-primary my-1">
      Expenditures
    </h3>
    <Row
      class="mb-2"
      :gutter="7"
    >
      <Column
        v-for="expenditure in expenditures"
        :key="expenditure.id"
        span="12"
        class="mb-2"
      >
        <Expenditure
          :expendature="{
            name: expenditure.name,
            spent: expenditure.spent,
            limit: expenditure.limit,
          }"
          @click="handleExpenditureClick(expenditure)"
        />
      </Column>
    </Row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Expenditure from './Expenditure.vue'
import SpentModal from './SpendModal.vue'

export default {
  name: 'Expenditures',
  components: {
    Expenditure,
    SpentModal,
  },
  data() {
    return {
      isSpendModalVisible: false,
      targetExpenditure: {},
    }
  },
  computed: {
    ...mapState(['expenditures']),
  },
  methods: {
    handleExpenditureClick(expenditure) {
      this.isSpendModalVisible = true
      this.targetExpenditure = expenditure
    },
  },
}
</script>
