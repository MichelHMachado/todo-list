<template>
    <b-container class="mt-5">
      <b-row>
        <b-col md="6" class="mx-auto">
          <h2 class="text-center">Sign Up</h2>
          <b-form @submit.prevent="handleSignUp">
            <b-form-group label="Name" label-for="name">
              <b-form-input
                id="name"
                v-model="name"
                type="text"
                required
                placeholder="Enter your name"
              ></b-form-input>
            </b-form-group>
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
            <b-form-group label="Confirm Password" label-for="confirmPassword">
              <b-form-input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                required
                placeholder="Confirm your password"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="success" block>Sign Up</b-button>
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
    name: "SignupPage",
    data() {
      return {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        errorMessage: "",
      };
    },
    methods: {
      ...mapActions("auth", ["signup"]), 
      async handleSignUp() {
        if (this.password !== this.confirmPassword) {
          this.errorMessage = "Passwords do not match.";
          return;
        }
  
        try {
          await this.signup({
            name: this.name,
            email: this.email,
            password: this.password,
          });
          this.$router.push("/");
        } catch (error) {
          this.errorMessage = "Sign Up failed. Try again.";
        }
      },
    },
  };
  </script>
  