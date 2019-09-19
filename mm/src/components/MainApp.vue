<template>
    <div>
    <v-navigation-drawer
            v-model="drawer"
            fixed
            app>
        <v-list dense>
            <v-list-tile v-for="item in menuItems"
                    :key="item.title"
                    @click="goToScreen(item.screen)">
                <v-list-tile-action>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title
                     :class="{activeMenuItem: isActiveRoute(item.screen)}"
                    >{{item.title}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>{{ screenTitle }}</v-toolbar-title>
    </v-toolbar>

    <!--<v-footer color="primary" app>
    </v-footer>-->
    </div>
</template>


<script>
    export default {
        data(){
            return{
                drawer: null,
                bottomNav: 'recent',
                menuItems:[
                    { title: 'Home',    screen: 'home', icon: 'home'},
                    // { title: 'About',   screen: 'about', icon: 'contact_mail'},
                    // { title: 'EditRecipes', screen: 'recipes-edit', icon: 'create'},
                    { title: 'Rezepte', screen: 'recipes', icon: 'receipt' },
                    { title: 'Menues', screen: 'menues-edit', icon: 'create'},
                    { title: 'Kochen',    screen: 'menuescook', icon: 'restaurant'},
                    { title: 'Backend', screen: 'backend', icon: 'memory'}
                ],
                screenTitle: ''
            }
        },
        watch:{
            $route (to /*, from*/){
                this.screenTitle = to.meta.displayTitle;
            }
        }, 
        methods:{
            goToScreen(paramScreen){
                this.$router.push({
                    name: paramScreen,


                });
            },
            isActiveRoute(routeName){
                return this.$route.name == routeName;

            }
        },
        created() {
            this.screenTitle = this.$route.meta.displayTitle;

        }


    }
</script>
<style scoped>
    .activeMenuItem{
        font-weight: bold;
    }
</style>