<template>
  <v-container>
    <div class="d-flex justify-center align-center mt-10 px-3">
      <h1>แหล่งท่องเที่ยวยอดฮิต</h1>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isLoggedIn() && this.hits_data"
        class="hidden-sm-and-down mx-1"
        @click="delete_hits = !delete_hits"
        color="error"
        dark
      >
        ลบข่าว<v-icon right class="material-icons">
          {{ delete_hits ? "mdi-close" : "mdi-cog" }}
        </v-icon>
      </v-btn>
      <v-btn
        v-if="isLoggedIn()"
        class="hidden-sm-and-down mx-1"
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

    <TourHitComponent
      :hits_data="hits_data"
      :delete_hits="delete_hits"
      :page="'hits'"
      @deleteHits="OnDelete($event)"
    />
    <NewPostDialog
      v-if="newpost_dialog"
      :newpost_dialog="newpost_dialog"
      @close="newpost_dialog = false"
      @submit="OnPosted($event)"
      :page="'hits'"
    />
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import TourHitComponent from "@/components/tour-hit.component.vue";
import NewPostDialog from "@/components/dialog/NewPostDialog";
export default {
  name: "TourHit",
  components: { TourHitComponent, NewPostDialog },
  data() {
    return {
      hits_data: null,
      newpost_dialog: false,
      delete_hits: false,
      maps: {
        map() {
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15506.164468249444!2d100.33857339999999!3d13.685644199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2be04d32d38f1%3A0x703a75856ad46015!2z4Lie4Li44LiU4LiV4Liy4LiZ4LmE4Lit4Lio4LiE4Lij4Li14Lih!5e0!3m2!1sth!2sth!4v1616921237071!5m2!1sth!2sth"
            width="600"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>;
        },
      },
    };
  },
  beforeMount() {
    this.OnQueryHits();
  },
  methods: {
    ...mapMutations(["KeepHits"]),
    async OnQueryHits() {
      try {
        let hits = await this.$restApi.get("hits/all");
        if (hits.length != 0) {
          this.hits_data = hits;
        } else {
          this.hits_data = null;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async OnPosted(item) {
      let { title, detail, titleImg, refer, statusHot, maps } = item;
      if (statusHot == true) statusHot = "hot";
      else statusHot = "hit";
      await this.$restApi.post("hits/post", {
        title,
        detail,
        titleImg,
        refer,
        statusHot,
        maps,
      });
      this.OnQueryHits();
    },
    async OnDelete(_id) {
      try {
        await this.$restApi
          .post("hits/delete", { _id })
          .then(() => this.OnQueryHits());
      } catch (error) {
        console.log(error);
      } finally {
        this.delete_hits = !this.delete_hits;
      }
    },
  },
};
</script>

<style></style>
