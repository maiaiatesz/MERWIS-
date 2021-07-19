<template>
  <q-modal v-model="opened" maximized>
    <div class="column">
      <div class="col-auto text-center">
        <h4>View image - 14:00</h4>
      </div>
      <div class="col-auto" style="padding: 0 5.5vw;">
        <p>Comment:</p>
        <p>
          <q-input v-if="imgs.notes" v-model="imgs.notes" class="" />
          <q-input v-if="imgs.comments" v-model="imgs.comments" class="" />
        </p>
      </div>
      <div class="col-auto text-center">
        <img class="prewPicus" v-for="(image, index) in imgs.pics" :key="index" v-bind:src="image" alt="" style="padding: 10px;">
      </div>
      <div class="col-auto text-center" style="padding: 10px;">
        <img v-bind:src="imgs.url" alt="" style="max-height: 80vh;">
      </div>
      <div class="col-auto text-center">
        <q-btn
        color="primary"
        @click="close"
        label="Close"
        />
      </div>
    </div>
  </q-modal>
</template>

<script>
export default {
  props: {
    close: {
      type: Function,
      required: true
    },
    opened: {
      type: Boolean,
      required: true
    },
    imgs: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
  .prewPicus {
    max-width: 30%;
  }
</style>
