<template>
 <div class="ftu-box fullscreen modal-z">
    <!-- nav -->
    <div class="row m-0 msg-top sticky-top blue-header">
      <a class="nav-link" @click="close" style="z-index: 9999999">
        <i class="material-icons">arrow_back</i>
      </a>
      <div>
        Practitioners of Xy rendelő
      </div>
    </div>

   <!-- repeatable -->
   <div class="row m-0 list-link padded-comp">
     <img src="http://www.rozellemedicalcentre.com.au/wp-content/uploads/2015/01/LLH-Doctors-Female-Avatar-300x300.png" height="45px" style="margin-right: 10px;     border-radius: 50%;">
     Dr. Bernie Luchausen
    </div>

    <div class="row m-0 list-link padded-comp">
     <img src="http://www.rozellemedicalcentre.com.au/wp-content/uploads/2015/01/LLH-Doctors-Female-Avatar-300x300.png" height="45px" style="margin-right: 10px;border-radius: 50%;">
         Dr. Bernie Luchausen
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
};
</script>
