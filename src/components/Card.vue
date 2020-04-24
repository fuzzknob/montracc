<template>
  <div
    class="card flex-center p-3"
    @click="$emit('card-click')"
  >
    <div
      class="flex flex-col justify-center"
      :style="{minHeight: `${minHeight}px`}"
    >
      <div
        v-if="icon"
        class="icon-tag flex justify-end"
        @click.stop.prevent="$emit('icon-click')"
      >
        <i class="text-primary h-icon-edit" />
      </div>
      <span
        v-if="title"
        class="text-secondary text-sm"
      >
        {{ title }}
      </span>
      <span
        v-if="content"
        class="text-primary"
        :class="contentClass"
      >
        {{ content }}
      </span>
      <slot v-else />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    icon: {
      type: Boolean,
      default: false,
    },
    contentClass: {
      type: String,
      default: 'text-xl',
    },
    minHeight: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="sass">
.card
  position: relative
  border-radius: 3px
  height: 100%
  background: #1D1D1D
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)

  .icon-tag
    font-size: 18px
    width: 25px
    height: 25px
    position: absolute
    top: 7px
    right: 7px
</style>
