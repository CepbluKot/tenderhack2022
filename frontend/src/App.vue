<template>
  <v-app>
    <v-app-bar
        app
        elevation="0"
        style="border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;"
        color="white"
        outlined
    >
      <!--<v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
      />-->
      <v-toolbar-title class="text-subtitle-1 hidden-sm-and-down" v-text="title" />
      <v-spacer class="hidden-sm-and-down"/>
      <!--<v-avatar
          color="blue lighten-5"
          size="35"
          class="mr-2"
      >
          <span class="primary--text text-caption font-weight-bold">
            {{}}
          </span>
      </v-avatar>-->
      <!-- TODO нормальный autocomplete -->
      <v-autocomplete
        class="mx-1"
        v-model="sellerSelected"
        :disabled="sellers.length === 0"
        item-text="name"
        item-value="seller"
        :items="sellers"
        dense
        solo
        label="Выберите компанию-поставщика"
        style="max-height: 40px"
      ></v-autocomplete>
      <v-btn
        class="mx-1"
        color="primary"
        text
        @click="getSessionsList(sellerSelected)"
      >
        <v-icon>mdi-send-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-expansion-panels inset>
          <v-expansion-panel
              v-for="ks in ks_data"
              :key="ks"
          >
            <v-expansion-panel-header>
              <div class="d-flex justify-space-between align-center">
                <div class="text-subtitle-1">
                  {{ ks.name }}
                </div>
                <div class="mx-2">
                  <nobr>
                    # {{ ks }}
                  </nobr>
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutters>
                <v-col cols="12" sm="6">
                  description
                </v-col>
                <v-col cols="12" sm="6">
                  <SessionChart :ks="ks" />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      drawer: false,
      sellers: [],
      sellerSelected: {},
      ks_data: [],
      title: 'Система автоматизации участия в котировочных сессиях'
    }
  },
  mounted() {
    this.getSellersList()
  },
  methods: {
    getSellersList () {
      axios
        .get('/users/')
        .then((resp) => { this.sellers = resp.data })
        .catch(err => console.log(err))
    },
    getSessionsList (userId) {
      axios
        .get('/qs/' + userId + '/')
        .then((resp) => { this.ks_data = [ resp.data ] })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>
