<template>
  <div class='container-fluid main-cont'>
    <merwis-sidebar>
      <router-view></router-view>
    </merwis-sidebar>
  </div>
</template>

<script>
import Sidebar from './Sidebar';

export default {
  components: {
    'merwis-sidebar': Sidebar,
  },
};
</script>

<style lang="scss">
@import '../shared/colors';

.list-item-container {
  background-color: $messages-background;
  // border-top:  1px solid $notification-icon;
  // border-bottom: 1px solid $notification-icon;
}

.right-align {
  margin-left: auto;
  margin-right: 3%;
}

.scrollable {
  max-height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.title {
  text-align: center;
  font-size: larger;
  // padding-bottom: 13px;
}

.bottom-line {
  border-bottom: 1px solid $notification-icon;
}

.container-fluid {
  padding: 0px;
}

.list-item-body {
  max-width: 75%;
  min-width: 75%;
  //margin-top: 3%;
}

.darkgray {
  color: $gray-text;
}

.fullscreen {
  // z-index: 9999;
  background-color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: all 0.25s ease;
}

.modal-enter {
  opacity: 0;
  transform: scale(0.4);
}

.modal-leave-active {
  opacity: 0;
  transform: scale(0.4);
}
.modal-z {
  z-index: 9999;
  position: fixed;
}
.small-w-cont {
  width: 100%;
  max-width: 420px;
}
.add-fontsize {
  font-size: large;
}
.flex-v-center {
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.full-width {
  width: 100%;
}
.flex-list {
  display: flex;
  flex-direction: column;
}
.list-link {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.list-link > div {
  flex-grow: 1;
}
.list-link:hover {
  background-color: #e9f8fe;
  cursor: pointer;
}
.zind-9 {
  z-index: 9;
}
.flex-grow {
  flex-grow: 1;
}
.collectionModals  input {
  padding: 3px 15px;
  width: 100%;
}
.collectionModals {
  .modal-select {
    padding: 3px 15px;
    background: #ffffff7a !important;
    border-radius: 17px !important;
    border: 2px solid #c2dddf !important;
  }
}
</style>
