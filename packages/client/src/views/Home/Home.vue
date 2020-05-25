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
import Auth from '@/domain/Auth'
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
    logout() {
      Auth.logout()
    },
  },
}
</script>
