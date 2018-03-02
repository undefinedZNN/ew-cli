import './style.less'
import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, List, Alert } from 'antd'

import { windowScrollTheEnd, recoverWindowScrollTheEnd } from '@/utils/utils'
import { publicLoading, toast } from '@/utils/tools'
import NoData from '@/components/NoData'
import Carousel from '@/components/Carousel'
import MoreFilter from '@/components/MoreFilter'
import Material from '@/components/Carousel/material'
import { getVAllOrderList, moreScreening } from '@/services/order'
import OrderDetailInfo from '@/containers/OrderDetailInfo'
import { Route, Switch } from 'react-router-dom'

export default class OrderAll extends React.Component {
  routePath = this.props.match.path // 当前路由地址
  state = {
    declareInfoInitialSlide: 0,
    isDeclareInfoVisible: false,
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
      range: ['2017-01-01', '2050-12-31'],
      dateFormat: 'YYYY-MM',
      hint: '请选择月份',
      dateType: 2,
      type: 'dateRange'
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
      name: '申报名称',
      selected: [],
      list: [],
      type: 'radio'
    },
    {
      name: '缴纳状态',
      selected: [],
      list: [
        {key: '0', vlaue: 0}
      ],
      type: 'checkbox'
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
    let {orderList, totalCount, nextPageNum} = this.state
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
    }
    if (formData.pageNum === 1) {
      // 添加下拉监听
      windowScrollTheEnd(() => {
        this.getList()
      })
    }
    // console.log(errorMsg)
    getVAllOrderList(formData).then((res) => {
      if (res.dataList) {
        orderList = orderList.concat(res.dataList)
      }
      nextPageNum++
      this.setState({orderList, nextPageNum, totalCount: res.totalCount})
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
            连续缴纳月数: {item.seriesPayMonths}个月
          </div>
          <div className="title-item right">
            缴纳状态：{item.applyStatus}
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
              <p>申报名称：{item.applyProductName.value}</p>
            </div>
            <div className="col">
              <p>申报基数：{item.applyBase}</p>
              <p>缴纳月：{item.minPayMonth} 至 {item.maxPayMonth}</p>
            </div>
            <div className="col undashed">
              <p>派单日期：{item.dispatchDate}</p>
            </div>
            <ul className="col operation undashed">
              <li><a onClick={() => this.showDeclareInfo(index)}> 申报材料 </a></li>
              <li><Link to={this.routePath + '/detail/' + item.id}> 查看详情 </Link></li>
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
    this.getOrderListformData.nameOrIdCard = value
    this.getList('new', 1)
  }
  /**
   * 根据传入的筛选结果设置获取订单列表请求参数
   * @param  {[type]} filterReq [description]
   * @return {[type]}           [description]
   */
  setFilterOrderListformData = (filterReq) => {
    this.getOrderListformData.productTypeList = []
    this.getOrderListformData.beginDate = ''
    this.getOrderListformData.endDate = ''
    this.getOrderListformData.minPayMonth = ''
    this.getOrderListformData.maxPayMonth = ''
    this.getOrderListformData.cityList = []
    this.getOrderListformData.productId = -1
    this.getOrderListformData.applyStatusList = []
    // 筛选参数拼装
    filterReq.map((item) => {
      if (item.selected.length > 0) {
        switch(item.name) {
          case '产品类型':
            this.getOrderListformData.productTypeList = item.selected
            break
          case '派单日期':
            this.getOrderListformData.beginDate = item.selected[0].startValue === 'Invalid date' ? null : item.selected[0].startValue
            this.getOrderListformData.endDate = item.selected[0].endValue === 'Invalid date' ? null : item.selected[0].endValue
            break
          case '缴纳月份':
            this.getOrderListformData.minPayMonth = item.selected[0].startValue === 'Invalid date' ? null : item.selected[0].startValue
            this.getOrderListformData.maxPayMonth = item.selected[0].endValue === 'Invalid date' ? null : item.selected[0].endValue
            break
          case '缴纳城市':
            this.getOrderListformData.cityList = item.selected
            break
          case '申报名称':
            this.getOrderListformData.productId = item.selected[0]
            break
          case '缴纳状态':
            this.getOrderListformData.applyStatusList = item.selected
            break
          default:
            break
        }
      }
      return true
    })
  }

  /**
   * 渲染幻灯片
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  carouselRenderItem = (item, index) => {
    // item.material.residenceNatureMap = item.material.residenceNatureMap ? item.material.residenceNatureMap : {key: '', value: ''}
    // item.material.residenceCityMap = item.material.residenceCityMap ? item.material.residenceCityMap : {key: '', value: ''}
    return (<Material item = {{ all: item}} index={index} />)
  }

  /**
   * 打开指定申报材料幻灯片
   * @param  {[type]} num [description]
   * @return {[type]}     [description]
   */
  showDeclareInfo = (num) => {
    this.setState({isDeclareInfoVisible: true, declareInfoInitialSlide: num})
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
  render() {
    console.log('-----------------render', this.props)
    const { orderList, showFilter, totalCount, isDeclareInfoVisible, declareInfoInitialSlide } = this.state
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
            <br/>
            {this.rendeFilterReqItem()}
          </div>
          <List
            itemLayout="vertical"
            dataSource={orderList}
            renderItem={ (item, index) => this.renderItem(item, index) }
            locale={{emptyText: ''}}
          >
          </List>
          <NoData visible={orderList.length === 0}/>
        </div>
      </div>
    )

    return (
      <div className="container-order-all">
        <Switch>
          <Route path={this.routePath + '/detail/:id'} component={OrderDetailInfo}/>
          <Route path={this.routePath} render={render}/>
        </Switch>
      </div>
    )
  }

  componentDidMount() {
    if (this.moreFilterEl) {
      moreScreening({screenType: '4'}).then(res => {
        this.filterItems[3].list = res.cityList
        this.filterItems[5].list = res.orderStatus
        let productList = [{key: -1, value: '全部'}]
        res.vendorProductList[0].productList.map(item => {
          productList.push({value: item.value, key: item.productId})
        })
        this.filterItems[4].list = productList
        this.moreFilterEl.updateFilterItems(this.filterItems)
      })
    }
  }
}
