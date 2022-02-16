<template>
  <v-card width="600" class="mx-auto mt-5">
    <v-card-title>
      <h3 class="display-1">Login</h3>
    </v-card-title>
    <v-form @submit.prevent="loginHandler">
      <v-card-text>
        <v-text-field
            label="Email"
            v-model="email"
            prepend-icon="mdi mdi-account"/>
        <v-text-field
            type="password"
            label="Password"
            v-model="password"
            prepend-icon="mdi mdi-lock"/>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success">Register</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" type="submit">Login</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import {reactive, toRefs} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {authComputed} from "@/store/helper";

export default {
  name: "Login",
  computed: {
    ...authComputed
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      email: "",
      password: ""
    });
    const loginHandler = () => {
      store.dispatch('login', data)
      .then(() => {
        router.push({name: 'Dashboard'});
      });
    }
    return {
      ...toRefs(data),
      loginHandler
    };
  }
}
</script>
