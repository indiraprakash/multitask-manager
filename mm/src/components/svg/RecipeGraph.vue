<template>
    <g>
        <app-recipe-title :index="index"
                          :title="recipe.title"
                          :scaleheight="scaleheight"></app-recipe-title>
        <app-workstep-graph
                v-for="(workstep) in recipe.workSteps"
                :key="workstep.id"
                :workstep="workstep"
                :allworksteps="allworksteps"
                :index="index"
                :scaleheight="scaleheight"
                :scalestart="scalestart"
                @SelectWorkstep="onSelectWorkstep"
                :gmw="gmw"
        >
        </app-workstep-graph>
    </g>
</template>
<script>
    import RecipeTitle from './RecipeTitle';
    import WorkstepGraph from './WorkstepGraph';
    import {GraphRecipeHeight} from "../../model/GraphParam";
    export default {
        name: "RecipeGraph",
        props:{
            recipe:Object,
            allworksteps:Array,
            SelectWorkstep:Function,
            index:Number,
            svgwidth:Number,
            scaleheight:Number,
            scalestart:Number,
            gmw:Number
       },
        computed:{
            recipeY(){
                return (this.index+1)*GraphRecipeHeight+this.scaleheight;
            }
        },
        components:{
            appRecipeTitle:RecipeTitle,
            appWorkstepGraph: WorkstepGraph
        },
        methods:{
            onSelectWorkstep(item){
                this.$emit('SelectWorkstep',item);
            }
        }
    }
</script>
<style scoped>
</style>