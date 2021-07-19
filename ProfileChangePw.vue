<template>
  <div class="fullscreen fullscreen-flex-col background-rad modal-z">
    <!-- nav -->
    <div class="row m-0 msg-top sticky-top">
      <a class="nav-link" @click="close" style="z-index: 9999999">
        <i class="material-icons">arrow_back</i>
      </a>
    </div>

    <div class="pw-field-container">
      <div class="box-shadow p-5 small-w-cont" style="background-color: white;">
        <div>
          <input type="password" class="form-control profile-current-margin" aria-label="oldpass"
              placeholder="Old password" >
        </div>
        <div>
          <input type="password" class="form-control profile-change-margin"
          aria-label="oldpass" placeholder="New password">
        </div>
        <div>
          <input type="password" class="form-control profile-change-margin"
          aria-label="oldpass" placeholder="New password">
        </div>
        <div>
          <button class="btn btn-primary btn-block" @click="changePw">
            Change password
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    close: {
      type: Function,
      required: true,
    },
  },
  methods: {
    changePw() {
      console.log('U sure wanna change brah? #insertModal here ~');
    },
  },
};
</script>

<style lang="scss">
@import '../shared/colors';

.pw-field-container {
  flex-grow: 1;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.fullscreen-flex-col {
  display: flex;
  flex-direction: column;
}
.profile-current-margin {
  margin-bottom: 2em;
}
.profile-change-margin {
  margin-bottom: .7em;
}
</style>
