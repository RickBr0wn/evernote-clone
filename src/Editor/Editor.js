import React from 'react'
import ReactQuill from 'react-quill'
import debounce from '../Helpers/debounce'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class EditorComponent extends React.Component {
  constructor() {
    super()
    this.state = { text: '', title: '', id: '' }
  }

  updateBody = async value => {
    await this.setState({ text: value })
    this.update()
  }

  updateTitle = async text => {
    await this.setState({ title: text })
    this.update()
  }

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    })
  }, 1500)

  componentDidMount() {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id
    })
  }

  componentDidUpdate() {
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      })
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon} />
        <input
          className={classes.titleInput}
          placeholder='Note title...'
          value={this.state.title ? this.state.title : ''}
          onChange={e => this.updateTitle(e.target.value)}
        />
        <ReactQuill value={this.state.text} onChange={this.updateBody} />
      </div>
    )
  }
}

export default withStyles(styles)(EditorComponent)
