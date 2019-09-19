<template>
  <div>

    <v-card flat>
    <v-layout row pl-3 pb-3>
    
    <v-flex v-bind="panelLeft()">
      <v-layout row justify-start>
        
        <v-text-field
          :placeholder="placeHolder"
          :value="text"
          v-model="inputText"
          @input="onChange(inputText)"
          hide-details
          single-line 
          prepend-icon="search"
          >
        </v-text-field>
      </v-layout>
    </v-flex>
    <v-flex v-if="add || save" v-bind="panelRight()">
      <v-layout row justify-center>
        
        <v-btn flat icon v-if="add"
          @click="onButtonClick(inputText)"
          >
          <v-icon large color="secondary">{{ addIcon }}</v-icon>
        </v-btn>
        <v-btn flat icon v-else-if="save"
          @click="onButtonClick(inputText)"
          >
          <v-icon large color="success">{{ saveIcon }}</v-icon>
        </v-btn>
        
      </v-layout>
    </v-flex>
    
    </v-layout>
    </v-card>
    
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    changed: {
      type: Function,
      required: true
    },
    add: {
      type: Function,
      required: false
    },
    placeHolder: {
      type: String,
      default: 'Filter Items'
    },
    save: {
      type: Function,
      required: false
    },
    saveIcon: {
      type: String,
      default: 'check'
    },
    addIcon: {
      type: String,
      default: 'add_circle'
    }
  },
  watch: {
    text(newValue) {
      this.inputText = newValue;
    }
  },
  data() {
    return {
      inputText: this.text
    }
  },
  methods: {
    onButtonClick() {
      if(this.add) this.add(this.inputText)
      else if(this.save) this.save(this.inputText);
    },
    onChange() {
      this.changed(this.inputText);
    },
    panelLeft() {
      
      const attrs = {};
      if(this.add || this.save) {
        attrs.xs10 = true;
      }
      else {
        attrs.xs12 = true;
        attrs['pr-5'] = true;
      }
      return attrs;
    },
    panelRight() {
      return {
        x2: (this.add || this.save) ? true : false
      };
    }

  }

}
</script>

<style scoped>
</style>
