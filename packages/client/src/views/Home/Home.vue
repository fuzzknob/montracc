<template>
  <div>
    <div class="flex justify-end">
      <Button
        ghost
        @click="logout"
      >
        Logout
      </Button>
    </div>
    <Stats />
    <Expenditures />
  </div>
</template>

<script>
import { Button } from 'ant-design-vue'
import { mapActions } from 'vuex'
import Stats from './components/Stats.vue'
import Expenditures from './components/Expenditures.vue'

export default {
  name: 'Home',
  components: {
    Stats,
    Button,
    Expenditures,
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
  },
}
</script>
