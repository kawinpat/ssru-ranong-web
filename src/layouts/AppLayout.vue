<template>
  <div>
    <Sidebar
      :sidebarMenu="sidebarMenu"
      @closeSidebar="sidebarMenu = false"
      v-if="sidebarMenu"
    />
    <!-- Nav Bar -->
    <v-app-bar
      class="hidden-sm-and-down"
      prominent
      shrink-on-scroll
      :style="BGStyle"
      src="@/assets/image/background/B 003-002.png"
      color="green"
      height="520px"
      scroll-threshold="100000"
      dark
    >
      <v-row justify="end" style="background-color:#093A7A">
        <v-col cols="3" class="py-1 d-flex justify-center align-end">
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

        <v-col cols="7" class="py-1 d-flex justify-end align-end">
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

        <!-- Login -->
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

        <!-- logOut -->
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
    </v-app-bar>

    <!-- Nav Bar Mobile-->
    <v-app-bar
      class="hidden-md-and-up"
      prominent
      shrink-on-scroll
      :style="BGStyle"
      color="green"
      height="200px"
      scroll-threshold="100000"
      dark
    >
      <v-row>
        <v-col
          cols="2"
          class="d-flex justify-center"
          style="background-color:#093A7A"
        >
          <v-app-bar-nav-icon @click="OnclickSideBar"></v-app-bar-nav-icon>
        </v-col>
      </v-row>
    </v-app-bar>

    <!-- Content -->
    <v-main>
      <router-view></router-view>
    </v-main>

    <!-- Footer -->
    <v-footer color="#093A7A" height="200px" padless>
      <v-row justify="center" no-gutters>
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
        <v-col class="py-4 text-center white--text" color="#093A7A" cols="12">
          <strong>{{ new Date().getFullYear() + 543 }} — SSRU Project</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import Sidebar from "@/components/header/Sidebar";
import { mapMutations } from "vuex";
export default {
  name: "AppLayout",
  components: { Sidebar },
  data() {
    return {
      sidebarMenu: false,
      home: [
        {
          text: "เว็บไซต์จังหวัดระนอง",
          path: "/",
        },
      ],
      whatsNext: [
        {
          text: "หน้าแรก",
          path: "/",
        },
        {
          text: "ข่าวสาร",
          path: "/news",
        },
        {
          text: "ท่องเที่ยวเสมือนจริง",
          path: "/tour/vr",
        },
      ],
      menus: [
        {
          text: "เกี่ยวกับการท่องเที่ยวเชิงเกษตร",
          path: "/about",
        },
        {
          text: "กระทู้ถาม/ตอบ",
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
        { title: "เกี่ยวกับการท่องเที่ยวเชิงเกษตร", path: "/about" },
        { title: "กระทู้ถาม/ตอบ", path: "/talking" },
        { title: "ท่องเที่ยวเสมือนจริง", path: "/tour/vr" },
      ],
    };
  },
  computed: {
    BGStyle() {
      return {
        // backgroundImage: `url(https://picsum.photos/1920/1080)`,
        backgroundSize: "cover",
        backgroundPositionY: "30%",
        Opacity: "80%",
        // Gradient: "to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
      };
    },
  },
  methods: {
    ...mapMutations(["KeepLI"]),
    async OnClick(path, logOut) {
      if (!logOut && logOut == undefined) {
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
  },
};
</script>

<style scoped>
.AppBtn {
  height: 50px !important;
}

.AppBtn:hover {
  border: 1px solid #fff;
  border-radius: 0 !important;
  background-color: #1d549c;
}

div >>> .headerFont {
  font-size: 19px !important;
}

.v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitle {
  font-size: 17px !important;
  font-weight: bold !important;
}
</style>
