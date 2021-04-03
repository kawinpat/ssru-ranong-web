<template>
  <v-navigation-drawer
    v-model="show"
    v-if="drawer"
    class="sidebar"
    temporary
    fixed
  >
    <div class="d-flex flex-column" style="height: 99% !important">
      <v-list dense class="px-1">
        <v-list-item class="mb-5 pt-3">
          <h1>เว็บไซต์จังหวัดระนอง</h1>
        </v-list-item>

        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          class="py-1"
          @click="OnGoTo(item.path)"
        >
          <v-list-item-icon>
            <v-icon class="material-icons">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div v-if="!isLoggedIn()">
          <v-list-item
            v-for="item in login"
            :key="item.title"
            class="py-1"
            @click="OnGoTo(item.path)"
          >
            <v-list-item-icon>
              <v-icon class="material-icons">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

        <div v-if="isLoggedIn()">
          <v-list-item
            v-for="item in logout"
            :key="item.title"
            class="py-1"
            @click="OnGoTo(item.path, 'logOut')"
          >
            <v-list-item-icon>
              <v-icon class="material-icons">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

        <v-divider class="my-3 mx-3"></v-divider>
      </v-list>
      <div class="copyRight mt-auto">
        <span>
          <div class="f10 text-center">
            Copyright
            <v-icon class="material-icons" size="11">copyright</v-icon>&nbsp; By
            SSRU IT15
          </div>
          <div class="f10 text-center">V.1.0 Igneous Rock</div>
        </span>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "sidebar",
  props: ["sidebarMenu"],
  data() {
    return {
      show: false,
      items: [
        { title: "หน้าแรก", icon: "mdi-view-dashboard", path: "/" },
        { title: "ข่าวสาร", icon: "mdi-newspaper-variant", path: "/news" },
        {
          title: "แหล่งท่องเที่ยวยอดฮิต",
          icon: "mdi-newspaper-variant",
          path: "/tour/hit",
        },
        {
          title: "เกี่ยวกับท่องเที่ยวเชืงเกษตร",
          icon: "mdi-barley",
          path: "/about",
        },
        { title: "กระทู้ถาม/ตอบ", icon: "mdi-forum", path: "/talking" },
        {
          title: "ท่องเที่ยวเสมือนจริง",
          icon: "mdi-video-box",
          path: "/tour/vr",
        },
      ],
      login: [
        { title: "เข้าสู่ระบบ", icon: "mdi-login-variant", path: "/login" },
      ],
      logout: [
        { title: "ออกจากระบบ", icon: "mdi-login-variant", path: "/login" },
      ],
    };
  },
  mounted() {
    this.show = this.sidebarMenu;
  },
  computed: {
    drawer() {
      return this.show;
    },
  },
  watch: {
    show(val) {
      if (!val) this.$emit("closeSidebar");
    },
    setShow() {
      this.show = this.sidebarMenu;
    },
  },
  methods: {
    ...mapMutations(["KeepLI"]),
    async OnGoTo(path, logOut) {
      if (!logOut && logOut == undefined) {
        this.$emit("closeSidebar");
        this.$router.push(path).catch((err) => err);
      } else if (logOut) {
        let rlo = await this.$restApi.post("logout/admin", { logOut: logOut });
        if (!rlo) this.KeepLI(null);
        this.$emit("closeSidebar");
        this.$router.push(path).catch((err) => err);
      }
    },
  },
};
</script>

<style>
.sidebar {
  border-radius: 0px 10px 10px 0px !important;
  /* height: 100%; */
}

.copyRight {
  display: flex !important;
  align-content: flex-end !important;
  justify-content: center;
  font-size: 12px;
}
</style>
