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
    <v-col class="ql-editor" cols="12" md="10" sm="10">
      <p>
        แผนที่ : <a :href="this.data[0].maps">{{ this.data[0].maps }}</a>
      </p>
      <p>
        แหล่งที่มา :
        <a :href="this.data[0].refer">{{ this.data[0].refer }}</a>
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HitsContent",
  data() {
    return {
      data: null,
      refer: null,
      maps: null,
    };
  },
  beforeMount() {
    this.OnQuery();
  },
  computed: {},
  methods: {
    async OnQuery() {
      let _id = this.$route.query.id;
      let resultNewsContent = await this.$restApi.post("hits/one", {
        _id: _id,
      });
      this.data = resultNewsContent;
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
