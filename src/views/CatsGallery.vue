<template>
  <div>
    <v-content>
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout row wrap align-center>
            <v-flex xs2>
              <v-select
                :items="['Rand', 'Desc', 'Asc']"
                v-model="order"
                label="Order"
                attach
              >
              </v-select>
            </v-flex>

            <v-flex xs2>
              <v-select
                :items="[3, 6, 9, 12, 18, 36]"
                v-model="limit"
                label="Limit"
                attach
              >
              </v-select>
            </v-flex>
            <v-flex xs2 v-show="order == 'Rand'">
              <v-btn color="primary" text @click="nextBtn">
                refresh
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-row>
              <v-col cols="12" sm="6" offset-sm="3">
                <v-card>
                  <v-container fluid>
                    <v-row>
                      <v-col
                        v-for="(image, n) in images"
                        :key="n"
                        class="d-flex child-flex"
                        cols="4"
                      >
                        <v-card flat tile class="d-flex">
                          <v-img
                            :src="image.url"
                            aspect-ratio="1"
                            class="grey lighten-2"
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
                              </v-row>
                            </template>
                          </v-img>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-layout>
          <br />
        </v-container>
      </v-card>
    </v-content>
    <v-layout>
      <v-flex>
        <div class="text-center">
          <v-container>
            <v-row justify="center">
              <v-col cols="8">
                <v-container class="max-width">
                  <v-pagination
                    v-if="order != 'Rand'"
                    v-model="page"
                    class="my-4"
                    :length="getNumPages"
                  ></v-pagination>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      images: [],
      order: "Rand",
      page: 100,
      limit: 3,
      pagination_count: 0,
    };
  },
  created() {
    this.getImages();
  },
  watch: {
    page: function() {
      this.getImages();
    },
    limit: function() {
      this.getImages();
    },
    order: function() {
      this.getImages();
    },
  },
  computed: {
    getNumPages: function() {
      return (
        Math.floor(this.pagination_count / this.limit) | 0
      );
    },
  },
  methods: {
    async nextBtn() {
      this.page++;
      await this.getImages();
    },
    async getImages() {
      try {
        axios.defaults.headers.common["x-api-key"] =
          "DEMO-API-KEY"; // Replace this with your API Key

        let query_params = {
          limit: this.limit,
          order: this.order,
          page: this.page - 1,
        };

        let response = await axios.get(
          "https://api.thecatapi.com/v1/images/search",
          { params: query_params }
        );

        this.pagination_count =
          response.headers["pagination-count"];
        this.images = response.data;

        console.log(
          "-- (" +
            this.images.length +
            ") Images from TheCatAPI.com"
        );
        console.log(
          this.pagination_count,
          "images available for this query."
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
