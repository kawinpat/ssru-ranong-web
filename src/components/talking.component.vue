<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">กระทู้ใหม่</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="8" class="pl-0">
              <v-text-field
                v-model="insertItem.title_tk"
                :rules="[rules.required]"
                :counter="50"
                maxlength="50"
                clearable
                outlined
                clear-icon="mdi-close-circle"
                label="หัวข้อ"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="pr-0">
              <v-text-field
                v-model="insertItem.writer"
                :rules="[rules.required]"
                clearable
                outlined
                clear-icon="mdi-close-circle"
                label="ชื่อผู้ตั้ง"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="px-0" cols="12" sm="6" md="12">
              <v-textarea
                v-model="insertItem.tk_detail"
                :rules="[rules.required]"
                clearable
                clear-icon="mdi-close-circle"
                auto-grow
                outlined
                rows="2"
                label="รายละเอียด"
                prepend-icon="mdi-comment"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="newTalkingbtn" color="blue darken-1" text @click="close">
          ยกเลิก
        </v-btn>
        <v-btn class="newTalkingbtn" color="blue darken-1" text @click="save">
          บันทึก
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "talkingComponent",
  props: ["dialog"],
  data() {
    return {
      insertItem: {
        title_tk: null,
        writer: null,
        tk_detail: null,
      },
      rules: {
        required: (value) => !!value || "กรุณากรอกข้อมูล.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        max: (v) => !v.length >= 20 || "Min 20 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      if (
        this.insertItem.title_tk &&
        this.insertItem.writer &&
        this.insertItem.tk_detail
      ) {
        this.$emit("save", this.insertItem);
        this.insertItem.title_tk = null;
        this.insertItem.writer = null;
        this.insertItem.tk_detail = null;
      } else {
        alert("กรุณากรอกข้อมูล")
      }
    },
  },
};
</script>

<style></style>
