// @flow

/**
 *
 * ProgressBar
 *
*/

import React, { Component } from 'react'
import './styles.scss'
import cx from 'classnames'

type Props = {
  intervalTime: number,
  autoIncrement: boolean,
  percent: number,
  updateProgress: Function
}

class ProgressBar extends Component {
  props: Props

  interval: ?number
  timeout: ?number

  static defaultProps = {
    percent: -1,
    autoIncrement: true,
    intervalTime: 75
  }

  state = {
    percent: this.props.percent
  }

  componentDidMount () {
    this.handleProps(this.props)
  }

  componentWillReceiveProps (nextProps: Object) {
    if (this.interval) {
      // stop progress when new props come in
      clearInterval(this.interval)
      this.interval = undefined
    }
    if (this.timeout) {
      // clear timeout when new props come in
      clearTimeout(this.timeout)
      this.timeout = undefined
    }
    // start progress with updated props
    this.handleProps(nextProps)
  }

  componentWillUnmount () {
    // cleaning up interval and timeout
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = undefined
    }
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = undefined
    }
  }

  increment = () => {
    /**
     * Increment the percent randomly.
     * Only used when autoIncrement is set to true
    */
    let { percent } = this.state
    percent += ((Math.random() + 1) - Math.random())
    percent = percent < 99 ? percent : 99
    this.setState({ percent })
  }

  handleProps = ({ intervalTime, autoIncrement, percent, updateProgress }: Props) => {
    /**
     * Increment progress bar if auto increment is set to true
     * and progress percent is less than 99.
    */
    if (autoIncrement && percent >= 0 && percent < 99) {
      this.interval = setInterval(this.increment, intervalTime)
    }

    /**
     * Reset the progress bar when percent hits 100
     * For better visual effects, percent is set to 99.9
     * and then cleared in the callback after some time.
    */

    if (percent >= 100) {
      this.setState({
        percent: 99.9
      }, () => {
        this.timeout = setTimeout(() => {
          this.setState({ percent: -1 }, () => updateProgress(-1))
        }, 300)
      })
    } else {
      this.setState({ percent })
    }
  }

  render () {
    const { percent } = this.state

    // Hide progress bar if percent is less than 0.
    const isHidden = percent < 0 || percent >= 100

    // Set `state.percent` as width.
    const style = { width: `${(percent <= 0 ? 0 : percent)}%` }
    const className = cx('progressBar', { 'progressBar--hidden': isHidden })

    return (
      <div className={className}>
        <div className='progressBar__percent' style={style} />
      </div>
    )
  }
}

export default ProgressBar
