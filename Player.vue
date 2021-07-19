<template>
  <div>
    <v-touch @pinch="onPinch" @pinchend="onPinchEnd" @pan="onPan" @panend="onPanEnd">
      <img v-for="image in displayedImages" :src="image" :key="image" :style="imageStyle"
      style="opacity: 0"
      class="image-fullescreen"
      @click="onClick" ref="image">
    </v-touch>
    <div v-if="pause" class="middle-fix" @click="stepBackward">
      <i class="material-icons step-btn">fast_rewind</i>
    </div>
    <div v-if="pause" class="right middle-fix" @click="stepForward">
      <i class="material-icons step-btn">fast_forward</i>
    </div>
  </div>
</template>

<script>
const MAX_ZOOM = 10;

export default {
  data() {
    return {
      displayedImages: [],
      images: [
        'https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg',
        'https://cf.ltkcdn.net/skincare/images/std/42757-300x199-Mole1.jpg',
        'https://www.mymed.com/image/2630/MedicalArticle/700',
      ],
      index: 0,
      pause: false,
      enterAnimation: undefined,
      leaveAnimation: undefined,
      lastChangeIsForward: true,
      duration: 3000,
      stayTime: 500,
      scale: 1,
      last_scale: 1,
      posX: 0,
      posY: 0,
      last_posX: 0,
      last_posY: 0,
      max_pos_x: 0,
      max_pos_y: 0,
    };
  },
  computed: {
    imageStyle() {
      return {
        transform: `translate3d(${this.posX}px, ${this.posY}px, 0)
        scale3d(${this.scale}, ${this.scale}, 1)`,
      };
    },
  },
  methods: {
    stepForward() {
      if (!this.pause) {
        return;
      }

      const change = this.duration / 10;

      if (this.leaveAnimation) {
        this.leaveAnimation.currentTime += change;
      }
      if (this.enterAnimation) {
        this.enterAnimation.currentTime += change;
        if (this.enterAnimation.currentTime >= this.duration) {
          this.enterAnimation.finish();
          this.leaveAnimation.finish();
        }
      }
    },
    stepBackward() {
      if (!this.pause) {
        return;
      }

      const change = this.duration / 10;

      if (this.leaveAnimation) {
        this.leaveAnimation.currentTime -= change;
      }
      if (this.enterAnimation) {
        this.enterAnimation.currentTime -= change;
        if (this.enterAnimation.currentTime <= 0) {
          this.leaveAnimation.cancel();
          this.displayedImages.pop();
          this.enterAnimation.cancel();

          this.changeBackward();
        }
      }
    },
    changeImage() {
      if (!this.lastChangeIsForward) {
        this.index = this.index + 1 === this.images.length ? 0 : this.index + 1;
        this.lastChangeIsForward = true;
      }
      this.index = this.index + 1 === this.images.length ? 0 : this.index + 1;
      this.displayedImages.push(this.images[this.index]);

      setTimeout(() => this.animateChange(true));
    },
    changeBackward() {
      if (this.lastChangeIsForward) {
        this.index = this.index - 1 === -1 ? this.images.length - 1 : this.index - 1;
        this.lastChangeIsForward = false;
      }
      this.index = this.index - 1 === -1 ? this.images.length - 1 : this.index - 1;
      this.displayedImages.unshift(this.images[this.index]);

      setTimeout(() => this.animateChange(false));
    },
    animateChange(forward) {
      const images = this.$refs.image;

      // if backward, the image added to the array later is going to be the last image
      // even if in the displayedImages array it has 0 as index
      const leavingElement = forward ? images[0] : images[images.length - 1];
      const enteringElement = forward ? images[images.length - 1] : images[0];

      this.leaveAnimation = leavingElement.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        {
          duration: this.duration - 15,
          fill: 'both',
        },
      );
      this.enterAnimation = enteringElement.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        {
          duration: this.duration - 15,
          fill: 'both',
        },
      );
      if (this.pause) {
        this.enterAnimation.pause();
        this.leaveAnimation.pause();
        if (!forward) {
          // -1 ms so no finish is triggered
          this.enterAnimation.currentTime = this.duration - 1;
          this.leaveAnimation.currentTime = this.duration - 1;
        }
      }

      this.leaveAnimation.onfinish = () => {
        this.leaveAnimation = undefined;
        this.displayedImages.shift();
      };

      this.enterAnimation.onfinish = () => {
        this.enterAnimation = undefined;

        setTimeout(this.changeImage, this.pause ? 0 : this.stayTime);
      };
    },
    onClick() {
      if (this.pause && this.leaveAnimation) {
        this.leaveAnimation.play();
      } else if (this.leaveAnimation) {
        this.leaveAnimation.pause();
      }

      if (this.pause && this.enterAnimation) {
        this.enterAnimation.play();
      } else if (this.enterAnimation) {
        this.enterAnimation.pause();
      }

      this.pause = !this.pause;
    },
    onPinch(event) {
      this.scale = Math.max(0.999, Math.min(this.last_scale * (event.scale), MAX_ZOOM));
    },
    onPinchEnd() {
      this.last_scale = this.scale;
    },
    onPan(event) {
      if (this.scale !== 1) {
        this.posX = this.last_posX + event.deltaX;
        this.posY = this.last_posY + event.deltaY;
        const el = event.target;
        this.max_pos_x = Math.ceil((this.scale - 1) * el.clientWidth * 0.5);
        this.max_pos_y = Math.ceil((this.scale - 1) * el.clientHeight * 0.5);
        if (this.posX > this.max_pos_x) {
          this.posX = this.max_pos_x;
        }
        if (this.posX < -this.max_pos_x) {
          this.posX = -this.max_pos_x;
        }
        if (this.posY > this.max_pos_y) {
          this.posY = this.max_pos_y;
        }
        if (this.posY < -this.max_pos_y) {
          this.posY = -this.max_pos_y;
        }
      }
    },
    onPanEnd() {
      this.last_posX = this.posX < this.max_pos_x ? this.posX : this.max_pos_x;
      this.last_posY = this.posY < this.max_pos_y ? this.posY : this.max_pos_y;
    },
  },
  created() {
    this.displayedImages.push(this.images[0]);
  },
  mounted() {
    this.changeImage();
  },
};
</script>

<style>
.image-fullescreen {
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
}

.middle-fix.right {
  right: 20px;
}

.middle-fix {
  position: fixed;
  z-index: 2;
  top: 50%;
  margin-top: -45px;
}

.step-btn {
  font-size: 12vw;
  padding: 15%;
  opacity: 0.7;
  border-radius: 6px;
  border: 2px solid gray;
  margin: 10px;
}
</style>
