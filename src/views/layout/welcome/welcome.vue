<template>
  <div>
    {{$store.getters.getUserInfo.username}} 欢迎您，
    您的角色是 {{$store.getters.getUserInfo.role}} ，您的邮箱是 {{$store.getters.getUserInfo.email}}
    </div>
</template>

<script>
export default {};
</script>

<style>
</style>