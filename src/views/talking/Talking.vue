<template>
  <v-container justify="center" class="mt-10">
    <div class="d-flex justify-center" style="width:100%;">
      <v-data-table
        :headers="isLoggedIn() ? headers : computedHeaders"
        :items="dataTable"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        no-data-text="ยังไม่มีกระทู้"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>กระทู้ถาม-ตอบ</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="dialog = !dialog"
              dark
              class="mb-2"
              style="font-size:14px;"
            >
              ตั้งกระทู้
              <v-icon right class="material-icons">mdi-plus</v-icon>
            </v-btn>

            <talkingComponent
              :dialog="dialog"
              @save="onSave($event)"
              @close="close"
            />
            <!-- 
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">
                  ต้องการลบจริงๆใช่ไหม
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >ยกเลิก</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >ลบ</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog> -->
          </v-toolbar>
        </template>
        <template v-slot:[`item.read`]="{ item }">
          <v-btn
            color="warning"
            small
            @click="OnRead(item._id)"
            style="font-size:14px;"
          >
            <strong>อ่านกระทู้</strong>
          </v-btn>
        </template>
        <template v-slot:[`item.title_tk`]="{ item }">
          {{ item.title_tk.slice(0, 25) }}
        </template>
        <template v-slot:[`item.date`]="{ item }">
          {{ item.date | datetimeFormat }}
        </template>
        <template v-if="isLoggedIn()" v-slot:[`item.delete`]="{ item }">
          <v-btn
            icon
            color="black"
            @click="OnRecheck(item._id)"
            style="font-size:14px;"
          >
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <div class="text-center my-7">
      <v-pagination
        v-if="this.dataTable.length != 0"
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </div>
    <ConfirmDelete
      :deleteDialog="deleteDialog"
      :deleteId="deleteId"
      @closeDelete="deleteDialog = !deleteDialog"
      @AcceptDelete="OnConfirm($event)"
    />
  </v-container>
</template>

<script>
import talkingComponent from "@/components/talking.component";
import ConfirmDelete from "@/components/dialog/ConfirmDel.vue";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "Talking",
  components: { talkingComponent, ConfirmDelete },
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      deleteId: null,
      editedIndex: -1,
      dataTable: [],
      defaultItem: {
        title_tk: null,
        writer: null,
        tk_detail: null,
        // picture: null,
      },
      page: 1,
      pageCount: 0,
      itemsPerPage: 15,
      headers: [
        {
          text: "ชื่อกระทู้",
          sortable: false,
          value: "title_tk",
        },
        { text: "ผู้ตั้งกระทู้", sortable: false, value: "writer" },
        { text: "วันที่", value: "date" },
        { text: "", sortable: false, value: "read" },
        { text: "ลบกระทู้", sortable: false, value: "delete" },
      ],
    };
  },
  beforeMount() {
    this.OnNewQueryTalking();
  },
  computed: {
    ...mapGetters(["getTalking"]),
    computedHeaders() {
      return this.headers.slice(0, 4);
    },
  },
  mounted() {
    this.OnNewQueryTalking();
  },
  methods: {
    ...mapMutations(["KeepTalking"]),
    // async OnQueryTalking() {
    //   try {
    //     let query = await this.getTalking;
    //     if (query != null) {
    //       if (query.length != 0) {
    //         this.dataTable = query;
    //         return false;
    //       }
    //     }
    //     let resultTalking = await this.$restApi.get("talking/all");
    //     this.KeepTalking(resultTalking);
    //     this.dataTable = resultTalking;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    async OnNewQueryTalking() {
      try {
        let resultTalking = await this.$restApi.get("talking/all");
        this.KeepTalking(resultTalking);
        this.dataTable = resultTalking;
      } catch (error) {
        console.log(error);
      }
    },

    OnRead(_id) {
      this.$router.push(`/talking/discussion?id=${_id}`);
    },

    OnRecheck(deleteId) {
      this.deleteDialog = !this.deleteDialog;
      this.deleteId = deleteId;
    },

    OnConfirm(deleteId) {
      this.deleteDialog = !this.deleteDialog;
      this.OnDelete(deleteId)
    },

    async OnDelete(_id) {
      try {
        await this.$restApi
          .post("talking/discuss/delete", { _id })
          .then(() => this.OnNewQueryTalking());
      } catch (error) {
        console.log(error);
      }
    },

    async onSave(item) {
      let { title_tk, writer, tk_detail } = item;
      this.$restApi.post("talking/post", {
        title_tk,
        writer,
        tk_detail,
      });
      this.close();
      this.OnNewQueryTalking();
    },

    close() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
div >>> .theme--light.v-data-table {
  width: 85%;
}

@media screen and (min-width: 1400px) and (max-width: 1400px) {
  /* div >>> .theme--light.v-data-table {
    width: 100% !important;
  } */
}

div
  >>> .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  text-align: center !important;
  font-size: 20px !important;
  background-color: #bfeaa6 !important;
}

div >>> .v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  text-align: center !important;
  font-size: 16px !important;
  /* background-color: #f6f6f6 !important; */
}

div >>> .newTalkingbtn {
  font-size: 16px !important;
}
</style>
