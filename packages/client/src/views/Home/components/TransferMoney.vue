<template>
  <Modal
    :visible="visible"
    class="text-primary"
    title="Transfer Money"
    centered
    @after-close="cleanup"
    @ok="handleTransferMoney"
    @close="$emit('close')"
  >
    <Form>
      <FormItem label="Amount">
        <Input
          v-model="amount"
          type="number"
        />
      </FormItem>
      <FormItem label="Source">
        <Select v-model="selectedStorage">
          <Option value="external">
            External
          </Option>
          <Option
            v-for="_storage in storages"
            :key="_storage.id"
            :value="_storage.id"
          >
            {{ _storage.name }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="Transfer Charge">
        <Input
          v-model="transferCharge"
          type="number"
          :disabled="selectedStorage === 'external'"
        />
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
import { Form, Select } from 'ant-design-vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TransferMoney',
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
    storage: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isTransfering: false,
      selectedStorage: 'external',
      amount: 0,
      transferCharge: 0,
      description: '',
    }
  },
  computed: {
    ...mapState(['storages']),
  },
  methods: {
    ...mapActions(['transferMoney']),
    cleanup() {
      this.selectedStorage = 'external'
      this.amount = 0
      this.transferCharge = 0
      this.description = ''
    },
    handleTransferMoney() {
      this.isTransfering = true
      this.transferMoney({
        amount: this.amount,
        from: this.selectedStorage,
        to: this.storage.id,
        description: this.description,
        transferCharge: this.transferCharge,
      }).then(() => {
        this.$emit('close')
      }).catch((e) => {
        console.log(e)
      }).finally(() => {
        this.isTransfering = false
      })
    },
  },
}
</script>
