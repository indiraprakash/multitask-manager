<template>
<div>

    <v-card flat color="emphasize" mb-3>
      <v-layout align-center row>
      
        <v-flex xs9 offset-xs1 pl-3 py-3>
          <v-layout row>
            
            <v-text-field
              :placeholder="'Menue Title'"
              v-model="inputText"
              @input="onChange(inputText)"
              hide-details
              outline
              single-line
              >
            </v-text-field>
          </v-layout>
        </v-flex>
        
        <v-flex xs2>
          <v-layout row justify-center>
            
            <v-btn flat icon
              @click="onButtonClick(inputText)"
              :disabled = "saveDisabled"
              >
              <v-icon large color="success">check</v-icon>
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
    save: {
      type: Function,
      required: true
    },
    saveDisabled: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    text(newText) {
      this.inputText = newText;
    }
  },
  data() {
    return {
      inputText: this.text
    }
  },
  methods: {
    onButtonClick() {
      if(this.save) this.save(this.inputText);
    },
    onChange() {   
      this.changed(this.inputText);
    }
  }
}
</script>

<style>

</style>
