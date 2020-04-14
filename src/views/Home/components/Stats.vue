<template>
  <div>
    <h3 class="text-base text-primary my-1">
      Stats
    </h3>
    <Row class="money-storage">
      <Column
        span="14"
        class="pr-1"
      >
        <Row
          class="mb-2 money-storage-half"
        >
          <Card
            content="Rs 1,405"
            title="Total"
          />
        </Row>
        <Row
          class="mb-2 money-storage-half"
        >
          <Card
            content="Rs 1,405"
            title="Spent"
          />
        </Row>
      </Column>
      <Column
        span="10"
        class="pl-1"
      >
        <Row class="mb-2">
          <Card
            content="Rs 1,405"
            title="In Hand"
          />
        </Row>
        <Row class="my-2">
          <Card
            content="Rs 16,924"
            title="NMB"
          />
        </Row>
        <Row class="mt-2">
          <Card
            content="Rs 45,500"
            title="MBL"
          />
        </Row>
      </Column>
    </Row>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'Stats',
  components: {
    Card,
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
