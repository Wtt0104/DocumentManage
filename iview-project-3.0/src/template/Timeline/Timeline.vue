<template>
  <Layout :style="{marginLeft: '200px'}">
    <Content :style="{padding: '0px 16px 65px'}">
      <Breadcrumb :style="{padding: '16px 0'}">
      </Breadcrumb>
      <Card :bordered="false">
        <div style="height:620px">
          <Timeline pending>
            <TimelineItem v-for="timeline in timelines">
              <p class="font_time"><a
                  :id="timeline.Id"
                  v-on:click="getFileInfo(timeline.Id)"
                >{{timeline.Title}}</a></p>
              <p>{{timeline.UploadTime}}</p>
            </TimelineItem>
            <TimelineItem><a v-on:click="loading">查看更多</a></TimelineItem>
          </Timeline>
        </div>
      </Card>
    </Content>
  </Layout>
</template>

<script>
import axios from 'axios'
import common from '../../common.js'
var PageIndex = 1, PageCount = 3, Search = '', ListCount;

export default {
  data () {
    return {
      timelines: Array
    }
  },
  methods: {
    getTimeData () {
      axios.get('/File/GetTimeFileList', {
        params: {
          PageIndex: PageIndex,
          PageCount: PageCount,
          Search: Search,
          Code: 'xiong'
        }
      }).then((response) => {
        let timelineList = response.data.DataPacket.list
        ListCount = response.data.DataPacket.count;
        timelineList.forEach(timeline => {
          this.$set(timeline, "UploadTime", common.timestampToTime(timeline.UploadTime));
        });
        if (this.timelines.isArray) {
          this.timelines = timelineList;
        } else {
          this.timelines.push(...timelineList);
        }
      })
    },
    loading () {
      if (PageIndex * PageCount <= ListCount) {
        PageIndex++;
        this.getTimeData();
      } else {
        this.$Message.config({
          top: 260,
          duration: 3
        });
        this.$Message.warning('没有更多了哟');
      }
    },
    getFileInfo (id) {
      this.$Loading.start();
      axios.get('/File/GetFileInfo', {
        params: {
          fileId: id,
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

  },
  mounted () {
    this.getTimeData();
  }
}
</script>

<style>
.font_time {
  font-size: 14px !important;
  margin-bottom: 5px;
  margin-top: -2px;
}
.a_color {
  color: #515a6e;
}
</style>
