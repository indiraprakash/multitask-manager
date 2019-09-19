<template>
       
    <v-layout
        row align-center
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        :style="{
            outline: hover ? '1px solid' + this.$vuetify.theme.accent : null,
            'min-height': '3rem'
        }"
        py-2
        >
        <v-flex v-if="selectable" v-bind="panelSelectAttributes">
            <v-layout>
                <v-flex xs12>
                    <div
                        @click="onCheckboxClick"
                        data-test-id-select
                        >
                        <v-btn flat icon>
                            <v-icon v-if="selected" color="secondary">{{ selectedIcon }}</v-icon>
                            <v-icon v-else color="secondary">{{ notSelectedIcon }}</v-icon>
                        </v-btn>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex
            v-bind="panelContentAttributes">
            <v-layout
                column
                >
                <div
                    @click="editable ? edit() : null"
                    :class="{link: editable}"
                    data-test-id-text
                    >
                    <v-flex
                        class="title text-format"
                        :class="{
                            'font-weight-bold': editable,
                        }"
                        :style="{color: this.$vuetify.theme.accent}"
                        >
                        {{ text }}
                    </v-flex>
                    <v-flex
                        mt-1
                        pl-1
                        v-if="subtext1"
                        class="subheading text-format"
                        >
                        {{ subtext1 }}
                    </v-flex>
                    <v-flex
                        pl-1
                        v-if="subtext2"
                        class="subheading text-format"
                        >
                        {{ subtext2 }}
                    </v-flex>
                </div>
            </v-layout>
        </v-flex>
        <v-flex v-if="deletable" v-bind="panelDeleteAttributes">
            <div
                data-test-id-delete
                >
                <v-btn flat icon color="secondary"
                    @click="deleteItem"
                    :disabled="deletableButDeactivated"
                    >
                    <v-icon>{{ deleteIcon }}</v-icon>
                </v-btn>
            </div>
        </v-flex>
        
            
    </v-layout>

</template>

<script>

    import { hover } from '../../mixins/hover.js';

    export default {
        mixins: [hover],
        props:{
            text: {
                type: String,
                required: true
            },
            subtext1: {
                type: String,
                default: ''
            },
            subtext2: {
                type: String,
                default: ''
            },
            deletable: {
              type: Boolean,
              required: true
            },
            deletableButDeactivated: {
                type: Boolean,
                default: false
            },
            editable: {
                type: Boolean,
                required: true
            },
            selectable: {
                type: Boolean,
                required: true
            },
            selected: {
                type: Boolean,
                required: false
            },
            select: {
               type: Function,
               required: false
            },
            edit: {
                type: Function,
                required: true
            },
            deleteItem: {
                type: Function,
                required: true
            },
            deleteIcon: {
                type: String,
                default: 'delete'
            },
            selectedIcon: {
                type: String,
                default: 'check_box'
            },
            notSelectedIcon: {
                type: String,
                default: 'check_box_outline_blank'
            }
        },
        methods:{
            onCheckboxClick() {
                this.select(!this.selected);
            }
        },
        computed: {
            panelSelectAttributes() {
                return {
                     xs2: true
                };
            },
            panelContentAttributes() {

                const attrs = {};
                if(!this.selectable && !this.deletable) {
                    attrs.xs12 = true;
                    attrs['pr-3'] = true;
                    attrs['pl-3'] = true;
                }
                else if(this.selectable && !this.deletable) {
                    attrs.xs10 = true;
                    attrs['pr-3'] = true;
                }
                else if(this.deletable && !this.selectable) {
                    attrs.xs10 = true;
                    attrs['pl-3'] = true;
                }
                else {
                    attrs.xs8 = true;
                }
                return attrs;
            },
            panelDeleteAttributes() {
                return {
                    xs2: true
                }
            }
        }
    }

</script>
<style scoped>

    
    .link {
        cursor: pointer;
    }
    .hidden {
        visibility: hidden;
    }
    .text-format {
        white-space: nowrap;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
    }
</style>