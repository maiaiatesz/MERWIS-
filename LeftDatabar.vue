<template>
  <div class="leftside">
    <div class="row inline justify-around" style="margin-top: 3vh;">
      <q-btn color="primary" size="sm" icon="file_copy" label="Details" outline v-if="!edit" />
      <q-btn color="primary" size="sm" icon="mail_outline" outline style="align-self: flex-end; margin: 0 5px 0 5px;" v-if="!edit" />
      <q-btn color="primary" size="sm" icon="edit" label="Edit" outline style="align-self: flex-end;" @click="startEdit" v-if="!edit" />
      <q-btn color="danger" size="sm" icon="cancel" label="Cancel" outline style="align-self: flex-end;" @click="cancel" v-if="edit" />
      <q-btn color="primary" size="sm" icon="save" label="Save" style="align-self: flex-end;" @click="saveEdit" v-if="edit" />
    </div>
    <div style="display: flex; flex-direction: column; margin-top: 3vh; flex-wrap: wrap;">
      <div class="detail-row items-baseline">
        <div class="">
          Firstname
        </div>
        <div class="" v-if="!edit">
          {{ userData.fname }}
        </div>
        <div class="" v-if="edit">
          <q-input v-model="tempData.fname" />
        </div>
      </div>
      <div class="detail-row items-baseline">
        <div class="">
          Latname
        </div>
        <div class="" v-if="!edit">
          {{ userData.lname }}
        </div>
        <div class="" v-if="edit">
          <q-input v-model="tempData.lname" />
        </div>
      </div>
      <div class="detail-row items-baseline">
        <div class="">
          Birthdate:
        </div>
        <div class="" v-if="!edit">
          {{ userData.birthday }}
        </div>
        <div class="" v-if="edit">
          <q-input v-model="tempData.birthday" />
        </div>
      </div>
      <div class="detail-row items-baseline">
        <div class="">
          Birth place
        </div>
        <div class="" style="text-align: right;" v-if="!edit">
          {{ userData.birthplace }}
        </div>
        <div class="" v-if="edit">
          <q-input v-model="tempData.birthplace" />
        </div>
      </div>
      <div class="detail-row items-baseline">
        <div class="">
          Address
        </div>
        <div class="" style="text-align: right;" v-if="!edit">
          {{ userData.address }}
        </div>
        <div class="" v-if="edit">
          <q-input v-model="tempData.address" />
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
          <q-input v-model="tempData.phone" />
        </div>
      </div>
      <div class="detail-row">
        <div class="">
          <q-icon name="mail" style=""/>
        </div>
        <div class="" v-if="!edit">
          {{ userData.mail }}
        </div>
        <div class="" v-if="edit">
          <q-input v-model="tempData.mail" />
        </div>
      </div>
      <div style="margin: 17px 0 10px 0;">
        <p class="sub-header" style="margin: 0; padding-left: 13px; color: #4f6272;">Frequent medications</p>
      </div>
      <div class="detail-row">
        <p style="padding-left: 13px;" v-if="!edit">{{ userData.freqmed }}</p>
        <!-- <q-input v-model="userData.freqmed" v-if="edit" /> -->
        <textarea rows="4" cols="30" v-if="edit"  v-model="tempData.freqmed" placeholder="Frequent medications" ></textarea>
      </div>

      <div style="margin: 17px 0 10px 0;">
        <p class="sub-header" style="margin: 0; padding-left: 13px; color: #4f6272;">Other note</p>
      </div>
      <div class="detail-row">
        <p style="padding-left: 13px;" v-if="!edit">{{ userData.othernote }} </p>
        <!-- <q-input v-model="userData.othernote" v-if="edit" /> -->
        <textarea rows="4" cols="30" v-if="edit"  v-model="tempData.othernote" placeholder="Notes" ></textarea>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftDatabar',
  props: {
    cancel: {
      type: Function,
      required: true
    },
    startEdit: {
      type: Function,
      required: true
    },
    saveEdit: {
      type: Function,
      required: true
    },
    edit: {
      type: Boolean,
      required: true
    },
    userData: {
      type: Object,
      required: true
    },
    tempData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // tempData: []
    }
  }
  // created () {
  //   this.tempData = JSON.parse(JSON.stringify(this.userData))
  // }
}
</script>

<style strict>
  textarea {
    max-width: 100%;
    margin-bottom: 15px;
    border: 1px solid #dc3ce04d;
    font-size: 15px;
    color: #474747;
    padding: 5px;
    margin: auto;
  }
  input {
    font-size: 15px !important;
  }
  .q-if {
    padding: 0 !important;
  }
</style>
