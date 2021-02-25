<template>
  <v-container>
    <v-row class="d-flex justify-center" style="margin:50px 0px 50px 0px;">
      <v-col cols="12" md="9" sm="3">
        <h1 class="headNews" v-if="discuss_data != undefined">
          {{ discuss_data[0].title_tk }}
        </h1>
      </v-col>
      <v-col cols="12" md="9" sm="3">
        <p
          v-if="discuss_data != undefined"
          class="ql-editor"
          v-html="discuss_data[0].tk_detail"
          style="width: 100%"
        ></p>
      </v-col>
    </v-row>
    <v-row
      v-for="(ans, i) in discuss_ans"
      :key="i"
      class="d-flex justify-center"
    >
      <v-col cols="12" md="9" sm="3" class="ansBox my-1">
        <div class="d-flex align-end">
          <h2
            class="headNews font-weight-light"
            v-if="discuss_ans != undefined"
          >
            ผู้ตอบ: {{ ans.dc_writer }}
          </h2>
          <v-spacer></v-spacer>
          <p class="ma-0">
            {{ ans.date | datetimeFormat }}
          </p>
        </div>
        <p
          v-if="discuss_ans != undefined"
          v-html="ans.dc_ans"
          class="my-1 ql-editor"
        ></p>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center" style="margin:50px 0px 150px 0px;">
      <v-col cols="12" md="7" sm="3">
        <v-textarea
          v-model="dc_ans"
          clearable
          clear-icon="mdi-close-circle"
          auto-grow
          outlined
          rows="5"
          hide-details
          label="ตอบกระทู้"
          prepend-icon="mdi-comment"
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="2" sm="3">
        <v-textarea
          v-model="dc_writer"
          clearable
          clear-icon="mdi-close-circle"
          auto-grow
          outlined
          rows="2"
          hide-details
          label="ชื่อผู้ตอบ"
        ></v-textarea>
        <v-btn
          class="mt-8"
          color="green"
          :disabled="!dc_ans"
          dark
          @click="OnSave($route.query.id)"
          >ตอบ</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Discussion",
  data() {
    return {
      discuss_data: null,
      discuss_ans: null,
      dc_ans: null,
      dc_writer: null,
    };
  },
  beforeMount() {
    this.OnQueryDiscuss();
    this.OnQueryAnswerDiscuss();
  },
  computed: {
    ...mapGetters(["getOneDiscuss"]),
  },
  methods: {
    async OnQueryDiscuss() {
      let _id = this.$route.query.id;
      let resultDiscuss = this.getOneDiscuss(_id);
      if (resultDiscuss.length != 0) {
        this.discuss_data = resultDiscuss;
        return false;
      }
    },

    async OnQueryAnswerDiscuss() {
      let _id = this.$route.query.id;
      let resultDiscussAns = await this.$restApi.post(
        "talking/discuss/answer",
        { _id }
      );
      this.discuss_ans = resultDiscussAns;
    },

    async OnSave(_id) {
      if (this.dc_ans) {
        this.OnAnswered(this.dc_ans, this.dc_writer, _id);
        this.OnQueryAnswerDiscuss();
        this.dc_ans = null;
        this.dc_writer = null;
      } else alert("กรุณากรอกคำตอบ");
    },

    async OnAnswered(dc_ans, dc_writer, _id) {
      await this.$restApi.post("talking/discuss/post", {
        dc_ans: dc_ans,
        dc_writer: dc_writer,
        _id: _id,
      });
    },
  },
};
</script>

<style scoped>
.ansBox {
  border: 1px solid #9d9d9d9d;
  border-radius: 15px;
}

div >>> .pre-formatted {
  white-space: pre;
}
@media screen and (min-width: 375px) and (max-width: 375px) {
  .headNews {
    padding: 0 0 0 10px;
  }
}
</style>
