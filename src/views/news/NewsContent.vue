<template>
  <v-row
    v-if="data != undefined && data.length != 0"
    class="d-flex justify-center"
    style="margin:50px 0px 150px 0px;"
  >
    <v-col cols="12" md="10" sm="10">
      <h1 class="headNews">
        {{ data[0].title }}
      </h1>
    </v-col>
    <v-col cols="12" md="10" sm="10">
      <div class="ql-editor" v-html="data[0].detail" style="width: 100%"></div>
    </v-col>
    <v-col cols="12" md="10" sm="10">
      <p class="ql-editor">
        <span>แหล่งที่มา : </span> <a :href="this.refer">{{ refer }}</a>
      </p>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NewsContent",
  data() {
    return {
      data: null,
      refer: null,
    };
  },
  beforeMount() {
    this.OnQuery();
  },
  computed: {
    ...mapGetters(["getOneNews"]),
  },
  methods: {
    async OnQuery() {
      let _id = this.$route.query.id;
      let resultNewsContent = await this.$restApi.post("news/one", {
        _id: _id,
      });
      this.data = resultNewsContent;
      this.refer = this.data[0].refer;
    },
  },
};
</script>

<style scoped>
.headNews {
  text-align: center;
}
@media screen and (min-width: 375px) and (max-width: 414px) {
  .headNews {
    padding: 0 0 0 10px;
    text-align: left;
  }
}
</style>
