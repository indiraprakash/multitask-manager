<template>
    <v-container pl-0 pr-0>
        <v-layout justify-center>
            <v-flex xs12 sm10 md8>
                <appSmartInputItemList
                        :items="items"
                        :editable="true"
                        :deletable="false"
                        :selectable="false"
                        :editItem="navigateItem"
                        :deleteItem="deleteItem"
                        :selectItem="selectItem"
                >
                </appSmartInputItemList>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import SmartInputItemList from '../components/smartInputList/SmartInputItemList'

export default {
    name: "ScreenMenuesCook",
    computed: {
        ...mapGetters({
            menues: 'menues/menues'
        }),
        items() {
            const localItems = this.menues.map(menue => {
                return {
                    id: menue.id,
                    text: menue.title,
                    selected: false,
                    disallowDeletion: true,
                    subtext1: menue.subText1,

                };
            });
            return localItems;
        }
    },
    methods:{
        ...mapActions({
            // addRecipe: 'recipes/addRecipe',
            // removeRecipe: 'recipes/removeRecipe',
            // removeIngredient: 'recipes/removeIngredient',
            // addMenue: 'menues/addMenue',
            updateWorkStep: 'menues/updateWorkStep'
        }),
        navigateItem(item) {
            // todo, route to cook graph page with id item.id
            // console.log('[ScreenCookGraph][cook][id]', item.id, item.text);
            // console.log(item);
            this.$router.push({
                name: 'menuescookgraph',
                params: { id: item.id }
            });
        },
        selectItem(item){
            console.log(item);
        },
        deleteItem(item){
            console.log(item);
        },
        navigateTo(item){
            console.log(item);
        }
    },
    components:{
        appSmartInputItemList:SmartInputItemList
    },
    //name: "ScreenMenuesCook",
    // components: {
    //     //appCookGraph: ScreenCookGraph
    // },
    // // props: {
    // //     menues: {
    // //         type: Array,
    // //         required: true
    // //     }
    // // },
    // methods:{
    //
    // }
}
</script>

<style scoped>

</style>