<template>
  <v-card width="600" class="mx-auto mt-5">
    <v-card-title>
      <h3 class="display-1">Registration</h3>
    </v-card-title>
    <v-form @submit.prevent="registerHandler">
      <v-card-text>
        <v-text-field
            v-model="name"
            label="Name"/>
        <v-text-field
            v-model="email"
            label="Email"/>
        <v-text-field
            v-model="password"
            type="password"
            label="Password"/>
        <v-text-field
            v-model="password_confirmation"
            type="password"
            label="Password Confirmation"/>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success">Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" type="submit">Register</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import {reactive, toRefs} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
export default {
  name: "Register",
  setup() {
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });

    const registerHandler = () => {
      console.log('submitting');
      store.dispatch('register', data)
      .then(() => {
        router.push({name: 'Dashboard'});
      });
    };

    return {
      ...toRefs(data),
      registerHandler
    };
  },
}
</script>
