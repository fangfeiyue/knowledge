<template>
  <teleport to="body">
    <div class="d-flex justify-content-center align-items-center h-100 w-100 loading-container">
      <slot></slot>
    </div>
  </teleport>
</template>
<style scoped>
.loading-container {
  background: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
}
</style>
