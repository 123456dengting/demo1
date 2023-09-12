<template>
  <div id="app">


    <div v-show="selectShow2" class="list">
        <ul>
          <li
            v-for="time in selectOption2"
            :key="time.value"
            @click="selechChange2(time)"
            :class="[selectValue1 === time.value ? 'active' : '']"
          >
            {{ time.label }}
          </li>
        </ul>
      </div>


      <input
                    @blur="onInputBlur('selectShow1')"
                    v-model="selectLabel1"
                    readonly
                    type="text"
                    placeholder="请选择"
                  />

  </div>
</template>

<script>
export default {
onOpenDialog(type) {
      this.selectShow1 = false;
      this.selectShow2 = false;
},

onInputBlur(type) {
      setTimeout(() => {
        this[type] = false;
      }, 100);
    },


</script>

<style lang="less">


.modal-tip {
  margin: 0 28px;

}
  table {
    thead {
      tr {
        border: 1px solid #3d8e71;
      }
    }
  }

  .select_wrap {
    ul {
      li {
        background: rgba(6, 74, 48, 0.9);
        &.active{
                    color: #ccfffb;
                  }
      }
    }
  }

  .detail-info {
      display: flex;
      flex-wrap: wrap;
      .detail-info-item {
        width: 33.33%;
        margin-bottom: 32px;
        font-size: 18px;
        span {
          color: #ffffff66;
          margin-right: 4px;
        }
        label {
          color: #ffffff;
        }
      }
    }

.detail-title{
  &.mb-24{
        margin-bottom: 24px;
      }
}

.tabs {
    position: absolute;
    left: 400px;
    ul {
      display: flex;
      cursor: pointer;
      li {
        width: 104px;
        height: 32px;
        line-height: 32px;
        text-align: center;
      }
    }
    .active {
      box-shadow: inset 0px 1px 10px 0px #146f47;
      color: #fff !important;
    }
    .text-danger {
      color: rgba(255, 255, 255, 0.5);
    }
  }


</style>
