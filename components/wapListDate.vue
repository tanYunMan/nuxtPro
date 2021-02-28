<template>
  <div>
    <div class="date tbd1px bottom">
      <span @click="showPicker(1, startDate)">{{
        startDate.substring(0, 10)
      }}</span>
      <em>至</em>
      <span @click="showPicker(2, endDate)">{{
        endDate.substring(0, 10)
      }}</span>
      <van-icon @click="dayPicker = true" name="calender-o" />
    </div>
    <van-popup v-model="datePicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @cancel="datePicker = false"
        @confirm="onConfirmDate"
      />
    </van-popup>
    <van-popup v-model="dayPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="dayPicker = false"
        @confirm="onConfirmDay"
      />
    </van-popup>
  </div>
</template>

<script>
import moment from 'moment'
import { getTimeArr } from '@/common/utils'

export default {
  data() {
    const { from, to } = getTimeArr(1)
    return {
      startDate: from,
      endDate: to,
      currentDate: '',
      datePicker: false,
      dayPicker: false,
      columns: [
        {
          text: '昨天',
          value: 0
        },
        {
          text: '今天',
          value: 1
        },
        {
          text: '近一周',
          value: 2
        },
        {
          text: '近一月',
          value: 3
        },
        {
          text: '近三月',
          value: 4
        }
      ]
    }
  },
  methods: {
    onConfirmDate(d) {
      this.datePicker = false
      if (this.datePickerType === 1) {
        this.startDate = moment(d).format('YYYY-MM-DD 00:00:00')
      } else if (this.datePickerType === 2) {
        this.endDate = moment(d).format('YYYY-MM-DD 23:59:59')
      }
      this.$emit('change', {
        startDate: this.startDate,
        endDate: this.endDate
      })
    },
    onConfirmDay({ value }) {
      this.dayPicker = false
      const { from, to } = getTimeArr(value)
      this.startDate = from
      this.endDate = to
      this.$emit('change', {
        startDate: this.startDate,
        endDate: this.endDate
      })
    },
    showPicker(type, date) {
      this.datePickerType = type
      this.currentDate = new Date(date)
      this.datePicker = true
    }
  }
}
</script>

<style lang="scss" scoped>
.date {
  top: 92px;
  height: 36px;
  width: 100%;
  position: fixed;
  z-index: 9;
  padding: 5px 15px;
  line-height: 26px;
  font-size: 14px;
  background: white;
  em {
    font-style: normal;
    font-weight: 500;
    margin: 0 10px;
  }
  .van-icon {
    float: right;
    font-size: 22px;
    padding: 2px;
    margin-right: -2px;
  }
}
</style>
