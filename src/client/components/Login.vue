<template>
  <div>
    <div class="form-group">
      <label for="akun">Akun Pengguna</label>
      <input v-model="users.akun" class="form-control" name="akun" type="text" />
    </div>
    <div class="form-group">
      <label for="akun">Sandi Rahasia</label>
      <input v-model="users.sandi" class="form-control" name="sandi" type="password" />
    </div>
    <button @click="login">Masuk</button>
    <p>{{data.token}}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  data() {
    return {
      data: '',
      users: {
        akun: '',
        sandi: ''
      },
      errorMsg: ''
    }
  },
  methods: {
    login() {
      axios.post('/api/login', this.users)
        .then(response => { this.data = response.data })
        .catch(e => { this.errorMsg = e })
    }
  }
})
</script>