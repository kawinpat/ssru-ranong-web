<template>
  <v-dialog v-model="deleteDialog" width="500">
    <v-card class="py-4">
      <v-card-title class="headline d-flex justify-center">
        <h3>ท่านต้องการลบบทความนี้ใช่หรือไม่</h3>
      </v-card-title>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          color="error"
          class="white--text"
          right
          top
          @click="$emit('closeDelete')"
        >
          ไม่ใช่
        </v-btn>
        <v-btn
          color="success"
          class="white--text"
          right
          top
          @click="$emit('AcceptDelete', deleteId)"
        >
          ใช่
        </v-btn>
      </v-card-actions>

      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDeleteDialog",
  props: ["deleteDialog", "deleteId"],
};
</script>

<style scoped>
.ConfirmCard {
  width: 50%;
  min-width: 0px;
  height: 50%;
}
</style>
