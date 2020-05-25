<template>
  <div class="h-screen flex flex-center">
    <div class="form-wrapper mb-32">
      <Form @submit="handleLogin">
        <FormItem label="Email">
          <Input v-model="user.email" />
        </FormItem>
        <FormItem label="Password">
          <Input
            v-model="user.password"
            type="password"
          />
        </FormItem>
        <div class="mt-4">
          <Button
            :loading="isLoggingIn"
            type="submit"
            @click="handleLogin"
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input'
import { Form, Button, notification } from 'ant-design-vue'
import { mapActions } from 'vuex'


export default {
  name: 'Login',
  components: {
    Input,
    Button,
    Form,
    FormItem: Form.Item,
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      isLoggingIn: false,
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      this.isLoggingIn = true
      const { user } = this
      try {
        if (!user.email || !user.password) {
          throw new Error('Email and password cannot be empty')
        }
        await this.login(user)
        this.$router.replace('/')
      } catch (e) {
        notification.error({
          message: e.message || e,
        })
      } finally {
        this.isLoggingIn = false
      }
    },
  },
}
</script>

<style lang="sass">
.form-wrapper
  width: 275px
</style>
