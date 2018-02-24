import { DatePicker } from 'antd'
import React from 'react'
import moment from 'moment'
import CMonthPicker from '@/components/CMonthPicker'

export default class DateRange extends React.Component {
  state = {
    startValue: this.props.dataRange.startValue || null,
    endValue: this.props.dataRange.endValue || null,
    range: this.props.range,
    endOpen: false,
    startPlaceholder: this.props.startPlaceholder || '选择开始日期',
    endPlaceholder: this.props.endPlaceholder || '选择结束日期',
    type: this.props.type || 'date',
    dateFormat: this.props.dateFormat
  }
  clearDateRange () {
    this.setState({
      startValue: null,
      endValue: null
    })
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue
    if (startValue) {
      if (startValue.valueOf() > this.state.range[1].valueOf() || startValue.valueOf() < this.state.range[0].valueOf()) {
        if (moment(startValue).format(this.state.dateFormat) === moment(this.state.range[1]).format(this.state.dateFormat) || moment(startValue).format(this.state.dateFormat) === moment(this.state.range[0]).format(this.state.dateFormat)) {
          return false
        }
        return true
      }
    }
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue
    if (endValue) {
      if (endValue.valueOf() > this.state.range[1].valueOf() || endValue.valueOf() < this.state.range[0].valueOf()) {
        if (moment(endValue).format(this.state.dateFormat) === moment(this.state.range[1]).format(this.state.dateFormat) || moment(endValue).format(this.state.dateFormat) === moment(this.state.range[0]).format(this.state.dateFormat)) {
          return false
        }
        return true
      }
    }
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  disabledStartMonth = (startValue) => {
    const endValue = this.state.endValue
    if (startValue) {
      if (startValue.valueOf() > this.state.range[1].valueOf() || startValue.valueOf() < this.state.range[0].valueOf()) {
        if (moment(startValue).format('YYYY-MM') === moment(this.state.range[1]).format('YYYY-MM') || moment(startValue).format('YYYY-MM') === moment(this.state.range[0]).format('YYYY-MM')) {
          return false
        }
        return true
      }
    }
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  disabledEndMonth = (endValue) => {
    const startValue = this.state.startValue
    if (endValue) {
      if (endValue.valueOf() > this.state.range[1].valueOf() || endValue.valueOf() < this.state.range[0].valueOf()) {
        if (moment(endValue).format('YYYY-MM') === moment(this.state.range[1]).format('YYYY-MM') || moment(endValue).format('YYYY-MM') === moment(this.state.range[0]).format('YYYY-MM')) {
          return false
        }
        return true
      }
    }
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value
    })
    this.props.saveRange(field, value)
  }

  onStartChange = (value) => {
    this.onChange('startValue', value)
    // this.setState({ startOpen: false })
  }

  onEndChange = (value) => {
    this.onChange('endValue', value)
  }

  render() {
    const { type } = this.state
    if (type === 'month') {
      return (
        <div>
          <CMonthPicker
            disabledDate={this.disabledStartMonth}
            value = {typeof this.props.dataRange.startValue === 'string' ? moment(this.props.dataRange.startValue, 'YYYY-MM') : this.props.dataRange.startValue}
            placeholder={this.state.startPlaceholder}
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
            className='filter-calendar'
            // open={startOpen}
            allowClear = {false}
          />
          <CMonthPicker
            disabledDate={this.disabledEndMonth}
            value = {typeof this.props.dataRange.endValue === 'string' ? moment(this.props.dataRange.endValue, 'YYYY-MM') : this.props.dataRange.endValue}
            placeholder={this.state.endPlaceholder}
            onChange={this.onEndChange}
            className='filter-calendar'
            allowClear = {false}
          />
        </div>
      )
    }
    return (
      <div>
        <DatePicker
          disabledDate={this.disabledStartDate}
          value={typeof this.props.dataRange.startValue === 'string' ? moment(this.props.dataRange.startValue, 'YYYY-MM-DD') : this.props.dataRange.startValue}
          placeholder={this.state.startPlaceholder}
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
          className='filter-calendar'
          // open={startOpen}
          allowClear = {false}
        />
        <DatePicker
          disabledDate={this.disabledEndDate}
          value={typeof this.props.dataRange.endValue === 'string' ? moment(this.props.dataRange.endValue, 'YYYY-MM-DD') : this.props.dataRange.endValue}
          placeholder={this.state.endPlaceholder}
          onChange={this.onEndChange}
          className='filter-calendar'
          allowClear = {false}
        />
      </div>
    )
  }
}
