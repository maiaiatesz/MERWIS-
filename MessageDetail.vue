<template>
  <div class="fullscreen modal-z">
    <!-- nav -->
    <div class="row m-0 msg-top sticky-top">
      <a class="nav-link" @click="close" style="z-index: 9999999">
        <i class="material-icons">arrow_back</i>
      </a>
      <div class="right-align row">
        <!-- <i class="material-icons nav-link">reply </i> -->
        <div class="row mx-0 nav-link">
          <a href="tel:+3619998887">
            <i class="material-icons">local_phone</i>
          </a>
        </div>
        <!-- <div class="row mx-0 align-items-center nav-link">
          <i class="material-icons">event</i>
        </div> -->
      </div>
    </div>
    <!-- sender detail -->
    <div class="row mx-0 p-0 box-shadow blue-header">
      <div class="col-3 px-0">
        <img class="round meassage-img" :src="message.from.img" alt="">
      </div>
      <div class="col-9 p-3">
        <div>{{ message.from.name }}</div>
        <div class="row p-3">
          <div>
            <i class="material-icons bottom">location_city</i>
            <small>Today: 2pm-7pm</small>
          </div>
          <!-- <div class="right-align">chat icons</div> -->
        </div>
      </div>
    </div>
    <!-- Title-->
    <div class="message-title">{{ message.title }}</div>
    <!-- attachments -->
    <div style="overflow: auto;" class="box-shadow">
      <div class="row mx-0 attachment-container"
      v-if="message.attachments && message.attachments.length > 0">
        <div v-for="attachment in message.attachments" :key="attachment.id"
        class="attachment-image-container">
          <img :src="attachment.img" alt=""
          class="attachment">
        </div>
      </div>
    </div>
    <!-- message body -->
    <div class="p-2">
      <pre class="p-1">{{ message.text }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    close: {
      type: Function,
      required: true,
    },
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import '../shared/colors';

.vr {
  border-left:1px solid $notification-icon;
  height:100%
}
.msg-top {
  // background-color: white;
  // padding: 7px;
}
pre {
  font-family: -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial,
  sans-serif, "Apple Color Emoji",
  "Segoe UI Emoji", "Segoe UI Symbol";
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: justify;
}
.message-title {
  padding: 1rem;
}
.attachment-container {
  width: max-content;
  margin-bottom: 7px;
}

.attachment {
  padding: 0.5rem;
  width: 100%;
}

.attachment-image-container {
  float: left;
  width: 100px;
}
.nav-link {
  color: #62a4cb !important;
  background: white;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  padding: 11px;
  margin: 5px;
  box-shadow: 1px 3px 5px 1px #c7e2e4;
}
.blue-header {
  box-shadow: 2px 3px 2px 0px #c7e2e4;
}
.meassage-img {
  width: auto !important;
  height: 100%;
}
</style>

