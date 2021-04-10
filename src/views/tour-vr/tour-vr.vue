<template>
  <v-container>
    <div class="contentImg d-flex justify-center align-center">
      <v-img class="contentImg" style=" width: 100%;" src="@/assets/R-001.jpg"></v-img>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "VR",
};
</script>

<style scoped>
div >>> .contentImg {
  height: 500px;
}

@media screen and (min-width: 320px) and (max-width: 767px) {
  div >>> .contentImg {
    height: 250px !important;
  }
}
</style>
