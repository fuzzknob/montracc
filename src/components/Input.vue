<template>
  <label class="flex flex-col">
    <span>
      {{ label }}
    </span>
    <input
      class="text-primary input-txt"
      :type="type"
      :value="value"
      @input="handleInput"
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
    value: {
      type: [String, Number],
      default: null,
    },
  },
  methods: {
    handleInput({ target }) {
      this.$emit('input', this.type === 'number' ? parseFloat(target.value) : target.value)
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
