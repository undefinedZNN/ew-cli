import './style.less'
import _ from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, List, Checkbox, Alert, Select } from 'antd'

import { windowScrollTheEnd, recoverWindowScrollTheEnd } from '@/utils/utils'
import { publicLoading, toast } from '@/utils/tools'
import Dialog from '@/components/Dialog'
import NoData from '@/components/NoData'
import Carousel from '@/components/Carousel'
import MoreFilter from '@/components/MoreFilter'
import Material from '@/components/Carousel/material'
import { moreScreening, addOrderDownload, confirmCancel, waitCancelOrderQuery, refuseToLiftReason, refuseToLift } from '@/services/order'
import OrderDetailInfo from '@/containers/OrderDetailInfo'
import { Route, Switch } from 'react-router-dom'

export default class OrderCancel extends React.Component {
  routePath = this.props.match.path // 当前路由地址
  state = {
    declareInfoInitialSlide: 0,
    isDeclareInfoVisible: false,
    checkedList: [], // 选中的订单索引
    showFilter: false, // 更多筛选组件隐藏显示
    orderList: [], // 订单列表
    totalCount: 1, // 订单总数
    nextPageNum: 1, // 下一个分页
    filterReq: [] // 筛选结果
  }
  // constructor () {
  //   console.log('constructor-------')
  // }
  // 第一次 render前执行
  async componentWillMount () {
    this.getList()
  }

  // 更多筛选项
  filterItems = [
    {
      name: '产品类型',
      selected: [],
      list: [
        {
          value: '社保',
          key: 1
        },
        {
          value: '公积金',
          key: 2
        },
        {
          value: '社保公积金',
          key: 3
        }
      ],
      type: 'checkbox'
    },
    {
      name: '缴纳月份',
      selected: [],
      dateFormat: 'YYYY-MM',
      hint: '请选择月份',
      dateType: 2,
      type: 'time'
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
      name: '派单日期',
      selected: [],
      range: ['2017-01-01', '2050-12-31'],
      dateFormat: 'YYYY-MM-DD',
      startHint: '选择开始日期',
      endHint: '选择结束日期',
      list: [],
      type: 'dateRange'
    }
  ]

  // 获取订单查询条件
  getOrderListformData = {
    productType: []
  }

  /**
   * 获取订单列表
   * @param  {String} type append 往下翻页,  new 初始化订单列表数据
   * @param  {String} page [description]
   * @return {[type]}      [description]
   */
  getList = (type = 'append', page = 'next') => {
    publicLoading(true)
    let formData = {
      pageNum: 1,
      pageSize: 20
    }
    let {orderList, totalCount, nextPageNum, checkedList} = this.state
    formData = {...this.getOrderListformData, ...formData}

    if (page === 'next') {
      if (orderList.length !== 0 && orderList.length >= totalCount) {
        toast('数据加载完毕')
        recoverWindowScrollTheEnd()
        publicLoading(false)
        return
      }
      formData.pageNum = nextPageNum
    } else {
      formData.pageNum = page
      nextPageNum = page
    }

    if (type === 'new') {
      orderList = []
      checkedList = []
    }
    if (formData.pageNum === 1) {
      // 添加下拉监听
      windowScrollTheEnd(() => {
        this.getList()
      })
    }
    // console.log(errorMsg)
    waitCancelOrderQuery(formData).then((res) => {
      if (res.list) {
        orderList = orderList.concat(res.list)
      }
      nextPageNum++
      this.setState({orderList, nextPageNum, totalCount: res.totalCount, checkedList})
      publicLoading(false)
    })
  }
  /**
   * 订单列项渲染
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  renderItem = (item, index) => {
    // item.applyProductMap = {...{value: ''}, ...item.applyProductMap}
    return (
      <div className="order-info-item">
        <div className="order-info-item-title">
          <div className="title-item black">
            <Checkbox value={index}></Checkbox>
            订单号: {item.orderNo}
            <Link to={this.routePath + '/detail/' + item.cancelOrderId}> 查看详情 </Link>
          </div>
          <div className="title-item">
            缴纳金额：{item.payAmount}元
          </div>
          <div className="title-item">
            服务费：{item.rlwServiceFee}元
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
              <li><a onClick={() => this.agree(index)}> 同意 </a></li>
              <li><a onClick={() => this.turnDown(index)}> 驳回 </a></li>
              <li><a onClick={() => this.showDeclareInfo(index)}> 申报材料 </a></li>
            </ul>
          </div>
        </div>
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
   * 批量减员订单
   * @return {[type]} [description]
   */
  batchAgree = () => {
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
        let formData = {
          orderList: []
        }
        checkedList.map(ov => {
          formData.orderList.push({id: orderList[ov].cancelOrderId})
        })
        // recruitOverOrder()
        return new Promise((resolve, reject) => {
          confirmCancel(formData).then(() => {
            toast('操作成功')
            resolve()
          }).catch(() => {
            resolve()
          })
        })
      },
      width: '400px'
    })
  }

  /**
   * 减员
   * @return {[type]} [description]
   */
  agree = (index) => {
    Dialog.confirm({
      content: (<div>
        是否同意取消该用户订单请求？
      </div>),
      onCancel: (e) => {
        console.log('onCancel', e)
      },
      onOk: (e) => {
        let formData = {
          orderList: []
        }
        let {orderList} = this.state
        formData.orderList.push({id: orderList[index].cancelOrderId})
        // recruitOverOrder()
        return new Promise((resolve, reject) => {
          confirmCancel(formData).then(() => {
            toast('操作成功')
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
  }

  /**
   * 驳回取消订单
   * @param  {[type]} index [description]
   * @return {[type]}       [description]
   */
  turnDown = (index) => {
    publicLoading(true)
    let failReasionList = []
    let {orderList} = this.state
    let Option = Select.Option
    let selectedIndex = 0
    let options = []
    refuseToLiftReason().then((res) => {
      publicLoading(false)
      failReasionList = res.dismissTheReason
      failReasionList.map((item, reasonIndex) => {
        options.push(<Option key={reasonIndex} value={reasonIndex}>{item.value}</Option>)
      })

      let failDeclareMsg = (
        <div className="increase-fail-declare-body">
          <h3>是否驳回取消该用户订单请求？</h3>
          <div>
            <span>选择驳回原因 </span>
            <Select defaultValue={selectedIndex} onChange={value => {
              selectedIndex = value
            }}>
              {options}
            </Select>
          </div>
        </div>
      )

      Dialog.confirm({
        okText: '确认驳回',
        content: failDeclareMsg,
        onCancel: (e) => {
          console.log('onCancel', e)
        },
        onOk: (e) => {
          console.log('onOk', failReasionList[selectedIndex])
          return new Promise((resolve, reject) => {
            let formData = {
              id: orderList[index].cancelId,
              cancelOrderId: orderList[index].cancelOrderId,
              applyId: orderList[index].applyId,
              rejectReason: failReasionList[selectedIndex].value
            }
            refuseToLift(formData).then(() => {
              orderList = _.drop(orderList, (index + 1))
              this.setState({orderList})
              resolve()
            }).catch(() => {
              resolve()
            })
          })
        },
        width: '450px'
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
          let msgContent = ov.name + ':' + itemObj.value
          let msgContentLength = msgContent.replace(/[\u0391-\uFFE5]/g, 'aa').length
          boms.push(<span className='tag-limit' title={ msgContentLength > 28 ? msgContent : ''} key={i + ':' + Math.random().toString(36).substr(3) }><Alert className='filter-item-tag' key={i + ':' + Math.random().toString(36).substr(2) } message={msgContent} type="success" onClose={() => this.unSetFilterReqItem(index, i)} closable/></span>)
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
   * 删除指定筛选项
   * @param  {[type]} x [description]
   * @param  {[type]} y [description]
   * @return {[type]}   [description]
   */
  unSetFilterReqItem = (x, y) => {
    // 1. 删除指定筛选结果
    // 2. 根据新的筛选结果重新请求筛选结果
    const {filterReq} = this.state
    filterReq[x].selected.splice(y, 1)
    this.moreFilterEl.updateFilterItems(filterReq)
    this.setFilterOrderListformData(filterReq)
    this.setState({filterReq})
    this.getList('new', 1)
  }

  /**
   * 删除所有的筛选项
   * @return {[type]} [description]
   */
  unSetAllFilterReqItem = () => {
    const {filterReq} = this.state
    filterReq.map((item) => {
      item.selected = []
      return true
    })
    this.moreFilterEl.updateFilterItems(filterReq)
    this.setFilterOrderListformData([])
    this.setState({filterReq: []})
    this.getList('new', 1)
  }
  /**
   * 筛选更新内容回调
   * @param  {[type]} filterItems [description]
   * @return {[type]}             [description]
   */
  saveFilter = (filterItems) => {
    this.setState({filterReq: filterItems})
    this.setFilterOrderListformData(filterItems)
    this.getList('new', 1)
  }

  /**
   * 搜索订单
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  searchOrder = (value) => {
    this.getOrderListformData.name = value
    this.getList('new', 1)
  }
  /**
   * 根据传入的筛选结果设置获取订单列表请求参数
   * @param  {[type]} filterReq [description]
   * @return {[type]}           [description]
   */
  setFilterOrderListformData = (filterReq) => {
    this.getOrderListformData.productType = []
    this.getOrderListformData.payMonth = ''
    this.getOrderListformData.city = []
    this.getOrderListformData.beginDate = ''
    this.getOrderListformData.endDate = ''
    // 筛选参数拼装
    filterReq.map((item) => {
      if (item.selected.length > 0) {
        switch(item.name) {
          case '产品类型':
            this.getOrderListformData.productType = item.selected
            break
          case '缴纳月份':
            this.getOrderListformData.payMonth = item.selected[0]
            break
          case '缴纳城市':
            this.getOrderListformData.city = item.selected
            break
          case '派单日期':
            this.getOrderListformData.beginDate = item.selected[0].startValue === 'Invalid date' ? null : item.selected[0].startValue
            this.getOrderListformData.endDate = item.selected[0].endValue === 'Invalid date' ? null : item.selected[0].endValue
            break
          default:
            break
        }
      }
      return true
    })
  }

  /**
   * 导出Excel
   * @return {[type]} [description]
   */
  exportExcel = () => {
    Dialog.info({
      content: (<div>
        EXCEL文件生成中，可能需要等待10到15分钟…<br/>
        生成完成后，点击下载列表可下载到本地
      </div>),
      onCancel: (e) => {
        console.log('onCancel', e)
      },
      onOk: (e) => {
        // console.log(addOrderDownload)
        return new Promise((resolve, reject) => {
          addOrderDownload({downloadType: 1, paramContentForm: this.getOrderListformData}).then(() => {
            resolve()
          }).catch(() => {
            resolve()
          })
        })
      },
      width: '400px'
    })
  }
  /**
   * 申报材料幻灯片却换时回调
   * @param  {[type]} current [description]
   * @return {[type]}         [description]
   */
  afterChange = (current) => {
    let { orderList, totalCount } = this.state
    current++
    if (orderList.length <= current && totalCount > current) {
      this.getList()
    }
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
  /**
   * 打开指定申报材料幻灯片
   * @param  {[type]} num [description]
   * @return {[type]}     [description]
   */
  showDeclareInfo = (num) => {
    this.setState({isDeclareInfoVisible: true, declareInfoInitialSlide: num})
  }

  render() {
    console.log('-----------------render', this.props)
    const { orderList, showFilter, checkedList, totalCount, isDeclareInfoVisible, declareInfoInitialSlide } = this.state
    const render = () => (
      <div>
        <Carousel
          onClose={() => {
            this.setState({isDeclareInfoVisible: false})
          }}
          afterChange={(current) => this.afterChange(current)}
          visible={isDeclareInfoVisible}
          dataSource={orderList}
          renderItem={ (item, index) => this.carouselRenderItem(item, index) }
          initialSlide={declareInfoInitialSlide}
        />
        <MoreFilter show={showFilter} filterItems={this.filterItems} closeFilter={this.closeFilter} saveFilter={this.saveFilter} ref={(ref) => (this.moreFilterEl = ref)}/>
        <div className="content">
          <div className="toolbar">
            <Input.Search
              // defaultValue = {defaultOrderSearchValue}
              style={{ width: 634 }}
              placeholder="请输入姓名、身份证号"
              onSearch={value => this.searchOrder(value)}
              enterButton
            />
            <Button className="more-btn" onClick={this.showFilter}> 更多筛选</Button>
            <span className="count-mun"> 共{totalCount}条</span>
            <div className="right">
              <a onClick={this.exportExcel}>导出EXCEL</a>
            </div>
            <br/>
            {this.rendeFilterReqItem()}
          </div>
          <div className="check-all-wrap" style={{display: orderList.length > 0 ? 'block' : 'none'}}>
            <Checkbox checked={checkedList.length === orderList.length} onChange={this.onCheckAllChange}> 全选</Checkbox> <span>已选中{checkedList.length}条</span> <a onClick={this.batchAgree} className={checkedList.length <= 0 ? 'disabled' : ''}>批量同意</a>
          </div>
          <Checkbox.Group onChange={this.orderItemCheckOnchange} value={checkedList} style={{width: '100%'}} >
            <List
              itemLayout="vertical"
              dataSource={orderList}
              renderItem={ (item, index) => this.renderItem(item, index) }
              locale={{emptyText: ''}}
            >
            </List>
          </Checkbox.Group>
          <NoData visible={orderList.length === 0}/>
        </div>
      </div>
    )

    return (
      <div className="container-order-cancel">
        <Switch>
          <Route path={this.routePath + '/detail/:id'} component={OrderDetailInfo}/>
          <Route path={this.routePath} render={render}/>
        </Switch>
      </div>
    )
  }

  componentDidMount() {
    if (this.moreFilterEl) {
      moreScreening({screenType: '1'}).then(res => {
        this.filterItems[2].list = res.cityList
        this.moreFilterEl.updateFilterItems(this.filterItems)
      })
    }
  }
}
