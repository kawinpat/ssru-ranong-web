<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col
        cols="12"
        md="4"
        sm="5"
        class="d-flex align-center"
        style="height:500px;"
      >
        <v-card class="pa-5" align="center" width="100%">
          <h1>เข้าสู่ระบบ</h1>
          <form class="my-4">
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              label="Username"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              type="password"
              label="Password"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>

            <div class="mt-6">
              <v-btn class="mr-4" color="success" dark @click="submit">
                เข้าสู่ระบบ
              </v-btn>
              <!-- <v-btn @click="clear">
                clear
              </v-btn> -->
            </div>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  mixins: [validationMixin],

  validations: {
    name: { required, minLength: minLength(8) },
    password: { required, minLength: minLength(8) },
  },
  data: () => ({
    name: "",
    password: "",
  }),
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push("Username must be at 8 characters long or more");
      !this.$v.name.required && errors.push("Username is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at 8 characters long or more");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
  },

  methods: {
    ...mapMutations(["KeepLI"]),
    async submit() {
      this.$v.$touch();
      let resultLogin = await this.$restApi.post("login/admin", {
        username: this.name,
        password: this.password,
      });
      this.name = "";
      this.password = "";
      if (resultLogin == "loggedIn-S") {
        this.$router.push("/");
        this.KeepLI(resultLogin);
      } else if (resultLogin == null) alert("กรุณากรอกข้อมูลให้ถูกต้อง");
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.password = "";
    },
  },
};
</script>

<style></style>
