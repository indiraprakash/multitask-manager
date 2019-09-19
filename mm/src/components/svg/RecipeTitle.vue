<template>
    <svg  :x="GraphPadding"
          :y="titleY"
          :width="titleW"
          :height="titleH">
        <text :transform="'translate('+GraphFontSize+','+titleH+') rotate(-90) '">
            {{title}}
        </text>
    </svg>
</template>
<script>
import {GraphRecipeHeight,GraphFontSize,GraphPadding} from "../../model/GraphParam";
export default {
    name: "RecipeTitle",
    data: function(){
        return {
            GraphPadding:GraphPadding,
            GraphFontSize:GraphFontSize
        }
    },
    props:{
        index:Number,
        title:String,
        scaleheight:Number
    },
    computed:{
        titleY(){
            //return this.index*(GraphRecipeHeight+GraphPadding)+this.scaleheight;
            return this.index*GraphRecipeHeight+this.scaleheight+GraphPadding;
        },
        titleW(){
            return (2*GraphPadding+GraphFontSize);
        },
        titleH(){
          return (GraphRecipeHeight-2);
        },
        twoFontSize(){
            return (2*GraphFontSize);
        }
    }
}
</script>
<style scoped>

</style>