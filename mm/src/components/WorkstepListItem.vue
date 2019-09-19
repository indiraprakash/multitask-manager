<template>
    <v-container>
        <v-layout row align-center>
            <v-list-tile-content>
                <v-flex xs10 sm10>
                 <div>
                 {{workstep.description}}
                 </div>
                </v-flex>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn flat icon @click="onEdit" v-if="editable">
                  <v-icon>edit</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
                <v-btn flat icon @click="onDelete" v-if="deletable">
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-layout>
    </v-container> 
</template>

<script>
    export default {
        props:{
            workstep:{
                type: Object,
                required: true
            },
            deletable:{
                type: Boolean,
                required: true
            },
            editable:{
                type: Boolean,
                required: true
            },
            edit:{
                type: Function,
                required: true
            },
            deleteItem:{
                type: Function,
                required: true
            }
        },
        methods:{
            onEdit(){
                this.edit(this.workstep);
            },
            onDelete(){
                this.deleteItem();
            }
        }
    }

</script>
<style scoped>

</style>