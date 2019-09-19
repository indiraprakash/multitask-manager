<template>
    <g>
        <rect class="mm-ws-group"
              :x="workstepX"
              :y="workstepY"
              :width="workstepW >= 0 ? workstepW : 0"
              :height="workstepH >= 0 ? workstepH : 0"
              @click="onToggle(workstep)"
              v-bind:class="[isSelected ? 'mm-ws-selected':'']">
        </rect>
        <rect v-if="waititemW > 0"
              class="mm-ws-wait"
              :x="waititemX"
              :y="itemY"
              :width="waititemW >= 0 ? waititemW : 0"
              :height="itemH >= 0 ? itemH : 0"
              @click="onToggle(workstep)"
        >
        </rect>
        <rect :x="workitemX"
              :y="itemY"
              :width="workitemW >= 0 ? workitemW : 0"
              :height="itemH >= 0 ? itemH : 0"
              v-bind:class="[isActive ? 'mm-ws-active' : 'mm-ws-passive']"
              @click="onToggle(workstep)"
              >
        </rect>
        <image v-if="workstep.alarm.hasAlarmAtStart"
               xlink:href="../../assets/alert16x16.png"
               :x="workitemX"
               :y="itemY"
               width="16"
               height="16"/>
        <image v-if="workstep.alarm.hasAlarmAtEnd"
               xlink:href="../../assets/alert16x16.png"
               :x="endAlertX"
               :y="endAlertY"
               width="16"
               height="16"/>
    </g>
</template>

<script>
    import {WorkStepTypes} from "../../model/WorkStepType"
    import {GraphRecipeHeight,GraphPadding} from "../../model/GraphParam";

    export default {
        name: "WorkstepGraph",
        props:{
            workstep:Object,
            allworksteps:Array,
            SelectWorkstep:Function,
            index:Number,
            scalestart:Number,
            scaleheight:Number,
            gmw:Number
        },
        computed:{
            waititemX(){
                const item=this.allworksteps.find(workstep => workstep.id==this.workstep.id);
                return item.timeinrecipe*this.gmw+this.scalestart+2;
            },
            workitemX(){
                const item=this.allworksteps.find(workstep => workstep.id==this.workstep.id);
                return (item.timeinrecipe+item.starttime)*this.gmw+this.scalestart+2;
            },
            workitemW(){
                const item=this.allworksteps.find(workstep => workstep.id==this.workstep.id);
                return this.gmw*(item.duration)-4;
            },
            itemH(){
                return (GraphRecipeHeight-7);
            },
            itemY(){
                return (this.workstepY+1);
            },
            workstepX(){
                const item=this.allworksteps.find(workstep => workstep.id==this.workstep.id);
                return item.timeinrecipe*this.gmw+this.scalestart+1;
            },
            workstepY(){
                return this.index*GraphRecipeHeight+this.scaleheight+GraphPadding+1;
            },
            workstepW(){
                const item=this.allworksteps.find(workstep => workstep.id==this.workstep.id);
                return this.gmw*(item.duration+item.starttime)-2;

            },
            workstepH(){
                return GraphRecipeHeight-GraphPadding-2;
            },
            waititemW(){
                return this.workstep.startTime*this.gmw;
            },
            isActive(){
                if(this.workstep.type===WorkStepTypes.ACTIVE){
                    return true;
                }
                else{
                    return false;
                }
            },
            isSelected(){
                const item=this.allworksteps.find(workstep => workstep.id==this.workstep.id);
                //console.log('selected:'+item.isSelected);
                return item.isSelected;
            },
            endAlertY(){
                return this.itemY+(GraphRecipeHeight/2);
            },
            endAlertX(){
                return this.workitemX+this.workitemW-16;
            },
            starttime(){
                return 0;
            }
        },
        methods:{
            onToggle(item){
                this.$emit('SelectWorkstep',item);
            }
        },
        updated:function(){
            if(this.isSelected){
                this.$el.children[0].scrollIntoView();
            }
        }
    }
</script>

<style scoped>
    .mm-ws-group{
        fill:white;
        stroke:lightgrey;
        stroke-width:1;
    }
    .mm-ws-active{
        fill:#1976D2;
    }
    .mm-ws-passive{
        fill:#82B1FF;
    }
    .mm-ws-selected{
        stroke-width:2;
        stroke:darkorange;
    }
    .mm-ws-wait{
        fill:white;
    }
</style>