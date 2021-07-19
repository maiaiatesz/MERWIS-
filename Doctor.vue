<template>
  <div>
    <div class="row list-item-container flex-list-cont box-shadow height-100px"
    @click="showDetail = true" style="max-height: 80px;">
      <!-- <div style="min-width: 4%;" :style="openStyle"></div> -->
      <div v-bind:style="{ width: '130px', backgroundImage: 'url(' + this.doctor.img + ')',
        backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }"
        class="hospital-imtem">
        <!-- <img class="p-2 maxw-100" :src="doctor.img" alt=""> -->
        <div class="open-hours" v-if="doctor.open" :style="openStyle">
          <span class="right-align">{{ doctor.open }}</span>
        </div>
      </div>
      <div class="hospital-item-body">
        <div>{{ doctor.name }}</div>
        <div class="row m-0 align-items-center no-wrap-line">
          <i class="material-icons location-icon">place</i><small>{{ doctor.address }}</small>
        </div>
        <!-- <div class="row m-0">
          <span class="right-align darkgray">{{ doctor.open }}</span>
        </div> -->
      </div>
    </div>
    <transition name="modal">
      <merwis-doctor-detail v-if="showDetail"
      :doctor="doctor" :close="closeModal"></merwis-doctor-detail>
    </transition>
  </div>
</template>

<script>
import FindDoctorDetail from './FindDoctorDetail';

export default {
  data() {
    return {
      showDetail: false,
    };
  },
  props: {
    doctor: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.showDetail = false;
    },
  },
  computed: {
    openStyle() {
      return {
        backgroundColor: this.doctor.isOpen ? 'rgba(32, 255, 114, 0.83)' : '#d13523',
      };
    },
  },
  components: {
    'merwis-doctor-detail': FindDoctorDetail,
  },
};
</script>

<style lang="scss">
.list-item-container {
  margin: 5px 0 0 0;
}
.hospital-imtem {
  height: 100%;
  min-width: 120px;
  img {
    max-height: 100%;
  }
  position: relative;
}
.scrollable  {
  overflow-x: hidden;
}
.height-100px {
  height: 100px;
}
.hospital-item-body{
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  white-space: nowrap;
  overflow-x: overlay;
  div {
    white-space: nowrap;
  }
}
.flex-list-cont {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.open-hours {
  position: absolute;
  bottom: 0;
  text-align: center;
  background: rgba(255, 255, 255, 0.74);
  width: 100%;
  color: black;
  font-weight: 500;
}
.no-wrap-line {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>

