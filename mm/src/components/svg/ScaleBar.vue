<template>
    <g>
        <line :x1="scalestart"
              :x2="scaleend"
              :y1="5"
              :y2="5"
              stroke="black"></line>
        <app-scale-tick v-for="(tick) in ticks"
                        :key="tick.x1"
                        :tick="tick"></app-scale-tick>
    </g>
</template>

<script>
    import ScaleTick from './ScaleTick';
    export default {
        name: "ScaleBar",
        props:{
            scalestart:Number,
            scaleend:Number,
            ticks:Array
        },
        components:{
            appScaleTick : ScaleTick
        }
    }
</script>

<style scoped>

</style>