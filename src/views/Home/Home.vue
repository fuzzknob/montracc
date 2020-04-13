<template>
  <div>
    <Stats />
    <Expenditures />
  </div>
</template>

<script>
import Stats from './components/Stats.vue'
import Expenditures from './components/Expenditures.vue'

export default {
  name: 'Home',
  components: {
    Stats,
    Expenditures,
  },
}
</script>
