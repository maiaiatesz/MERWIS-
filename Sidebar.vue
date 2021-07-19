<template>
  <div class="d-flex flex-row">
    <transition name="slide">
      <v-touch @swipeleft="onSwipeLeft" id='sidebar' v-if="showSidebar">
        <div class='list-group border-0 card'>
          <router-link to="/dashboard/main"
          class='list-group-item d-inline-block text-left'
          @click.native="showSidebar = !showSidebar">
            <i class="material-icons bottom">home</i>
            <span class='d-md-inline'>{{ 'DASHBOARD.HOME' | translate }}</span>
          </router-link>
          <router-link to="/dashboard/messages"
            class='list-group-item d-inline-block text-left'
            @click.native="showSidebar = !showSidebar">
            <i class="material-icons bottom">mail_outline</i>
            <span class='d-md-inline'>{{ 'DASHBOARD.MESSAGES' | translate }}</span>
          </router-link>
          <router-link to="/dashboard/find"
            class='list-group-item d-inline-block text-left'
            @click.native="showSidebar = !showSidebar">
            <i class="material-icons bottom">location_city</i>
            <span class='d-md-inline'>{{ 'DASHBOARD.MED_STATIONS' | translate }}</span>
          </router-link>
          <!-- <router-link to="/dashboard/player" -->
          <router-link to="/dashboard/collections"
            class='list-group-item d-inline-block text-left'
            @click.native="showSidebar = !showSidebar">
            <i class="material-icons bottom">photo_library</i>
            <span class='d-md-inline'>{{ 'DASHBOARD.MY_MELANOMAS' | translate }}</span>
          </router-link>
          <!-- <router-link to=""
            class='list-group-item d-inline-block text-left'
            @click.native="showSidebar = !showSidebar">
            <i class="material-icons bottom">folder_open</i>
            <span class='d-md-inline'>{{ 'DASHBOARD.DOCUMENTS' | translate }}</span>
          </router-link> -->
          <router-link to="/dashboard/profile"
            class='list-group-item d-inline-block text-left'
            @click.native="showSidebar = !showSidebar">
            <i class="material-icons bottom">settings</i>
            <span class='d-md-inline'>{{ 'DASHBOARD.SETTINGS' | translate }}</span>
          </router-link>
        </div>
      </v-touch>
    </transition>

    <v-touch @swipeleft="onSwipeLeft" @swiperight="onSwipeRight"
    class="content" :class="{ pushToRight: showSidebar }">
      <nav class="nav sticky-top" style="position: absolute; z-index: 1021;">
        <a class="nav-link active"
        @click="showSidebar = !showSidebar"
        style="color: white">
          <i class="material-icons">menu</i>
          </a>
      </nav>
      <slot></slot>
    </v-touch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSidebar: false,
    };
  },
  methods: {
    onSwipeLeft() {
      this.showSidebar = false;
    },
    onSwipeRight() {
      this.showSidebar = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../shared/colors';

$transition-style: 0.3s ease;
$sidebarSize: 200px;

#sidebar {
  overflow: hidden;
  z-index: 3;
}
#sidebar .list-group {
  //background-color: $sidebar-background;
  background-color: #5c7171;
  min-height: 100vh;
}
#sidebar i {
  margin-right: 6px;
}

#sidebar .list-group-item {
  border-radius: 0;
  //background-color: $sidebar-background;
  //color: #ccc;
  background-color: rgba(132, 132, 132, 0.09019607843137255);
  color: #d7f0f8;
  border-left: 0;
  border-right: 0;
  //border-color: $sidebar-item-border;
  white-space: nowrap;
  border: none;
}

/* highlight active menu */
#sidebar .list-group-item:not(.collapsed) {
  //background-color: $sidebar-highlight;
}

/* open state */
#sidebar .list-group .list-group-item[aria-expanded="true"] {
  background-color: $sidebar-highlight;
}

/* level 1*/
#sidebar .list-group .collapse .list-group-item,
#sidebar .list-group .collapsing .list-group-item  {
  padding-left: 20px;
}

.slide-enter {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}

.pushToRight {
  transform: translateX($sidebarSize);
}

.content {
  position: fixed;
  width: 100% !important;
  height: 100%;
  transition: $transition-style;
}

#sidebar {
  transition: $transition-style;
}

@media (max-width:768px) {
  #sidebar {
    min-width: 35px;
    max-width: 40px;
    overflow-y: auto;
    overflow-x: visible;
  }

  #sidebar::-webkit-scrollbar{
    width: 0px;
  }

  #sidebar, #sidebar .list-group {
    min-width: $sidebarSize;
    overflow: visible;
  }
  /* overlay sub levels on small screens */
  #sidebar .list-group .collapse.show, #sidebar .list-group .collapsing {
    position: relative;
    z-index: 1;
    width: 190px;
    top: 0;
  }
  #sidebar .list-group > .list-group-item {
    text-align: center;
    padding: .75rem .5rem;
  }
  /* hide caret icons of top level when collapsed */
  #sidebar .list-group > .list-group-item[aria-expanded="true"]::after,
  #sidebar .list-group > .list-group-item[aria-expanded="false"]::after {
    display: none;
  }
}
.nav-link {
  color: #62a4cb !important;
  background: white;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  padding: 11px;
  margin: 5px;
  box-shadow: 1px 3px 5px 1px #c7e2e4;
}
</style>

