<template>
  <v-layout row align-baseline>
    
    <v-flex xs7 pl-3>
      <v-layout justify-start>
        <v-select
          :items="selectItems"
          :label="selectLabel"
          v-model="selectText"
          hide-details
          single-line
          :style="{paddingTop: '0px'}"
          :loading="selectIsLoading"
        >
        
        </v-select>
      </v-layout>
    </v-flex>
    <v-flex xs5>
      <v-layout justify-end>

        <app-backend-button
          :buttonText="buttonText"
          :clicked="onClick"
          :showResultIndicator="showResultIndicator"
          :disabled="!selectText"
          >
        </app-backend-button>

      </v-layout>
    </v-flex>

  </v-layout>


</template>

<script>

import { hover } from '../../mixins/hover.js';
import BackendButton from './BackendButton';

export default {
  components: {
    'appBackendButton': BackendButton
  },
  mixins: [hover],
  props: {
    buttonText: {
      type: String,
      required: true
    },
    clicked: {
      type: Function,
      required: true
    },
    selectItems: {
      type: Array,
      required: true
    },
    selectLabel: {
      type: String,
      required: true
    },
    showResultIndicator: {
      type: Boolean,
      default: true
    },
    selectIsLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectText: ''
    }
  },
  methods: {
    onClick() {
      const val = this.selectText;
      this.selectText = '';
      return this.clicked(val);
    }
  }
}
</script>

<style scoped>
 
</style>
