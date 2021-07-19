<template>
  <router-link to="/dashboard/collections" tag="div"
  class="row m-2 p-3 align-items-center notification box-shadow">
    <i class="material-icons secondary col-2">warning</i>
    <span class="col-10 secondary">
      {{ 'DASHBOARD.HAVENT_UPDATED' | translate }} {{ lastUpdateTime }} {{ 'AGO' | translate }}!
    </span>
  </router-link>
</template>

<script>
export default {
  data() {
    return {
      lastUpdateTime: '2 weeks',
    };
  },
};
</script>

