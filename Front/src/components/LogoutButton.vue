<template>
  <button class="btn btn-outline-secondary" @click="handleLogout">
    Logout
  </button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LogoutButton",
  methods: {
    ...mapActions("auth", ["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>
