<template>
    <b-container class="mt-5">
      <b-row>
        <b-col md="6" class="mx-auto">
          <h2 class="text-center">Login</h2>
          <b-form @submit.prevent="handleLogin">
            <b-form-group label="Email" label-for="email">
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="Enter your email"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password" label-for="password">
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Enter your password"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" block>Login</b-button>
          </b-form>
          <b-alert
            v-if="errorMessage"
            variant="danger"
            dismissible
            class="mt-3"
          >
            {{ errorMessage }}
          </b-alert>
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    name: "LoginPage",
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      ...mapActions("auth",["login"]),
      async handleLogin() {
        try {
          await this.login({ email: this.email, password: this.password });
          this.$router.push("/");
        } catch (error) {
          this.errorMessage = "Login failed. Check your credentials.";
        }
      },
    },
  };
  </script>
  