<!-- src/components/Hello.vue -->
<template>
  <div>
    <p v-if="data.pesan">
      {{data.pesan}}
    </p>
    <p v-else>{{errorMsg}}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  data() {
    return {
      data: [],
      errorMsg: ''      
    }
  },
  created() {
    const api = '/api/halo';
    axios.get(api).then(response => {
      this.data = response.data
    }).catch(error => {
      this.errorMsg = 'Tidak ada data ditemukan',
      this.data = []
    })
  }
});
</script>