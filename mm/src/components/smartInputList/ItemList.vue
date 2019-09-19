<template>

    <v-layout row wrap ref="myLayout">
        <transition-group
            :name="hasWindow ? 'mylist' : ''"
            @before-leave="beforeLeave"
            tag="v-flex"
            >
            <v-flex xs12
                v-for="(item) in items"
                :key="item.id"
                :class="hasWindow ? 'mylist-item' : ''"
                >
                <v-card flat>
                    <app-list-item
                        :text="item.text"
                        :subtext1="item.subtext1"
                        :subtext2="item.subtext2"
                        :deletable="deletable"
                        :deletableButDeactivated="item.disallowDeletion"
                        :editable="editable"
                        :selected="item.selected"
                        :selectable="selectable"
                        :edit="() => editItem(item)"
                        :deleteItem="() => deleteItem(item)"
                        :select="(checked) => selectItem(item, checked)"                    
                        >
                    </app-list-item>
                </v-card>
                <v-divider></v-divider>
            </v-flex>
        </transition-group>
    </v-layout>
        
</template>

<script>

    import ListItem from './ListItem';
    export default {

        props: {
            items: {
                type: Array,
                required: true
            },
            deletable: {
                type: Boolean,
                required: true
            },
            editable: {
                type: Boolean,
                required: true
            },
            selectable: {
                type: Boolean,
                required: true
            },
            editItem: {
                type: Function,
                required: true
            },
            deleteItem: {
                type: Function,
                required: true
            },
            selectItem: {
                type: Function,
                required: false
            }
        },
        components:{
            appListItem: ListItem
        },
        data() {
            return {
                hasWindow: false
            };
        },
        methods: {
            beforeLeave(el) {
                if(this.hasWindow) {
                    const {width} = window.getComputedStyle(el);
                    el.style.width = width;
                }
            }
        },
        mounted() {
            this.hasWindow = window ? true : false;
        }
    }

</script>

<style scoped>

    .mylist-item {
        transition: all 0.8s;
    }
    .mylist-leave-to {
        opacity: 0;
    }
    .mylist-leave-active {
        position: absolute;
    }

</style>