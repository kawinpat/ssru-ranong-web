<template>
  <v-container class="text-left" style="margin-bottom: 60px;">
    <div class="d-flex justify-center align-center mt-10 px-3">
      <h1>ข่าวสารการท่องเที่ยวเชิงเกษตร</h1>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isLoggedIn()"
        class="hidden-sm-and-down"
        @click="newpost_dialog = !newpost_dialog"
        color="primary"
        dark
      >
        เพิ่มข่าวสาร<v-icon right class="material-icons">mdi-plus</v-icon>
      </v-btn>
      <v-btn
        class="hidden-md-and-up"
        v-if="isLoggedIn()"
        @click="newpost_dialog = !newpost_dialog"
        color="primary"
        fab
        dark
      >
        <v-icon class="material-icons">mdi-plus</v-icon>
      </v-btn>
    </div>

    <NewsComponent :news_data="news_data" :page="'news'" />
    <NewPostDialog
      v-if="newpost_dialog"
      :newpost_dialog="newpost_dialog"
      @close="newpost_dialog = false"
      @submit="OnPosted($event)"
    />
  </v-container>
</template>

<script>
import NewsComponent from "@/components/News.component.vue";
import NewPostDialog from "@/views/news/NewPostDialog";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Name",
  components: {
    NewsComponent,
    NewPostDialog,
  },
  beforeMount() {
    this.OnQuery();
  },
  data() {
    return {
      news_data: null,
      newpost_dialog: false,
    };
  },
  mounted() {
    this.OnNewQuery();
  },
  computed: {
    ...mapGetters(["getNews"]),
  },
  methods: {
    ...mapMutations(["KeepNews"]),
    async OnQuery() {
      try {
        let resultNews = await this.getNews;
        if (resultNews != null) {
          if (resultNews.length != 0) {
            this.news_data = resultNews;
            return false;
          }
        }
        let news = await this.$restApi.get("news/all");
        this.KeepNews(news);
        this.news_data = news;
      } catch (error) {
        console.log(error);
      }
    },
    async OnNewQuery() {
      try {
        let resultNews = await this.$restApi.get("news/all");
        this.KeepNews(resultNews);
        this.news_data = resultNews;
      } catch (error) {
        console.log(error);
      }
    },
    async OnPosted(item) {
      let { title, detail, titleImg } = item;
      await this.$restApi.post("news/post", { title, detail, titleImg });
      this.OnNewQuery();
    },
  },
};
</script>
