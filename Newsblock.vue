<template>
  <div class="box-shadow list-item-container news-block">
    <div class="row m-0 p-2">
      <div class="col-3 p-0">
        <img :src="imgSrc" class="news-image">
      </div>
      <div class="col-9">
        <div class="row">
          <span class="px-3">{{ author }}</span>
          <span class="right-align datetime passive-text">{{ time }}</span>
        </div>
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="px-2">
      <pre class="pre-word-wrap">{{ body }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: 'https://my.clevelandclinic.org/-/scassets/images/org/locations/lutheran-hospital/lutheran-rich-text-panel.ashx',
      author: 'Dr Agnes Szoke',
      time: '2 days ago',
      title: 'Just opened our new office!',
      body: 'Thank you for your support, We could open a new office for you in Gotham. \nCall for appointment: +3699 999 9999',
    };
  },
};
</script>

<style lang="scss">
@import '../shared/colors';

.news-block {
  border: none;
  margin-top: 5%;
}

.news-image {
  max-width: 100%;
  max-height: 100px;
}
.pre-word-wrap {
  white-space: pre-wrap;       /* css-3 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;
}
pre {
  color: $text-color;
}
.datetime {
  font-size: small;
}
</style>

