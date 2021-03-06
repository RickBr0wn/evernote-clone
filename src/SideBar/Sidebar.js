import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import List from '@material-ui/core/list'
import { Divider, Button } from '@material-ui/core'
import SidebarItemComponent from '../SidebarItem/SidebarItem'

class SidebarComponent extends React.Component {
  constructor() {
    super()
    this.state = { addingNote: false, title: null }
  }

  newNoteBtnClick = () => {
    this.setState(prevState => ({
      title: null,
      addingNote: !prevState.addingNote
    }))
  }

  updateTitle = text => {
    this.setState({ title: text })
  }

  newNote = () => {
    this.props.newNote(this.state.title)
    this.setState({ title: null, addingNote: false })
  }

  selectNote = (note, index) => {
    this.props.selectNote(note, index)
  }

  deleteNote = note => {
    this.props.deleteNote(note)
  }

  render() {
    const { notes, classes, selectedNoteIndex } = this.props
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
          {this.state.addingNote ? 'Cancel' : 'New Note'}
        </Button>
        {this.state.addingNote ? (
          <div>
            <input
              type='text'
              className={classes.newNoteInput}
              placeholder='Enter Note Title'
              onKeyUp={e => this.updateTitle(e.target.value)}
            />
            <Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>
              Add Note
            </Button>
          </div>
        ) : null}
        <List>
          {notes &&
            notes.map((note, index) => {
              return (
                <div key={index}>
                  <SidebarItemComponent
                    note={note}
                    index={index}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={() => this.selectNote(note, index)}
                    deleteNote={() => this.deleteNote(note)}
                  />
                  <Divider />
                </div>
              )
            })}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(SidebarComponent)
