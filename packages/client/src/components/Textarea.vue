<template>
  <label class="flex flex-col">
    <textarea
      class="input-txt text-primary"
      :value="value"
      @input="handleInput"
    />
  </label>
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    rows: {
      type: Number,
      default: 10,
    },
    value: {
      type: String,
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
