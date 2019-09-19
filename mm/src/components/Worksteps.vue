
<template>
  <div>
    <v-layout row justify-center align-center>
        <v-flex xs5>
            <h2>Arbeitsschritte</h2>
        </v-flex>
        <v-flex xs3>
            <v-btn icon flat @click="clickAdd">
                <v-icon large color="primary">add_circle</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
    <appWorkstepList :worksteps="worksteps" :edit="editWorkstep"></appWorkstepList>
  </div>
</template>

<script>
import WorkstepList from '@/components/WorkstepList.vue'

export default {
  name: 'worksteps',
  components: {
    appWorkstepList: WorkstepList
  },
  props: {
    editable:{
        type: Boolean,
        required: false,
    },
    worksteps:{
        type: Array,
        required: true
    },
    editWorkstep:{
        type: Function,
        required: true
    }
  },
  methods:{
      clickAdd() {
          this.editWorkstep()
      }
  }
}
</script>

<style scoped>

</style>