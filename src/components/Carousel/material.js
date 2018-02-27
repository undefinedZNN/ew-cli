import React from 'react'
import { Row, Col } from 'antd'
import { API_CONFIG } from '@/public'
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
        return (
          <div>
            <div className='order-info-carousel-slide-header'>
            订单号：{this.state.increase.orderNo}
            </div>
            <div className='detail'>
              <Row>
                <Col span={12}>
                  <h3 style={{'fontSize': '1.75rem'}}>{this.state.increase.name}</h3>
                  <p >身份证： {this.state.increase.idCard}</p>
                  <p >缴纳城市：{this.state.increase.cityMap.value}</p>
                  <p style={{'paddingBottom': '20px'}} >申报产品：{this.state.increase.applyProductMap.value}
                    {
                      this.state.increase.productTypeMap && this.state.increase.productTypeMap.key === '3' ? (
                        <span> ( {this.state.increase.orderProductTypeMap.value} ) </span>
                      ) : null
                    }
                  </p>
                  {
                    this.state.increase.material.residenceNatureMap && this.state.increase.material.residenceNatureMap.value ? (
                      <p >户籍属性：{this.state.increase.material.residenceNatureMap.value}</p>
                    ) : null
                  }
                  {
                    this.state.increase.material.residenceCityMap && this.state.increase.material.residenceCityMap.value ? (
                      <p >户籍所在地：{this.state.increase.material.residenceCityMap.value}</p>
                    ) : null
                  }
                  {
                    this.state.increase.material.educationMap ? (
                      <p >学历：{this.state.increase.material.educationMap.value}</p>
                    ) : null
                  }
                  {
                    this.state.increase.material.socialSecurityNumber ? (
                      <p >社保编号：{this.state.increase.material.socialSecurityNumber}</p>
                    ) : null
                  }
                  {
                    this.state.increase.material.fundAccount ? (
                      <p >公积金编号：{this.state.increase.material.fundAccount}</p>
                    ) : null
                  }
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={24} style={{'paddingBottom': '20px'}}>
                      <div style={{'paddingBottom': '20px'}}>身份证正面照</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.increase.material.idCardPicUrlAMap.value} height='150' alt="身份证正面照"/>
                        ) : (
                          <div data-src={this.state.increase.material.idCardPicUrlAMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                    <Col span={24}>
                      <div style={{'paddingBottom': '20px'}}>身份证背面照</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.increase.material.idCardPicUrlBMap.value} height='150' alt="身份证背面照"/>
                        ) : (
                          <div data-src={this.state.increase.material.idCardPicUrlBMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                  </Row>
                </Col>
                {
                  this.state.increase.material.hkPicUrlOfHomepageMap ? (
                    <Col span={12}>
                      <div style={{'paddingBottom': '20px', 'paddingTop': '20px'}}>户口本首页照片</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.increase.material.hkPicUrlOfHomepageMap.value} height='150' alt="户口本首页照片"/>
                        ) : (
                          <div data-src={this.state.increase.material.hkPicUrlOfHomepageMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                  ) : null
                }
                {
                  this.state.increase.material.hkPicUrlOfOwnpageMap ? (
                    <Col span={12}>
                      <div style={{'paddingBottom': '20px', 'paddingTop': '20px'}}>户口本本人页照片</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.increase.material.hkPicUrlOfOwnpageMap.value} height='150' alt="户口本本人页照片"/>
                        ) : (
                          <div data-src={this.state.increase.material.hkPicUrlOfOwnpageMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                  ) : null
                }
                {
                  this.state.increase.material.hkPicUrlOfHeaderpageMap ? (
                    <Col span={12}>
                      <div style={{'paddingBottom': '20px', 'paddingTop': '20px'}}>户口本户主页照片</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.increase.material.hkPicUrlOfHeaderpageMap.value} height='150' alt="户口本户主页照片"/>
                        ) : (
                          <div data-src={this.state.increase.material.hkPicUrlOfHeaderpageMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
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
        return (
          <div>
            <div className='order-info-carousel-slide-header'>
              材料详情
            </div>
            <div className='detail'>
              <Row>
                <Col span={12}>
                  <h3 style={{'fontSize': '1.75rem'}}>{this.state.all.name}</h3>
                  <p >身份证： {this.state.all.idCard}</p>
                  <p >缴纳城市：{this.state.all.cityMap.value}</p>
                  <p style={{'paddingBottom': '20px'}} >申报产品：{this.state.all.applyProductName.value}</p>
                  {
                    this.state.all.residenceNatureMap.value ? (
                      <p >户籍属性：{this.state.all.residenceNatureMap.value}</p>
                    ) : null
                  }
                  {
                    this.state.all.residenceCityMap.value ? (
                      <p >户籍所在地：{this.state.all.residenceCityMap.value}</p>
                    ) : null
                  }
                  {
                    this.state.all.educationMap ? (
                      <p >学历：{this.state.all.educationMap.value}</p>
                    ) : null
                  }
                  {
                    this.state.all.socialSecurityNumber ? (
                      <p >社保编号：{this.state.all.socialSecurityNumber}</p>
                    ) : null
                  }
                  {
                    this.state.all.fundAccount ? (
                      <p >公积金编号：{this.state.all.fundAccount}</p>
                    ) : null
                  }
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={24} style={{'paddingBottom': '20px'}}>
                      <div style={{'paddingBottom': '20px'}}>身份证正面照</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.all.idCardPicUrlFront.value} height='150' alt="身份证正面照"/>
                        ) : (
                          <div data-src={this.state.all.idCardPicUrlFront.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                    <Col span={24}>
                      <div style={{'paddingBottom': '20px'}}>身份证背面照</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.all.idCardPicUrlBack.value} height='150' alt="身份证背面照"/>
                        ) : (
                          <div data-src={this.state.all.idCardPicUrlBack.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                  </Row>
                </Col>
                {
                  this.state.all.hkPicUrlOfHomepageMap ? (
                    <Col span={12}>
                      <div style={{'paddingBottom': '20px', 'paddingTop': '20px'}}>户口本首页照片</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.all.hkPicUrlOfHomepageMap.value} height='150' alt="户口本首页照片"/>
                        ) : (
                          <div data-src={this.state.all.hkPicUrlOfHomepageMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                  ) : null
                }
                {
                  this.state.all.hkPicUrlOfOwnpageMap ? (
                    <Col span={12}>
                      <div style={{'paddingBottom': '20px', 'paddingTop': '20px'}}>户口本本人页照片</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.all.hkPicUrlOfOwnpageMap.value} height='150' alt="户口本本人页照片"/>
                        ) : (
                          <div data-src={this.state.all.hkPicUrlOfOwnpageMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
                          </div>
                        )
                      }
                    </Col>
                  ) : null
                }
                {
                  this.state.all.hkPicUrlOfHeaderpageMap ? (
                    <Col span={12}>
                      <div style={{'paddingBottom': '20px', 'paddingTop': '20px'}}>户口本户主页照片</div>
                      {
                        this.state.index === 0 ? (
                          <img src={this.state.all.hkPicUrlOfHeaderpageMap.value} height='150' alt="户口本户主页照片"/>
                        ) : (
                          <div data-src={this.state.all.hkPicUrlOfHeaderpageMap.value} className = {`lazy-img lazy-img-${this.props.index}`}>
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
    const name = (this.state.increase && this.state.increase.name) || (this.state.delect && this.state.delect.name) || (this.state.all && this.state.all.name) || (this.state.close && this.state.close.name)
    const idCard = (this.state.increase && this.state.increase.idCard) || (this.state.delect && this.state.delect.idCard) || (this.state.all && this.state.all.idCard) || (this.state.close && this.state.close.idCard)
    return (
      <div className='order-info-carousel-slide'>
        <div className='carousel-content' style={{marginTop: (window.innerHeight - 500) / 4}}>
          {this.renderContent()}
        </div>
        <div className='action'>
          <Row>
            <Col span={12}><span className="download" style={{'cursor': 'pointer'}} onClick={()=>{
              window.open(API_CONFIG.oldAddress + '/entry/pdfDownload?pdfDownload=idCardPicUrlAKey:' + idCardPicUrlA.key + ',idCardPicUrlBKey:' + idCardPicUrlB.key + ',name:' + name + ',idCard:' + idCard + ',appId:' + API_CONFIG.appId + ',token:' + API_CONFIG.querys.WOWOOHRtoken + ',userId:' + API_CONFIG.querys.WOWOOHRuserId)
            }}><i className="icon-inbox"></i><br />下载文件</span></Col>
            <Col span={12}><span className="print" style={{'cursor': 'pointer'}} onClick={() => {
              this.printImage([idCardPicUrlA.value, idCardPicUrlB.value])
            }}><i className="icon-printer"></i><br />打印文件</span></Col>
          </Row>
        </div>
      </div>
    )
  }
}
