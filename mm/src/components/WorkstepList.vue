<template>
    <v-card>
        <v-list dense v-for="(workstep, index) in worksteps"
            :key="workstep.id">
            <app-workstep-list-item
                    :textToDisplay="workstep.description"
                    :workstep="workstep"
                    :deletable="true"
                    :editable="true"
                    :edit="edit"
                    :deleteItem="() => deleteItem(workstep)"
            ></app-workstep-list-item>
            <v-divider v-if="index + 1 < worksteps.length" :key="`divider-${index}`"></v-divider>
        </v-list>
    </v-card>
</template>

<script>
    import WorkstepListItem from './WorkstepListItem';
    export default {
        components:{
            appWorkstepListItem:WorkstepListItem
        },
        props:{
            worksteps:{
                type: Array,
                required: true
            },
            edit:{
                type: Function,
                required: true
            }
        },
        methods:{
            add(newWorkstep){
                this.items.push(newWorkstep)
            },
            deleteItem(workstep){
                const index = this.worksteps.findIndex(element => element.id === workstep.id);
                if(index != -1) {
                    this.worksteps.splice(index, 1);
                }
            }
        }
    }

</script>
<style scoped>

</style>