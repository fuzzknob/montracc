<template>
  <div>
    <AddSpentModal
      :visible="isAddSpentModalVisible"
      @click="isAddSpentModalVisible = false"
    />
    <h3 class="text-base text-primary my-1">
      Expenditures
    </h3>
    <Row class="mb-2">
      <Column
        span="12"
        class="pr-1"
      >
        <Expenditure
          :expendature="{
            name: 'food',
            spent: 200,
            limit: 1000,
          }"
        />
      </Column>
      <Column
        span="12"
        class="pl-1"
      >
        <Expenditure
          :expendature="{
            name: 'food',
            spent: 200,
            limit: 1000,
          }"
        />
      </Column>
    </Row>
    <Row>
      <Column
        span="12"
        class="pr-1"
      >
        <Expenditure
          :expendature="{
            name: 'home',
            spent: 200,
            limit: 20000,
          }"
        />
      </Column>
      <Column
        span="12"
        class="pl-1"
      >
        <Expenditure
          :expendature="{
            name: 'home',
            spent: 200,
            limit: 20000,
          }"
        />
      </Column>
    </Row>
  </div>
</template>

<script>
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
}
</script>
