<template>
  <div>
    <div class="row m-0 list-item-container box-shadow" @click="showDetail = true">
      <div style="min-width: 3%;" :style="messageStyle"></div>
      <div style="max-width: 17%;">
        <img class="round" :src="message.from.img" alt="">
      </div>
      <div class="list-item-body" style="align-self: center;">
        <div class="row m-0" style="font-size: smaller;">
          <span>{{ message.from.name }}</span>
          <span class="right-align darkgray">{{ message.date }}</span>
        </div>
        <div>{{ message.title }}</div>
      </div>
    </div>
    <transition name="modal">
      <merwis-message-detail v-if="showDetail"
       :message="message" :close="closeModal"></merwis-message-detail>
    </transition>
  </div>
</template>

<script>
import MessageDetail from './MessageDetail';

export default {
  data() {
    return {
      showDetail: false,
    };
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.showDetail = false;
    },
  },
  computed: {
    messageStyle() {
      return {
        backgroundColor: this.message.unread ? '#face20' : 'inherit',
      };
    },
  },
  components: {
    'merwis-message-detail': MessageDetail,
  },
};
</script>

<style lang="scss">
img.round {
  border-radius: 50%;
  padding: 5px;
  width: 100%;
}
</style>
