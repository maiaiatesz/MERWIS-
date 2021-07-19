<template>
  <div class="fullscreen modal-z">
    <a class="nav-link" @click="close" style="position: fixed; z-index: 999;">
      <i class="material-icons">arrow_back</i>
    </a>
    <!-- nav -->
    <div class="sticky-top blue-header collections-header box-shadow p-0">
      <div class="title p-2">{{ selectedCollection.name }}</div>
      <!-- <i class="material-icons md-48 pull-right edit-album nav-link">more_vert</i> -->
      <!-- TODO album methods: edit (rename, category), archive, delete -->
      <b-dropdown variant="link" size="lg" class="pull-right edit-album nav-link" no-caret>
        <template slot="button-content">
          <i class="material-icons md-48">more_vert</i>
        </template>
        <!--  TODO forditas!!! -->
        <b-dropdown-item href="#" @click="modalEdit = !modalEdit">
          {{ 'COLLECTIONS.COL_EDIT' | translate }}
        </b-dropdown-item>
        <b-dropdown-item href="#" @click="showArchiveMod = !showArchiveMod"
        v-if="this.selectedCollection.photos[0]">
          {{ 'COLLECTIONS.COL_ARCHIVE' | translate }}
        </b-dropdown-item>
        <!-- <b-dropdown-item href="#">
          {{ 'COLLECTIONS.COL_INFORMATIONS' | translate }}
        </b-dropdown-item> -->
      </b-dropdown>
    </div>

    <!-- new photo album if no opened today-->
    <div class="row mx-0 new-image" @click="newPhotos" v-if="!newAlbumToday && showInteract()">
      <div class="col-12" style="display: table-row;">
        + {{ 'COLLECTIONS.COL_N_PHOTOS' | translate }}
      </div>
    </div>

    <!-- if album is archived -->
    <!-- TODO : information modal about archived content -->
    <div class="row mx-0 new-image" v-if="showInteract()==false">
      <div class="col-12 text-center" style="display: table-row;">
        {{ 'COLLECTIONS.COL_ALREADY_ARCHIVED' | translate }}
      </div>
    </div>

    <!-- TODO : empty space -->
    <div class="row mx-0 empty-state" v-if="!this.selectedCollection.photos[0]">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXjfyg4qPsimTHmA8bDRGOj1b6H5vBQnZf6PuuhUUxviNR7RaVwA" align="center" style="opacity: .2;">
      <div class="col-12 text-center" style="display: table-row;">
        {{ 'COLLECTIONS.COL_START' | translate }}
      </div>
    </div>

    <!-- one album TODO: move into a component, delete picture func., add comments-->
    <div v-for="collection in this.selectedCollection.photos.slice().reverse()"
    class="row mx-0 p-1 box-shadow album-collection-elmnt" :key="collection.id">
      <div class="p-3 album-name-cont row">
        <div class="flex-grow">
          {{ collection.date | localDate }}
        </div>
        <div>
          <!-- TODO vue classes, colors form status -->
          <p class="darkgray">{{ colStatus[collection.status] }}</p>
        </div>
      </div>
      <div class="tag-holder">
        <div class="img-tag new-tag" v-if="collection.status === '3'">
          + {{ 'COLLECTIONS.COL_TAG' | translate }}
        </div>
        <div class="img-tag" v-for="tag in collection.tags.split(' ')"
        :key="tag.index">{{ tag }}</div>
      </div>
      <!-- if ablbum created today, he can add more photo -->
      <div class="px-0 new-image-here" @click="capCamerImg('input_' + collection.id)"
      v-if="collection.date === isToday && collection.status === '3'">
        + <i class="material-icons md-48"> camera_alt </i>
        <input type="file" name="takephoto" capture="camera"
        accept="image/*" v-bind:id="'input_' + collection.id"
        style="display: none;" v-bind:data-target="collection.id" @change="onFileChange">
      </div>
      <div class="px-0 last-img-div" v-for="pic in collection.photos.slice().reverse()"
      :key="pic.id"
      v-bind:style="{ backgroundImage: 'url('+ pic.url + ')' }"></div>
      <div class="flex-grow full-width"
      style="display: flex; justify-content: center; padding: 1.3em; align-items: center;"
      v-if="collection.status === '3'
      && collection.photos.length !== 0 && showInteract()">
          <!-- TODO translate -->
          <button class="btn btn-primary" style="margin-right: 20px"
          @click="sendToDoctor(collection.id)">
            {{ 'COLLECTIONS.COL_FIN_SEND' | translate }}
            <!-- Send or save? -->
          </button>
          <a @click="removeNewPhoto(collection.id)">
            {{ 'COLLECTIONS.COL_CANCEL' | translate }}
          </a>
        </div>
    </div>

    <!-- EDIT modal Component -->
    <b-modal v-model="modalEdit" title="Edit album" ok-title="Save" @ok="handleEdit"
    class="collectionModals">
      <form style="display: flex; flex-direction: column;">
        <input type="text" class="m-2" style="flex-grow: 1;" value="selectedCollection.name"
          v-model="selectedCollection.name">
        <div class="select-div m-2">
          {{ 'COLLECTIONS.COL_REMINDER' | translate }}
          <select class="modal-select" v-model='selectedCollection.notificationLevel'>
            <option v-for="(freq, index) in notifLvl" :key="freq" :value="index">{{ freq }}</option>
          </select>
        </div>
      </form>
    </b-modal>

    <!-- Archive modal -->
    <b-modal v-model="showArchiveMod" hide-footer title="Archive">
      <div class="d-block text-center">
        <h5>{{ 'COLLECTIONS.COL_SURE_ARCHIVE_Q' | translate }}</h5>
        <p>{{ 'COLLECTIONS.COL_SURE_ARCHIVE_D' | translate }}</p>
      </div>
      <div class="text-right">
        <button class="btn btn-secondary" @click="showArchiveMod = !showArchiveMod">No</button>
        <button class="btn btn-primary" @click="archiveNclose">Yes</button>
      </div>
    </b-modal>

  </div>
</template>

<script>
const toLocalDate = function toLocalDate(date) {
  let localizedDate = new Date(date);
  localizedDate = new Date(localizedDate).toLocaleDateString();
  return localizedDate;
};
const reverseOrder = function reverseOrder(value) {
  return value.slice().reverse();
};
export default {
  data() {
    return {
      newAlbumToday: false,
      modalEdit: false,
      colStatus: {
        0: 'Sent to your practitioner',
        1: 'In progress',
        2: 'Seen',
        3: 'Unsent',
      },
      notifLvl: {
        0: 'Weekly',
        1: 'Monthly',
        2: 'Never',
      },
      // TODO places -like arm/leg, category list, notif. levels (weekly...) ...
      // TODO: need an english tag-set
      showArchiveMod: false,
    };
  },
  props: {
    selectedCollection: {
      type: Object,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
  },
  methods: {
    archiveNclose() {
      // TODO: delete empty col
      this.selectedCollection.archived = true;
      this.showArchiveMod = !this.showArchiveMod;
    },
    handleEdit() {

    },
    maxId(mydata) {
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
    capCamerImg(clickId) {
      document.getElementById(clickId).click();
    },
    onFileChange(e) {
      const pushId = e.target.getAttribute('data-target');
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.createImage(files[0], pushId);
    },
    createImage(file, pushId) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedCollection.photos[pushId].photos.push({
          url: e.target.result,
          id: this.maxId(this.selectedCollection.photos[pushId].photos) + 1,
        });
        this.selectedCollection.latestPhoto = e.target.result;
        this.selectedCollection.lastUpdated = this.isToday;
      };
      reader.readAsDataURL(file);
    },
    newPhotos() {
      this.$data.newAlbumToday = true;
      const today = new Date();
      const maxIdBefore = this.maxId(this.selectedCollection.photos);
      const newId = (maxIdBefore === 0) ? -1 : maxIdBefore;
      this.selectedCollection.photos.push({
        date: `${today.getFullYear()}, ${today.getMonth() + 1}, ${today.getDate()}`,
        photos: [],
        tags: '',
        status: '3',
        id: newId + 1,
      });
    },
    findInd(data, index) {
      let result;
      let i = 0;
      while (i < data.length) {
        if (data[i].id === index) {
          result = i;
        }
        i += 1;
      }
      return result;
    },
    removeNewPhoto(index) {
      this.selectedCollection.photos.splice(this.findInd(this.selectedCollection.photos, index), 1);
      this.$data.newAlbumToday = false;
    },
    removeCollection(delId) {
      this.selectedCollection.splice(this.findInd(delId), 1);
    },
    sendToDoctor(index) {
      // this.$data.newAlbumToday = false;
      const realId = this.findInd(this.selectedCollection.photos, index);
      if (this.selectedCollection.photos[realId].photos.length !== 0) {
        this.selectedCollection.photos[realId].status = '0';
      }
      if (this.selectedCollection.photos[realId].date === this.isToday) {
        this.newAlbumToday = true;
      }
    },
    showInteract() {
      let show = true;
      if (this.selectedCollection.archived === true) {
        show = false;
      }
      return show;
    },
  },
  computed: {
    isToday() {
      let today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      today = `${yyyy}, ${mm}, ${dd}`;
      return today;
    },
  },
  filters: {
    localDate: toLocalDate,
    reverse: reverseOrder,
  },
};
</script>

<style lang="scss">
@import '../shared/colors';

img {
  max-width: 100%;
  max-height: 80px;
}
.select-div {
  display: flex;
  justify-content: space-between;
}
.last-img-div {
  background-image: url(https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 130px;
  height: 95px;
  margin: 5px;
}
.album-name-cont {
  width: 100%;
}
.edit-album {
    position: absolute;
    top: 0;
    right: 0;
    padding: 13px;
    button {
      padding: 0;
    }
}
.album-collection-elmnt {
  margin-top: .7em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.tag-holder {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.img-tag {
  padding: .1em 1em;
  // border: 1px solid #799279;
  margin: 5px 3px;
  // border-style: dashed;
  border-radius: 7px;
  cursor: pointer;
}
.new-tag {
  // border-color: #ababab;
  color: #ababab;
}
.new-image {
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
.new-image-here {
  width: 130px;
  height: 95px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  .material-icon {
    font-size: 36px !important;
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
.collections-header {
  height: 55px;
  z-index: 9;
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

