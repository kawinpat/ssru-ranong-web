<template>
  <div id="app">
    <v-app id="myApp">
      <component v-bind:is="layout"></component>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    layout() {
      if (!this.$route.meta.layout) return "app-layout";
      else return `${this.$route.meta.layout}-layout`;
    },
  },
};
</script>
