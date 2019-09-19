<template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="clickClose(workstep)">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title v-if="workstep.description">Arbeitsschritt bearbeiten</v-toolbar-title>
        <v-toolbar-title v-else>Arbeitsschritt erstellen</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon v-if="menueId" flat @click="clickSave">
              <v-icon flat>check</v-icon>
          </v-btn>
          <v-btn v-else dark flat @click="clickSave">OK</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container pa-2 ma-0>
          <v-layout pa-2 ma-0>
            <v-textarea label="Beschreibung" v-model="localWorkstep.description" multi-line auto-grow rows="3"></v-textarea>
          </v-layout>
          <v-layout pa-0 ma-0  justify-space-between>
              <v-flex xs3>
                <v-text-field label="Zeitbedarf"
                              type="number"
                              v-model="inputworksteplength"
                              suffix="min">
                </v-text-field>
            </v-flex>
              <v-flex xs3 offset-xs1 v-if="workstep.menueId">
                  <v-text-field label="Startzeit"
                                type="number"
                                v-model="inputworkstepstarttime"
                                suffix="min">
                  </v-text-field>
              </v-flex>
              <v-flex xs4 >
                  <v-checkbox
                    :label="`Start Alarm`"
                    v-model="localWorkstep.alarm.hasAlarmAtStart"
                  ></v-checkbox>
            </v-flex >
          </v-layout>
          <v-layout pa-0 ma-0 flex justify-space-between>
              <v-flex xs4>
                  <v-switch :label="`Aktiv`" v-model="isActive" ></v-switch>
              </v-flex>
              <v-flex xs4>
                  <v-checkbox :label="`End Alarm`"
                              v-model="localWorkstep.alarm.hasAlarmAtEnd"
                  ></v-checkbox>
              </v-flex>
          </v-layout>
      </v-container>
    </v-card>
</template>

<script>

import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

import { WorkStep } from '../model/WorkStep';
import {WorkStepTypes} from "../model/WorkStepType"

    export default {
        name:'workstep-edit',
        data (){
            return{
              localWorkstep: new WorkStep(0, 0, '', WorkStepTypes.PASSIVE),
              workstepChanged: false,
              radioGroup: 1,
              inputworksteplength:0,
              inputworkstepstarttime:0
            }
        },
        props: {
          workstep:{
              type: Object,
              required: true
          },
          menueId:{
              type: String,
              required: false
          },
          recipeId:{
              type: String,
              required: false
          },
          closeEditHandler:{
            type: Function,
            required: true
          }
        },
        computed: {
            ...mapGetters({
              recipes: 'recipes/recipes',
            }),
            // loaded() {
            //   if(this.workstep != undefined){
                  
            //     this.localWorkstep = this.workstep.clone();
            //     this.inputworksteplength=this.workstep.length;
            //     this.inputworkstepstarttime=this.workstep.startTime;
            //   }
            // },
            isActive:{
                get:function() {
                    if (this.localWorkstep.type === WorkStepTypes.ACTIVE) {
                        return true;
                    }
                    else {
                        return false;
                    }
                },
                set:function(newValue){
                    if(newValue){
                        this.localWorkstep.type = WorkStepTypes.ACTIVE;
                    }
                    else{
                        this.localWorkstep.type = WorkStepTypes.PASSIVE;
                    }
                }
            },
        },
        watch: {

            workstep(newWorkStep) {
                if(newWorkStep != undefined){
                    
                    this.localWorkstep = newWorkStep.clone();
                    this.inputworksteplength=newWorkStep.length;
                    this.inputworkstepstarttime=newWorkStep.startTime;
                }
            },  

        //   loaded(){
        //   },
            inputworksteplength(newvalue){
                this.localWorkstep.length=+newvalue;
            },
            inputworkstepstarttime(newvalue){
              this.localWorkstep.startTime=+newvalue;
            }
        },
        methods:{
            ...mapActions({
                updateWorkStep: 'menues/updateWorkStep'
            }),
            saveWorkstep(){
              if(this.menueId){ // save to store
                this.updateWorkStep({menueId: this.menueId, recipeId: this.recipeId, workStep: this.localWorkstep});
              }
              else{
                //console.log("lokal updaten")
              }
            },
            edit(/*item*/){
              //console.log("Edit event called on " + item)
            },
            clickClose(item){
              this.closeEditHandler(item)
            },
            clickSave(){
              this.saveWorkstep()
              this.closeEditHandler(this.localWorkstep)
            }
        },
        mounted() {
            if(this.workstep != undefined){
                    
                this.localWorkstep = this.workstep.clone();
                this.inputworksteplength=this.workstep.length;
                this.inputworkstepstarttime=this.workstep.startTime;
            }
        }
    }

</script>

<style scoped>

</style>