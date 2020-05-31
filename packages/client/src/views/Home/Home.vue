<template>
  <div>
    <div class="flex justify-between">
      <Button
        ghost
        :loading="isSyncing"
        @click="handleSync"
      >
        {{ isSyncing ? 'Syncing...' : 'Sync' }}
      </Button>
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
import { Button, notification } from 'ant-design-vue'
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
  data() {
    return {
      isSyncing: false,
    }
  },
  methods: {
    ...mapActions([
      'logout',
      'sync',
    ]),
    async handleSync() {
      this.isSyncing = true
      try {
        await this.sync()
      } catch (e) {
        notification.error({
          message: 'There was an error whiel syncing',
        })
      } finally {
        this.isSyncing = false
      }
    },
  },
}
</script>
