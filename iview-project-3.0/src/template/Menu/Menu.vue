<template>
  <Menu
    theme="light"
    width="auto"
    @on-select="select"
    accordion
  >
    <Submenu
      v-for="classify in classifys"
      :key="classify.Name"
      :name="classify.Name"
    >
      <template slot="title">
        <Icon :type="classify.icon"></Icon>
        {{classify.Name}}
      </template>
      <MenuGroup
        v-for="classify_child in classify.SubMenu"
        :key="classify_child.Id"
        :name="classify_child.Id"
        :title="classify_child.Name"
      >
        <MenuItem
          v-for="file in classify_child.Files"
          :key="file.FileId"
          :name="file.FileId"
        >{{file.Title}}</MenuItem>
      </MenuGroup>
    </Submenu>
  </Menu>
</template>

<script>
import axios from 'axios';
import common from '../../common.js';
export default {
  props: {
    classifys: Array
  },
  data () {
    return {
    }
  },
  methods: {
    select (name) {
      this.$Loading.start();
      axios.get('/File/GetFileInfo', {
        params: {
          fileId: name,
          code: "xiong"
        }
      }).then((response) => {
        let file = response.data.DataPacket.data
        this.$set(file, "UploadTime", common.timestampToTime(file.UploadTime));
        this.$emit('GetFile', file);
      })
    }
  },
  components: {

  }
}
</script>

<style>
</style>
