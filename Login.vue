<template>
  <q-page style="padding-top: 13vh;">
    <div class="decor-bar"></div>
    <div class="login-cont">
      <div class="login-input-box">
        <q-field helper="Phone or email">
          <q-input v-model="username" float-label="user@mail.com" />
        </q-field>

        <q-field style="margin-top: 10px;">
          <q-input v-model="password" float-label="Password" type="password" />
        </q-field>

        <div class="text-center" style="position: absolute; bottom: -37px; width: calc(100% - 8vw);">
          <q-btn style="width: 100%;"
          color="primary"
          size="md"
          label="Login"
          @click="login"
          />
          <small>Don't have an account? Registration</small>
        </div>

          <!-- TODO forgot pw, reg -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { userMock } from 'src/mocks'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('auth/logInUser', userMock)
      this.$router.push('/patients')
    }
  }
  // beforeRouteLeave (to, from, next) {
  //   TODO replace patient loading, TEMP code
  //   this.$store.dispatch('patients/fetchPatients')
  //   next()
  // }
}
</script>

<style>
.decor-bar {
  width: 100%;
  background: url('~assets/cabin.png');
  background-size: cover;
  height: 40vh;
}
.login-cont {
  margin: auto;
  width: 100%;
  height: 47vh;
  max-width: 100%;
  background: transparent;
  position: absolute;
  top: 10vh;
  display: flex;
  justify-content: center;
}
.login-input-box {
  padding: 5vh 4vw;
  width: 450px;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
}
</style>
