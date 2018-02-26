import './style.less'
import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, List, Checkbox } from 'antd'
import { increaseOrderQuery, recruitOverOrder } from '@/services/order'
import { errorMsg } from '@/utils/tools'
import Dialog from '@/components/Dialog'
import MoreFilter from '@/components/MoreFilter'

export default class OrderIncrease extends React.Component {
  state = {
    checkedList: [], // 选中的订单索引
    showFilter: false, // 更多筛选组件隐藏显示
    orderList: []
  }
  // 第一次 render前执行
  componentWillMount () {
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
              <p>身份证    {item.idCard}</p>
              <p>手机号码  {item.mobile}</p>
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
              <li><a> 申报失败 </a></li>
            </ul>
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
   * 筛选更新内容回调
   * @param  {[type]} filterItems [description]
   * @return {[type]}             [description]
   */
  saveFilter = (filterItems) => {
    console.log('saveFilter', filterItems)
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

  render() {
    const { orderList, showFilter, checkedList } = this.state
    // <Dialog visible={true} title={null}>11111111111</Dialog>
    return (
      <div className="container-order-increase">
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
