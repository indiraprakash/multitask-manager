<template>
    <div>
        <v-layout row pa-2 xs12 v-if="isDue"
              v-bind:class="[workstep.isSelected || isToDo ? 'mm-ws-selected': '']"
              @click="onToggle(workstep)"
        >
            <v-flex xs11>
                <v-layout column>
                    <v-flex xs12 v-bind:style="{color:this.$vuetify.theme.primary}">
                        Starttime: {{timeinfo}} - Duration: {{workstep.duration}}'
                    </v-flex>
                    <v-flex>
                        {{workstep.description}}
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs1 v-if="!runtime">
                <v-btn flat icon
                       @click="onEditWorkstep(workstep)"
                       v-if="workstep.isSelected"
                >
                    <v-icon>edit</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    <v-divider></v-divider>
</div>
</template>
<script>
    export default {
        name: "WorkstepSimpleItem",
        data:function(){
            return{
            }
        },
        props:{
            workstep:Object,
            cookstarttime:Date,
            runtime:Date,
            SelectWorkstep:Function,
            EditWorkstep:Function,
        },
        computed:{
            isToDo(){
                if(this.runtime){
                    if(this.runtime >= this.duetime && this.runtime <=this.cooktime){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                else{
                    return false;
                }
            },
            isDue(){
                if(this.runtime){
                    if(this.duetime <= this.runtime){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                else{
                    return true;
                }
            },
            duetime(){
                let ndue = new Date();
                ndue.setMinutes(this.cookstarttime.getMinutes()+this.workstep.timeinrecipe+this.workstep.starttime);
                return ndue;
            },
            cooktime(){
                let ndue = new Date();
                ndue.setMinutes(this.cookstarttime.getMinutes()+this.workstep.timeinrecipe+this.workstep.starttime+this.workstep.duration);
                return ndue;

            },
            timeinfo(){
                //console.log(this.cookstarttime);
                if(this.runtime){
                    return this.duetime.toLocaleTimeString('de-DE').substr(0,5);
                }
                else{
                    return this.workstep.timeinrecipe+this.workstep.starttime+"'";
                }
            }
        },
        methods:{
            onToggle(item){
                this.$emit('SelectWorkstep',item);
            },
            onEditWorkstep(item){
                this.$emit('EditWorkstep',item);
            },
            onShow(item){
                console.log('onShow:'+item);
            }
        },
        updated:function(){
            if(this.workstep.isSelected){
                this.$el.scrollIntoView();
            }
        }
    }
</script>
<style scoped>
    .mm-ws-selected{
        background-color:#82B1FF;
    }
</style>