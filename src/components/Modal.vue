<template>
  <AntModal
    :title="title"
    :visible="visible"
    class="text-primary custom-modal"
    centered
    @cancel="$emit('close')"
  >
    <slot />
  </AntModal>
</template>

<script>
import { Modal as AntModal } from 'ant-design-vue'

export default {
  name: 'Modal',
  components: {
    AntModal,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="sass">
.custom-modal
  .ant-modal-header
    border-color: #505050

    .ant-modal-title
      color: #E1E1E1 !important

  .ant-modal-close-x
    color: #E1E1E1

  .ant-modal-content
    background: #2D2D2D !important
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)

  .ant-modal-header
    background: #2D2D2D !important

  .ant-modal-footer
    border-color: #505050
</style>
