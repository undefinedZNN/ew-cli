import './style.less'
import React from 'react'
import { Table } from 'antd'
import { publicLoading } from '@/utils/tools'
import { getOrderDetailInfo } from '@/services/order'

export default class OrderDetailInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      orderInfo: {
        name: '',
        idCard: '',
        productName: '',
        payAmount: '',
        cityMap: {key: '', value: ''},
        orderMonthMin: '2017-01',
        orderMonthMax: '2050-12'
      }
    }
    publicLoading(true)
  }

  formData = {}

  list = {}
  orderInfo = {}
  /**
   * 获取操作日志列表
   * @param  {String} type [description]
   * @return {[type]}      [description]
   */
  getList = async (type = 'append') => {
    let formData = {...this.formData, ...this.props.match.params}
    await getOrderDetailInfo(formData).then(result => {
      let orderInfo = result
      let list = []
      if (result.insuranceDetialDtoList) {
        list = result.insuranceDetialDtoList
        list.map((item, index) => {
          item.key = index
          return true
        })
      }
      this.setState({list, orderInfo}, () => {
        // if (window.location.hash.indexOf('detail') > -1 && window.location.hash.indexOf('order') > -1) {
        //   showDom('container-order-detail-info')
        // }
      })
      publicLoading(false)
    })
  }

  componentWillMount () {
    this.getList()
  }
  render () {
    console.log('render OrderOperationLog----------', this.props)
    const columns = [
      {
        title: '',
        children: [
          {
            title: '险种',
            dataIndex: 'insuranceTypeMap.value',
            key: 'insuranceType'
          },
          {
            title: '缴纳月',
            dataIndex: 'payMonth',
            key: 'payMonth'
          }
        ]
      },
      {
        title: '企业',
        children: [
          {
            title: '基数',
            dataIndex: 'companyBaseNumber',
            key: 'companyBaseNumber'
          },
          {
            title: '比例(%)',
            dataIndex: 'companyRatio',
            key: 'companyRatio',
            render: (text, record, index) => {
              if (record.companyRatio === 0) {
                return '0'
              }
              if (record.companyRatio === null) {
                return '-'
              }
              return (record.companyRatio + '%')
            }
          },
          {
            title: '固定金额',
            dataIndex: 'companyFixedAmount',
            key: 'companyFixedAmount'
          },
          {
            title: '缴纳额',
            dataIndex: 'companyPayAmount',
            key: 'companyPayAmount'
          }
        ]
      },
      {
        title: '个人',
        children: [
          {
            title: '基数',
            dataIndex: 'personBaseNumber',
            key: 'personBaseNumber'
          },
          {
            title: '比例(%)',
            dataIndex: 'personRatio',
            key: 'personRatio',
            render: (text, record, index) => {
              if (record.personRatio === 0) {
                return '0'
              }
              if (record.personRatio === null) {
                return '-'
              }
              return (record.personRatio + '%')
            }
          },
          {
            title: '固定金额',
            dataIndex: 'personFixedAmount',
            key: 'personFixedAmount'
          },
          {
            title: '缴纳额',
            dataIndex: 'personPayAmount',
            key: 'personPayAmount'
          }
        ]
      },
      {
        title: '',
        children: [
          {
            title: '缴纳总额',
            dataIndex: 'insurancePayAmount',
            key: 'insurancePayAmount'
          },
          {
            title: '申报结果',
            dataIndex: 'detailStatusMap.value',
            key: 'detailStatus',
            render: (text, record) => {
              if (record.status === 3 || record.status === 4) {
                return (
                  record.detailFailReasonMap ? `${record.detailStatusMap.value}（${record.detailFailReasonMap.value}）` : record.detailStatusMap.value
                )
              } else {
                return ('无')
              }
            }
          }
        ]
      }
    ]
    const goBack = () => {
      publicLoading(false)
      this.props.history.goBack()
    }
    let {list, orderInfo} = this.state

    return (
      <div className="main container-order-detail-info">
        <div className="content">
          <div className="toolbar" style={{'height': '50px', 'lineHeight': '50px', 'marginBottom': '0px'}}>
            <a onClick={goBack}> &lt;返回 </a> <h3 className="toolbar-title"> 订单详情</h3>
          </div>
          <div className="order-info">
            <span style={{'fontSize': '20px'}}>{orderInfo.name}</span>
            <span>身份证号：{orderInfo.idCard}</span>
            <span>缴纳城市：{orderInfo.cityMap.value}</span>
            {
              window.location.hash.indexOf('delect') !== -1 ? (
                <span>
                  <span style={{'marginRight': '20px'}}>离职原因：{orderInfo.reasonsForLeavin}</span>
                  <span>离职日期：{orderInfo.leavinDay}</span>
                </span>
              ) : (
                <span>申报名称：{orderInfo.productName}</span>
              )
            }
          </div>
          <Table columns={columns} dataSource={list} className='normal-table sorted-header' pagination={false} />
          <div className="detail-footer">
            <p>订单号：{orderInfo.orderNumber}</p>
            <p className="detail-pay-amount">总计：<span className="detail-pay-amount-number">{orderInfo.payAmount}</span></p>
          </div>
        </div>
      </div>
    )
  }
}
