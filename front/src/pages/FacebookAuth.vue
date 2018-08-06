<template>
  <div>
    facebookAuth
  </div>
</template>

<script>
export default {
  created() {
    console.log('route:', this.$router, this.$route);
    const accessToken = this.$route.query.accessToken;
    if (accessToken) {
      window.opener.authenticateCallback(accessToken);
      window.close();
    }
  }
};
</script>

<style>
</style>
