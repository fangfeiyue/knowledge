<template>
  <div class="user-profile-component">
    <div class="d-flex align-items-center">
      <img :src="fitUrl" :alt="user.nickName" class="rounded-circle img-thumbnail">
      <div class="detail ml-2">
        <h6 class="d-block mb-0">{{user.nickName}}</h6>
        <span class="text-truncate text-muted d-block">{{user.description}}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed, PropType } from 'vue'
import { addColumnAvatar } from '@/utils/utils'
import { IUserProps } from '@/store/index'
const props = defineProps({
  user: {
    type: Object as PropType<IUserProps>,
    required: true
  }
})
const fitUrl = computed(() => {
  addColumnAvatar(props.user, 50, 50)
  const { avatar } = props.user
  return avatar && avatar.fitUrl
})
</script>
<style scoped>
.user-profile-component img {
  width: 50px;
  height: 50px;
  /* border: 1px solid #ccc;
  border-radius: 50px; */
}
</style>
