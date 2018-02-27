import './style.less'
import _ from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, List, Checkbox, Tag, Alert, Select } from 'antd'

import Dialog from '@/components/Dialog'
import { publicLoading } from '@/utils/tools'
import MoreFilter from '@/components/MoreFilter'
import Carousel from '@/components/Carousel'
import Material from '@/components/Carousel/material'
import { increaseOrderQuery, recruitOverOrder, failReason, confirmFail } from '@/services/order'
export default class OrderIncrease extends React.Component {
  state = {
    isDeclareInfoVisible: true,
    checkedList: [], // 选中的订单索引
    showFilter: false, // 更多筛选组件隐藏显示
    orderList: [], // 订单列表
    filterReq: [] // 筛选结果
  }
  // 第一次 render前执行
  componentWillMount () {
    this.getList()
  }
  // {key: item.corporationId, value: item.fullName + (item.contacts || item.legalPerson ? ` (${item.contacts || item.legalPerson})` : ''), group: '认证企业'}
  // getMoreData = () => {
  //   let list = [
  //     {key: '1', value: '1', group: 'number'},
  //     {key: '2', value: '2', group: 'number'},
  //     {key: '3', value: '3', group: 'number'},
  //     {key: '4', value: '4', group: 'number'},
  //     {key: '5', value: '5', group: 'number'},
  //     {key: '6', value: '6', group: 'number'}
  //   ]
  //   return list
  // }
  // 更多筛选项
  filterItems = [
    {
      name: '产品类型',
      selected: [],
      list: [
        {
          value: '社保社保社保社保社保社保社保社保社保社保社保社保社保社保社保社保社保社保社保社保社保社保社保社保社保社保社保',
          key: '1'
        },
        {
          value: '公积金',
          key: '2'
        },
        {
          value: '社保公积金',
          key: '3'
        }
      ],
      type: 'checkbox'
    },
    {
      name: '派单日期',
      selected: [],
      range: ['2017-01-01', '2050-12-31'],
      dateFormat: 'YYYY-MM-DD',
      startHint: '选择开始日期',
      endHint: '选择结束日期',
      list: [],
      type: 'dateRange'
    },
    {
      name: '缴纳月份',
      selected: [],
      range: ['2017-01', '2050-12'],
      dateFormat: 'YYYY-MM',
      startHint: '选择开始缴纳月份',
      endHint: '选择结束缴纳月份',
      list: [],
      type: 'dateRange',
      rangeType: 'month'
    },
    {
      name: '缴纳城市',
      selected: [],
      list: [
        {key: '0', vlaue: 0}
      ],
      type: 'checkbox'
    },
    {
      name: '阅读状态',
      selected: [],
      list: [
        {key: 0, value: '全部'},
        {key: 1, value: '未读'},
        {key: 2, value: '已读'}
      ],
      type: 'radio'
    },
    {
      name: '未提交项',
      selected: [],
      list: [
        {value: '养老', key: '1'},
        {value: '工伤', key: '2'},
        {value: '医疗', key: '3'},
        {value: '生育', key: '4'},
        {value: '失业', key: '5'},
        {value: '公积金', key: '6'},
        {value: '大病', key: '7'},
        {value: '残保金', key: '8'}
      ],
      type: 'checkbox'
    }
  ]

  getList = (type = 'append', page = 'next') => {
    // console.log(errorMsg)
    increaseOrderQuery({pageNum: 1, pageSize: 100}).then((res) => {
      this.setState({orderList: res.list})
    })
  }
  /**
   * 订单列项渲染
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  renderItem = (item, index) => {
    item.applyProductMap = {...{value: ''}, ...item.applyProductMap}
    return (
      <div className="order-info-item">
        <div className="order-info-item-title">
          <div className="title-item black">
            <Checkbox value={index}></Checkbox>
            商户订单号: {item.orderNo}
            <Link to={'/'}> 查看详情 </Link>
          </div>
          <div className="title-item">
            缴纳金额：{item.vPayAmount}元
          </div>
          <div className="title-item">
            服务费：{item.vendorServiceFee}元
          </div>
        </div>
        <div className="order-info-item-body">
          <div className="order-detail">
            <div className="col userInfo">
              <h3>{item.name}</h3>
              <p>身份证:&nbsp;&nbsp;&nbsp;&nbsp; {item.idCard}</p>
              <p>手机号码: {item.mobile}</p>
            </div>
            <div className="col">
              <p>缴纳城市：{item.cityMap.value}</p>
              <p>申报名称：{item.applyProductMap.value}</p>
            </div>
            <div className="col">
              <p>申报基数：{item.applyBase}</p>
              <p>派单日期：{item.dispatchDateFormat}</p>
            </div>
            <div className="col undashed">
              <p>缴纳月：{item.payMonth}</p>
            </div>
            <ul className="col operation undashed">
              <li><a> 增员完成 </a></li>
              <li><a> 申报材料 </a></li>
              <li><a onClick={() => this.failDeclare(index)}> 申报失败 </a></li>
            </ul>
            <div className="col undashed status">
              <Tag className={item.material.isRead === 0 ? 'tag-red' : 'tag-gray'}>{item.material.isReadMap.value}</Tag>
            </div>
          </div>
        </div>
        <div className="order-info-item-footer gray">订单内未提交申报项: {item.toDecalareInsurances}</div>
      </div>
    )
  }

  /**
   * 显示筛选工具
   * @return {[type]} [description]
   */
  showFilter = () => {
    this.setState({showFilter: true})
  }
  /**
   * 筛选框关闭时回调
   * @return {[type]} [description]
   */
  closeFilter = () => {
    this.setState({showFilter: false})
  }

  /**
   * 选中所有订单
   * @return {[type]} [description]
   */
  onCheckAllChange = (e) => {
    console.log('onCheckAllChange', e)
    if(e.target.checked === true) {
      let { orderList } = this.state
      let checkedList = []
      for (let i = 0; orderList.length > i; i++) {
        checkedList.push(i)
      }
      this.setState({checkedList})
    } else {
      this.setState({checkedList: []})
    }
  }

  /**
   * 订单选中项发生变成
   * @param  {Array} checkedValues 选中订单列表
   * @return {[type]}               [description]
   */
  orderItemCheckOnchange = (checkedValues) => {
    this.setState({checkedList: checkedValues})
  }

  /**
   * 批量增员订单
   * @return {[type]} [description]
   */
  batchIncrease = () => {
    let {checkedList, orderList} = this.state
    if(checkedList.length === 0) {
      return
    }

    Dialog.confirm({
      content: (<div>
        共{checkedList.length}条，请确认已经处理完毕<br/>
        确认后将无法确认，是否确认
      </div>),
      onCancel: (e) => {
        console.log('onCancel', e)
      },
      onOk: (e) => {
        let list = []
        checkedList.map(ov => {
          list.push({id: orderList[ov].orderId})
        })
        // recruitOverOrder()
        return new Promise((resolve, reject) => {
          recruitOverOrder({orderList: list}).then(() => {
            resolve()
          }).catch((err) => {
            console.log('===========', err)
            // errorMsg(err.msg, 9999)
            resolve()
          })
        })
      },
      width: '400px'
    })
  }

  /**
   * 申报指定订单失败
   * @param  {[type]} index 操作订单索引
   * @return {[type]}       [description]
   */
  failDeclare = (index) => {
    publicLoading(true)
    let failReasionList = []
    let {orderList} = this.state
    let Option = Select.Option
    let selectedIndex = 0
    let options = []
    failReason({id: orderList[index].orderId}).then((res) => {
      publicLoading(false)
      failReasionList = res.failReasionList
      failReasionList.map((item, reasonIndex) => {
        options.push(<Option key={reasonIndex} value={reasonIndex}>{item.failreasonName}</Option>)
      })

      let failDeclareMsg = (
        <div className="increase-fail-declare-body">
          <h3>申报失败原因</h3>
          <div>
            <span>选择失败原因 </span>
            <Select defaultValue={selectedIndex} onChange={value => {
              selectedIndex = value
            }}>
              {options}
            </Select>
          </div>
          <p>确认提交后相关费用将会退回给用户，该订单结束。</p>
        </div>
      )

      Dialog.confirm({
        content: failDeclareMsg,
        onCancel: (e) => {
          console.log('onCancel', e)
        },
        onOk: (e) => {
          console.log('onOk', failReasionList[selectedIndex])
          return new Promise((resolve, reject) => {
            confirmFail({failReason: failReasionList[selectedIndex].failReason, id: orderList[index].orderId}).then(() => {
              orderList = _.drop(orderList, (index + 1))
              this.setState({orderList})
              resolve()
            }).catch(() => {
              resolve()
            })
          })
        },
        width: '400px'
      })
    })
  }
  /**
   * 渲染筛选内容tag
   * @return {[type]} [description]
   */
  rendeFilterReqItem = () => {
    const {filterReq} = this.state
    let boms = []
    filterReq.map((ov, index) => {
      if (ov.type === 'checkbox' || ov.type === 'radio' || ov.type === 'search') {
        // 数据量大建议换种方法实现, 此方法效率较低
        ov.selected.map((item, i) => {
          let itemObj = {}
          if (typeof ov.parent === 'undefined') {
            itemObj = ov.list.find((value, index, arr) => {
              if (value.key === item) {
                return true
              }
              return false
            })
          } else {
            let selectedIndex = filterReq[ov.parent].selected[0]
            itemObj = ov.list[selectedIndex].find((value, index, arr) => {
              if (value.key === item) {
                return true
              }
              return false
            })
          }
          boms.push(<Alert className='filter-item-tag' key={i + ':' + Math.random().toString(36).substr(2) } message={ov.name + ':' + (ov.type === 'search' && itemObj.value.length > 10 ? itemObj.value.substring(0, 9) + '...' : itemObj.value)} type="success" onClose={() => this.unSetFilterReqItem(index, i)} closable/>)
          return true
        })
      }
      if (ov.type === 'dateRange') {
        if (ov.selected.length > 0) {
          let selected = ov.selected[0]
          boms.push(<Alert className='filter-item-tag' key={0 + ':' + Math.random().toString(36).substr(2) } message={ov.name + ':' + (selected.startValue || '/') + '—' + (selected.endValue || '/')} type="success" onClose={() => this.unSetFilterReqItem(index, 0)} closable/>)
        }
      }
      if (ov.type === 'time') {
        if (ov.selected.length > 0) {
          let selected = ov.selected[0]
          boms.push(<Alert className='filter-item-tag' key={0 + ':' + Math.random().toString(36).substr(2) } message={ov.name + ':' + selected} type="success" onClose={() => this.unSetFilterReqItem(index, 0)} closable/>)
        }
      }
      return true
    })
    if (boms.length > 0) {
      boms.push(<a key='quid' onClick={this.unSetAllFilterReqItem}>取消筛选</a>)
    }
    return boms
  }

  /**
   * 筛选更新内容回调
   * @param  {[type]} filterItems [description]
   * @return {[type]}             [description]
   */
  saveFilter = (filterItems) => {
    this.setState({filterReq: filterItems})
  }

  afterChange = () => {
    return
  }
  /**
   * 渲染幻灯片
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  carouselRenderItem = (item, index) => {
    item.material.residenceNatureMap = item.material.residenceNatureMap ? item.material.residenceNatureMap : {key: '', value: ''}
    item.material.residenceCityMap = item.material.residenceCityMap ? item.material.residenceCityMap : {key: '', value: ''}
    return (
      <Material item = {{ increase: item}} index={index} />
    )
  }
  render() {
    const { orderList, showFilter, checkedList } = this.state
    return (
      <div className="container-order-increase">
        <Carousel
          onClose={() => {
            this.setState({isDeclareInfoVisible: false})
          }}
          afterChange={(current) => {this.afterChange(current)}}
          visible={isDeclareInfoVisible}
          dataSource={orderList}
          renderItem={ (item, index) => this.carouselRenderItem(item, index) }
          initialSlide={declareInfoInitialSlide}
        />
        <MoreFilter show={showFilter} filterItems={this.filterItems} closeFilter={this.closeFilter} saveFilter={this.saveFilter} />
        <div className="content">
          <div className="toolbar">
            <Input.Search
              // defaultValue = {defaultOrderSearchValue}
              style={{ width: 634 }}
              placeholder="请输入姓名、身份证号、商户订单号、手机号"
              // onSearch={value => {this.searchOrder(value)}}
              enterButton
            />
            <Button className="more-btn" onClick={this.showFilter}> 更多筛选</Button>
            <span className="count-mun"> 共{1}条</span>
            <div className="right">
              <a>导出EXCEL</a>
            </div>
            <br/>
            {this.rendeFilterReqItem()}
          </div>
          <div className="check-all-wrap">
            <Checkbox onChange={this.onCheckAllChange}> 全选</Checkbox> <span>已选中{checkedList.length}条</span> <a onClick={this.batchIncrease} className={checkedList.length <= 0 ? 'disabled' : ''}>批量增员完成</a>
          </div>
          <Checkbox.Group onChange={this.orderItemCheckOnchange} value={checkedList} style={{width: '100%'}} >
            <List
              itemLayout="vertical"
              dataSource={orderList}
              renderItem={ (item, index) => this.renderItem(item, index) }
            >
            </List>
          </Checkbox.Group>
        </div>
      </div>
    )
  }
}
