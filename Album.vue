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
        {{ userCollections.name }}
      </div>
    </div>

    <div class="cont-holder">
      <!-- left sidebar -->
      <!-- <div class="leftside"></div> -->
      <left-sidedata :userData="userData" :tempData="tempData" :edit="editData" :saveEdit="saveEdit" :cancel="cancelEdit" :startEdit="startEdit"></left-sidedata>
      <!-- main content -->
      <div class="rightside column">
        <div class="">
          <new-album :existing="true" btnLabel="Save changes" :editAlbum="editThisAlbum" :albumDetails="editedData" :cancelAlbum="cancelAlbumEdit" ></new-album>
        </div>
        <div class="row inline" style="padding-top: 5vh;">
          <div class="album-items column col">
            <div class="">
              <!-- Video nav n statistics -->
            </div>
            <div class="">
              <q-btn
              color="primary"
              size="md"
              label="New photos"
              @click="newColl"
              />
            </div>
            <div class="column">
              <div class="row inline">
                <div class="">
                  <!-- <q-uploader url="http://127.0.0.0:8080" /> -->
                </div>
              </div>
              <!-- Empty state - no albums -->
              <div class="text-center empty-col cursor-pointer" v-if="userCollections.photos.length === 0">
                No photos here yet. Let's take one!
              </div>

              <!-- collections in the album, newest upper -->
              <div class="column collec-card" v-for="(collection, key) in userCollections.photos" :key="collection.id">
                <div class="">
                  {{ collection.date }}
                </div>
                <div class="" style="padding: 12px 0;">
                  <!-- {{ collection.tags }} -->

                  <q-chips-input v-model="collection.tags" placeholder="Type a tag name" @duplicate="duplicate" chips-bg-color="secondary" style="max-width: 500px;" @add="selectTag">
                    <q-autocomplete @search="searchTag" />
                  </q-chips-input>
                </div>
                <div class="row inline">
                  <!-- Pics in the collection -->
                  <div class="column prev-img" v-for="pic in collection.photos" :key="pic.id"
                  v-bind:style="{ backgroundImage: 'url('+ pic.url + ')', width: '120px', height: '90px' }">
                  </div>
                  <!-- empty state -->
                  <div @click="capCamerImg('input_' + collection.id)"  class="column prev-img justify-center" style="width: 130px; min-height: 90px; height: 100%;">
                    <q-icon name="add_a_photo" size="43px" />
                    <input type="file" name="takephoto" capture="camera"
                    accept="image/*" v-bind:id="'input_' + collection.id"
                    style="display: none;" v-bind:data-target="key" @change="onFileChange">
                  </div>

                </div>
              </div>

            </div>
          </div>
          <!-- TODO chat & notes -->
          <!-- <div class="">
            <div class="" style="margin: 3vh 17px; padding: 4vh;">
              <p>Right chat & notes</p>
            </div>
          </div> -->
        </div>

        <q-modal v-model="imgViewModal">
          <h4>Basic Modal</h4>
          <q-btn
          color="primary"
          @click="imgViewModal = false"
          label="Close"
          />
        </q-modal>

      </div>
    </div>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { filter } from 'quasar'
import LeftDatabar from '../components/LeftDatabar'
import EditAlbum from '../components/EditAlbum'

export default {
  name: 'PatientDetails',
  data: () => ({
    userData: [],
    tempData: [],
    editData: false,
    editedFields: false,
    editedData: {},
    userCollections: [],
    // loading: false,
    searchTerm: '',
    newAlbumName: '',
    imgViewModal: false,
    ispanorama: true,
    ispoint: true,
    isnewalbum: false,
    tempColl: {},
    createColl: false,
    newType: '0',
    userTags: ['viszket', 'vérzik', 'hólyagos', 'gyulladt', 'vörös', 'nőtt'],
    terms: '',
    tagSearch: '',
    selectedTag: '',
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
    ],
    placeOptions: [
      {
        label: 'Arm left',
        value: 0
      },
      {
        label: 'Arm right',
        value: 1
      },
      {
        label: 'Leg',
        value: 2
      }
    ]
  }),
  created () {
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
      getTags: 'patients/getTags'
    })
  },
  components: {
    'left-sidedata': LeftDatabar,
    'new-album': EditAlbum
  },
  methods: {
    fetchData () {
      this.userData = this.userDetails(this.$route.params.userId)
      // this.userTags = this.getTags
    },
    fetchColl () {
      this.userCollections = this.getCollection(this.$route.params.albumId)
      this.editedData = JSON.parse(JSON.stringify(this.userCollections))
    },
    highestId (data) {
      console.log('hId data', data)
      if (data.length === 0) return -1
      return Math.max(...data.map(indata => indata.id))
    },
    parseTags () {
      return this.userTags.map(tag => {
        return {
          label: tag,
          value: tag
        }
      })
    },
    searchTag (terms, done) {
      setTimeout(() => {
        done(filter(terms, {field: 'value', list: this.parseTags()}))
      }, 300)
    },
    selectTag (item) {
      if (!this.userTags.includes(item.val)) {
        // TODO push & fetch tags from store
        this.userTags.push(item.val)
        this.$q.notify(`New tag has been added "${item.val}"`)
      } else {
        this.$q.notify(`Tag has been added "${item.val}"`)
      }
    },
    duplicate (label) {
      this.$q.notify(`"${label}" already in list`)
    },
    newColl () {
      console.log('new collection', this.userCollections)
      const newId = this.highestId(this.userCollections.photos) + 1
      this.tempColl = {
        id: newId,
        date: '2019.02.15',
        status: 3,
        tags: [],
        photos: []
      }
      // this.createColl = true
      this.userCollections.photos.push(this.tempColl)
      console.log('usercol: ', JSON.parse(JSON.stringify(this.userCollections)))
    },
    capCamerImg (clickId) {
      document.getElementById(clickId).click()
    },
    onFileChange (e) {
      const pushId = e.target.getAttribute('data-target')
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      console.log('244, Files[0]: ', files[0])
      this.createImage(files[0], pushId)
    },
    createImage (file, ind) {
      console.log('248, file: ', ind, this.userCollections.photos)
      const reader = new FileReader()
      reader.onload = (e) => {
        console.log('251, r.onload')
        this.userCollections.photos[ind].photos.push({
          url: e.target.result,
          id: this.highestId(this.userCollections.photos[ind].photos) + 1
        })
        console.log('255, usercol.ph.: ', this.userCollections.photos)
        this.userCollections.latestPhoto = e.target.result
        this.userCollections.lastUpdated = '2019.02.15'
      }
      reader.readAsDataURL(file)
    },
    // TODO replace to com
    startEdit () {
      this.editData = true
      this.tempData = JSON.parse(JSON.stringify(this.userData))
    },
    cancelEdit () {
      this.editData = false
      this.editedFields = false
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
    },
    // replace to End
    cancelAlbumEdit () {
      console.log('cancel edit')
      this.fetchColl()
    },
    editThisAlbum () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you want to save your changes?',
        ok: 'Yes',
        cancel: 'No'
      }).then(() => {
        // TODO rewrite to store commit
        this.userCollections.name = this.editedData.name
        this.userCollections.place = this.editedData.place
        this.userCollections.desc = this.editedData.desc
        this.userCollections.category = this.editedData.category
        this.userCollections.notificationLevel = this.editedData.notificationLevel
        this.userCollections.archived = this.editedData.archived
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
  .collec-card {
    padding: 10px;
    margin-bottom: 20px;
  }
  .prev-img {
    background-size: cover;
    background-position: center;
    margin-right: 15px;
    border: 2px solid transparent;
  }
  .prev-img:hover {
    border: 2px solid green;
  }
  .empty-col {
    margin: 3vh 17px;
    padding: 4vh;
    border: 1px solid #bdbdbd;
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
