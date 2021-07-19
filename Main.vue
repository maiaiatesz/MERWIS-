<template>
  <div class="d-flex flex-column no-title scrollable">
    <merwis-new-message v-if="getUnreadMessageCount > 0"></merwis-new-message>
    <merwis-warning></merwis-warning>
    <merwis-news-block></merwis-news-block>
    <merwis-news-block></merwis-news-block>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NewMessage from './NewMessage';
import Warning from './Warning';
import Newsblock from './Newsblock';

export default {
  computed: {
    ...mapGetters([
      'getUnreadMessageCount',
    ]),
  },
  components: {
    'merwis-new-message': NewMessage,
    'merwis-warning': Warning,
    'merwis-news-block': Newsblock,
  },
};
</script>
