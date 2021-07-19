<template>
  <div class="d-flex flex-column scrollable">
    <div class="sticky-top blue-header box-shadow p-0">
      <div class="title p-2">{{ 'DASHBOARD.MESSAGES' | translate }}</div>
      <div class="row p-2 header-filter-row">
        <div class="row m-0 search-field">
          <i class="material-icons">search</i>
          <input type="text"
            :placeholder="translatedSearch"
            v-model="searchTerm">
        </div>
        <!-- <div>
          <i class="material-icons bottom" v-if="unread" @click="unread = !unread">
            check_box
          </i>
          <i class="material-icons bottom" v-else  @click="unread = !unread">
            check_box_outline_blank
          </i>
          <span>{{ 'DASHBOARD.UNREAD' | translate }}</span>
        </div> -->
      </div>
    </div>
    <div class="scrollable">
      <merwis-message v-for="message in filteredMessages"
      :key="message.id"
      :message="message"></merwis-message>
    </div>
  </div>
</template>

<script>
import Message from './Message';

export default {
  data() {
    return {
      searchTerm: '',
      unread: false,
    };
  },
  computed: {
    filteredMessages() {
      return this.$store.getters.getMessagesByReadType(this.unread);
    },
    translatedSearch() {
      return this.$localizator.translate('SEARCH');
    },
  },
  components: {
    'merwis-message': Message,
  },
};
</script>

<style lang="scss">
 @import '../shared/colors';

.header {
  background-color: white;
}

.borderless {
  border: 0;
}

.bottom {
  vertical-align: bottom;
}
.header-filter-row {
  margin: 17px 10px 0 10px;
  display: flex;
  justify-content: space-between;
}
input {
  padding-left: 11px;
}
.search-field > .material-icons {
  position: absolute;
  padding: 4px 7px;
  color: $input-border;
}
.search-field >input {
  padding-left: 31px;
}
input:focus, input:active, .search-field:active, .search-field:focus {
  box-shadow: unset;
  border: none;
}
</style>
