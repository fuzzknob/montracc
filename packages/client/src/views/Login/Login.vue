<template>
  <div class="h-screen flex flex-center">
    <div class="form-wrapper mb-32">
      <Form>
        <FormItem label="Email">
          <Input />
        </FormItem>
        <FormItem label="Password">
          <Input type="password" />
        </FormItem>
        <div class="mt-4">
          <Button type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input'
import { Form, Button } from 'ant-design-vue'

export default {
  name: 'Login',
  components: {
    Input,
    Button,
    Form,
    FormItem: Form.Item,
  },
}
</script>

<style lang="sass">
.form-wrapper
  width: 275px
</style>
