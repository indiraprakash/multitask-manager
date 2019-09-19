<template>
    <v-container v-resize="onResize">
        <v-layout column >
            <v-flex ref="div-graph-height" v-bind:style="{maxHeight:maxheight+'px'}" style="overflow-y:auto;">
                <v-card>
                    <!-- zoomslider -->
                    Zoom: <input v-bind:style="{width:sliderWidth+'px'}"
                                 type="range" @input="onSliderChange"
                                 :min="sliderMin"
                                 :max="sliderMax"
                                 step="1"
                                 v-model="sliderVal">
                <!-- screencookgraph svg -->
                <app-cook-graph
                        v-if="menue"
                    :recipes="menue.recipes"
                    :allworksteps="workstepstate"
                    @SelectWorkstep="onSelectWorkstep"
                    :maxtime="maxtime"
                    :cookstarttime="cookstarttime"
                    :runtime="runtime"
                    :endtime="endtime"
                    @CookFinish="onCookFinish"
                    :gmw="graphminwidth"
                    :gsx="sliderVal"
                ></app-cook-graph>
                </v-card>
            </v-flex>
            <v-flex text-xs-left v-bind:style="{maxHeight:(maxheight+sparepx)+'px'}" style="overflow-y:auto;">
                <v-card>
                <!-- workstep item list -->
                <app-workstep-simple
                        v-if="!editworkstep"
                    :allworksteps="workstepstate"
                    :cookstarttime="cookstarttime"
                    :runtime="runtime"
                    @SelectWorkstep="onSelectWorkstep"
                    @EditWorkstep="onEditWorkstep"
                ></app-workstep-simple>
                <app-workstep-edit
                    v-if="editworkstep"
                    :workstep="edititem"
                    :recipeId="edititem.recipeId"
                    :menueId="edititem.menueId"
                    :closeEditHandler="onCloseEditWorkstep"
                    ></app-workstep-edit>
                </v-card>
            </v-flex>
            <v-flex>
                <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">Guten Appetit</v-card-title>
                        <v-card-text>Sie haben die Zubereitung des Menüs "{{menue ? menue.title : ''}}" abgeschlossen und wir wünschen guten Appetit!</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat @click.native="dialog = false">Schliessen</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-flex>
        </v-layout>
        <v-footer v-if="!editworkstep" fixed height="auto" color="primary">
            <v-layout justify-center row wrap>
                <v-btn v-bind:disabled="pausebutton" flat color="white" round @click="onClickPauseButton">{{pausebuttoncaption}}</v-btn>
                <v-btn flat color="white" round @click="onClickStartButton">{{startbuttoncaption}}</v-btn>
            </v-layout>
        </v-footer>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex';
    import CookGraph from "../components/CookGraph";
    import WorkstepSimple from "../components/WorkstepSimple";
    import WorkstepEdit from "../components/WorkstepEdit";
    import {SystemSecondsSecond,AlarmSound,EndSound,GraphMinutesWidth,GraphZoom} from "../model/GraphParam";
    export default {
        name: "ScreenCookGraph",
        data: function() {
            return {
                dialog:false,
                menue:null,
                cookmode:false,
                cookstarttime:null,
                startbuttoncaption:'START',
                pausebuttoncaption:'PAUSE',
                workstepstate:[],
                workstepalert:[],
                localworksteps:[],
                runningtimer:null,
                maxtime:null,
                runtime:null,
                endtime:null,
                windowSize: {x: 0,y: 0},
                maxheight:0,
                sparepx:0,
                pausebutton:true,
                editworkstep:false,
                edititem:null,
                sliderVal: '0',
                sliderMin: '0',
                sliderMax: '5',
                sliderWidth: 0,
                graphminwidth:GraphMinutesWidth
            }
        },
        props: {
            id:{
                type:String,
                required:true
            }
        },
        computed: {
            ...mapGetters({
                //recipes: 'recipes/recipes',
                menues: 'menues/menues'
            }),
        },
        components:{
            appCookGraph:CookGraph,
            appWorkstepSimple:WorkstepSimple,
            appWorkstepEdit:WorkstepEdit
        },
        watch:{
          // menues(newmenues){
          //     console.log('fire watch');
          //   this.prepareMenu();
          // }
            menues: {
                handler(){
                    //console.log('fire watch');
                    this.prepareMenu();
                },
                deep: true
            }
        },
        methods:{
            onSliderChange(e){
                this.graphminwidth=GraphZoom[parseInt(e.target.value)];
            },
            onResize () {
                //we resize the graph and workstep v-flex in the way
                // that both have maximum the half height of the
                // screen. If graph does not use its max-height
                // spare pxs are given to workstep v-flex
                
                this.windowSize = { x: window.innerWidth, y: window.innerHeight };
                this.maxheight=(this.windowSize.y-150)/2;

                // This reference may not be available if resize is called to early.
                if(!this.$refs["div-graph-height"]) return;

                this.sparepx = this.maxheight-this.$refs["div-graph-height"].offsetHeight;
                if(this.sparepx<0){
                    this.sparepx=0;
                }
                this.sliderWidth = this.$refs["div-graph-height"].clientWidth-100;
            },
            onCookFinish(){
                this.dialog=true;
                EndSound.play();
                //stop timer!!!!
                this.onClickStartButton();
            },
            cooktimer(){
                //set new runtime with SystemSecondsSecond
                let nruntime=new Date(this.runtime);
                nruntime.setSeconds(nruntime.getSeconds() + SystemSecondsSecond);
                this.runtime=new Date(nruntime);
                this.workstepalert.map(workstep =>{
                    if(workstep.played==false){
                        let wstime = new Date();
                        wstime.setMinutes(this.cookstarttime.getMinutes() + workstep.alarm);
                        if(wstime < this.runtime){
                            AlarmSound.play();
                            //alert('play sound');
                            workstep.played=true;
                        }
                    }
                });
                this.runningtimer = setTimeout(this.cooktimer, 1000);
                //console.log(this.runtime);
            },
            onClickStartButton(){
                document.getElementById("div-graph-cook").scrollLeft=0;
                // let container = this.$refs["div-graph-cook"];
                // container.scrollLeft = 0;
                if(this.startbuttoncaption=='START'){
                    this.workstepstate.map(workstep => {
                        workstep.isSelected=false;
                    });
                    this.cookstarttime=new Date();
                    this.runtime=new Date(this.cookstarttime);
                    this.endtime=new Date();
                    this.endtime.setMinutes(this.cookstarttime.getMinutes() + this.maxtime);
                    this.workstepstate.reverse();
                    //set timer
                    this.cooktimer();
                }
                else {
                    this.cookstarttime=null;
                    this.runtime=null;
                    this.endtime=null;
                    this.workstepstate.reverse();
                    clearTimeout(this.runningtimer);
                    this.workstepalert.map(workstep => {
                        workstep.played=false;
                    })
                }
                this.startbuttoncaption=="START" ? this.startbuttoncaption="STOP" : this.startbuttoncaption="START";
                this.pausebuttoncaption="PAUSE";
                this.pausebutton ? this.pausebutton=false : this.pausebutton=true;
            },
            onClickPauseButton(){
                if(this.pausebuttoncaption=="PAUSE"){
                    clearTimeout(this.runningtimer);
                }
                else{
                    this.cooktimer();
                }
                this.pausebuttoncaption=="PAUSE" ? this.pausebuttoncaption="WEITER" : this.pausebuttoncaption="PAUSE";
            },
            onSelectWorkstep(item){
                if(!this.runtime){
                    this.workstepstate.map(workstep => {
                        if(workstep.id==item.id){
                            if(this.editworkstep){
                                this.edititem = this.localworksteps.find(workstep => workstep.id==item.id);
                                workstep.isSelected=true;
                            }
                            else{
                                workstep.isSelected=!workstep.isSelected;
                            }
                        }
                        else{
                            workstep.isSelected=false;
                        }
                    });
                }
            },
            onEditWorkstep(item){
                this.editworkstep=true;
                this.edititem = this.localworksteps.find(workstep => workstep.id==item.id);
                //console.log(this.edititem);
            },
            onCloseEditWorkstep(){
                this.editworkstep=false;
                this.edititem=null;
            },
            prepareMenu(){
                this.localworksteps=[];
                this.workstepstate=[];
                this.workstepalert=[]
                this.maxtime=null;
                this.menue = this.menues.find(menue => menue.id == this.id);
                if(this.menue){
                    this.menue.recipes.map(recipe => {
                        let timeinrecipe=0;
                        recipe.workSteps.map(workstep => {
                            workstep.recipeId=recipe.id;
                            workstep.menueId=this.menue.id;
                            this.localworksteps.push(workstep);
                            this.workstepstate.push({
                                id: workstep.id,
                                description: workstep.description,
                                isSelected: false,
                                duration: workstep.length,
                                timeinrecipe:timeinrecipe,
                                starttime: workstep.startTime,
                            });
                            if(workstep.alarm.hasAlarmAtStart){
                                this.workstepalert.push({
                                    id:workstep.id,
                                    alarm: timeinrecipe+workstep.startTime,
                                    played:false
                                })
                            }
                            timeinrecipe+=workstep.startTime+workstep.length;
                            if(timeinrecipe > this.maxtime){
                                this.maxtime=timeinrecipe;
                            }
                            if(workstep.alarm.hasAlarmAtEnd){
                                this.workstepalert.push({
                                    id:workstep.id,
                                    alarm: timeinrecipe,
                                    played:false
                                })
                            }
                        });

                    });
                    this.workstepstate.sort((a, b) => ((a.timeinrecipe+a.starttime) < (b.timeinrecipe+b.starttime)) ?  -1 :  1);
                    setTimeout(this.onResize, 1);
                }
            }
        },
        created(){
            this.prepareMenu();
        },
        destroyed() {
            clearTimeout(this.runningtimer);
        },
        mounted(){
            //console.log('screen mounted');
            setTimeout(this.onResize, 1);
        }
    }
</script>
<style scoped>
</style>