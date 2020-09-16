<template>
  <div class="contents-wrap">
    <nuxt class="body" />
    <footer class="footer">
      <div class="content has-text-white">
        <div>Copyright © 2020.09.11 All rights reserved.</div>
        <div>
          <span class="has-text-white">더치페이계산기</span>
          by
          <a href="mailto:heogong79@gmail.com">heogong79@gmail.com</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  mounted() {
    // window.Kakao.init('process.env.KAKAO_INIT_KEY')
  },
}
</script>

<style scoped>
.footer {
  background-color: #181600;
  padding: 1rem 1.5rem 1rem;
}

a {
  color: #ffdd57;
}
</style>
