<template>
    <div>
        <div>
            <small>Flat</small>
            <md-button>Default</md-button>
            <md-button :md-ripple="false">Ripple Off</md-button>
            <md-button class="md-primary">Primary</md-button>
            <md-button class="md-accent">Accent</md-button>
            <md-button disabled>Disabled</md-button>
        </div>

        <div>
            <small>Raised</small>
            <md-button class="md-raised">Default</md-button>
            <md-button class="md-raised" :md-ripple="false">Ripple Off</md-button>
            <md-button class="md-raised md-primary">Primary</md-button>
            <md-button class="md-raised md-accent">Accent</md-button>
            <md-button class="md-raised" disabled>Disabled</md-button>
        </div>

        <div>
            <small>Dense</small>
            <md-button class="md-dense md-primary">Flat</md-button>
            <md-button class="md-dense md-raised md-primary">Raised</md-button>
        </div>

        <md-field>
            <label>Enter</label>
            <md-input v-model="type"></md-input>
            <span class="md-helper-text">Helper text</span>
        </md-field>
    </div>

</template>

<script>
    import Vue from 'vue'
    import { MdButton, MdContent, MdTabs, MdField } from 'vue-material/dist/components'
    import 'vue-material/dist/vue-material.min.css'

    Vue.use(MdButton)
    Vue.use(MdContent)
    Vue.use(MdTabs)
    Vue.use(MdField)

    export default {
        name: "test"
    }
</script>

<style scoped>

</style>