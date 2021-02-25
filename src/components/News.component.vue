<template>
  <v-container>
    <div
      v-if="this.news_data == null"
      class="d-flex justify-center align-center"
      style="height: 407px;"
    >
      <h2
        v-if="setNewsData.length == 0"
        style="color:#093A7A; border-bottom: 1px solid #4d4d4d"
      >
        ยังไม่มีบทความข่าวการท่องเที่ยวเชิงเกษตร
      </h2>
    </div>
    <v-row
      v-if="setNewsData.length != 0"
      class="fill-height"
      align="center"
      justify="start"
    >
      <v-col
        v-for="(content, i) in setNewsData"
        :key="i"
        cols="12"
        md="3"
        xs="2"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            class="mx-auto cardNews"
            @click="OnClick('/news/content', content._id)"
            :elevation="hover ? 12 : 2"
            :color="hover ? '#FFC839' : 'white'"
            ><!-- color="grey lighten-4" -->
            <v-img :aspect-ratio="16 / 8" :src="content.titleImg"> </v-img>
            <v-card-text class="pt-6" style="position: relative;">
              <div v-if="content.title.length < 25" class="title mb-2">
                {{ content.title | fixCardWord }}
                <small class="primary--text">{{ "..." + "อ่านต่อ" }}</small>
              </div>
              <div v-if="content.title.length > 25" class="title mb-2">
                {{ content.title | fixCardWord }}
                <small class="primary--text">{{ "..." + "อ่านต่อ" }}</small>
              </div>
              <v-spacer></v-spacer>
              <div class="mb-2 black--text">
                {{ "โพสต์เมื่อ" }}&nbsp;{{ content.date | datetimeFormat }}
              </div>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-list-item class="grow">
                <v-btn
                  absolute
                  :color="hover ? 'white' : '#FFC839'"
                  class="white--text"
                  fab
                  large
                  right
                  top
                  @click="OnClick('/news/content', content._id)"
                >
                  <v-icon
                    :color="hover ? 'black' : 'white'"
                    class="material-icons"
                  >
                    read_more
                  </v-icon>
                </v-btn>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NewsComponent",
  props: ["news_data", "page"],
  data() {
    return {};
  },
  computed: {
    setNewsData() {
      let newsData;
      if (this.page == "home" && this.news_data != null) {
        newsData = this.news_data.slice(0, 4);
      } else if (this.page == "news" && this.news_data != null) {
        newsData = this.news_data;
      } else if (this.news_data == null || this.news_data == undefined) {
        newsData = [];
      }
      return newsData;
    },
  },

  methods: {
    OnClick(path, id) {
      this.$router.push(`${path}?id=${id}`);
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold !important;
  color: black;
}
@media screen and (min-width: 375px) and (max-width: 1700px) {
  div >>> .title {
    font-size: 18px !important;
  }
}
</style>
