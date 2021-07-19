<template>
  <q-page>
    <div class="cust-breadcump">
      <q-icon name="home" style="font-size: 30px;" class="bred-home bred-active" />
      <!-- <div class="bred-name">
        Patients
      </div> -->
      <q-icon name="play_arrow" class="bred-divider" style="font-size: 30px;" />
      <div class="bred-name">
        {{ userData.fname }} {{ userData.lname }}
      </div>
      <q-icon name="play_arrow" class="bred-divider" style="font-size: 30px;" />
      <div class="bred-name">
        Panorama
      </div>
    </div>

    <div class="cont-holder wrap">
      <div class="col column" style="padding: 0 10px">
        <div class="col row">
          <div class="col column small-cams">
            <div class="col row items-center justify-center" @click="selectedCam=0">
              <img src="http://192.168.1.26:12345/control/cameras/0.mjpg" style="width: 100%; max-height: 100%;">
              <small class="text-tertiary" v-if="cam1Loading" style="position: absolute; left: 7px; bottom: 7px;">Connecting to camera 1 ...</small>
              <q-spinner-cube color="tertiary" :size="30" v-if="cam1Loading" />
            </div>
            <div class="col row items-center justify-center" @click="selectedCam=1">
              <!-- <img src="http://192.168.1.26:12345/control/cameras/1.mjpg" style="width: 100%; max-height: 100%;"> -->
              <small class="text-tertiary" v-if="cam2Loading" style="position: absolute; left: 7px; bottom: 7px;">Connecting to camera 2 ...</small>
              <q-spinner-cube color="tertiary" :size="30" v-if="cam2Loading"  />
            </div>
            <div class="col row items-center justify-center" @click="selectedCam=2">
              <!-- <img src="http://192.168.1.26:12345/control/cameras/2.mjpg" style="width: 100%; max-height: 100%;"> -->
              <small class="text-tertiary" v-if="cam3Loading" style="position: absolute; left: 7px; bottom: 7px;">Connecting to camera 3 ...</small>
              <q-spinner-cube color="tertiary" :size="30" v-if="cam3Loading"  />
            </div>
            <div class="col row items-center justify-center" @click="selectedCam=3">
              <!-- <img src="http://192.168.1.26:12345/control/cameras/3.mjpg" style="width: 100%; max-height: 100%;"> -->
              <small class="text-tertiary" v-if="cam4Loading" style="position: absolute; left: 7px; bottom: 7px;">Connecting to camera 4 ...</small>
              <q-spinner-cube color="tertiary" :size="30" v-if="cam4Loading" />
            </div>
          </div>
          <div class="col column small-cams">
            <div class="col row items-center justify-center" @click="selectedCam=4">
              <img src="http://192.168.1.26:12345/control/cameras/4.mjpg" style="width: 100%; max-height: 100%;">
              <small class="text-tertiary" v-if="cam5Loading" style="position: absolute; left: 7px; bottom: 7px;">Connecting to camera 5 ...</small>
              <q-spinner-cube color="tertiary" :size="30" v-if="cam5Loading" />
            </div>
            <div class="col row items-center justify-center" @click="selectedCam=5">
              <!-- <img src="http://192.168.1.26:12345/control/cameras/5.mjpg" style="width: 100%; max-height: 100%;"> -->
              <small class="text-tertiary" v-if="cam6Loading" style="position: absolute; left: 7px; bottom: 7px;">Connecting to camera 6 ...</small>
              <q-spinner-cube color="tertiary" :size="30" v-if="cam6Loading" />
            </div>
            <div class="col row items-center justify-center" @click="selectedCam=6">
              <!-- <img src="http://192.168.1.26:12345/control/cameras/6.mjpg" style="width: 100%; max-height: 100%;"> -->
              <small class="text-tertiary" v-if="cam7Loading" style="position: absolute; left: 7px; bottom: 7px;">Connecting to camera 7 ...</small>
              <q-spinner-cube color="tertiary" :size="30" v-if="cam7Loading" />
            </div>
            <div class="col row items-center justify-center" @click="selectedCam=7">
              <!-- <img src="http://192.168.1.26:12345/control/cameras/7.mjpg" style="width: 100%; max-height: 100%;"> -->
              <small class="text-tertiary" v-if="cam8Loading" style="position: absolute; left: 7px; bottom: 7px;">Connecting to camera 8 ...</small>
              <q-spinner-cube color="tertiary" :size="30" v-if="cam8Loading" />
            </div>
          </div>
          <div class="col column small-cams">
            <div class="col row items-center justify-center" @click="selectedCam=8">
              <img src="http://192.168.1.26:12345/control/cameras/8.mjpg" style="width: 100%; max-height: 100%;">
              <small class="text-tertiary" v-if="cam9Loading" style="position: absolute; left: 7px; bottom: 7px;">Connecting to camera 9 ...</small>
              <q-spinner-cube color="tertiary" :size="30" v-if="cam9Loading" />
            </div>
            <div class="col row items-center justify-center" @click="selectedCam=9">
              <!-- <img src="http://192.168.1.26:12345/control/cameras/9.mjpg" style="width: 100%; max-height: 100%;"> -->
              <small class="text-tertiary" v-if="cam10Loading" style="position: absolute; left: 7px; bottom: 7px;">Connecting to camera 10 ...</small>
              <q-spinner-cube color="tertiary" :size="30" v-if="cam10Loading" />
            </div>
            <div class="col row items-center justify-center" @click="selectedCam=10">
              <!-- <img src="http://192.168.1.26:12345/control/cameras/10.mjpg" style="width: 100%; max-height: 100%;"> -->
              <small class="text-tertiary" v-if="cam11Loading" style="position: absolute; left: 7px; bottom: 7px;">Connecting to camera 11 ...</small>
              <q-spinner-cube color="tertiary" :size="30" v-if="cam11Loading" />
            </div>
            <div class="col row items-center justify-center" @click="selectedCam=11">
              <!-- <img src="http://192.168.1.26:12345/control/cameras/11.mjpg" style="width: 100%; max-height: 100%;"> -->
              <small class="text-tertiary" v-if="cam12Loading" style="position: absolute; left: 7px; bottom: 7px;">Connecting to camera 12 ...</small>
              <q-spinner-cube color="tertiary" :size="30" v-if="cam12Loading" />
            </div>
          </div>
        </div>
        <div class="col-auto text-center">
          <small>Wrong camera order? <u class="text-tertiary" @click="calibratemodal = true" style="cursor: pointer;">Calibrate here</u></small>
        </div>
      </div>
      <div class="col column" style="padding: 0 10px">
        <div class="col cam-prew row items-center justify-center" style="position: relative;">
          <img v-bind:src="'http://192.168.1.26:12345/control/cameras/'+ selectedCam + '.mjpg'" style="width: 100%; max-height: 100%;">
          <!-- <q-spinner-cube color="tertiary" :size="30" /> -->
          <!-- <small class="text-tertiary" style="position: absolute; left: 7px; bottom: 7px;">Connecting to cameras ...</small> -->
        </div>
        <div class="col-auto row" style="margin-top: 17px;">
          <div class="col">
            <q-btn color="tertiary" outline size="sm" icon="zoom_in" />
            <q-btn color="tertiary" outline size="sm" icon="zoom_out"
            style="margin-left: 15px;" />
            <q-btn color="tertiary" outline size="sm" icon="fullscreen"
            style="margin-left: 15px;" />
          </div>
          <div class="col-auto">
            <q-btn @click="createSnapshot" color="tertiary" outline size="sm" icon="done" label="Create snapshot"
            style="margin-left: 15px;" />
          </div>
        </div>
        <div class="col-auto row justify-center" style="margin-top: 30px;">
          <q-btn @click="createPanorama" color="secondary" size="md" icon="accessibility_new" label="Create panorama photos" style="width: 100%;" />
        </div>
        <!-- photos taken -->
        <div class="col" style="padding: 17px 0;">
          <q-list highlight style="max-height: 100%; overflow-y: auto;">
            <q-item v-if="!tempTaken[0]">
              <q-item-main>
                <q-item-tile label class="text-center">
                  <b style="padding-right: 7px;">No photos yet!</b>
                </q-item-tile>
              </q-item-main>
            </q-item>
            <q-item v-for="(item, index) in tempTaken" :key="item.id">
              <q-item-side>
                <q-checkbox v-bind:val="index" v-model="checkedToDel" v-if="item.status===0" />
                <q-spinner  v-if="item.status===1" />
                <q-icon name="cancel" class="text-negative" style="padding-left: 3px; cursor: pointer;" v-if="item.status===3" />
              </q-item-side>
              <q-item-main>
                <q-item-tile label>
                  <b style="padding-right: 7px;">{{ item.id+1 }}</b> {{ item.time }} <small>( {{ typeList[item.type] }} )</small>
                </q-item-tile>
              </q-item-main>
              <q-item-side right>
                <small v-if="item.status===0" @click="viewPics(index)" style="cursor: pointer;" >View photos</small>
                <small class="text-info" v-if="item.status==1">In progress</small>
                <small class="text-danger" v-if="item.status===3">Unsuccesful, try again</small>
              </q-item-side>
            </q-item>
          </q-list>
        </div>
        <div class="col-auto row">
          <q-btn @click="saveSelected()" color="primary" size="sm" icon="save"  label="Save selected" class="col" />
          <q-btn @click="delSeleced" color="negative" outline size="sm" icon="delete" label="Discard selected" class="col-auto"
          style="margin-left: 15px;" />
          <q-btn color="tertiary" outline size="sm" icon="help_outline" label="Help" class="col-auto"
          style="margin-left: 15px;" @click="helpmodal = true" />
        </div>
      </div>
    </div>
    <cabin-help :opened="helpmodal" :close="closeHelpModal"></cabin-help>
    <cabin-calibrate :opened="calibratemodal" :close="closeCalibrateModal"></cabin-calibrate>
    <cabin-view-img :opened="viewmodal" :close="closeViewModal" :imgs="imgsToView"></cabin-view-img>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import HelpModal from '../components/CabinHelpModal'
import CalibrateModal from '../components/CabinCalibrate'
import CabinViewImgModal from '../components/CabinViewImgModal'
export default {
  // name: 'PageName',
  data () {
    return {
      userData: [],
      checkedToDel: [0],
      selectedCam: 0,
      helpmodal: false,
      calibratemodal: false,
      viewmodal: false,
      imgsToView: {},
      cam1Loading: false,
      cam2Loading: true,
      cam3Loading: true,
      cam4Loading: true,
      cam5Loading: false,
      cam6Loading: true,
      cam7Loading: true,
      cam8Loading: true,
      cam9Loading: false,
      cam10Loading: true,
      cam11Loading: true,
      cam12Loading: true,
      typeList: ['panorama', 'snapshot'],
      // status: 0-done, 1-inp, 3-error
      // TODO doc reg & get id
      tempTaken: [{
        type: 0,
        status: 0,
        id: 0,
        pics: ['http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340'],
        date: '2019,02,15',
        time: '15:05',
        notes: 'recskab.in',
        docId: 456
      }, {
        type: 1,
        status: 0,
        id: 1,
        url: 'http://placehold.it/400x400',
        date: '2019,01,01',
        time: '15:07',
        comments: 'recskab.in',
        tags: 'viszketős',
        camNum: 3,
        docId: 456
      }, {
        type: 0,
        status: 1,
        id: 2,
        pics: ['http://placehold.it/400x400', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340'],
        date: '2019,01,02',
        time: '15:08',
        notes: 'recskab.in',
        docId: 456
      }]
    }
  },
  computed: {
    ...mapGetters({
      userDetails: 'patients/getPatDetails',
      getHighestPano: 'patients/getHighestPano',
      getHighestSnaps: 'patients/getHighestSnaps'
    })
  },
  components: {
    'cabin-help': HelpModal,
    'cabin-calibrate': CalibrateModal,
    'cabin-view-img': CabinViewImgModal
  },
  created () {
    this.getuserData()
  },
  methods: {
    getuserData () {
      this.userData = this.userDetails(this.$route.params.userId)
    },
    closeHelpModal () {
      this.helpmodal = false
    },
    closeCalibrateModal () {
      this.calibratemodal = false
    },
    closeViewModal () {
      this.viewmodal = false
    },
    viewPics (index) {
      this.imgsToView = this.tempTaken[index]
      this.viewmodal = true
    },
    delSeleced () {
      console.log('1. checked: ', this.checkedToDel)
      if (this.checkedToDel) {
        for (var i = this.checkedToDel.length - 1; i >= 0; i--) {
          this.tempTaken.splice(this.checkedToDel[i], 1)
        }
        this.checkedToDel = []
      }
    },
    highestId (data) {
      if (data.length === 0) return -1
      return Math.max(...data.map(indata => indata.id))
    },
    reqImg (ind, i) {
      const url = 'http://192.168.1.26:12345/control/cameras/' + i + '.jpg.b64'
      this.$http.get(url).then(response => {
        // console.log(i, '. pic', response)
        // let b64Response = btoa(unescape(encodeURIComponent(response)))
        console.log(i, '. pic')
        if (this.tempTaken[ind].pics) {
          this.tempTaken[ind].pics[i] = 'data:image/jpeg;base64,' + response.body
        } else {
          this.tempTaken[ind].url = 'data:image/jpeg;base64,' + response.body
        }
      }, response => {
        console.log('error:', response)
      })
      console.log('temptaken: ', this.tempTaken[ind])
    },
    createPanorama () {
      // this.$http.get('http://192.168.1.26:12345/control/cameras/0.jpg').then(response => {
      //   console.log('1.:', response)
      // }, response => {
      //   console.log('error:', response)
      // })
      // this.$http.get('http://192.168.1.26:12345/control/pictures.json').then(response => {
      //   console.log('2.:', response.body)
      // })
      const newId = this.highestId(this.tempTaken) + 1
      const ind = this.tempTaken.length
      let panoPics = {
        type: 0,
        status: 0,
        id: newId,
        pics: [],
        date: '2019,02,15',
        time: '11:05',
        notes: 'recskab.in',
        docId: 456
      }
      this.tempTaken.push(panoPics)
      var i = 0
      for (i = 0; i < 12; i++) {
        console.log(i, '. loop')
        setTimeout(this.reqImg(ind, i), 1000)
      }
      console.log('panopics', panoPics)
      console.log('temptaken: ', this.tempTaken)
    },
    createSnapshot () {
      const newId = this.highestId(this.tempTaken) + 1
      const ind = this.tempTaken.length
      let snapPic = {
        type: 1,
        status: 0,
        id: newId,
        url: '',
        date: '2019,02,15',
        time: '11:07',
        comments: 'recskab.in',
        tags: 'viszketős',
        camNum: this.selectedCam,
        docId: 456
      }
      this.tempTaken.push(snapPic)
      setTimeout(this.reqImg(ind, this.selectedCam), 1000)
    },
    saveSelected () {
      let exPano = this.getHighestPano
      let exSnap = this.getHighestSnaps
      // console.log('save: ', exPano, exSnap)
      let ind = 0
      for (ind in this.checkedToDel) {
        // 0 -> panorama, 1 -> Snapshot
        let naObj = this.tempTaken[this.checkedToDel[ind]]
        console.log('Allin', ind, naObj.type, naObj)
        if (naObj.type === 0) {
          // console.log('anyád', ind, naObj.type, naObj)
          exPano++
          const newElmnt = {
            id: exPano,
            pics: naObj.pics,
            date: naObj.date,
            time: naObj.time,
            notes: naObj.notes,
            docId: naObj.docId
          }
          console.log('anyád: ', exSnap, newElmnt)
          this.$store.commit('patients/pushPanorama', {album: newElmnt, userid: this.$route.params.userId, id: exPano})
          this.$q.notify('Panorama has been saved!')
        } else {
          exSnap++
          const newElmnt = {
            id: exSnap,
            url: naObj.url,
            date: naObj.date,
            time: naObj.time,
            comments: naObj.comments,
            tags: naObj.tags,
            camNum: naObj.camNum,
            docId: naObj.docId
          }
          console.log('Snap: ', exSnap, newElmnt)
          this.$store.commit('patients/pushSnapshot', {album: newElmnt, userid: this.$route.params.userId, id: exSnap})
          this.$q.notify('Snapshot has been saved!')
        }
      }
      this.delSeleced()
    }
  }
}
</script>

<style scoped>
  .cont-holder {
    display: flex;
    flex-direction: row;
    min-height: calc(-140px + 100vh);
    align-items: stretch;
    padding: 5vh 5vw;
  }
  .cam-prew {
    border: 3px solid #4f6272;
    background: #f0f0f0;
    position: relative;
  }
  button {
    font-size:
  }
  .small-cams > div {
    // border: 1px solid #4f6272;
    background: #f0f0f0;
    position: relative;
  }
  @media screen and (max-width: 600px) {
    .cont-holder {
      flex-wrap: wrap;
    }
    .cont-holder > div {
      flex-basis: 100%;
    }
    .cam-prew {
      min-height: 80vw !important;
    }
  }
</style>
