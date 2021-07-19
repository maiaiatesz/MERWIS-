<template>
  <q-modal v-model="opened" maximized>
    <div class="column" v-if="firstStep">
      <div class="col-auto text-center">
        <h4>Cabin calibration</h4>
      </div>
      <div class="col-auto text-center">
        <small>Instructions etc...</small>
      </div>
      <div class="col-auto text-center">
        <q-btn outline
        color="secondary"
        @click="close"
        label="Cancel"
        />
        <q-btn
        color="primary"
        @click="nextStep"
        label="Next"
        />
      </div>
    </div>
    <div class="column" v-if="secStep" style="width: 100%; max-width: 1000px; margin: auto;">
      <div class="col-auto text-center">
        <h4>Setting cameras</h4>
      </div>
      <div class="col row" v-if="camsDone.length!==12">
        <div class="">
          illustration IMG
        </div>
        <div class="col p-2">
          Setting the {{ setCamPlace }} . cam on the  {{ setBar }} bar
        </div>
        <div class="col-auto column">
          <div class="" style="width: 250px; height: 230px;">
            selected cam prev
          </div>
          <div class="">
            <q-btn
            color="secondary"
            @click="setCam"
            label="I see my sign here"
            v-if="camsDone.length!==12"
            />
          </div>
        </div>
      </div>
      <div class="col column" v-if="camsDone.length===12">
        <div class="text-center">
          <b>Your camera settings</b> <br>
        </div>
        <div class="text-center">
          Much cameras
        </div>
        <div class="text-center">
          <q-btn outline
          color="tertiary"
          @click="close"
          label="Cancel"
          />
          <q-btn
          color="tertiary"
          @click="restartCalibrating"
          label="Restart calibrating"
          />
          <q-btn
          color="primary"
          @click="saveCams"
          label="Save settings"
          />
        </div>
      </div>
      <div class="row" v-if="camsDone.length!==12">
        Please click on the picture where u can see your sign:
      </div>
      <div class="row" v-if="camsDone.length!==12">
        <!-- remaining cameras to pick from -->
        <div class="campic" v-for="i in 11" :key="i" style="width: 100px; height: 90px; background: gray; margin: 5px;" @click="selectedCam=i">
          pic {{ i }}
        </div>
      </div>
      <div class="text-center" v-if="camsDone.length!==12">
        You can't see your sign anywhere? Try to <u @click="restartCalibrating" class="cursor-pointer">restart</u> the process.
        <br>
        <q-btn outline
        color="tertiary"
        @click="close"
        label="Cancel setting"
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
  },
  data () {
    return {
      firstStep: false,
      secStep: true,
      selectedCam: 0,
      camsDone: [ 1 ],
      setBar: 'Left',
      // setCam: 3,
      setCamPlace: 2
    }
  },
  methods: {
    nextStep () {
      this.firstStep = false
      this.secStep = true
    },
    setCam () {
      this.camsDone.push(this.selectedCam)
      this.setCamPlace++
      console.log('current camsDone: ', this.camsDone)
      if (this.camsDone.length === 4) {
        this.setBar = 'Middle'
      } else if (this.camsDone.length === 8) {
        this.setBar = 'Right'
      }
      if (this.setCamPlace === 5) {
        this.setCamPlace = 1
      }
    },
    restartCalibrating () {
      this.camsDone = []
      this.setBar = 'Left'
      this.setCamPlace = 1
    },
    saveCams () {
      console.log('will commit to api')
      this.close()
    }
  }
}
</script>
