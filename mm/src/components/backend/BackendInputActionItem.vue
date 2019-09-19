<template>
  <v-layout row align-baseline>
    
    <v-flex xs7 pl-3>
      <v-layout justify-start>
        <v-text-field
          :placeholder="inputLabel"
          
          hide-details
          single-line
          :value="inputText"
          @input="$emit('change', $event)"
        >
        </v-text-field>
      </v-layout>
    </v-flex>
    <v-flex xs5>
      <v-layout justify-end>
        
        <app-backend-button
          :buttonText="buttonText"
          :clicked="() => clicked(inputText)"
          :showResultIndicator="showResultIndicator"
          :disabled="!inputText"
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
    inputLabel: {
      type: String,
      required: true
    },
    inputText: {
      type: String,
      required: true
    },
    showResultIndicator: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onInput(value) {
      console.log('BackendActionItem onInput', value);
      
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>

</style>
