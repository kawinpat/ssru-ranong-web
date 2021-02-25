<template>
  <v-container class="mt-10 text-left">
    <v-row class="px-7 d-flex justify-start align-end">
      <h1 class="headTopic">ข่าวสารการท่องเที่ยวเชิงเกษตร</h1>
      <v-spacer></v-spacer>
      <v-btn
        class="hidden-sm-and-down orange--text"
        @click="$router.push('/news')"
        outlined
      >
        ดูข่าวทั้งหมด<v-icon right class="material-icons">read_more</v-icon>
      </v-btn>
    </v-row>
    <NewsComponent :news_data="news_data" :page="'home'" />
    <v-row class="d-flex justify-center align-end">
      <v-btn
        class="hidden-md-and-up orange--text"
        @click="$router.push('/news')"
        outlined
      >
        ดูข่าวทั้งหมด<v-icon right class="material-icons">read_more</v-icon>
      </v-btn>
    </v-row>

    <v-row class="px-7 mb-10 mt-15 d-flex justify-start align-end">
      <h1 class="headTopic">เกี่ยวกับการท่องเที่ยวเชิงเกษตร</h1>
      <v-spacer></v-spacer>
      <v-btn
        class="hidden-sm-and-down orange--text"
        @click="$router.push('/about')"
        outlined
      >
        อ่านเพิ่มเติม<v-icon right class="material-icons">read_more</v-icon>
      </v-btn>
    </v-row>
    <AboutComponent :page="'home'"/>

    <div class="px-4 mt-15" style="height: 400px;">
      <h1 class="headTopic">กระทู้ถาม-ตอบ</h1>
      <div class="d-flex align-center mt-5">
        <p class="mb-0">
          หากมีข้อสงสัยสามารถตั้งกระทู้สอบถามเกี่ยวกับการท่องเที่ยวเชิงเกษตรได้เลย
        </p>
        <v-spacer></v-spacer>
        <v-btn
          class="hidden-sm-and-down"
          style="font-size:20px;"
          color="orange"
          dark
          @click="$router.push('/talking')"
        >
          อ่านกระทู้<v-icon right class="material-icons">mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-btn
        class="hidden-md-and-up mt-10"
        style="font-size:20px;"
        color="orange"
        dark
        @click="$router.push('/talking')"
      >
        ตั้งกระทู้<v-icon right class="material-icons">mdi-plus</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import NewsComponent from "@/components/News.component.vue";
import AboutComponent from "@/components/About.component.vue";

export default {
  name: "Home",
  components: {
    NewsComponent,
    AboutComponent,
  },
  beforeMount() {
    this.OnQuery();
  },
  data() {
    return {
      news_data: null,
    };
  },
  computed: {
    ...mapGetters(["getNews"]),
  },
  methods: {
    ...mapMutations(["KeepNews"]),
    async OnQuery() {
      try {
        let QueryNews = await this.getNews;
        if (QueryNews != null && QueryNews.lenght != 0) {
          this.news_data = QueryNews;
          return false;
        }
        let news = await this.$restApi.get("news/all");
        this.KeepNews(news);
        this.news_data = news;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
</style>
