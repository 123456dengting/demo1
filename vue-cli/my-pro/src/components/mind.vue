<template>
  <div class="warp">



    <div class="mind" :class="{ mindRank: isRank }" v-drag ref="refresh">
      <mindItem :list="list" :style="'transform: scale(' + num + ')'"></mindItem>
    </div>
  </div>
</template>

<script>
import mindItem from "./mindItem.vue";
import { expendfn } from "./index.js";
export default {
  name: "mind",
  props: {},
  components: { mindItem },
  data() {
    return {
      isRank: false,
      list: [],
      num: 1,
      listCache: [
        {
          id: 11,
          first: true,
          tableData: 11111,
          children: [
            {
              parent: 11,
              id: 21,
              tableData: 22222,
            },
            {
              parent: 11,
              id: 22,
              tableData: 33333,
            },
            {
              parent: 11,
              id: 23,
              tableData: 44444,
              children: [
                {
                  parent: 23,
                  id: 33,
                  tableData: 55555
                },
                {
                  parent: 23,
                  id: 34,
                  tableData: 6666,
                },
                {
                  parent: 23,
                  id: 35,
                  tableData: 77777,
                },
                {
                  parent: 23,
                  id: 36,
                  tableData: 88888,
                  children: [
                    {
                      parent: 36,
                      id: 4444,
                      tableData: 55555
                    },
                    {
                      parent: 36,
                      id: 3243,
                      tableData: 6666,
                    },
                    {
                      parent: 36,
                      id: 436456,
                      tableData: 77777,
                    },
                    {
                      parent: 36,
                      id: 786787,
                      tableData: 88888,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
  computed: {},
  watch: {
    num(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (newVal < oldVal && oldVal <= 0.5) {
        this.num = 0.5;
      }
    },
  },
  directives: {
    drag: {
      bind: function (el) {
        let odiv = el;

        let moveing = false;
        let moves = false;
        odiv.onmousedown = (e) => {
          let arr = Array.from(odiv.classList);
          if (!arr.includes("mindRank")) return;
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          document.onmousemove = (e) => {
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            if (top <= 80 && left <= 300) {
              // top = 80;
              // left = 300;
            }

            odiv.style.left = left + "px";
            odiv.style.top = top + "px";
            moveing = true;
          };

          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;

            moveing = false;
          };
        };
      },
    },
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    rankfn() {
      this.isRank = !this.isRank;
    },
    numberChange() {
      console.log(" this.num--", this.num);
    },
    init() {
      let { listCache } = this;
      this.list = JSON.parse(JSON.stringify(listCache));
    },
    expendAll() {
      this.init();
    },
  },
};
</script>

<style scoped lang="less">
.warp {
  padding: 10px;
}
.mind {
  padding: 20px;
  // height: calc(100vh - 150px);
  // width: calc(100vw - 60px);
  position: fixed;
  user-select: none;
  overflow: auto;
  background-color: #fff;
}
.mindRank {
  cursor: move;
}
.header {
  display: inline-block;
  align-items: center;
  position: fixed;
  z-index: 2;
  background-color: #fff;
  & > div {
    display: inline-block;
    margin-right: 20px;
  }
}
</style>
