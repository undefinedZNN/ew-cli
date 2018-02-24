import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, List, DatePicker } from 'antd'
import MoreFilter from '@/components/MoreFilter'
// import { toast } from '@/utils/tools'
import './style.less'
import { increaseOrderQuery } from '@/services/order'

export default class OrderIncrease extends React.Component {
  state = {
    orderList: []
  }

  getList = (type = 'append', page = 'next') => {
    // console.log(errorMsg)
    increaseOrderQuery().then((res) => {
      this.setState({orderList: res.list})
    })
  }
  /**
   * 订单列项渲染
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  renderItem = (item, index) => {
    return (
      <div className="order-info-item">
        <div className="order-info-item-title">
          <div className="title-item black">
            商户订单号: 1233333333
            <Link to={'/'}> 查看详情 </Link>
          </div>
          <div className="title-item">
            供应商：12321321
          </div>
          <div className="title-item">
            增员日：321321
          </div>
          <div className="title-item">
            缴纳金额：321321元
          </div>
        </div>
        <div className="order-info-item-body">
          <div className="order-detail">
            <div className="col userInfo">
              <h3>432431</h3>
              <p>身份证    12321321321</p>
              <p>手机号码  12321321</p>
            </div>
            <div className="col">
              <p>缴纳城市：1321321</p>
              <p>申报产品：12321321</p>
            </div>
            <div className="col">
              <p>申报基数：132132313</p>
              <p>派单日期：12321</p>
            </div>
            <div className="col undashed">
              <p>缴纳月：1232132132</p>
            </div>
            <ul className="col operation undashed">
              <li><a> 申报材料 </a></li>
              <li><a> 取消订单 </a></li>
              <li><Link to={'/order/increase/log/'}> 操作日志 </Link></li>
            </ul>
          </div>
        </div>
        <div className="order-info-item-footer gray">订单内未提交申报项:342432432432</div>
      </div>
    )
  }

  testMsg = () => {
    this.getList()
  }

  render() {
    console.log('OrderIncrease render')
    const { orderList } = this.state
    let filterItems = [
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
      }
    ]
    return (
      <div className="container-order-increase">
        <MoreFilter show={true} filterItems={filterItems}/>
        <div className="content">
          <div className="toolbar">
            <Input.Search
              // defaultValue = {defaultOrderSearchValue}
              style={{ width: 634 }}
              placeholder="请输入姓名、身份证号、商户订单号、手机号"
              // onSearch={value => {this.searchOrder(value)}}
              enterButton
            />
            <Button className="more-btn" onClick={this.testMsg}> 更多筛选</Button>
            <span className="count-mun"> 共{1}条</span>
            <div className="right">
              <a>导出EXCEL</a>
            </div>
            <br/>
          </div>
          <DatePicker/>
          <List
            itemLayout="vertical"
            dataSource={orderList}
            renderItem={ (item, index) => this.renderItem(item, index) }
          >
          </List>
        </div>
      </div>
    )
  }
}
