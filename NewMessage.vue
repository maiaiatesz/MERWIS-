<template>
  <router-link to="/dashboard/messages" tag="div"
  class="row m-2 p-3 align-items-center notification box-shadow">
    <i class="material-icons col-2 primary">mail_outline</i>
    <span class="col-10 primary">
      {{ 'YOU_HAVE' | translate }} {{ getUnreadMessageCount }}
      {{ 'DASHBOARD.NEW_MESSAGE' | translate}}!
    </span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getUnreadMessageCount',
    ]),
  },
};
</script>

<style lang="scss">
@import '../shared/colors';

.icon-color {
  color: $notification-icon;
}

.notification {
  background-color: $notification-background;
  // border: 1px solid $notification-icon;
  min-height: 68px;
}
</style>
