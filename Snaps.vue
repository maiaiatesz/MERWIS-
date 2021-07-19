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
        Snapshots
      </div>
    </div>

    <div class="cont-holder">
      <!-- left sidebar -->
      <left-sidedata :userData="userData" :tempData="tempData" :edit="editData" :saveEdit="saveEdit" :cancel="cancelEdit" :startEdit="startEdit"></left-sidedata>
      <!-- main content -->
      <div class="rightside column">
        <div class="">
          Filters
        </div>
        <div class="row inline">
          <div class="album-items column col">
            <div class="row" style="flex-wrap: wrap">

              <!-- TODO cam num & doc id ? -->
              <q-card v-for="snap in userSnapshots" :key="snap.id" class="snapCard">
                <q-card-media>
                  <img :src="snap.url">
                </q-card-media>
                <q-card-title>
                  {{ snap.date }}
                  <span slot="subtitle">{{ snap.tags }}</span>
                </q-card-title>
                <!-- <q-card-separator /> -->
                <q-card-main>
                  {{ snap.comments }}
                </q-card-main>
              </q-card>

            </div>
          </div>
          <!-- <div class="">
            Right Chat & notes
          </div> -->
        </div>

      </div>
    </div>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import LeftDatabar from '../components/LeftDatabar'

export default {
  data: () => ({
    userData: [],
    tempData: [],
    editData: false,
    userSnapshots: [],
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
    this.$store.dispatch('patients/fetchSnapshots')
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
      getSnapshots: 'patients/getPatSnapshots'
    })
  },
  components: {
    'left-sidedata': LeftDatabar
  },
  methods: {
    fetchData () {
      this.userData = this.userDetails(this.$route.params.userId)
    },
    fetchColl () {
      let z
      for (z in this.userData.snapshots) {
        this.userSnapshots.push(this.getSnapshots(this.userData.snapshots[z]))
      }
    },
    highestId (data) {
      if (data.length === 0) return -1
      return Math.max(...data.map(indata => indata.id))
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
