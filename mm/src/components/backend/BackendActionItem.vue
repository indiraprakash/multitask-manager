<template>
  <v-layout row wrap align-center>

    <v-flex xs8 pl-3>  
      <v-layout justify-start text-xs-left>
        <slot name="title"></slot>
      </v-layout>
    </v-flex>

    <v-flex xs4 >
      <v-layout justify-end
        >
        <app-backend-button
          :buttonText="buttonText"
          :clicked="clicked"
          :disabled="disabled"
          :showResultIndicator="showResultIndicator"
          >
        </app-backend-button>
      </v-layout>
    </v-flex>
    
  </v-layout>
</template>


<script>

import BackendButton from './BackendButton';

export default {
  components: {
    'appBackendButton': BackendButton
  },
  props: {
    buttonText: {
      type: String,
      required: true
    },
    clicked: {
      type: [Function, Object],
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
  }
}
</script>

<style scoped>
</style>
