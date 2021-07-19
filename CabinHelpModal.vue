<template>
  <q-modal v-model="opened" maximized>
    <div class="column">
      <div class="col-auto text-center">
        <h4>Basic Modal</h4>
      </div>
      <div class="col-auto text-center">
        <small>Instructions etc...</small>
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
    }
  }
}
</script>
