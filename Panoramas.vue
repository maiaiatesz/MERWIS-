<template>
  <q-page>
    <!-- nav header -->
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
        Panoramas
      </div>
    </div>

    <div class="cont-holder">
      <!-- left sidebar -->
      <left-sidedata :userData="userData" :tempData="tempData" :edit="editData" :saveEdit="saveEdit" :cancel="cancelEdit" :startEdit="startEdit"></left-sidedata>
      <!-- main content -->
      <div class="rightside column">
        <div class="text-right" style="padding: 16px;">
          <p><q-btn color="primary" size="md" icon="accessibility_new" label="New panorama" @click="goCabin" /></p>
        </div>
        <div class="row inline">
          <div class="album-items column col">
            <div class="row" style="flex-wrap: wrap">

              <!-- TODO cam num & doc id ? -->
              <q-card v-for="(pano, index) in userPanoramas" :key="pano.id" class="snapCard" @click.native="viewPics(index)">
                <q-card-title>
                  {{ pano.date }} {{ pano.time }}
                  <!-- TODO doc name here -->
                  <!-- <span slot="subtitle">{{ pano.docId }}</span> -->
                </q-card-title>
                <q-card-main>
                  <div class="">
                    <p style="font-size: 110%;" @click="viewPics(index)">{{ pano.notes }}</p>
                  </div>
                  <div class="row">
                    <div class="col">
                      <img :src="pano.pics[0]" width="100%">
                    </div>
                    <div class="col">
                      <img :src="pano.pics[4]" width="100%">
                    </div>
                    <div class="col">
                      <img :src="pano.pics[8]" width="100%">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <img :src="pano.pics[1]" width="100%">
                    </div>
                    <div class="col">
                      <img :src="pano.pics[5]" width="100%">
                    </div>
                    <div class="col">
                      <img :src="pano.pics[9]" width="100%">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <img :src="pano.pics[2]" width="100%">
                    </div>
                    <div class="col">
                      <img :src="pano.pics[6]" width="100%">
                    </div>
                    <div class="col">
                      <img :src="pano.pics[10]" width="100%">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <img :src="pano.pics[3]" width="100%">
                    </div>
                    <div class="col">
                      <img :src="pano.pics[7]" width="100%">
                    </div>
                    <div class="col">
                      <img :src="pano.pics[11]" width="100%">
                    </div>
                  </div>
                </q-card-main>
              </q-card>

            </div>
          </div>
          <!-- <div class="">
            Right Chat & notes
          </div> -->
        </div>

      </div>
      <cabin-view-img :opened="viewmodal" :close="closeViewModal" :imgs="imgsToView"></cabin-view-img>
    </div>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import CabinViewImgModal from '../components/CabinViewImgModal'
import LeftDatabar from '../components/LeftDatabar'

export default {
  data: () => ({
    userData: [],
    tempData: [],
    editData: false,
    userPanoramas: [],
    viewmodal: false,
    imgsToView: {},
    // loading: false,
    searchTerm: '',
    newAlbumName: '',
    sortSelect: 0,
    sortOptions: [
      {
        label: 'Latest first',
        value: 0
      },
      {
        label: 'Newest first',
        value: 1
      },
      {
        label: 'Alphabetical',
        value: 2
      }
    ]
  }),
  created () {
    this.$store.dispatch('patients/fetchPatients')
    this.$store.dispatch('patients/fetchPanoramas')
    this.fetchData()
    this.fetchColl()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData, fetchColl'
  },
  computed: {
    ...mapGetters({
      userDetails: 'patients/getPatDetails',
      getPanoramas: 'patients/getPatPanoramas'
    })
  },
  components: {
    'cabin-view-img': CabinViewImgModal,
    'left-sidedata': LeftDatabar
  },
  methods: {
    fetchData () {
      this.userData = this.userDetails(this.$route.params.userId)
    },
    fetchColl () {
      let z
      for (z in this.userData.panoramas) {
        this.userPanoramas.push(this.getPanoramas(this.userData.panoramas[z]))
      }
    },
    highestId (data) {
      if (data.length === 0) return -1
      return Math.max(...data.map(indata => indata.id))
    },
    closeViewModal () {
      this.viewmodal = false
    },
    viewPics (index) {
      this.imgsToView = this.userPanoramas[index]
      this.viewmodal = true
      console.log('FUCK U MUKODJ')
    },
    goCabin () {
      this.$router.push({ name: 'NewPano', params: { userId: this.$route.params.userId } })
    },
    // TODO replace to com
    startEdit () {
      this.editData = true
      this.tempData = JSON.parse(JSON.stringify(this.userData))
    },
    cancelEdit () {
      this.editData = false
    },
    async saveEdit () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you want to save your changes?',
        ok: 'Yes',
        cancel: 'No'
      }).then(() => {
        this.$store.commit('patients/editPatDetails', {things: this.tempData, userid: this.$route.params.userId})
        this.cancelEdit()
        this.fetchData()
        this.$q.notify('Changes has been saved!')
      }).catch(() => {
        this.cancelEdit()
        this.$q.notify('Changes has been discarded.')
      })
    }
    // replace to End
  }
}
</script>

<style>
  .cont-holder {
    display: flex;
    flex-direction: row;
    min-height: calc(-140px + 100vh);
    align-items: stretch;
  }
  .leftside {
    flex-basis: 25%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #d5d5d5;
  }
  .rightside {
    flex-grow: 1;
    border-right: 1px solid #d5d5d5;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
  }
  .snapCard {
    flex-basis: 30%;
    margin: 1.5%;
  }
  .snapCard:hover {
    border: 2px solid green;
    cursor: pointer;
  }
  @media screen and (max-width: 600px) {
    .cont-holder {
      flex-direction: column;
    }
    .leftside {
      flex-basis: unset;
    }
  }
</style>
