<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto',background:'#fff'}">
      <T_TopFunction
        @GoTimeline="goTimeline"
        @ToCatalog="toCatalog"
      ></T_TopFunction>
      <T_Menu
        v-bind:classifys="classifys"
        @GetFile="bind_File"
      ></T_Menu>
    </Sider>
    <keep-alive>
      <component
        :is="content"
        :file="file"
        @GetFile="bind_File"
      ></component>
    </keep-alive>
    <Drawer
      title="Basic Drawer"
      placement="left"
      :closable="false"
      v-model="isShow "
    >
      <p v-for="company in companys"><a @click="changeCode(company.Code)">{{company.Name}}</a></p>
    </Drawer>
  </div>
</template>
<script>
import Menu from '../template/Menu/Menu.vue'
import TopFunction from '../template/TopFunction/TopFunction.vue'
import Content from '../template/Content/Content.vue'
import Timeline from '../template/Timeline/Timeline.vue'
import axios from 'axios'

export default {
  data () {
    return {
      classifys: Array,
      companys: Array,
      file: Object,
      content: 'T_Timeline',
      isShow: false,
      code: 'xiong'
    }
  },
  components: {
    "T_Menu": Menu,
    "T_TopFunction": TopFunction,
    "T_Content": Content,
    "T_Timeline": Timeline
  },
  methods: {
    GetCategoryList () {
      axios.get('/Category/GetCategoryFileList', {
        params: {
          code: this.code
        }
      }).then((response) => {
        this.classifys = response.data.DataPacket.list;
        this.$Loading.finish()
        this.isShow = false;
      })
    },
    GetCompanyList () {
      axios.get('/Company/GetCompanyList').then((response) => {
        this.companys = response.data.DataPacket.list;
        this.code = response.data.DataPacket.list[0].Code;
      })
    },
    bind_File (data) {
      this.file = data;
      this.content = 'T_Content';
      this.$Loading.finish()
    },
    goTimeline () {
      this.content = 'T_Timeline'
    },
    toCatalog () {
      this.isShow = true;
    },
    changeCode (code) {
      this.$Loading.start();
      this.code = code;
      this.GetCategoryList();
    }
  },
  mounted () {
    this.GetCompanyList();
    this.GetCategoryList();
  }
}
</script>
