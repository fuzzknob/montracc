<template>
  <label class="flex flex-col">
    <input
      ref="input-text"
      class="text-primary input-txt"
      :type="type"
      :value="value"
      :disabled="disabled"
      @input="handleInput"
    >
  </label>
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: null,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.autofocus) {
      this.$refs['input-text'].focus()
      this.$refs['input-text'].select()
    }
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
