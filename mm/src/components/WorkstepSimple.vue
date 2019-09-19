<template>
    <v-layout row wrap>
        <v-flex py-2>
            <app-workstep-simple-item
                    v-for="(workstep) in allworksteps"
                    :key="workstep.id"
                    :workstep="workstep"
                    :cookstarttime="cookstarttime"
                    :runtime="runtime"
                    @SelectWorkstep="onSelectWorkstep"
                    @EditWorkstep="onEditWorkstep"
            ></app-workstep-simple-item>
        </v-flex>
    </v-layout>
</template>

<script>
    import WorkstepSimpleItem from '../components/WorkstepSimpleItem';
    export default {
        name: "WorkstepSimple",
        props:{
            allworksteps:Array,
            cookstarttime:Date,
            runtime:Date,
            SelectWorkstep:Function,
            EditWorkstep:Function,
        },
        components:{
            appWorkstepSimpleItem:WorkstepSimpleItem
        },
        methods:{
            onSelectWorkstep(item){
                this.$emit('SelectWorkstep', item);
            },
            onEditWorkstep(item){
                this.$emit('EditWorkstep',item);
            }
        }
    }
</script>
<style scoped>
    .mm-workstep-simple{
        border:solid 0px grey;
        text-align:left;
    }
</style>