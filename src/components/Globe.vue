<template>
  <div id="video-wrapper">
    <video autoplay loop muted>
      <source src="../assets/globe.mp4" type="video/mp4" />
    </video>
  </div>
</template>
<script>
export default {
  name: "Globe",
};
</script>
<style scoped>

#video-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  background-color: rgb(0, 0, 0);
}

video {
  width: 100%;
  max-width: 300px;
  height: auto;
}

</style>
