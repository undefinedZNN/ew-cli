import React from 'react'
import { Carousel } from 'antd'
import './carousel.css'
import './style.less'
export default class MyCarousel extends React.Component {
  // 当前停留的 Slide 页码
  nowSlide = this.props.initialSlide ? this.props.initialSlide : 0
  /**
   * 下翻
   * @return {[type]} [description]
   */
  next = () => {
    this.slider.next()
  }

  /**
   * 上翻
   * @return {[type]} [description]
   */
  previous = () => {
    this.slider.prev()
  }

  /**
   * 关闭当前幻灯
   * @return {[type]} [description]
   */
  close = () => {
    // this.swiper.slideTo(0)
    let {onClose} = this.props
    if (typeof onClose === 'function') {
      onClose()
    }
    this.slider.goTo(this.nowSlide)
  }

  /**
   * 更新props
   * @param  {[type]} nextProps [description]
   * @return {[type]}           [description]
   */
  componentWillReceiveProps (nextProps) {
    if(nextProps.initialSlide !== this.props.initialSlide) {
      this.nowSlide = nextProps.initialSlide ? nextProps.initialSlide : 0
    }
  }

  /**
   * 首次render后
   * @return {[type]} [description]
   */
  componentDidMount () {
    // this.renderSwiper()
  }

  /**
   * 重新reder后
   * @return {[type]} [description]
   */
  componentDidUpdate () {
    const { dataSource } = this.props
    // this.slider.goTo(this.nowSlide)
    let nextBtn = this.carouselEl.querySelector('.button-next')
    if (dataSource.length <= (this.nowSlide + 1)) {
      nextBtn.setAttribute('class', 'button-next disabled')
    } else {
      nextBtn.setAttribute('class', 'button-next')
    }
  }

  render() {
    let CarouselItem = []
    let {visible, dataSource, renderItem, afterChange, className} = this.props
    if (!className) {
      className = ''
    }
    let componentStyle = {}
    if (!visible) {
      componentStyle.top = '100%'
    }
    /**
     * 渲染幻灯片内容
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    dataSource.map((item, index) => {
      let itemDom = renderItem(item, index)
      CarouselItem.push(<div key={index}>{itemDom}</div>)
      return true
    })

    const carouselSeting = {
      dots: false,
      infinite: false,
      initialSlide: this.nowSlide,
      afterChange: (current) => {
        // this.nowSlide = current
        let prevBtn = this.carouselEl.querySelector('.button-prev')
        let nextBtn = this.carouselEl.querySelector('.button-next')
        if (current === 0) {
          prevBtn.setAttribute('class', 'button-prev disabled')
        } else {
          prevBtn.setAttribute('class', 'button-prev')
        }
        if (dataSource.length <= (current + 1)) {
          nextBtn.setAttribute('class', 'button-next disabled')
        } else {
          nextBtn.setAttribute('class', 'button-next')
        }
        if (typeof afterChange === 'function') {
          afterChange(current)
        }
        const lazyImages = document.querySelectorAll('.lazy-img-' + current)
        lazyImages.forEach(ele => {
          while (ele.firstChild) {
            ele.removeChild(ele.firstChild)
          }
          var img = document.createElement('img')
          img.setAttribute('src', ele.getAttribute('data-src'))
          ele.appendChild(img)
        })
      }
    }
    return (
      <div className={'component-carousel ' + className} ref={ref => (this.carouselEl = ref)} style={componentStyle} >
        <div className='button-close' onClick={this.close}><span className='icon-cross'></span></div>
        <div className='button-next' onClick={this.next}><span className='icon-12'></span></div>
        <div className='button-prev disabled' onClick={this.previous}><span className='icon-11'></span></div>
        <Carousel {...carouselSeting} ref={ref => (this.slider = ref)}>
          {CarouselItem}
        </Carousel>
      </div>
    )
  }
}
