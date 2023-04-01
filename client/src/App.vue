<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import axios from "axios";
axios.defaults.withCredentials = true;
</script>

<style scoped></style>
