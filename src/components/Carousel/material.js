import React from 'react'
import { Row, Col } from 'antd'

export default class Material extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.item,
      index: this.props.index
    }
  }
  renderContent () {
    const key = Object.keys(this.state)
    switch (key[0]) {
      case 'increase':
        let increaseInfo
        increaseInfo = this.state.increase
        increaseInfo.applyProductMap = {...{value: ''}, ...increaseInfo.applyProductMap}
        return (
          <div>
            <div className='order-info-carousel-slide-header'>
            订单号：{increaseInfo.orderNo}
            </div>
            <div className='detail'>
              <Row>
                <Col span={12}>
                  <h3 style={{'fontSize': '1.75rem'}}>{increaseInfo.name}</h3>
                  <p >身份证： {increaseInfo.idCard}</p>
                  <p >缴纳城市：{increaseInfo.cityMap.value}</p>
                  <p style={{'paddingBottom': '20px'}} >申报产品：{increaseInfo.applyProductMap.value}</p>
                  <p >户籍属性：{increaseInfo.material.residenceNatureMap.value}</p>
                  <p >户籍所在地：{increaseInfo.material.residenceCityMap.value}</p>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={24} style={{'paddingBottom': '20px'}}>
                      <div style={{'paddingBottom': '20px'}}>身份证正面照</div>
                      <img src={increaseInfo.material.idCardPicUrlAMap.value} height='150' alt="身份证正面照"/>
                    </Col>
                    <Col span={24}>
                      <div style={{'paddingBottom': '20px'}}>身份证背面照</div>
                      <img src={increaseInfo.material.idCardPicUrlBMap.value} height='150' alt="身份证背面照"/>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        )
      case 'delect':
        return (
          <div>
            <div className='order-info-carousel-slide-header'>
            材料详情
            </div>
            <div className='detail'>
              <Row>
                <Col span={12}>
                  <h3 style={{'fontSize': '1.75rem'}}>{this.state.delect.name}</h3>
                  <p >身份证： {this.state.delect.idCard}</p>
                  <p >缴纳城市：{this.state.delect.cityCode}</p>
                  <p style={{'paddingBottom': '20px'}} >申报产品：{this.state.delect.productName}</p>
                  {
                    this.state.delect.materialDto.residenceNatureMap.value ? (
                      <p >户籍属性：{this.state.delect.materialDto.residenceNatureMap.value}</p>
                    ) : null
                  }
                  {
                    this.state.delect.materialDto.residenceCityMap.value ? (
                      <p >户籍所在地：{this.state.delect.materialDto.residenceCityMap.value}</p>
                    ) : null
                  }
                  {
                    this.state.delect.materialDto.educationMap ? (
                      <p >学历：{this.state.delect.materialDto.educationMap.value}</p>
                    ) : null
                  }
                  {
                    this.state.delect.materialDto.socialSecurityNumber ? (
                      <p >社保编号：{this.state.delect.materialDto.socialSecurityNumber}</p>
                    ) : null
                  }
                  {
                    this.state.delect.materialDto.fundAccount ? (
                      <p >公积金编号：{this.state.delect.materialDto.fundAccount}</p>
                    ) : null
                  }
                </Col>
                <Col span={12} style={{'paddingBottom': '20px'}}>
                  身份证正面照
                  {
                    this.state.index === 0 ? (
                      <img src={this.state.delect.materialDto.idCardPicUrlAMap.value} height="150" alt="身份证正面照"/>
                    ) : (
                      <div data-src={this.state.delect.materialDto.idCardPicUrlAMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                      </div>
                    )
                  }
                </Col>
                <Col span={12}>
                  身份证背面照
                  {
                    this.state.index === 0 ? (
                      <img src={this.state.delect.materialDto.idCardPicUrlBMap.value} height="150" alt="身份证背面照"/>
                    ) : (
                      <div data-src={this.state.delect.materialDto.idCardPicUrlBMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                      </div>
                    )
                  }
                </Col>
                {
                  this.state.delect.materialDto.hkPicUrlOfHomepageMap ? (
                    <Col span={12}>
                      <div style={{'paddingBottom': '20px', 'paddingTop': '20px'}}>户口本首页照片</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.delect.materialDto.hkPicUrlOfHomepageMap.value} height='150' alt="户口本首页照片"/>
                        ) : (
                          <div data-src={this.state.delect.materialDto.hkPicUrlOfHomepageMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                  ) : null
                }
                {
                  this.state.delect.materialDto.hkPicUrlOfOwnpageMap ? (
                    <Col span={12}>
                      <div style={{'paddingBottom': '20px', 'paddingTop': '20px'}}>户口本本人页照片</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.delect.materialDto.hkPicUrlOfOwnpageMap.value} height='150' alt="户口本本人页照片"/>
                        ) : (
                          <div data-src={this.state.delect.materialDto.hkPicUrlOfOwnpageMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                  ) : null
                }
                {
                  this.state.delect.materialDto.hkPicUrlOfHeaderpageMap ? (
                    <Col span={12}>
                      <div style={{'paddingBottom': '20px', 'paddingTop': '20px'}}>户口本户主页照片</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.delect.materialDto.hkPicUrlOfHeaderpageMap.value} height='150' alt="户口本户主页照片"/>
                        ) : (
                          <div data-src={this.state.delect.materialDto.hkPicUrlOfHeaderpageMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                  ) : null
                }
              </Row>
            </div>
          </div>
        )
      case 'all':
        let allInfo
        allInfo = this.state.all
        return (
          <div>
            <div className='order-info-carousel-slide-header'>
             缴纳详情
            </div>
            <div className='detail'>
              <Row>
                <Col span={12}>
                  <h3 style={{'fontSize': '1.75rem'}}>{allInfo.name}</h3>
                  <p >身份证： {allInfo.idCard}</p>
                  <p >缴纳城市：{allInfo.cityMap.value}</p>
                  <p style={{'paddingBottom': '20px'}} >申报产品：{allInfo.applyProductName.value}</p>
                  {
                    allInfo.residenceNatureMap ? (<p >户籍属性：{allInfo.residenceNatureMap.value}</p>) : null
                  }
                  {
                    allInfo.residenceCityMap ? (<p >户籍所在地：{allInfo.residenceCityMap.value}</p>) : null
                  }
                  {
                    allInfo.socialSecurityNumber ? (
                      <p >社保编号：{allInfo.socialSecurityNumber}</p>
                    ) : null
                  }
                  {
                    allInfo.fundAccount ? (
                      <p >公积金编号：{allInfo.fundAccount}</p>
                    ) : null
                  }
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={24} style={{'paddingBottom': '20px'}}>
                      <div style={{'paddingBottom': '20px'}}>身份证正面照</div>
                      {
                        this.state.index === 0 ? (
                          <img src={allInfo.idCardPicUrlFront.value} height='150' alt="身份证正面照"/>
                        ) : (
                          <div data-src={allInfo.idCardPicUrlFront.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                    <Col span={24}>
                      <div style={{'paddingBottom': '20px'}}>身份证背面照</div>
                      {
                        this.state.index === 0 ? (
                          <img src={allInfo.idCardPicUrlBack.value} height='150' alt="身份证背面照"/>
                        ) : (
                          <div data-src={allInfo.idCardPicUrlBack.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        )
      case 'fail':
        let failInfo
        failInfo = this.state.fail
        return (
          <div>
            <div className='order-info-carousel-slide-header'>
              订单号：{failInfo.orderNo}
            </div>
            <div className='detail'>
              <Row>
                <Col span={12}>
                  <h3 style={{'fontSize': '1.75rem'}}>{failInfo.name}</h3>
                  <p >身份证： {failInfo.idCard}</p>
                  <p >缴纳城市：{failInfo.cityMap.value}</p>
                  <p style={{'paddingBottom': '20px'}} >申报产品：{failInfo.applyProductMap.value} ({failInfo.orderProductTypeMap.value})</p>
                  {
                    failInfo.material ? (<p >户籍属性：{failInfo.material.residenceNatureMap.value}</p>) : null
                  }
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={24} style={{'paddingBottom': '20px'}}>
                      <div style={{'paddingBottom': '20px'}}>身份证正面照</div>
                      {
                        this.state.index === 0 ? (
                          <img src={failInfo.material.idCardPicUrlAMap.value} height='150' alt="身份证正面照"/>
                        ) : (
                          <div data-src={failInfo.material.idCardPicUrlAMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                    <Col span={24}>
                      <div style={{'paddingBottom': '20px'}}>身份证背面照</div>
                      {
                        this.state.index === 0 ? (
                          <img src={failInfo.material.idCardPicUrlBMap.value} height='150' alt="身份证背面照"/>
                        ) : (
                          <div data-src={failInfo.material.idCardPicUrlBMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        )
      case 'close':
        return (
          <div>
            <div className='order-info-carousel-slide-header'>
              订单号：{this.state.close.orderNo}{
                this.state.close.nowPayStatusMap.key === 1 ? (
                  <span> ( {this.state.close.nowPayStatusMap.value} ) </span>
                ) : null
              }
            </div>
            <div className='detail'>
              <Row>
                <Col span={12}>
                  <h3 style={{'fontSize': '1.75rem'}}>{this.state.close.name}</h3>
                  <p >身份证： {this.state.close.idCard}</p>
                  <p >缴纳城市：{this.state.close.cityMap}</p>
                  <p style={{'paddingBottom': '20px'}} >申报名称：{this.state.close.applyProductMap.value}
                    {
                      this.state.close.productTypeMap.key === '3' ? (
                        <span> ( {this.state.close.orderProductTypeMap.value} ) </span>
                      ) : null
                    }
                  </p>
                  <p >申报基数：{this.state.close.applyBase}</p>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={24} style={{'paddingBottom': '20px'}}>
                      <div style={{'paddingBottom': '20px'}}>身份证正面照</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.close.material.idCardPicUrlAMap.value} height='150' alt="身份证正面照"/>
                        ) : (
                          <div data-src={this.state.close.material.idCardPicUrlAMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                    <Col span={24}>
                      <div style={{'paddingBottom': '20px'}}>身份证背面照</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.close.material.idCardPicUrlBMap.value} height='150' alt="身份证背面照"/>
                        ) : (
                          <div data-src={this.state.close.material.idCardPicUrlBMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        )
      default:
        return null
    }
  }
  printImage(imagePath) {
    var iframes = document.querySelectorAll('iframe')
    for (var i = 0; i < iframes.length; i++) {
      iframes[i].parentNode.removeChild(iframes[i])
    }
    var content = '<!DOCTYPE html>' +
            '<html>' +
            '<head><title></title></head>' +
            '<body style="margin:150px auto; text-align:center">' +
            '<img src="' + imagePath[0] + '" height="240" />' +
            '<br/>' +
            '<br/>' +
            '<br/>' +
            '<br/>' +
            '<br/>' +
            '<br/>' +
            '<img src="' + imagePath[1] + '" height="240" />' +
            '</body>' +
            '</html>'
    var iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = 'data:text/html;charset=utf-8,' + escape(content)
    document.body.appendChild(iframe)
    window.frames[0].focus()
    window.frames[0].print()
  }
  render() {
    const idCardPicUrlA = (this.state.increase && this.state.increase.material.idCardPicUrlAMap) || (this.state.delect && this.state.delect.materialDto.idCardPicUrlAMap) || (this.state.all && this.state.all.idCardPicUrlFront) || (this.state.close && this.state.close.material.idCardPicUrlAMap)
    const idCardPicUrlB = (this.state.increase && this.state.increase.material.idCardPicUrlBMap) || (this.state.delect && this.state.delect.materialDto.idCardPicUrlBMap) || (this.state.all && this.state.all.idCardPicUrlBack) || (this.state.close && this.state.close.material.idCardPicUrlBMap)
    // const name = (this.state.increase && this.state.increase.name) || (this.state.delect && this.state.delect.name) || (this.state.all && this.state.all.name) || (this.state.close && this.state.close.name)
    // const idCard = (this.state.increase && this.state.increase.idCard) || (this.state.delect && this.state.delect.idCard) || (this.state.all && this.state.all.idCard) || (this.state.close && this.state.close.idCard)
    return (
      <div className='order-info-carousel-slide'>
        <div className='carousel-content' style={{marginTop: (window.innerHeight - 500) / 4}}>
          {this.renderContent()}
        </div>
        <div className='action'>
          <Row>
            <Col span={12}><span className="download" style={{'cursor': 'pointer'}}><i className="icon-inbox"></i><br />下载文件</span></Col>
            <Col span={12}><span className="print" style={{'cursor': 'pointer'}} onClick={() => {
              this.printImage([idCardPicUrlA.value, idCardPicUrlB.value])
            }}><i className="icon-printer"></i><br />打印文件</span></Col>
          </Row>
        </div>
      </div>
    )
  }
}
