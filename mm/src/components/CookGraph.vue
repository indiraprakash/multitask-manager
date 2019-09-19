<template>
    <div class="mm-graph-cook"
         id="div-graph-cook"
         ref="div-graph-cook"
    >
        <!-- cookgraph div -->
        <svg v-bind:style="{width: svgwidth +'px',height: svgheight+'px',fontSize:GraphFontSize+'px'}"
            >
            <app-scale-bar :scalestart="scalestart"
                           :scaleend="scaleend"
                           :ticks="ticks"></app-scale-bar>
            <app-recipe-graph
                    v-for="(recipe, index) in recipes"
                    :key="recipe.id"
                    :recipe="recipe"
                    :allworksteps="allworksteps"
                    :index="index"
                    :svgwidth="svgwidth"
                    :scaleheight="scaleheight"
                    :scalestart="scalestart"
                    @SelectWorkstep="onSelectWorkstep"
                    :gmw="gmw"
            >
            </app-recipe-graph>
            <line v-if="cookstarttime"
                   :x1="timepointerX"
                  :y1="timepointerY1"
                  :x2="timepointerX"
                  :y2="timepointerY2"
                  class="mm-graph-timeline"
            ></line>
        </svg>
    </div>
</template>

<script>
    import ScaleBar from './svg/ScaleBar';
    import RecipeGraph from "./svg/RecipeGraph";
    import {GraphRecipeHeight,GraphPadding,GraphFontSize,GraphZoomMin} from "../model/GraphParam";
    export default {
        name: "CookGraph",
        data: function(){
            return{
                GraphFontSize:GraphFontSize,
                timelineX:null
            }
        },
        props:{
            recipes:Array,
            allworksteps: Array,
            SelectWorkstep:Function,
            maxtime: Number,
            cookstarttime: Date,
            runtime: Date,
            endtime: Date,
            CookFinish: Function,
            gmw:Number,
            gsx:String
        },
        components:{
            appRecipeGraph: RecipeGraph,
            appScaleBar: ScaleBar
        },
        methods:{
            onSelectWorkstep(item){
                this.$emit('SelectWorkstep', item);
            },
            ticktime(i){
                let ticktime=new Date()
                ticktime.setMinutes(this.cookstarttime.getMinutes() + i);
                return ticktime.toLocaleTimeString('de-DE').substr(0,5);
            }
        },
        computed:{
            svgheight(){
                let svgh = this.scaleheight;
                svgh += (this.recipes.length*(GraphRecipeHeight+GraphPadding));
                return svgh;
            },
            svgwidth(){
                return (this.maxtime*this.gmw)+(2*this.scalestart);
            },
            scalestart(){
                return (2*GraphPadding)+GraphFontSize;
            },
            scaleend(){
                return (this.maxtime*this.gmw)+this.scalestart;
            },
            scaleheight(){
                return (10+GraphFontSize);
            },
            ticks(){
                let tarr=[];
                for(let i=0; i < this.maxtime;i+=GraphZoomMin[this.gsx]){
                    tarr.push({
                        x1:(i*this.gmw+this.scalestart),
                        legend:this.cookstarttime ? this.ticktime(i) : i+"'"
                    });
                }
                //push the very last tick
                tarr.push({
                    x1:(this.maxtime*this.gmw+this.scalestart),
                    legend:this.cookstarttime ? this.ticktime(this.maxtime) : this.maxtime+"'"
                })
                //console.log(tarr);
                return tarr;
            },
            timepointerX(){
                let runminutes=(this.runtime-this.cookstarttime)/1000/60;
                //console.log(runminutes);
                let timelineX = (this.scalestart+(runminutes*this.gmw));
                //console.log(timelineX);
                let screenmiddle=window.innerWidth/2;
                if(timelineX > screenmiddle){
                    //scroll to the middle
                    //console.log('scroll!!!!');
                    const container = this.$refs["div-graph-cook"];
                    //console.log(container.scrollLeft,screenmiddle,timelineX);
                    container.scrollLeft = timelineX-screenmiddle;// container.scrollLeft+this.gmw;
                }
                if(this.runtime > this.endtime){
                    this.$emit('CookFinish');
                }
                return timelineX;
            },
            timepointerY1(){
                return (10+GraphFontSize);
            },
            timepointerY2(){
                return (this.svgheight-5);
            }
        }
    }
</script>
<style scoped>
    .mm-graph-cook {
        overflow-x:auto;
        padding: 5px 25px 5px 5px;
    }
    .mm-graph-timeline{
        stroke-width:5;
        stroke:#2196F3;
        stroke-dasharray:10,10;
     }
</style>