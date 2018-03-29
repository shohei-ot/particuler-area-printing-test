import Vue from "vue";
import App from "./src/App.vue";

import "./src/style.scss";

new Vue({
  el: "#app",
  components: { App },
  render() {
    return <App />;
  }
});
