<template>
  <div>
    <h3 class="text-base text-primary my-1">
      Expenditures
    </h3>
    <Row class="mb-2">
      <Cell
        width="12"
        class="pr-1"
      >
        <Expenditure
          :expendature="{
            name: 'food',
            spent: 200,
            limit: 1000,
          }"
        />
      </Cell>
      <Cell
        width="12"
        class="pl-1"
      >
        <Expenditure
          :expendature="{
            name: 'food',
            spent: 200,
            limit: 1000,
          }"
        />
      </Cell>
    </Row>
    <Row>
      <Cell
        width="12"
        class="pr-1"
      >
        <Expenditure
          :expendature="{
            name: 'home',
            spent: 200,
            limit: 20000,
          }"
        />
      </Cell>
      <Cell
        width="12"
        class="pl-1"
      >
        <Expenditure
          :expendature="{
            name: 'home',
            spent: 200,
            limit: 20000,
          }"
        />
      </Cell>
    </Row>
  </div>
</template>

<script>
import Expenditure from './Expenditure.vue'

export default {
  name: 'Expenditures',
  components: {
    Expenditure,
  },
}
</script>
