<template>
  <div id="top">
    <Row>
      <Col
        span="6"
        class="arrow"
      >
      <a>
      <Icon
        type="ios-arrow-back"
        size="24"
        v-on:click="goCatalog"
      />
      </a>
      </Col>
      <Col
        span="12"
        class="home"
      >
      <a>
        <Icon
          type="ios-home-outline"
          size="23"
          v-on:click="goIndex"
        /></a>
      </Col>
      <Col
        span="6"
        class="search"
      >
      <Icon
        type="ios-search"
        size="22"
      />
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goIndex () {
      this.$emit('GoTimeline');
    },
    goCatalog(){
      this.$emit('ToCatalog');
    }
  },
  components: {

  }
}
</script>

<style>
#top {
  margin: 16px 0px 16px -10px;
  text-align: center;
}
#top a{
color: #5C6B77!important;
}
</style>
