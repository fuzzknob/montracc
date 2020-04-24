<template>
  <main
    id="app"
    class="p-2"
  >
    <router-view />
  </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  mounted() {
    this.fetchFromDatabase()
  },
  methods: {
    ...mapActions(['fetchFromDatabase']),
  },
}
</script>

<style lang="sass">
body
  background: #121212
</style>
