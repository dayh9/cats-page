<template>
  <div>
    <v-card
      class="mx-auto my-5"
      max-width="500"
      :loading="loading"
      :loader-height="7"
    >
      <v-img
        :src="cat.url"
        max-height="500"
        lazy-src="https://media1.tenor.com/images/aa5fdfb45fd489d3d11e8893fc707912/tenor.gif?itemid=5665214"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row> </template
      ></v-img>
      <v-card-title v-if="cat.breeds[0]"
        >{{ cat.breeds[0].name }}
      </v-card-title>
      <v-layout align-center justify-center>
        <v-btn
          color="blue"
          dark
          large
          @click="loadNextImage"
          class="my-1"
        >
          Call new cat &nbsp;
        </v-btn>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RandomCat",
  filters: {
    currencydecimal(value) {
      return value.toFixed(2);
    },
  },
  data() {
    return {
      cat: {},
      loading: true,
      errored: false,
      show: false,
    };
  },
  created() {
    this.loadNextImage();
  },
  methods: {
    async loadNextImage() {
      this.loading = true;
      axios.defaults.headers.common["x-api-key"] =
        "DEMO-API-KEY"; // Replace this with your API Key
      axios
        .get("https://api.thecatapi.com/v1/images/search", {
          params: { limit: 1, size: "full" },
        })
        .then((response) => {
          this.cat = response.data[0];
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style></style>
