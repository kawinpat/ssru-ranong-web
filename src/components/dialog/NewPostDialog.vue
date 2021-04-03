<template>
  <v-dialog
    v-model="newpost_dialog"
    fullscreen
    hide-overlay
    class="px-9"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="#093A7A">
        <v-btn icon dark @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>เพิ่มบทความ</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="OnSave">
            บันทึก
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-row class="d-flex justify-center mt-5 px-5">
        <v-col cols="12" md="3" sm="auto">
          <h3>เพิ่มหัวเรื่อง <span class="error--text">*</span></h3>
          <v-text-field
            v-model="title"
            :rules="[rules.required]"
            clearable
            outlined
            clear-icon="mdi-close-circle"
            required
            placeholder="กรุณากรอกหัวเรื่อง"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" sm="auto">
          <h3>เพิ่มรูปหน้าปก <span class="error--text">*</span></h3>
          <v-file-input
            :rules="[rules.checkImg]"
            ref="titleImg"
            chips
            counter
            show-size
            truncate-length="15"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="เลือกรูปหน้าปก ขนาดไม่เกิน 2MB"
            prepend-icon="mdi-camera"
            v-on:change="OnInputImage"
          >
          </v-file-input>
          <!-- <input
          
            
            style="display: none"
            type="file"
            v-on:change="OnSelectImg"
            ref="titleImg"
            accept="image/*"
          /> -->
        </v-col>
        <v-col cols="12" md="3" sm="auto">
          <h3>แหล่งอ้างอิง</h3>
          <v-text-field
            v-model="refer"
            clearable
            outlined
            clear-icon="mdi-close-circle"
            placeholder="กรุณากรอกหัวเรื่อง"
          ></v-text-field>
        </v-col>
        <v-col class="px-0" cols="12" md="11" sm="3">
          <h3>เพิ่มรายละเอียด <span class="error--text">*</span></h3>
          <vue-editor v-model="detail"></vue-editor>
        </v-col>

        <v-col v-if="page == 'hits'" cols="12" md="3" sm="auto" class="d-flex">
          <v-text-field
            v-model="maps"
            clearable
            outlined
            clear-icon="mdi-close-circle"
            placeholder="กรุณากรอกลิงค์ที่อยู่"
          ></v-text-field>
        </v-col>
        <v-checkbox
          v-if="page == 'hits'"
          v-model="statusHot"
          label="เป็นสถานที่ยอดฮิตใช่ไหม?"
        ></v-checkbox>

        <v-col cols="12" md="10" sm="3" v-if="detail">
          <h3 class="primary--text">เนื้อหาที่แสดง</h3>
          <div class="ql-editor" v-html="detail"></div>
        </v-col>
      </v-row>

      <div class="d-flex justify-center mt-5">
        <v-btn class="mx-1" color="error" dark @click="$emit('close')">
          ยกเลิก
        </v-btn>
        <v-btn class="mx-1" color="green" dark @click="OnSave">
          บันทึก
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "NewPostDialog",
  props: ["newpost_dialog", "page"],
  components: {
    VueEditor,
  },
  data() {
    return {
      title: null,
      titleImg: null,
      titleImgUrl: "",
      detail: null,
      refer: null,
      statusHot: false,
      maps: null,
      rules: {
        required: (value) => !!value || "กรุณากรอกข้อมูล.",
        checkImg: (value) =>
          !value || value.size < 2000000 || "เลือกรูปหน้าปก ขนาดไม่เกิน 2MB!",
      },
    };
  },
  methods: {
    OnSave() {
      if (this.title && this.detail != undefined && this.titleImg) {
        this.$emit("submit", {
          title: this.title,
          detail: this.detail,
          titleImg: this.titleImg,
          refer: this.refer,
          statusHot: this.statusHot,
          maps: this.maps,
        });
        this.$emit("close");
      } else {
        alert("กรุณากรอกข้อมูลทั้งหมด");
      }
    },
    OnInputImage(event) {
      if (event) {
        var reader = new FileReader();
        reader.readAsDataURL(event);
        reader.onload = async () => {
          this.titleImg = reader.result;
        };
      }
    },
    // OnSelectImg(event) {
    //   const files = event.target.files;
    //   console.log("files : ", files);
    //   let filename = files[0].name;
    //   if (filename.lastindexOf(".") <= 0) {
    //     return alert("กรุณาใส่รูปที่ถูกต้อง");
    //   }
    //   console.log("filename : ", filename);
    //   const fileReader = new FileReader();
    //   fileReader.addEventListener("load", () => {
    //     this.titleImgUrl = fileReader.result;
    //   });
    //   fileReader.readAsDataURL(files[0]);
    //   this.titleImg = files[0];

    //   console.log("titleImg : ", this.titleImg);
    //   // reader.onload = async () => {
    //   //   let payload = {
    //   //     line_id: this.lineId,
    //   //     data: reader.result,
    //   //     type: files[0].type,
    //   //     folder: field,
    //   //   };
    //   //   let response = await this.$restApi.posts("/file/upload", payload);
    //   //   this.formData[field] = response.url;
    //   // };
    // },
  },
};
</script>

<style scoped>
div >>> .ql-editor {
  padding: 0px !important;
}
</style>
