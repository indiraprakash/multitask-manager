<template>
  
  <v-layout align-center justify-end row d-flex>

    <v-flex>
      <v-layout justify-end>
        <div
          :style="{position: 'relative'}"
          >
          <v-btn
            small
            raised
            :disabled="iconName != 'none' || disabled"
            @click="onClick"
            key="textButton"
            >
            {{ buttonText }}
          </v-btn>

          <!-- Aboslute positioned box directly left of the button,
               it is centered absolute so it does not affect the flow
               of the page. -->
          <div
            :style="{
              position: 'absolute',
              top: '50%', left: '0', transform: 'translate(-100%, -50%)',
              width: '40px', height: '40px'}"
            >
            
            <!-- Another box to center either the icon or the progress indicator
                 regardeless of their sizes. -->
            <div
                :style="{
                  position: 'absolute',
                  top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}"
                >
                <v-progress-circular
                  v-if="iconName == 'sync'"
                  indeterminate
                  color="secondary"
                  size="38"
                  >
                </v-progress-circular>
                
                <transition
                  name="icon"
                  appear
                  v-on:after-enter="afterEnter"
                  >
                  <v-icon
                    v-if="iconName == 'done' || iconName == 'error'"
                    :color="iconName == 'done' ? 'success' : 'error'"
                    :large="iconName == 'done'"
                    >
                    {{ iconName }}
                  </v-icon>
                  
                </transition>
              
            </div>
          </div>

        </div>
      </v-layout>
    </v-flex>

  </v-layout>
  
</template>

<script>

// const iconNames = ['done', 'error', 'sync', 'none']

export default {
  props: {
    buttonText: {
      type: String,
      required: true
    },
    clicked: {
      type: Function,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showResultIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      iconName: 'none'
    }
  },
  methods: {
    
    onClick() {
      
      // Promise.resolve is used to be able handle both a
      // value and a promise.
      const thenable = Promise.resolve(this.clicked());

      if(this.showResultIndicator) {

        thenable
        .then(() => {
          this.iconName = 'done';
        })
        .catch(() => {
          this.iconName = 'error';
        });
        this.iconName = 'sync';
      }
    },
    afterEnter() {
      this.iconName = 'none'
    }
  }
}
</script>

<style scoped>

  .icon-enter {
    opacity: 1;
  }
  .icon-enter-to {
    opacity: 0.0;
  }
  .icon-enter-active {
    transition: opacity 2s linear;
  }
  .icon-leave,
  .icon-leave-active {
    transition: opacity 0s;
    opacity: 0;
  }

</style>
