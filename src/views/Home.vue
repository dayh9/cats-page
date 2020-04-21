<template>
  <div class="home">
    <v-carousel
      :cycle="true"
      height="100%"
      :hide-delimiter-background="true"
      interval="5000"
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-container fill-height>
          <v-layout :class="item.align">
            <p
              :class="item.textColor"
              class="d-none d-sm-block display-4 font-weight-bold text-uppercase"
            >
              {{ item.title }}
            </p>
          </v-layout>
        </v-container>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      items: [
        {
          src:
            "https://wallpaperaccess.com/full/1209272.jpg",
          title: "Just some kitties",
          align: "align-start",
          textColor: "homeBrown--text",
        },
        {
          src:
            "https://newevolutiondesigns.com/images/freebies/cat-wallpaper-1.jpg",
          title: "to look at",
          align: "align-center",
          textColor: "homePink--text",
        },
        {
          src:
            "https://wallpaperxyz.com/wp-content/uploads/Scottish-Fold-Cute-CAT-Wallpapers-Full-HD-Free-Download-Wallpaperxyz.com-42.jpg",
          title: "and relax",
          align: "align-end",
          textColor: "primary--text",
        },
      ],
    };
  },
  computed: {
    fontSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "3em";
        default:
          return "5em";
      }
    },
  },
};
</script>
<style>
.home {
  height: 84vh;
}
</style>
