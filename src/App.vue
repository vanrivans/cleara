<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  mounted() {
    this.$store.dispatch("order/updateCartStatus");
  }
}
</script>

<style>
/* font */
@font-face {
  font-family: "cabin-regular";
  src: local("cabin-regular"),
   url(./assets/font/cabin/Cabin-Regular.ttf) format("truetype");
}
/* end font */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'cabin-regular';
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.error-text {
  text-align: center;
  width: 100%;
  font-weight: 700;
  font-size: 32px;
}

.toasted {
  background: green;
}
</style>
