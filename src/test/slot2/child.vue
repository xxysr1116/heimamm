<template>
  <div>
    <div>
      <slot name="title"></slot>
    </div>
    <div>
        <slot></slot>
    </div>
    <div>
        <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>