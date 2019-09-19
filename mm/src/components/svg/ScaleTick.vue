<template>
    <g>
        <line stroke="black"
              :x1="tick.x1"
              y1="5"
              :x2="tick.x1"
              y2="10"></line>
        <text :x="tick.x1"
              :y="tickY">{{tick.legend}}</text>
    </g>
</template>
<script>
    import {GraphFontSize} from '../../model/GraphParam';
    export default {
        name: "ScaleTick",
        props:{
            tick:Object
        },
        computed:{
            tickY(){
                return (10+GraphFontSize);
            }
        }
    }
</script>
<style scoped>
</style>
