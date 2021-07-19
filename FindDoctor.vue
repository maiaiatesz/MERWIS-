<template>
  <div class="d-flex flex-column scrollable">
    <div class="sticky-top blue-header box-shadow">
      <div class="title">{{ 'DASHBOARD.MED_STATIONS' | translate }}</div>
    </div>
    <div class="row white-bcg center-content p-2">
      <merwis-selectable v-model="open">
        {{ 'DASHBOARD.OPEN_NOW' | translate }}
      </merwis-selectable>
      <merwis-selectable v-model="isPrivate">
        {{ 'DASHBOARD.PRIVATE' | translate }}
      </merwis-selectable>
      <merwis-selectable v-model="notPrivate">
        {{ 'DASHBOARD.NOT_PRIVATE' | translate }}
      </merwis-selectable>
      <!-- TODO -->
      <!-- <merwis-selectable>
        Nearby
      </merwis-selectable> -->
    </div>
    <div class="scrollable div-overlay">
      <merwis-doctor v-for="doctor in filteredDoctors"
      :key="doctor.id"
      :doctor="doctor">
      </merwis-doctor>
    </div>
  </div>
</template>

<script>
import Doctor from './Doctor';

export default {
  data() {
    return {
      open: false,
      isPrivate: false,
      notPrivate: false,
    };
  },
  computed: {
    filteredDoctors() {
      return this.$store.getters.getDoctorsFiltered({
        open: this.open,
        isPrivate: this.isPrivate,
        notPrivate: this.notPrivate,
      });
    },

  },
  components: {
    'merwis-doctor': Doctor,
  },
};
</script>

