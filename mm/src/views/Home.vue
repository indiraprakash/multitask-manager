<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 pa-1
            v-for="item in menuItems"
            :key="item.id"
    >
      <router-link :to="{ name: 'menuescookgraph', params: { id: item.id }}">
        <v-card class="rounded-card">
          <v-img
                  :src="item.image"
                  aspect-ratio="1.75"
          ></v-img>

          <v-card-title primary-title>
            <v-flex>
              <h3 class="headline mb-0">{{item.title}}</h3>
              <!--<div>Basilikum <br>Zwiebel und Knoblauch abziehen und fein hacken </div>-->
            </v-flex>
          </v-card-title>

        </v-card>
      </router-link>

    </v-flex>

  </v-layout>
</template>

<script>

    import { mapGetters } from 'vuex'; // get the Menus from the store


    export default {
        data(){
            return{
                menuItems: [] //to store the menus from the store
                }
        },
        computed: {
          ...mapGetters({
            menues: 'menues/menues'
          })
        },
        watch: {
          menues() {
            this.fillTestItems();
          }
        },
        methods: {
          fillTestItems() {
            for(const menue of this.menues) {
              this.menuItems.push({
                id: menue.id,
                title: menue.title,
                image: 'img/spagetti.jpg'
              });
            }
          }
        },
        mounted() {
          this.fillTestItems();
        }
    }
</script>
<style scoped>
  .rounded-card{
    border-radius:2px;
  }
  a:link {
      text-decoration: none;
  }
</style>
