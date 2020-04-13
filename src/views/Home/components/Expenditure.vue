<template>
  <Card
    :title="expendature.name"
    icon
  >
    <span class="text-primary flex flex-col text-xl">
      <span>
        {{ expendature.spent | formatCurrency }}
      </span>
      <span v-if="expendature.limit">
        / {{ expendature.limit | formatCurrency }}
      </span>
    </span>
  </Card>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'Expenditure',
  components: {
    Card,
  },
  props: {
    expendature: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
