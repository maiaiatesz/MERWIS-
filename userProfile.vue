<template>

  <!-- TODO: navbar, header edit, fill comp. -->
  <div class="fullscreen">
    <!-- nav -->
    <div class="row m-0 msg-top sticky-top">
      <div class="right-align row">
       <!--  <div class="row mx-0 align-items-center nav-link">
          <i class="material-icons">event</i>
          <small>
            {{ 'DASHBOARD.APOINTMENT' | translate }}
          </small>
        </div> -->
      </div>
    </div>
    <!-- sender detail -->
    <div class="row mx-0 box-shadow blue-header header-100" style="padding: 10px 0 0 50px;">
      <div class="col-3 px-0" style="max-height: 100%;">
        <img class="round userprofile-img" src="http://outsourceworkers.com.au/wp-content/uploads/2015/02/virtual-assistant-outsource.jpg" alt="">
      </div>
      <div class="col-9 p-3 flex-v-center">
        <div class="header-name">Mrs. Cintia Lonhaerdtal jr.</div>
        <!-- <div class="row p-3">
          <div>
            <p class="no-margin">Hungary, Budapest</p>
            <small>1990.01.01.</small>
          </div>
        </div> -->
      </div>
    </div>
    <!-- Részletes adatlap -->
    <div class="row mx-0 box-shadow padded-comp">
      <div class="about-you" @click="fillForm">
        <div>About you</div>
        <i class="material-icons"> priority_high </i>
      </div>
      <small>You can't make an appointment until ....</small>
    </div>
    <!-- Contacts -->
    <div class="row mx-0 box-shadow">
      <p class="section-title darkgray">{{ 'DASHBOARD.CONTACTS' | translate }}</p>
      <div class="row m-0 align-items-center padded-comp list-link" style="width: 100%;"
      @click="showEmailChange = true">
        <i class="material-icons">mail_outline</i>
        <div>&nbsp; my@mail.com {{ userMail }} </div>
        <i class="material-icons arrow-right">keyboard_arrow_right</i>
      </div>
      <div class="row m-0 align-items-center padded-comp list-link" style="width: 100%;"
      @click="showPhoneChange = true">
        <i class="material-icons">phone_iphone</i>
        <div>&nbsp; +36 50 999 9999</div>
        <i class="material-icons arrow-right">keyboard_arrow_right</i>
      </div>
      <div class="row m-0 align-items-center padded-comp list-link"
      @click="showAddressChange = true">
        <i class="material-icons">place</i>
        <div>&nbsp; Budapest, 1033 That street 31.</div>
        <i class="material-icons arrow-right">keyboard_arrow_right</i>
      </div>
      <div class="row m-0 align-items-center padded-comp list-link"
      @click="showPwChange = true">
        <i class="material-icons">lock</i>
        <div>&nbsp; Change Password</div>
        <i class="material-icons arrow-right">keyboard_arrow_right</i>
      </div>
    </div>
    <!-- My doctors -->
    <div class="row mx-0 box-shadow flex-list">
      <p class="section-title darkgray">{{ 'DASHBOARD.MY_PRACTICIONERS' | translate }}</p>

      <!-- repeatable -->
      <div class="row m-0 list-link padded-comp">
        <img src="http://www.rozellemedicalcentre.com.au/wp-content/uploads/2015/01/LLH-Doctors-Female-Avatar-300x300.png" height="45px" style="margin-right: 10px;     border-radius: 50%;">
        Dr. Bernie Luchausen
      </div>

      <div class="row m-0 list-link padded-comp">
        <img src="https://www.manipalhospitals.com/uploads/doctors_photo/doctor_avatar.jpg" height="45px" style="margin-right: 10px;     border-radius: 50%;">
        Dr. Khelvoiyer Suzaku
      </div>

    </div>
    <!-- Settings -->
    <div class="row mx-0 padded-comp">
      <button class="btn btn-primary btn-block" @click="logout">Logout</button>
    </div>
    <div class="row mx-0 flex-list">
      <p class="section-title darkgray">{{ 'DASHBOARD.SETTINGS' | translate }}</p>
      <div class="row m-0 align-items-center padded-comp list-link">
        <div>Download my data</div>
        <!-- <i class="material-icons arrow-right">keyboard_arrow_right</i> -->
        <i class="material-icons">lock</i>
      </div>
      <div class="row m-0 align-items-center padded-comp list-link">
        <div>Deactivate account</div>
        <!-- <i class="material-icons arrow-right">keyboard_arrow_right</i> -->
        <i class="material-icons">lock</i>
      </div>
    </div>

    <!-- TODO: create verification modals for all of this steps -->
    <transition name="modal">
      <merwis-change-pw v-if="showPwChange" :close="closeModal" :newPw="newPw">
      </merwis-change-pw>
      <merwis-change-phone v-if="showPhoneChange" :close="closeModal" :newPhone="newPhone">
      </merwis-change-phone>
      <merwis-change-email v-if="showEmailChange" :close="closeModal" :newMail="newMail">
      </merwis-change-email>
      <merwis-change-address v-if="showAddressChange" :close="closeModal" :newAddr=newAddr>
      </merwis-change-address>
    </transition>

  </div>
</template>

<script>
import { logOutUser } from '@/store/actions';
import ProfileChangePw from './ProfileChangePw';
import ProfileChangePhone from './ProfileChangePhone';
import ProfileChangeEmail from './ProfileChangeEmail';
import ProfileChangeAddress from './ProfileChangeAddress';

export default {
  data() {
    return {
      showSidebar: false,
      showPwChange: false,
      showEmailChange: false,
      showPhoneChange: false,
      showAddressChange: false,
      // newPw: '',
      newPhone: '',
      newAddr: '',
      newMail: '',
    };
  },
  computed: {
    userPhone: {
      get() { return this.$store.state.userdata.phone; },
    },
    userAddr: {
      get() { return this.$store.state.userdata.adress; },
    },
    userMail: {
      get() { return this.$store.state.userdata.email; },
    },
  },
  methods: {
    onSwipeLeft() {
      this.showSidebar = false;
    },
    onSwipeRight() {
      this.showSidebar = true;
    },
    logout() {
      this.$store.dispatch(logOutUser);
    },
    fillForm() {
      this.$router.push('/ftu/data1');
    },
    closeModal() {
      this.showSidebar = false;
      this.showPwChange = false;
      this.showEmailChange = false;
      this.showPhoneChange = false;
      this.showAddressChange = false;
    },
  },
  components: {
    'merwis-change-pw': ProfileChangePw,
    'merwis-change-phone': ProfileChangePhone,
    'merwis-change-email': ProfileChangeEmail,
    'merwis-change-address': ProfileChangeAddress,
  },
};
</script>

<style lang="scss">
 @import '../shared/colors';

.section-title {
  width: 100%;
  padding: 1rem 0 0 1rem;
}
.about-you {
  width: 100%;
  margin: 1rem 0 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.arrow-right {
  color: #91c6cf;
}
.header {
  background-color: white;
}
.header-name {
  font-size: 120%;
}
.borderless {
  border: 0;
}

.bottom {
  vertical-align: bottom;
}
.header-filter-row {
  margin: 17px 10px 0 10px;
  display: flex;
  justify-content: space-between;
}
.padded-comp {
  padding: 1rem;
}
input {
  padding-left: 11px;
}
input:focus, input:active, {
  box-shadow: unset;
  border: none;
}
.userprofile-img {
  max-width: 100%;
  border-radius: 50%;
  margin-left: 10px;
}
.header-100 {
  min-height: 120px;
  img {
    max-height: 95%;
  }
}
</style>
