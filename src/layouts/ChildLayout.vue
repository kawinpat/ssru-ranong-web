<template>
  <div>
    <Sidebar
      :sidebarMenu="sidebarMenu"
      @closeSidebar="sidebarMenu = false"
      v-if="sidebarMenu"
    />
    <!-- Nav Bar -->
    <v-row
      class="hidden-sm-and-down"
      style="background-color:#093A7A; position: absolute; z-index: 1; width:101.2%;"
    >
      <v-col cols="7" class="py-1 d-flex justify-start align-end">
        <v-btn
          v-for="(next, i) in home"
          :key="i"
          text
          class=" AppBtn"
          @click="OnClick(next.path)"
        >
          <div class="headerFont">{{ next.text }}</div>
        </v-btn>
      </v-col>

      <v-col cols="3" class="py-1 d-flex justify-end align-end">
        <v-btn
          v-for="(next, i) in whatsNext"
          :key="i"
          text
          class="AppBtn"
          @click="OnClick(next.path)"
        >
          <div class="headerFont">{{ next.text }}</div>
        </v-btn>

        <v-menu open-on-hover down offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="AppBtn" text dark v-bind="attrs" v-on="on">
              <div class="headerFont">เมนู</div>
              <v-icon right class="material-icons">arrow_drop_down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in menus" :key="index">
              <v-list-item-title @click="OnClick(item.path)">{{
                item.text
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>

      <v-col
        v-if="!isLoggedIn()"
        cols="2"
        class="py-1 d-flex justify-center align-end"
      >
        <v-btn
          v-for="(next, i) in login"
          :key="i"
          text
          class="AppBtn"
          @click="OnClick(next.path)"
        >
          <div class="headerFont">{{ next.text }}</div>
        </v-btn>
      </v-col>

      <v-col
        v-if="isLoggedIn()"
        cols="2"
        class="py-1 d-flex justify-center align-end"
      >
        <v-btn
          v-for="(next, i) in logOut"
          :key="i"
          text
          class="AppBtn"
          @click="OnClick(next.path, 'logOut')"
        >
          <div class="headerFont">{{ next.text }}</div>
        </v-btn>
      </v-col>
    </v-row>

    <v-carousel
      cycle
      hide-delimiters
      class="NavImg"
      width="auto"
      :show-arrows="false"
    >
      <v-carousel-item
        class="NavImg"
        v-for="(pic, i) in items"
        :key="i"
        :src="require('@/assets/' + pic.image)"
      >
        <div class="hidden-md-and-up">
          <v-col
            cols="2"
            class="d-flex justify-center"
            style="background-color:#093A7A"
          >
            <v-app-bar-nav-icon @click="OnclickSideBar"></v-app-bar-nav-icon>
          </v-col>
        </div>
      </v-carousel-item>
    </v-carousel>

    <!-- Content -->
    <v-main>
      <router-view></router-view>
    </v-main>

    <!-- Footer -->
    <v-footer color="#093A7A" height="300px" app absolute>
      <v-row justify="center">
        <v-btn
          v-for="(link, i) in links"
          :key="i"
          color="white"
          text
          rounded
          class="my-2"
          @click="OnClick(link.path)"
        >
          {{ link.title }}
        </v-btn>
        <v-btn class="my-1" icon>
          <v-icon @click="redirect('https://www.facebook.com/')" color="white"
            >mdi-facebook</v-icon
          >
        </v-btn>
        <v-btn class="my-1" icon>
          <v-icon @click="redirect('https://www.youtube.com/')" color="white">
            mdi-youtube
          </v-icon>
        </v-btn>
        <v-col class="py-4 text-center white--text" color="#093A7A" cols="12">
          <strong>{{ new Date().getFullYear() + 543 }} — มหาวิทยาลัยราชภัฎสวนสุนันทา</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import Sidebar from "@/components/header/Sidebar";
// import bgImg from "@/assets/image/background/B 001-002.png";
import { mapMutations } from "vuex";
export default {
  name: "ChildLayout",
  components: { Sidebar },
  data() {
    return {
      sidebarMenu: false,
      items: [
        {
          image: "B-001.jpg",
        },
        {
          image: "B-002.png",
        },
        {
          image: "B-003.png",
        },
        {
          image: "B-004.png",
        },
        {
          image: "B-005.png",
        },
      ],
      home: [
        {
          text: "การส่งเสริมการท่องเที่ยวเชิงเกษตรสร้างสร้างสรรค์ จังหวัดระนอง",
          path: "/",
        },
      ],
      whatsNext: [
        {
          text: "หน้าแรก",
          path: "/",
        },
        // {
        //   text: "ข่าวสาร",
        //   path: "/news",
        // },
        // {
        //   text: "แหล่งท่องเที่ยวยอดฮิต",
        //   path: "/tour/hit",
        // },
        // {
        //   text: "ท่องเที่ยวเสมือนจริง",
        //   path: "/tour/vr",
        // },
      ],
      menus: [
        {
          text: "ข่าวสาร",
          path: "/news",
        },
        {
          text: "แหล่งท่องเที่ยวยอดฮิต",
          path: "/tour/hit",
        },
        {
          text: "ท่องเที่ยวเสมือนจริง",
          path: "/tour/vr",
        },
        {
          text: "เกี่ยวกับการท่องเที่ยวเชิงเกษตร",
          path: "/about",
        },
        {
          text: "กระทู้ถาม/ตอบ",
          path: "/talking",
        },
      ],
      admin_menus: [
        {
          text: "เพิ่มข่าวสาร",
          path: "/news",
        },
        {
          text: "จัดการกระทู้ถาม/ตอบ",
          path: "/talking",
        },
      ],
      login: [{ text: "เข้าสู่ระบบ", path: "/login" }],
      logOut: [{ text: "ออกจากระบบ", path: "/login" }],
      links: [
        { title: "หน้าแรก", path: "/" },
        {
          title: "ข่าวสาร",
          path: "/news",
        },
        {
          title: "แหล่งท่องเที่ยวยอดฮิต",
          path: "/tour/hit",
        },
        { title: "เกี่ยวกับการท่องเที่ยวเชิงเกษตร", path: "/about" },
        { title: "กระทู้ถาม/ตอบ", path: "/talking" },
        { title: "ท่องเที่ยวเสมือนจริง", path: "/tour/vr" },
      ],
    };
  },
  computed: {
    BGStyle() {
      return {
        // backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPositionY: "50%",
        Opacity: "80%",
        // Gradient: "to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
      };
    },
  },
  methods: {
    ...mapMutations(["KeepLI"]),
    async OnClick(path, logOut) {
      if (!logOut) {
        this.$router.push(path).catch((err) => err);
      } else if (logOut) {
        let rlo = await this.$restApi.post("logout/admin", { logOut: logOut });
        if (!rlo) this.KeepLI(null);
        this.$router.push(path).catch((err) => err);
      }
    },
    OnclickSideBar() {
      this.sidebarMenu = !this.sidebarMenu;
    },
    redirect(link) {
      window.location = link;
    },
  },
};
</script>

<style scoped>
.AppBtn {
  height: 50px !important;
  color: white !important;
}

.AppBtn:hover {
  border: 1px solid #fff;
}

div >>> .headerFont {
  font-size: 19px !important;
}

.v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitle {
  font-size: 17px !important;
  font-weight: bold !important;
}

.NavImg {
  height: 250px !important;
}
div >>> .v-image__image--cover {
  height: 250px !important;
}
</style>
