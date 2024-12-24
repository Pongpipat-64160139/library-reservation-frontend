<script lang="ts" setup>
import { useRoleRoomStore } from '@/stores/roleRoomStore';


const roleRoomStore = useRoleRoomStore()

function getAllUser(id: number) {
  const user = roleRoomStore.findOneRoleRoom(id);
}
</script>
<template>
  <div>
    <v-btn @click="getAllUser(1)">Test</v-btn>
  </div>
</template>
