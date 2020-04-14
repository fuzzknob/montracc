<template>
  <Modal
    :visible="visible"
    class="text-primary"
    title="Add Spent"
    centered
    @close="$emit('close')"
  >
    <div slot="header">
      Add to Spent
    </div>
    <Form>
      <FormItem label="Amount">
        <Input type="number" />
      </FormItem>
      <FormItem label="Storage">
        <Select>
          <Option value="in-hand">
            In Hand
          </Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
import Input from '@/components/Input.vue'
import { Form, Select } from 'ant-design-vue'

export default {
  name: 'AddSpentModal',
  components: {
    Modal,
    Form,
    Input,
    FormItem: Form.Item,
    Select,
    Option: Select.Option,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
