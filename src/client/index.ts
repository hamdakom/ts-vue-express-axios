import Vue from "vue";
import HelloComponent from "./components/Hello.vue";

let v = new Vue({
  el: "#app",
  template: `
  <div>
    <h1>TS VUE EXPRESS AXIOS</h1>
    <hello-component />
  </div>
  `,
  components: {
    HelloComponent
  }
});
