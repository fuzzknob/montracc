<template>
  <Card
    :title="expendature.name"
    :min-height="81"
    icon
    @click="$emit('click')"
    @icon-click="$emit('edit')"
  >
    <div class="text-primary flex flex-col text-xl">
      <span :class="spentColorClass">
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
  computed: {
    spentColorClass() {
      const { limit, spent } = this.expendature
      if (!limit) {
        return ''
      }
      const difference = limit - spent
      if (difference <= 0) {
        return 'text-red-600'
      }
      if (difference <= 100) {
        return 'text-yellow-600'
      }
      return ''
    },
  },
}
</script>
