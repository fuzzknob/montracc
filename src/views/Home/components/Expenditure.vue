<template>
  <Card
    :title="expendature.name"
    :min-height="81"
    icon
  >
    <div class="text-primary flex flex-col text-xl">
      <span>
        {{ expendature.spent | formatCurrency }}
      </span>
      <span v-if="expendature.limit">
        / {{ expendature.limit | formatCurrency }}
      </span>
    </div>
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
