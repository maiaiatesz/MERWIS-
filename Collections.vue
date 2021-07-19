<template>
  <div class="fullscreen">
    <!-- nav -->
    <div class="sticky-top blue-header box-shadow p-0">
      <div class="title p-2">{{ 'DASHBOARD.MY_MELANOMAS' | translate }}</div>
    </div>

    <!-- new album TODO: add album -->
    <div class="row mx-0 new-album" @click="newColModal = !newColModal">
      <div class="col-12">
        + {{ 'COLLECTIONS.COL_N_ALBUM' | translate }}
      </div>
    </div>

    <!-- album list TODO: add body picker, add Reminders : unsent content ... -->
    <div class="row mx-0 p-0 box-shadow album-elmnt"
    v-for="collection in collections.slice().reverse()" :key="collection.id"
    @click="openDetails(collection)">
      <div class="px-0 last-img-div"
      v-bind:style="{ backgroundImage: 'url('+ collection.latestPhoto + ')' }">
      </div>
      <div class="p-3 album-name-cont">
        {{ collection.name }}
        <br>
        <small>
          {{ 'COLLECTIONS.COL_UPDATED' | translate }}
          {{ collection.lastUpdated | localDate }}
        </small>
      </div>
      <div class="px-0 body-part-div">
      </div>
    </div>

    <transition name="modal">
      <merwis-col-details v-if="selectedCollection != false"
      :selectedCollection="selectedCollection" :close="closeCollection">
      </merwis-col-details>
    </transition>

    <!-- New collection modal TODO: translations! -->
    <b-modal v-model="newColModal" hide-footer title="New album" class="collectionModals">
      <div class="d-block text-center">
        <form style="display: flex; flex-direction: column;">
          <input type="text" class="m-2" style="flex-grow: 1;"
          v-model="newColName" placeholder="Album name">
          <div class="select-div m-2">
            {{ 'COLLECTIONS.COL_REMINDER' | translate }}
            <select class="modal-select" v-model="newColNoti">
              <option v-for="(freq, index) in notifLvl"
              :key="freq" :value="index">{{ freq }}</option>
            </select>
          </div>
        </form>
      </div>
      <div class="text-right">
        <button class="btn btn-secondary" @click="newColModal = !newColModal">
          {{ 'COLLECTIONS.COL_CANCEL' | translate }}
        </button>
        <button class="btn btn-primary" @click="addNewCollection">
          {{ 'COLLECTIONS.COL_CREATE' | translate }}
        </button>
      </div>
    </b-modal>

  </div>
</template>

<script>
import { pushNewCollection } from '@/store/actions';
import CollectionDetails from './CollectionDetails';

const toLocalDate = function toLocalDate(date) {
  let localizedDate = new Date(date);
  localizedDate = new Date(localizedDate).toLocaleDateString();
  return localizedDate;
};

export default {
  data() {
    return {
      notifLvl: {
        0: 'Weekly',
        1: 'Monthly',
        2: 'Never',
      },
      // openDetails: false,
      selectedCollection: false,
      newColModal: false,
      newColName: '',
      newColNoti: 0,
    };
  },
  methods: {
    closeCollection() {
      // this.$router.push('/dashboard/collectionDetails');
      this.selectedCollection = false;
    },
    openDetails(col) {
      this.selectedCollection = col;
    },
    highestId(mydata) {
      // const highest = Math.max(...indata.map(indata => indata.id));
      let maxId = 0;
      let i = 0;
      while (i < mydata.length) {
        if (mydata[i].id > maxId) {
          maxId = mydata[i].id;
        }
        i += 1;
      }
      return maxId;
    },
    addNewCollection() {
      // TODO: check if there is empty collection already
      this.newColModal = !this.newColModal;
      const newid = this.highestId(this.collections) + 1;
      const newCol = {
        id: newid,
        name: this.newColName,
        place: '0',
        category: 'Normal',
        archived: false,
        notificationLevel: this.newColNoti,
        latestPhoto: 'https://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg',
        lastUpdated: this.isToday,
        photos: [],
      };
      this.$store.dispatch(pushNewCollection, newCol);
      this.newColName = '';
      this.openDetails(newCol);
    },
  },
  computed: {
    collections() {
      return this.$store.getters.getCollections;
    },
    isToday() {
      let today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      today = `${yyyy}, ${mm}, ${dd}`;
      return today;
    },
  },
  components: {
    'merwis-col-details': CollectionDetails,
  },
  filters: {
    localDate: toLocalDate,
  },
};
</script>

<style lang="scss">
@import '../shared/colors';

.last-img-div {
  background-image: url(https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 130px;
}
.body-part-div {
  background-image: url(https://www.salinasvalleyplasticsurgery.com/files/2013/09/brachioplasty-300x200.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 130px;
}
.album-name-cont {
  flex-grow: 1;
}
.album-elmnt {
  margin-top: .7em;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  cursor: pointer;
}
.new-album {
  background-color: white;
  padding: 20px;
  div {
    border: 1px solid #62a4cb;
    border-style: dashed;
    padding: 10px;
    color: #62a4cb;
    cursor: pointer;
  }
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
</style>

