<template>
  <div id="app">
    <input
      v-model="message"
      type="text">
      <h2 class="message">{{ message }}</h2>
	  <h3>Some Other Message</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello world!',
    };
  },
};
</script>

<style>
.message {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: blue;
}
</style>