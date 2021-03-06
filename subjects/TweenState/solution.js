////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Use TweenStateMixin to animate a sliding animation
// - Experiment with different types of easing (hint: use easingTypes at 
//   https://github.com/chenglou/tween-functions/blob/master/index.js)
//
// Got more time?
//
// - Use a <Spring> to animate the transition
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import { Mixin as TweenStateMixin } from 'react-tween-state'
import { Motion, spring } from 'react-motion'

require('./styles')

const { bool, number } = React.PropTypes

const TweenToggleSwitch = React.createClass({

  mixins: [ TweenStateMixin ],

  propTypes: {
    animationDuration: number,
    isActive: bool.isRequired
  },

  getDefaultProps() {
    return {
      animationDuration: 350
    }
  },

  getInitialState() {
    return {
      knobLeft: 0
    }
  },

  componentWillReceiveProps(nextProps) {
    this.tweenState('knobLeft', {
      duration: this.props.animationDuration,
      endValue: (nextProps.isActive ? 400 : 0)
    })
  },

  render() {
    const knobLeft = this.getTweeningValue('knobLeft')
    const knobStyle = {
      WebkitTransform: `translate3d(${knobLeft}px,0,0)`,
      transform: `translate3d(${knobLeft}px,0,0)`
    }

    return (
      <div className="toggle-switch" onClick={this.handleClick}>
        <div className="toggle-switch-knob" style={knobStyle}/>
      </div>
    )
  }

})

const SpringToggleSwitch = React.createClass({

  propTypes: {
    isActive: bool.isRequired
  },

  render() {
    const x = this.props.isActive ? 400 : 0

    return (
      <Motion defaultStyle={{ x }} style={{ x: spring(x) }}>
      {s => (
        <div id="switch1" className="toggle-switch" onClick={this.handleClick}>
          <div className="toggle-switch-knob" style={{
            WebkitTransform: `translate3d(${s.x}px,0,0)`,
            transform: `translate3d(${s.x}px,0,0)`
          }}/>
        </div>
      )}
      </Motion>
    )
  }

})

const App = React.createClass({

  getInitialState() {
    return {
      isActive: false
    }
  },

  toggle() {
    this.setState({
      isActive: !this.state.isActive
    })
  },

  handleClick() {
    this.toggle()
  },

  render() {
    return (
      <div>
        <TweenToggleSwitch isActive={this.state.isActive}/>
        <SpringToggleSwitch isActive={this.state.isActive}/>
        <button onClick={this.handleClick}>Toggle</button>
      </div>
    )
  }

})

render(<App/>, document.getElementById('app'))
