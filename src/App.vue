<template>
  <v-app>
    <v-app-bar app color="primary" density="compact" absolute>
      <v-app-bar-title>
        <v-btn :to="{name: 'Home'}" color="primary" text-color="white">Vue SPA Auth</v-btn>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn color="black" text-color="white" class="mr-2" :to="{name: 'Home'}">Home</v-btn>
      <v-btn color="black" text-color="white" class="mr-3" :to="{name: 'Register'}" v-if="!isAuthenticated">
        Register
      </v-btn>
      <v-btn color="black" text-color="white" class="mr-3" :to="{name: 'Login'}" v-if="!isAuthenticated">
        Login
      </v-btn>
      <v-btn color="black" text-color="white" class="mr-2" :to="{name: 'Dashboard'}" v-if="isAuthenticated">Dashboard</v-btn>
      <v-btn color="black" text-color="white" class="mr-3" @click.prevent="logout" v-if="isAuthenticated">
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import {authComputed} from "@/store/helper";
import axios from "axios";

export default {
  name: 'App',
  computed: {
    ...authComputed
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push({name: 'Home'})
      });
    }
  },
  created() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.$store.commit('SET_USER_DATA', user);
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
          .then(() => {
            this.$router.push({name: 'Home'})
          });
        }
        return Promise.reject(error);
      }
    );
  }
}
</script>
