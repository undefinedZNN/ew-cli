import React from 'react'
import { Radio, Checkbox, Button, DatePicker, Input, Icon } from 'antd'
import './more-filter.css'
import DateRange from '@/components/DateRange'
import moment from 'moment'
// import 'moment/locale/zh-cn'
import { setTimeout } from 'timers'
import clone from 'clone'
import CMonthPicker from '@/components/CMonthPicker'
const { WeekPicker } = DatePicker
const RadioGroup = Radio.Group
// moment.locale('zh-cn')

function reset() {
  document.querySelectorAll('.class-silde-fixed').forEach(element => {
    element.setAttribute('style', 'left: -330px')
  })
  document.querySelectorAll('.nav-silde-li').forEach(element => {
    element.setAttribute('class', 'nav-silde-li')
  })
  document.getElementById('nav-silde-fixed').setAttribute('class', 'nav-silde-fixed animated-short2 slideOutLeft')
}

export default class MoreFlter extends React.Component {
  state = {
    filterItems: clone(this.props.filterItems)
  }
  closeAllcalendar = () => {
    if (this.refs.subDateRange) {
      // this.refs.subDateRange.closeStartOpen()
    }
  }
  showDetail = (index) => {
    document.querySelectorAll('.nav-silde-li').forEach(element => {
      element.setAttribute('class', 'nav-silde-li')
    })
    const navObj = document.getElementById('nav-silde' + index)
    navObj.setAttribute('class', 'nav-silde-li active')

    document.querySelectorAll('.class-silde-fixed').forEach(element => {
      element.setAttribute('style', 'left: -330px')
    })
    const detailObj = document.getElementById('detail' + index)
    detailObj.setAttribute('class', 'class-silde-fixed')
    detailObj.setAttribute('style', 'left: 230px')
    this.closeAllcalendar()
  }
  onChangeCheckbox (checkedValues, index) {
    let newFilterItems = clone(this.state.filterItems)
    let has = false
    for(let i = 0; i < newFilterItems[index].selected.length; i++) {
      if(newFilterItems[index].selected[i] === checkedValues) {
        has = true
        newFilterItems[index].selected.splice(i, 1)
        break
      }
    }
    if(!has) {
      newFilterItems[index].selected.push(checkedValues)
    }
    this.setState({
      filterItems: newFilterItems
    })
  }
  onChangeRadioGroup (e, index) {
    let newFilterItems = clone(this.state.filterItems)
    if(newFilterItems[index].child !== undefined) {
      newFilterItems[newFilterItems[index].child].selected.length = 0
    }
    newFilterItems[index].selected = [e.target.value]
    this.setState({
      filterItems: newFilterItems
    })
  }
  saveRange (field, value, index) {
    let newFilterItems = clone(this.state.filterItems)
    if (newFilterItems[index].selected.length === 0) {
      newFilterItems[index].selected = [Object.assign({}, {
        [field]: value
      })]
    } else {
      newFilterItems[index].selected[0][field] = value
    }
    this.setState({
      filterItems: newFilterItems
    })
  }
  onChangeDate (date, index) {
    let newFilterItems = clone(this.state.filterItems)
    newFilterItems[index].selected = [date]
    this.setState({
      filterItems: newFilterItems
    })
  }
  clearSelect(index, subIndex = null, type) {
    let newFilterItems = clone(this.state.filterItems)
    if (subIndex !== null) {
      newFilterItems[index].selected.splice(subIndex, 1)
    } else {
      newFilterItems[index].selected.length = 0
    }
    this.setState({
      filterItems: newFilterItems
    })
    if(type === 'dateRange') {
      this.refs.subDateRange.clearDateRange()
    }
  }
  /**
   * parent组件回写状态
   *
   * @param {any} newFilterItems
   * @memberof MoreFlter
   */
  updateFilterItems (newFilterItems) {
    this.setState({
      filterItems: newFilterItems
    })
  }
  clearAll () {
    let newFilterItems = clone(this.state.filterItems)
    newFilterItems.forEach(function(item) {
      item.selected.length = 0
    })
    this.setState({
      filterItems: newFilterItems,
      asyncFilterData: {}
    })
    if (this.refs.subDateRange) {
      this.refs.subDateRange.clearDateRange()
    }
  }
  saveAll () {
    const newFilterItems = clone(this.state.filterItems)
    newFilterItems.forEach(function(item) {
      if(item.type === 'dateRange' && item.selected[0] instanceof Object && item.selected[0].constructor === Object) {
        if (!item.selected[0].startValue && !item.selected[0].endValue) {
          item.selected.length = 0
        }
      }
      if(item.type === 'time' && item.dateFormat) {
        const formatSelected = item.selected.map(selectedItem => {
          return moment(selectedItem).format(item.dateFormat)
        })
        item.selected.length = 0
        item.selected = formatSelected
      }
      if(item.type === 'dateRange' && item.dateFormat) {
        for (const key in item.selected[0]) {
          item.selected[0][key] = moment(item.selected[0][key]).format(item.dateFormat)
        }
      }
    })
    this.props.saveFilter(newFilterItems)
  }
  disabledDate (current) {
    return true
  }
  renderTime = (item, i) => {
    if (item.type === 'time') {
      var random = new Date()
      switch (item.dateType) {
        case 1:
        default:
          return (
            <DatePicker placeholder={item.hint} value={item.selected[0]} className='filter-calendar' key={'calendar-time' + random.getTime()} onChange={(date, dateString) => {
              this.onChangeDate(date, i)
            }}/>
          )
        case 2:
          return (
            <CMonthPicker placeholder={item.hint} value={item.selected[0]} className='filter-calendar' key={'calendar' + random.getTime()} onChange={(date, dateString) => {
              this.onChangeDate(date, i)
            }}/>
          )
        case 3:
          return (
            <WeekPicker placeholder={item.hint} value={item.selected[0]} className='filter-calendar' key={'calendar' + random.getTime()} onChange={(date, dateString) => {
              this.onChangeDate(date, i)
            }}/>
          )
      }
    }
  }
  render () {
    return (
      <div>
        <div className='overlay' style={this.props.show ? {'display': 'block'} : {'display': 'none'}} onClick={(e) => {
          reset()
          this.closeAllcalendar()
          const that = this
          setTimeout(function() {
            that.props.closeFilter(true)
          }, 500)
        }}>
        </div>
        <div className={this.props.show ? 'nav-silde-fixed animated-short1 slideInLeft' : 'nav-silde-fixed'} id='nav-silde-fixed'>
          <h3>更多筛选</h3>
          <ul className='nav-silde-ul'>
            {
              this.state.filterItems.map((item, i) => {
                return (<li className='nav-silde-li' id={'nav-silde' + i} key={'filter' + i} onClick={() => {
                  this.showDetail(i)
                }} style={item.parent === undefined || this.state.filterItems[item.parent].selected.length > 0 ? {'display': ''} : {'display': 'none'}}><b className='icon-06'></b>{item.name} <br />
                  {
                    item.selected.map((checkedItem, checkedItemIndex) => {
                      let selectedValue = ''
                      if (item.type === 'checkbox' || item.type === 'radio' || item.type === 'search') {
                        if (item.parent === undefined) {
                          for(let i = 0; i < item.list.length; i++) {
                            if(item.list[i].key === checkedItem) {
                              selectedValue = item.list[i].value
                              break
                            }
                          }
                        } else {
                          for(let i = 0; i < item.list[this.state.filterItems[item.parent].selected[0] || this.state.filterItems[item.parent].list[0].key].length; i++) {
                            if(item.list[this.state.filterItems[item.parent].selected[0] || this.state.filterItems[item.parent].list[0].key][i].key === checkedItem) {
                              selectedValue = item.list[this.state.filterItems[item.parent].selected[0] || this.state.filterItems[item.parent].list[0].key][i].value
                              break
                            }
                          }
                        }
                      }
                      if (item.type === 'dateRange' && (checkedItem.startValue || checkedItem.endValue)) {
                        const startDate = checkedItem.startValue ? moment(checkedItem.startValue).format(item.rangeType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD') : '/'
                        const endDate = checkedItem.endValue ? moment(checkedItem.endValue).format(item.rangeType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD') : '/'
                        selectedValue = startDate + '~' + endDate
                      }
                      if (item.type === 'time') {
                        selectedValue = moment(checkedItem).format('YYYY-MM')
                      }
                      return (
                        <div className='tips-title' key={'selected' + checkedItemIndex} style={selectedValue !== '' ? {'display': ''} : {'display': 'none'}}>{selectedValue}
                          <i className='icon-cross' onClick={() => {
                            this.clearSelect(i, checkedItemIndex, item.type)
                          }}>
                          </i>
                        </div>
                      )
                    })
                  }
                  <div className='class-silde-fixed' id={'detail' + i} ref= {
                    (ref) => {
                      if (item.type === 'search') {
                        this.searchSilde['searchSilde' + i] = {
                          ref,
                          getMoreData: item.getMoreData,
                          index: i
                        }
                      }
                    }
                  }>
                    <h3>{item.name}</h3>
                    {
                      item.type === 'checkbox' ? item.list.map((listItem, subindex) => {
                        let checked = false
                        for(let j = 0; j < item.selected.length; j++) {
                          if(item.selected[j] === listItem.key) {
                            checked = true
                            break
                          }
                        }
                        return (
                          <div className='list' key={'list' + subindex}>
                            <Checkbox value={listItem.key} checked={checked} onChange={() => {
                              this.onChangeCheckbox(listItem.key, i)
                            }}>{listItem.value}</Checkbox>
                          </div>
                        )
                      }) : ('')
                    }
                    {
                      item.type === 'radio' ? (
                        <RadioGroup value={item.selected[0]} onChange={(e) => {
                          this.onChangeRadioGroup(e, i)
                        }}>
                          {
                            item.parent === undefined && item.list.map((listItem, i) =>
                              <div className='list' key={'list' + i}>
                                <Radio value={listItem.key}>{listItem.value}</Radio>
                              </div>
                            )
                          }
                          {
                            item.parent !== undefined && item.list[this.state.filterItems[item.parent].selected[0] || this.state.filterItems[item.parent].list[0].key] !== undefined && item.list[this.state.filterItems[item.parent].selected[0] || this.state.filterItems[item.parent].list[0].key].map((listItem, i) =>
                              <div className='list' key={'list' + i}>
                                <Radio value={listItem.key}>{listItem.value}</Radio>
                              </div>
                            )
                          }
                        </RadioGroup>
                      ) : ('')
                    }
                    {
                      this.renderTime(item, i)
                    }
                    {
                      item.type === 'dateRange' ? (
                        <DateRange key={'calendar'}
                          startPlaceholder={item.startHint}
                          endPlaceholder={item.endHint}
                          ref="subDateRange"
                          dateFormat = {item.rangeType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD'}
                          range = {[moment(item.range[0], item.rangeType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD'), moment(item.range[1], item.rangeType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD')]}
                          dataRange = {item.selected[0] || {}} saveRange={(field, value) => {
                            this.saveRange(field, value, i)
                          }}
                          type = {item.rangeType}
                        />
                      ) : ('')
                    }
                    {
                      item.type === 'search' ? (
                        () => {
                          let filterItems = this.state.filterItems
                          let onChange = async (e) => {
                            let value = e.target.value
                            // item.list = item.onChange(value)
                            filterItems[i].list = await item.onChange(value)
                            this.setState({
                              filterItems: filterItems
                            })
                          }
                          return (
                            <div >
                              <Input prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }}/>} onChange={onChange} />
                              <div className="result-list">
                                <RadioGroup style={{ width: '100%' }} value={item.selected[0]} onChange={(value) => this.onChangeRadioGroup(value, i)}>
                                  {
                                    (
                                      () => {
                                        let groups = {}
                                        let doms = []
                                        item.list.map((listItem, i) => {
                                          if (typeof groups[listItem.group] === 'undefined') {
                                            groups[listItem.group] = []
                                          }
                                          groups[listItem.group].push({...listItem})
                                          return true
                                        })

                                        for (let index in groups) {
                                          let group = groups[index]
                                          doms.push(<div key={'group-title' + index} className="result-list-group-title">{index}</div>)
                                          doms.push(<ul key={'group-list' + index} className="result-list-group-list">
                                            {
                                              (() => group.map((v, k) => {
                                                return (<li key={k} ><Radio key={k} value={v.key}>{v.value}</Radio></li>)
                                              }))()
                                            }
                                          </ul>)
                                        }
                                        return doms
                                        // return (<li><Radio key={i} value={listItem.key} checked={checked} >{listItem.value}</Radio></li>)
                                      }
                                    )()
                                  }
                                </RadioGroup>
                              </div>
                            </div>
                          )
                        }
                      )() : ('')
                    }
                  </div>
                </li>)
              }
              )
            }
          </ul>
          <Button type='primary' onClick={() => {
            reset()
            this.closeAllcalendar()
            setTimeout(() => {
              this.props.closeFilter()
            }, 500)
            this.saveAll()
          }}>确认</Button>
        </div>
      </div>
    )
  }
  searchSilde = {} // 搜索框searchSilde信息
  componentDidUpdate () {
    // 给搜索类型的筛选添加滚动到底部加载更多数据的监听 start
    for(let key in this.searchSilde) {
      let {getMoreData, index, ref: sildeDom} = this.searchSilde[key]
      sildeDom.onmousewheel = async () => {
        if ((sildeDom.scrollTop + sildeDom.clientHeight) >= sildeDom.scrollHeight) {

          if (typeof getMoreData !== 'undefined') {
            let filterItems = this.state.filterItems
            let filterItem = filterItems[index]
            let newList = await getMoreData()
            filterItem.list = filterItem.list.concat(newList)
            this.setState({filterItems})
          }
        }
      }
    }
    // 给搜索类型的筛选添加滚动到底部加载更多数据的监听 end
  }
}
