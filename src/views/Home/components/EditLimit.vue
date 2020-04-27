<template>
  <Modal
    title="Edit Limit"
    :visible="visible"
    :loading="isSubmitting"
    @after-close="cleanup"
    @ok="handleEditLimit"
    @close="$emit('close')"
  >
    <Form>
      <FormItem label="Amount">
        <Input
          v-model="limit"
          type="number"
        />
      </FormItem>
    </form>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
import Input from '@/components/Input.vue'
import { Form } from 'ant-design-vue'
import { mapActions } from 'vuex'

export default {
  name: 'EditLimit',
  components: {
    Modal,
    Form,
    Input,
    FormItem: Form.Item,
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
      limit: 0,
      isSubmitting: false,
    }
  },
  watch: {
    expenditure(value) {
      if (value) {
        this.limit = this.expenditure.limit
      }
    },
  },
  methods: {
    ...mapActions(['editLimit']),
    handleEditLimit() {
      this.isSubmitting = true
      this.editLimit({
        id: this.expenditure.id,
        limit: this.limit,
      }).then(() => {
        this.$emit('close')
      }).catch((e) => {
        console.log(e)
      }).finally(() => {
        this.isSubmitting = false
      })
    },
    cleanup() {
      this.limit = 0
    },
  },
}
</script>
