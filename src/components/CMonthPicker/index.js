import { DatePicker } from 'antd'
import React from 'react'
import moment from 'moment'
const { MonthPicker } = DatePicker

export default class CMonthPicker extends React.Component {
  monthCellContentRender = (date, locale) => {
    // 修复日期控件选中样式bug
    const current = this.props.value || this.props.defaultValue ? this.props.value || this.props.defaultValue : moment()
    setTimeout(() => {
      const renderMonth = moment(date).format('YYYY-MM')
      const monthCn = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      const monthDom = document.querySelectorAll('.ant-calendar-month-panel-table td')
      const month = moment(date).format('M')
      if (current.format('YYYY-MM') !== renderMonth) {
        monthDom.forEach(ele => {
          const title = ele.getAttribute('title')
          if (title === monthCn[month - 1]) {
            ele.classList.remove('ant-calendar-month-panel-selected-cell')
          }
        })
      } else {
        monthDom.forEach(ele => {
          const title = ele.getAttribute('title')
          if (title === monthCn[month - 1]) {
            ele.classList.add('ant-calendar-month-panel-selected-cell')
          }
        })
      }
    }, 200)

    return (
      moment(date, 'M').format('M月')
    )
  }
  render() {
    return (
      <MonthPicker
        className={this.props.className || 'date-select'}
        monthCellContentRender={this.monthCellContentRender}
        { ...this.props }
      />
    )
  }
}
