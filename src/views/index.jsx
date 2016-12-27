import React from 'react'

import {
  Form,
  FormGroup,
  FormControl,
  Col,
  Button,
  ControlLabel,
  // Panel,
  // Checkbox,
  // Glyphicon,
  // ListGroup,
  // ListGroupItem,
  // InputGroup,
  // Alert
} from 'react-bootstrap'

import style from './style.scss'

export default class SlackModule extends React.Component {

  state = {
    message: ''
  }

  // TODO handle error
  // TODO add eslint about missing class method

  getAxios = () => this.props.bp.axios

  // ----- event handle functions -----
  handleChange = event => {
    var { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  handleSendTestMessage = () => {
    const { message } = this.state

    // TODO handle error
    this.getAxios().post('/api/botpress-slack/sendMessage', { message })
      .then(() => {
        this.setState({ message: '' })
      })
  }

  // ----- render functions -----

  renderLabel = label => {
    return (
      <Col componentClass={ControlLabel} sm={3}>
        {label}
      </Col>
    )
  }

  renderTextAreaInput = (label, name, props = {}) => {
    return (
      <FormGroup>
        {this.renderLabel(label)}
        <Col sm={7}>
          <FormControl name={name} {...props}
            componentClass="textarea" rows="3"
            value={this.state[name]}
            onChange={this.handleChange} />
        </Col>
      </FormGroup>
    )
  }

  renderForm = () => {
    return (
      <Form horizontal>
        <div className={style.section}>
          <div className={style.header}>
            <h4>Test Area</h4>
          </div>
          <div>
            {this.renderTextAreaInput('Message', 'message', {
              placeholder: 'type test message here'
            })}

            <FormGroup>
              <Col smOffset={3} sm={7}>
                <Button className={style.formButton} onClick={this.handleSendTestMessage}>
                  Send
                </Button>
              </Col>
            </FormGroup>
          </div>
        </div>
      </Form>
    )
  }

  render() {
    return <div>
      {this.renderForm()}
    </div>
  }
}
