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
    </div>

    <div class="cont-holder">
      <!-- left sidebar -->
      <left-sidedata :userData="userData" :tempData="tempData" :edit="editData" :saveEdit="saveEdit" :cancel="cancelEdit" :startEdit="startEdit"></left-sidedata>
      <!-- main content -->
      <div class="rightside">
        <!-- TODO : add search by tags -->
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; margin-top: 3vh; justify-content: space-between; padding: 0 16px;">
          <div style="display: flex; flex-direction: row; vertical-align: middle;">
            <p style="margin: 0; align-self: center; margin-right: 13px;">Sort by: </p>
            <q-select
            v-model="sortSelect"
            :options="sortOptions"
            />
          </div>
          <!-- <q-checkbox v-model="ispanorama" label="Panorama" />
          <q-checkbox v-model="ispoint" label="Point" /> -->
          <q-input v-model="searchTerm" class="searchInput wrap"
          :before="[
          {
            icon: 'search',
            content: true
          }]"
          placeholder="Search"
          style="align-self: flex-end;" />
          <q-btn color="primary" size="sm" icon="edit" label="New album"
          style="justify-self: flex-end;" @click="isnewalbum = !isnewalbum" />
        </div>

        <!-- newalbum collapsable -->
        <q-collapsible
          v-model="isnewalbum"
          icon="perm_identity"
          label="New album"
          >
          <new-album btnLabel="Finish and open" :editAlbum="newAlbumFrom" :albumDetails="newAlbum" :cancelAlbum="cancelAlbumEdit" ></new-album>
        </q-collapsible>

        <!-- panorama list -->
        <div class="text-center panobox" v-if="!userPanoramas">
          <p>You have no panorama photos yet. Let's take one!</p>
        </div>
        <div class="row panobox" v-if="userPanoramas" style="padding: 0;">
          <div class="">
            <q-btn color="secondary" size="md" label="New panorama" icon="accessibility_new" style="" @click="goCabin" />
          </div>
          <div class="col cursor-pointer" style="align-self: center; padding-left: 16px;" @click="goPanos">
            <p class="no-margin">Last panorama: {{ lastPanorama().date }}</p>
          </div>
        </div>

        <!-- Snapshot album -->
        <div @click="openSnaps"
        class="album-line row inline panobox"
        style="height: 90px; padding: 0 0 0 10px;">
          <div class="col-3" style="position: relative; align-self: center;">
            <p class="album-name">Cabin Snapshots</p>
          </div>
          <div class="col row inline no-wrap" style="overflow-x: auto; justify-content: end;">
            <!-- TODO album last 4 img -->
            <div class="albumprew-img" v-if="!lastSnaps()" style="margin: 0 0 0 5px;"></div>
            <div class="albumprew-img" v-if="lastSnaps()" v-for="snap in lastSnaps()" :key="snap.id" v-bind:style="{ backgroundImage: 'url('+ snap.url + ')' }" style="margin: 0 0 0 5px;"></div>
          </div>
          <!-- not sure if needed -->
          <!-- <div class="albumprew-imgicon">
            icons
          </div> -->
        </div>

        <!-- album list -->
        <div class="" style="margin-top: 30px; padding: 0 16px;">

          <div v-for="collect in userCollections" :key="collect.id" @click="openAlbum(collect.id)"
          class="album-line row inline"
          style="width: 100%; height: 90px; padding: 12px 0; border-bottom: 1px solid gray; border-top: 1px solid gray;">
            <div class="col-auto" style="padding-right: 7px; align-self: center;">
              <q-icon name="play_circle_outline" style="font-size: 50px;"/>
              <q-icon name="remove_red_eye" style="color: red; font-size: 20px; margin: 0 7px"/>
            </div>
            <div class="col-3" style="position: relative; align-self: center;">
              <p class="album-name">{{ collect.name }}</p>
              <p class="album-place">( Body placement )</p>
              <!-- TODO status icon: watching, sleeping -->
              <!-- <q-icon name="remove_red_eye" style="position: absolute; right: 7px; bottom: 17px; color: red;"/> -->
            </div>
            <div class="col row inline no-wrap" style="overflow-x: auto; justify-content: end;">
              <!-- TODO album last 4 img -->
              <div class="albumprew-img" v-if="colPrevImages" v-bind:style="{ backgroundImage: 'url('+ colPrevImages(collect, 4) + ')' }"></div>
              <div class="albumprew-img" v-if="colPrevImages" v-bind:style="{ backgroundImage: 'url('+ colPrevImages(collect, 3) + ')' }"></div>
              <div class="albumprew-img" v-if="colPrevImages" v-bind:style="{ backgroundImage: 'url('+ colPrevImages(collect, 2) + ')' }"></div>
              <div class="albumprew-img" v-if="colPrevImages" v-bind:style="{ backgroundImage: 'url('+ colPrevImages(collect, 1) + ')' }"></div>
            </div>
            <!-- not sure if needed -->
            <!-- <div class="albumprew-imgicon">
              icons
            </div> -->
          </div>

        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import LeftDatabar from '../components/LeftDatabar'
import EditAlbum from '../components/EditAlbum'
// import { Dialog } from 'quasar'

export default {
  name: 'PatientDetails',
  data: () => ({
    userData: [],
    tempData: [],
    editData: false,
    newAlbum: {},
    userCollections: [],
    userPanoramas: [{}],
    userSnapshots: [{}],
    // loading: false,
    searchTerm: '',
    // newAlbumName: '',
    // ispanorama: true,
    // ispoint: true,
    isnewalbum: false,
    newColDesc: '',
    newType: '0',
    newPlaceSelect: 0,
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
    this.$store.dispatch('patients/fetchCollections')
    this.$store.dispatch('patients/fetchPanoramas')
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
      getCollection: 'patients/getPatCollections',
      getPanoramas: 'patients/getPatPanoramas',
      getSnapshots: 'patients/getPatSnapshots',
      getMaxColl: 'patients/getHighestColl'
    })
  },
  components: {
    'left-sidedata': LeftDatabar,
    'new-album': EditAlbum
  },
  methods: {
    fetchData () {
      // this.loading = true
      // this.selectedUserId = this.$route.params.userId
      // this.getUserDetails(this.selectedUserId)
      // getPost(selectedUserId (err, post) => {
      //   this.loading = false
      //   if (err) {
      //     this.error = err.toString()
      //   } else {
      //     this.post = post
      //   }
      // })
      this.userData = this.userDetails(this.$route.params.userId)
    },
    fetchColl () {
      this.userCollections = []
      this.userPanoramas = []
      this.userSnapshots = []
      let x
      let colInfo = this.userData.collections
      for (x in colInfo) {
        this.userCollections.push(this.getCollection(colInfo[x]))
      }
      let y
      for (y in this.userData.panoramas) {
        this.userPanoramas.push(this.getPanoramas(this.userData.panoramas[y]))
      }
      let z
      for (z in this.userData.snapshots) {
        this.userSnapshots.push(this.getSnapshots(this.userData.snapshots[z]))
      }
    },
    highestId (data) {
      if (data.length === 0) return -1
      return Math.max(...data.map(indata => indata.id))
    },
    newAlbumFrom () {
      // const newId = this.highestId(this.userCollections) + 1
      const newId = this.getMaxColl + 1
      const newAlbumTo = [{
        id: newId,
        name: this.newAlbum.name,
        place: this.newAlbum.place,
        desc: this.newAlbum.desc,
        category: 'Melanoma',
        archive: false,
        notificationLevel: '1',
        latestPhoto: '',
        lastUpdated: '',
        photos: []
      }]
      // console.log('newId: ', newId, JSON.parse(JSON.stringify(newAlbumTo)))
      this.$store.commit('patients/newCollection', {album: JSON.parse(JSON.stringify(newAlbumTo)), userid: this.$route.params.userId})
      this.isnewalbum = !this.isnewalbum
      // refresh collections
      this.fetchColl()
      this.$q.notify('New album created.')
      // relloacte to newly created album page
      this.$router.push({ name: 'AlbumDetails', params: { userId: this.$route.params.userId, albumId: newId } })
    },
    colPrevImages (col, num) {
      let colLength = col.photos.length - num
      if (colLength > 0) {
        const lastItem = col.photos[colLength].photos.length - 1
        // console.log('kk:', col.photos, num, colLength)
        return col.photos[colLength].photos[lastItem].url
      }
    },
    openAlbum (goid) {
      this.$router.push({ name: 'AlbumDetails', params: { userId: this.$route.params.userId, albumId: goid } })
    },
    openSnaps () {
      this.$router.push({ name: 'Snaps', params: { userId: this.$route.params.userId } })
    },
    goCabin () {
      this.$router.push({ name: 'NewPano', params: { userId: this.$route.params.userId } })
    },
    goPanos () {
      this.$router.push({ name: 'Panos', params: { userId: this.$route.params.userId } })
    },
    lastPanorama () {
      const panoLeng = this.userPanoramas.length
      return this.userPanoramas[panoLeng - 1]
    },
    lastSnaps () {
      const snapsLen = this.userSnapshots.length
      if (snapsLen >= 6) {
        const point = snapsLen - 5
        return this.userSnapshots.slice(point)
      } else {
        return this.userSnapshots
      }
    },
    startEdit () {
      this.editData = true
      this.tempData = JSON.parse(JSON.stringify(this.userData))
    },
    cancelEdit () {
      this.editData = false
    },
    cancelAlbumEdit () {
      this.isnewalbum = false
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
  }
}
</script>

<style>
  .detail-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .detail-row> div:first-child {
    color: #4f6272;
  }
  .detail-row > div {
    padding: 5px 13px;
    font-size: 15px;
  }
  /* hide collapsable header */
  .q-collapsible-cursor-pointer > .q-collapsible-inner > .q-item {
    display: none;
  }
  .searchInput {
    flex-wrap: wrap !important;
  }
  .searchInput .q-icon {
    display: block !important;
  }
  .newAlbumCont {
    padding-top: 40px;
  }
  .album-line:hover {
    background-color: #e2e7fb;
    cursor: pointer;
  }
  .albumprew-img {
    width: 100px;
    height: 100px;
    background-size: cover;
    margin: 0 5px;
    height: 100%;
  }
  .album-name {
    font-size: 18px;
    margin-bottom: 8px;
  }
  .album-place {
    margin: 0;
    color: #8F92A2;
    font-size: 12px;
  }
  .sub-header {
    font-size:17px;
  }
  .newAlbumLeft {
    margin: 0 0 17px 0;
  }
  .panobox {
    border: 2px solid lightgray;
    margin: 45px 13px 20px 16px;
    padding-top: 18px;
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
