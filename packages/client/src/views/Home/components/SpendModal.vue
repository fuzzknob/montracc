<template>
  <Modal
    :visible="visible"
    class="text-primary"
    title="Spend Money"
    :loading="isSubmitting"
    @after-close="cleanup"
    @ok="handleSpendMoney"
    @close="$emit('close')"
  >
    <Form v-if="visible">
      <FormItem label="Amount">
        <Input
          v-model="amount"
          autofocus
          type="number"
        />
      </FormItem>
      <FormItem label="Storage">
        <Select v-model="selectedStorage">
          <Option
            v-for="storage in storages"
            :key="storage.id"
            :value="storage.id"
          >
            {{ storage.name }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="Description">
        <Textarea v-model="description" />
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
import Input from '@/components/Input.vue'
import Textarea from '@/components/Textarea.vue'
import { mapState, mapActions } from 'vuex'
import { Form, Select } from 'ant-design-vue'

export default {
  name: 'SpendModal',
  components: {
    Modal,
    Form,
    Input,
    Textarea,
    FormItem: Form.Item,
    Select,
    Option: Select.Option,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    expenditure: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      amount: 0,
      selectedStorage: '',
      isSubmitting: false,
      description: '',
    }
  },
  computed: {
    ...mapState(['storages']),
  },
  watch: {
    storages() {
      this.selectedStorage = this.storages[0].id
    },
  },
  methods: {
    ...mapActions(['spendMoney']),
    handleSpendMoney() {
      this.isSubmitting = true
      this.spendMoney({
        amount: this.amount,
        storageId: this.selectedStorage,
        expenditureId: this.expenditure.id,
        description: this.description,
      }).then(() => {
        this.$emit('close')
      }).catch((e) => {
        console.log(e.message)
      }).finally(() => {
        this.isSubmitting = false
      })
    },
    cleanup() {
      this.amount = 0
      this.selectedStorage = this.storages[0].id
      this.description = ''
    },
  },
}
</script>
