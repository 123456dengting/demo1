<template>
  <transition name="el-zoom-in-center">
    <div class="warps">
      <template v-for="(item, i) in list">
        <div
          :key="i"
          class="bodyDefault"
          :class="[
            item.first ? 'bodyOuter' : '',
            i === 0 ? 'bodyFirst' : list.length - 1 === i ? 'bodyLast' : '',
          ]"
        >
          <i
            v-if="!item.first"
            class="iconremove"
            :class="[
              !item.isExpandBefore
                ? 'el-icon-remove-outline'
                : 'el-icon-circle-plus-outline',
            ]"
            type="primary"
            @click="expendBefore(item)"
          >
          </i>
          <div class="listTable" v-show="!item.isExpandBefore">
            <!-- <el-table :data="item.tableData" style="width: 300px" border size="small">
              <el-table-column prop="name" label="姓名" align="center"> </el-table-column>
              <el-table-column prop="age" label="年龄" align="center"> </el-table-column>
            </el-table> -->
            {{item.tableData}}
          </div>
          <i
            v-if="item.children && !item.isExpandBefore"
            class="iconremove"
            :class="[
              !item.isExpandAfter
                ? 'el-icon-remove-outline'
                : 'el-icon-circle-plus-outline',
            ]"
            @click="expendAfter(item)"
          >
          </i>
          <div
            v-if="item.children && !item.isExpandAfter && !item.isExpandBefore"
            class="box transition-box"
          >
            <mindItem :list="item.children"></mindItem>
          </div>
        </div>
      </template>
    </div>
  </transition>
</template>

<script>
import { expendfn } from "./index.js";
export default {
  name: "mindItem",
  components: {},
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {
    list: {
      deep: true,
      handler(newVal) {
        this.list = newVal;
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    expendBefore(val) {
      val.isExpandBefore = !val.isExpandBefore;
      this.$forceUpdate();
      console.log("后-expendBefore", val);
    },
    expendAfter(val) {
      val.isExpandAfter = !val.isExpandAfter;
      this.$forceUpdate();
      console.log("前-expendAfter", val);
    },
  },
};
</script>

<style scoped lang="less">
.warps {
  & > .bodyOuter,
  & > .bodyFirst,
  & > .bodyLast,
  & > .bodyDefault {
    padding: 10px 0 10px 24px;
    position: relative;
    border-left: none;
    .listTable {
      display: inline-block;
      display: flex;
      align-items: center;
      .expend {
        width: 10px;
        height: 100%;
        // border: 1px solid blue;
      }
    }
    display: flex;
    align-items: center;

    .box {
      flex: 1;
      margin-left: 30px;
      display: inline-block;
      position: relative;
    }
    .box::before {
      content: "";
      width: 30px;
      border: solid 1px skyblue;
      white-space: nowrap;
      display: inline-block;
      position: absolute;
      left: -15px;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  & > .bodyFirst::before,
  & > .bodyOuter::before,
  & > .bodyLast::before,
  & > .bodyDefault::before {
    content: "→";
    width: 30px;
    letter-spacing: 2px;
    white-space: nowrap;
    display: inline-block;
    position: absolute;
    left: 0px;
  }

  // 横线
  .bodyDefault::before {
  }
  .bodyFirst::before {
  }
  .bodyLast::before {
  }
  .bodyFirst::before {
  }

  .bodyOuter::before {
    content: "";
    border: solid 1px transparent;
  }

  // 竖线
  & > .bodyFirst::after,
  & > .bodyDefault::after,
  & > .bodyOuter::after,
  & > .bodyLast::after {
    content: "";
    width: 2px;
    height: 50%;
    border-left: solid 2px transparent;
    white-space: nowrap;
    display: inline-block;
    position: absolute;
    left: 0px;
  }

  & > .bodyDefault::after {
    border-left: solid 2px red;
    height: 100%;
  }

  & > .bodyFirst::after {
border-left: solid 2px yellowgreen;height: 50%;bottom: 0;
  }

  & > .bodyLast::after {
    border-left: solid 2px blue;height: 50%;top: 0;
  }

  // 外层
  .bodyOuter::after {
    border-left: solid 2px transparent;
  }
  // 最外层无线条
  .bodyOuter {
    background: transparent;
    border-left: 2px solid transparent;
    &.box::before {
      background: transparent;
    }
  }
  .bodyOuter::before {
    background: transparent;
  }
}

.iconremove {
  color: #409eff;
  width: 22px;
  font-size: 20px;
  cursor: pointer;
}
</style>
