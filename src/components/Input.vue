<template>
  <label class="flex flex-col">
    <span>
      {{ label }}
    </span>
    <input
      class="text-primary input-txt"
      :type="type"
    >
  </label>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
}
</script>

<style lang="sass">
.input-txt
  background: #2D2D2D !important
  border-color: #545454 !important

  &:focus
    border-color: #8F8F8F !important
    box-shadow: none !important
</style>
