<template>
  <div class="newAlbumCont row inline" style="width: 100%;">
    <div class="col-xs-12 col-md-6" style="padding: 0 17px;">
      <div class="newAlbumLeft">
        <q-input v-model="albumDetails.name" class="searchInput wrap" @focus="editStart()"
        placeholder="Album name" />
      </div>
      <!-- <div class="col newAlbumLeft row justify-between">
        <q-radio v-model="newType" val="0" label="Panorama" />
        <q-radio v-model="newType" val="1" label="Point" />
        <q-radio v-model="newType" val="2" label="Mixed" />
      </div> -->
      <div class="col newAlbumLeft">
        <q-select
        v-model="albumDetails.place"
        :options="placeOptions"
        />
      </div>
      <div class="row">
        <div class="col" style="padding-right: 11px;">
          <q-select
          v-model="albumDetails.category"
          :options="categoryOptions"
          />
        </div>
        <div class="col" style="padding-left: 11px;">
          <q-select
          v-model="albumDetails.notificationLevel"
          :options="notifyOptions"
          />
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-6 column">
      <textarea rows="4" cols="50" v-model="albumDetails.desc" placeholder="Description"
      style="max-width: 100%; margin-bottom: 15px; border: 1px solid #dc3ce04d; font-size: 15px; color: #474747; padding: 5px;"></textarea>
      <div class="row justify-end">
        <q-btn color="negative" outline size="sm" icon="cancel" label="Cancel" v-if="editedFields || !existing"
        @click="cancelAlbum" />
        <q-btn color="secondary" size="sm" icon="done" :label="btnLabel" v-if="editedFields || !existing"
        style="margin-left: 15px;" @click="editAlbum" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumEdit',
  data () {
    return {
      originalData: [{}],
      placeOptions: [
        {
          label: 'Arm left',
          value: '0'
        },
        {
          label: 'Arm right',
          value: '1'
        },
        {
          label: 'Leg',
          value: '2'
        }
      ],
      categoryOptions: [
        {
          label: 'Melanoma',
          value: '0'
        },
        {
          label: 'Normal',
          value: '1'
        }
      ],
      notifyOptions: [
        {
          label: 'Weekly',
          value: '0'
        },
        {
          label: 'Monthly',
          value: '1'
        },
        {
          label: 'Never',
          value: '2'
        }
      ]
    }
  },
  props: {
    albumDetails: {
      type: Object,
      required: true
    },
    editAlbum: {
      type: Function,
      required: true
    },
    cancelAlbum: {
      type: Function,
      required: true
    },
    btnLabel: {
      type: String,
      required: true
    },
    existing: {
      type: Boolean,
      required: false
    },
    editedFields: {
      type: Boolean,
      required: false
    }
  },
  created () {
    this.checkEdit()
  },
  methods: {
    checkEdit () {
      if (this.existing === true) {
        this.originalData = JSON.parse(JSON.stringify(this.albumDetails))
        // console.log('Check existing: true ')
      }
      // console.log('Check existing ', this.originalData.name)
    },
    editStart () {
      this.editedFields = true
      console.log('SHOTS FIRED')
    }
  }
}
</script>

<style>
</style>
