<template>
  <div>
    <AddSpentModal
      :visible="isAddSpentModalVisible"
      @click="isAddSpentModalVisible = false"
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
        />
      </Column>
    </Row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Expenditure from './Expenditure.vue'
import AddSpentModal from './AddSpentModal.vue'

export default {
  name: 'Expenditures',
  components: {
    Expenditure,
    AddSpentModal,
  },
  data() {
    return {
      isAddSpentModalVisible: false,
    }
  },
  computed: {
    ...mapState(['expenditures']),
  },
}
</script>
