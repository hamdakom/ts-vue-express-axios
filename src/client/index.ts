import Vue from "vue";
import HelloComponent from "./components/Hello.vue";
import LoginComponent from "./components/Login.vue";

let v = new Vue({
  el: "#app",
  template: `
  <div>
    <h1>TS VUE EXPRESS AXIOS</h1>
    <hello-component />
    <login-component />
  </div>
  `,
  components: {
    HelloComponent,
    LoginComponent
  }
});
