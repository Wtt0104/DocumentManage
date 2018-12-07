<template>
  <Layout :style="{marginLeft: '200px'}">
    <Content :style="{padding: '0px 16px 65px'}">
      <Breadcrumb :style="{padding: '10px 0'}">
      </Breadcrumb>
      <Card :bordered="false">
        <p
          slot="title"
          class="font"
        >{{file.Title}}</p>
        <p
          slot="title"
          class="time"
        >{{file.UploadTime}}</p>
        <div style="height: 600px">
          <p class="Content_padding">{{file.DocText}}</p>
        </div>
      </Card>
    </Content>
  </Layout>
</template>

<script>
export default {
  props: {
    file: Object
  },
  data () {
    return {
    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style>
.font {
  font-size: 20px !important;
}
.time {
  color: #808695 !important;
  font-weight: 100 !important;
}
.Content_padding {
  padding: 0px 25px;
}
</style>
