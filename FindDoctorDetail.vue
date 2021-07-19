<template>
  <div class="fullscreen modal-z">
    <!-- TODO: Can u send message here? To here or to the pract.? -->
    <!-- nav -->
    <div class="row m-0 p-2 box-shadow sticky-top align-items-center blue-header zind-9">
      <a @click="close" class="col-2 px-0">
        <i class="material-icons p-1">arrow_back</i>
      </a>
      <p align="center" class="m-0 col-10 px-0">{{ doctor.name }}</p>
    </div>
    <!-- picture -->
    <div class="p-2">
      <img :src="doctor.img" alt="" style="width: 100%;">
    </div>

    <!-- detail box -->
    <div class="box-shadow m-2">
      <p align="center" class="m-0 p-1"> {{ doctor.description }}</p>
      <hr width="15%" class="my-1">
      <div class="row m-0 p-2">
        <div class="col-8 px-0">
          <div class="py-1 m-2">
            {{ 'DASHBOARD.HOSPITAL_TYPE' | translate }}:
            {{ doctor.private ? 'PRIVATE' : 'NOT_PRIVATE' | translate }}
          </div>
          <div class="row m-2 align-items-center">
            <a href="tel:+3619998887">
              <i class="material-icons">phone</i>
            </a>
            <div>&nbsp; {{ doctor.phone }} </div>
          </div>
          <div class="row m-2 align-items-center">
            <a href="tel:+3619998887">
              <i class="material-icons">phone_iphone</i>
            </a>
            <div>&nbsp; {{ doctor.mobile }}</div>
          </div>
          <div class="row m-2 align-items-center">
            <a href="mailto:thi@mail.com">
              <i class="material-icons">mail_outline</i>
            </a>
            <div>&nbsp; {{ doctor.email }}</div>
          </div>
        </div>
        <small class="col-4 px-0 p-2">
          <table class="full-width" style="max-width: 200px;">
            <tbody>
              <tr class="stat-open">
                <td>Mon: </td>
                <td class="text-right">10am - 4pm</td>
              </tr>
              <tr>
                <td>Tue: </td>
                <td class="text-right">10am - 4pm</td>
              </tr>
              <tr>
                <td>Wed: </td>
                <td class="text-right">1pm - 7pm</td>
              </tr>
              <tr class="stat-closed">
                <td>Thu: </td>
                <td class="text-right">closed</td>
              </tr>
              <tr>
                <td>Fri: </td>
                <td class="text-right">10am - 4pm</td>
              </tr>
              <tr>
                <td>Sat: </td>
                <td class="text-right">1pm - 4pm</td>
              </tr>
              <tr>
                <td>Sun: </td>
                <td class="text-right">closed</td>
              </tr>
            </tbody>
          </table>
        </small>
      </div>
    </div>

    <!-- your doc -->
    <div class="box-shadow row m-2 align-items-center">
      <div class="p-2 darkgray" style="padding-bottom: .3em;">
        <!--TODO: mark the patient's doctors, click to doctor name-->
        <!--and redirect to doctor's personal page-->
        {{ 'DASHBOARD.YOUR_DOCTOR' | translate }}
      </div>
      <div class="row mx-0 box-shadow flex-list full-width">
        <!-- repeatable -->
        <div class="row m-0 list-link padded-comp">
          <img src="http://www.rozellemedicalcentre.com.au/wp-content/uploads/2015/01/LLH-Doctors-Female-Avatar-300x300.png" height="45px" style="margin-right: 10px;     border-radius: 50%;">
          Dr. Bernie Luchausen
        </div>

        <div class="row m-0 list-link padded-comp">
          <img src="https://www.manipalhospitals.com/uploads/doctors_photo/doctor_avatar.jpg" height="45px" style="margin-right: 10px;     border-radius: 50%;">
          Dr. Khelvoiyer Suzaku
        </div>

        <div class="row m-0 list-link padded-comp show-all-pract" @click="showPractitioners=true">
          Show all practitioners
        </div>

      </div>
    </div>

    <!-- address TODO: Clickin' to the addr go to navigation app? -->
    <div class="row m-0 align-items-center p-2">
      <i class="material-icons location-icon">place</i>
      <small>{{ doctor.address }}</small>
      <small class="right-align">13km</small>
    </div>
    <!-- map -->
    <gmap-map
      :center="{lat:47.529242, lng:19.072575}"
      :zoom="14"
      style="width: 100%; height: 300px"
    >
      <gmap-marker :position="{lat:47.529242, lng:19.072575}"></gmap-marker>
    </gmap-map>

    <transition name="modal">
      <merwis-showa-practitioners v-if="showPractitioners" :close="closePractitiones">
      </merwis-showa-practitioners>
    </transition>
  </div>
</template>

<script>
import FindDoctorDetailsPractitioners from './FindDoctorDetailsPractitioners';

export default {
  data() {
    return {
      showPractitioners: false,
    };
  },
  props: {
    close: {
      type: Function,
      required: true,
    },
    doctor: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closePractitiones() {
      this.showPractitioners = false;
    },
  },
  components: {
    'merwis-showa-practitioners': FindDoctorDetailsPractitioners,
  },
};
</script>

<style lang="scss">
@import '../shared/colors';

.box {
  border: 1px solid $notification-icon;
}
.stat-open {
  color: green
}
.stat-closed {
  color: red;
}
.show-all-pract {
  padding: 1em 0 1em 0;
}
.padded-comp {
  padding: .5em  .7em;
}
</style>
