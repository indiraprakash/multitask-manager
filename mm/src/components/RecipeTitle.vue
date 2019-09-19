<template>
    <v-card flat color="emphasize">
      <v-layout align-center row>
        <v-flex v-if="editable" xs10 offset-xs1 pl-3 py-3>
            <v-layout row>
            <v-text-field v-if="editable"
                        v-model="localTitle"
                        placeholder="Rezept Titel"
                        @keyup="onChange"
                        outline
                          hide-details
                          single-line
          ></v-text-field>
            </v-layout>
        </v-flex>
          <v-flex v-else>
            <h1>{{title}}</h1>
          </v-flex>
      </v-layout>
    </v-card>
</template>

<script>


export default {
  name: 'recipe-title',
  props: {
    title:{
      type: String,
      required: false
    },
    editable:{
      type: Boolean,
      required: false
    },
    onTitleChange: {
        type: Function,
        required: true
    },
  },
  watch: {
    title(newTitle){
      this.localTitle = newTitle
    }
  },
  data() {
    return {
      localTitle: this.title
    };
  },
  methods: {
    onChange(){
      if(this.title != this.localTitle){
        this.onTitleChange(this.localTitle);
      }
    }
  }
}
</script>

<style scoped>
  { 

  }
</style>