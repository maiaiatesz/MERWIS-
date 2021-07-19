<template>
  <q-page>
    <q-tabs color="secondary">
      <!-- Tabs - notice slot="title" -->
      <q-tab default slot="title" name="tab-1" icon="person" label="Patient data" />
      <q-tab slot="title" name="tab-2" icon="assignment" label="Details" />
      <!-- <q-tab slot="title" name="tab-4" icon="accessibility" label="Import data" /> -->

      <!-- Targets -->
      <q-tab-pane name="tab-1">
        <div class="column items-baseline form-holder">
          <div class="detail-row" style="margin-top: 3vh;">
            <div class="">
              Firstname
            </div>
            <div class="" v-if="!edit">
              {{ userData.fname }}
            </div>
            <div class="w-100" v-if="edit">
              <q-input v-model="userData.fname" />
            </div>
          </div>
          <div class="detail-row items-baseline">
            <div class="">
              Latname
            </div>
            <div class="" v-if="!edit">
              {{ userData.lname }}
            </div>
            <div class="w-100" v-if="edit">
              <q-input v-model="userData.lname" />
            </div>
          </div>
          <div class="detail-row items-baseline">
            <div class="">
              Birthdate:
            </div>
            <div class="" v-if="!edit">
              {{ userData.birthday }}
            </div>
            <div class="w-100" v-if="edit">
              <q-input v-model="userData.birthday" />
            </div>
          </div>
          <div class="detail-row items-baseline">
            <div class="">
              Birth place
            </div>
            <div class="" style="text-align: right;" v-if="!edit">
              {{ userData.birthplace }}
            </div>
            <div class="w-100" v-if="edit">
              <q-input v-model="userData.birthplace" />
            </div>
          </div>
          <div class="detail-row items-baseline">
            <div class="">
              Address
            </div>
            <div class="" style="text-align: right;" v-if="!edit">
              {{ userData.address }}
            </div>
            <div class="w-100" v-if="edit">
              <q-input v-model="userData.address" />
            </div>
          </div>
          <div style="margin: 17px 0 10px 0;">
            <p class="sub-header" style="margin: 0; padding-left: 13px; color: #4f6272;">Contact informations</p>
          </div>
          <div class="detail-row">
            <div class="">
              <q-icon name="phone" style=""/>
            </div>
            <div class="" v-if="!edit">
              {{ userData.phone }}
            </div>
            <div class="" v-if="edit">
              <q-input v-model="userData.phone" />
            </div>
          </div>
          <div class="detail-row">
            <div class="">
              <q-icon name="mail" style=""/>
            </div>
            <div class="" v-if="!edit">
              {{ userData.mail }}
            </div>
            <div class="w-100" v-if="edit">
              <q-input v-model="userData.mail" />
            </div>
          </div>
          <div style="margin: 17px 0 10px 0;">
            <p class="sub-header" style="margin: 0; padding-left: 13px; color: #4f6272;">Frequent medications</p>
          </div>
          <div class="detail-row">
            <p style="padding-left: 13px;" v-if="!edit">{{ userData.freqmed }}</p>
            <!-- <q-input v-model="userData.freqmed" v-if="edit" /> -->
            <textarea rows="4" cols="30" style="width: 100%" v-if="edit"  v-model="userData.freqmed" placeholder="Frequent medications" ></textarea>
          </div>

          <div style="margin: 17px 0 10px 0;">
            <p class="sub-header" style="margin: 0; padding-left: 13px; color: #4f6272;">Other note</p>
          </div>
          <div class="detail-row">
            <p style="padding-left: 13px;" v-if="!edit">{{ userData.othernote }} </p>
            <!-- <q-input v-model="userData.othernote" v-if="edit" /> -->
            <textarea rows="4" cols="30" style="width: 100%" v-if="edit"  v-model="userData.othernote" placeholder="Notes" ></textarea>
          </div>

          <div class="row col" style="width: 100%;  justify-content: space-around; margin-top: 20px;">
            <q-btn color="primary" size="sm" icon="save" label="Save" style="align-self: center;" @click="saveEdit" v-if="edit" />
            <q-btn color="primary" size="sm" icon="save" label="Save" style="align-self: center;" @click="finalSave" v-if="!edit" />
            <q-btn color="secondary"  outline size="sm" label="Modify" style="align-self: center;" @click="edit = !edit" v-if="!edit" />
          </div>
        </div>

      </q-tab-pane>
      <q-tab-pane name="tab-2">
        <question-step></question-step>
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import Form from '../components/Form'

export default {
  name: 'AddPatient',
  data: () => ({
    edit: true,
    userData: {
      // id: 0,
      avatar: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/ID/en/999/UP1018-CUSA00133_00-ASIA000000000042/1543458368000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000',
      fname: '',
      lname: '',
      birthday: '',
      birthplace: '',
      address: '',
      phone: '',
      mail: '',
      freqmed: '',
      othernote: '',
      lastvisit: '2018.10.12'
      // lastsamples: '2018.10.12',
      // collections: [0],
      // panoramas: [1],
      // snapshots: [0]

    }
  }),
  computed: {
    ...mapGetters({
      getHighestPat: 'patients/getHighestPat'
    })
  },
  components: {
    'question-step': Form
  },
  created () {

  },
  methods: {
    saveEdit () {
      this.edit = false
    },
    finalSave () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure the datas are correct?',
        ok: 'Yes',
        cancel: 'No'
      }).then(() => {
        // push to patients
        this.$q.notify('Changes has been saved!')
        // open new patient's page
      }).catch(() => {
        this.edit = true
        // this.$q.notify('Changes has been discarded.')
      })
    }
  }
}
</script>

<style strict>
  .form-holder {
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
  }
  .detail-row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
  .w-100 {
    width: 100%;
  }
  @media only screen and (min-width: 600px) {
    .detail-row {
      display: flex;
      flex-direction: row;
    }
    .w-100 {
      width: unset;
    }
  }
</style>
