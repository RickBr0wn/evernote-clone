import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import removeHTMLTags from '../Helpers/removeHTMLTags'
import { NotesContext } from '../Contexts/NotesContext'

const SidebarItemComponent = ({ classes, note, index }) => {
  const [state, dispatch] = React.useContext(NotesContext)
  const { selectedNoteIndex } = state
  return (
    <div key={index}>
      <ListItem
        className={classes.listItem}
        onClick={() =>
          dispatch({
            type: 'SET_SELECTED_NOTE',
            selectedNoteIndex: index,
            selectedNote: note
          })
        }
        selected={selectedNoteIndex === index}
        alignItems='flex-start'>
        <div className={classes.textSection}>
          <ListItemText
            primary={note.title}
            secondary={removeHTMLTags(note.body.substring(0, 30)) + '...'}
          />
        </div>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={() => {
            if (
              window.confirm(`Are you sure you want to delete: ${note.title}`)
            ) {
              dispatch({ type: 'DELETE_NOTE', note })
              const noteIndex = state.notes.indexOf(note)
              if (state.selectedNoteIndex === noteIndex) {
                dispatch({
                  type: 'SET_SELECTED_NOTE',
                  selectedNoteIndex: null,
                  selectedNote: null
                })
              } else {
                state.notes.length > 1
                  ? dispatch({
                      type: 'SET_SELECTED_NOTE',
                      selectedNoteIndex:
                        state.notes[state.selectedNoteIndex - 1],
                      selectedNote: selectedNoteIndex - 1
                    })
                  : dispatch({
                      type: 'SET_SELECTED_NOTE',
                      selectedNoteIndex: null,
                      selectedNote: null
                    })
              }
            }
          }}
        />
      </ListItem>
    </div>
  )
}

export default withStyles(styles)(SidebarItemComponent)
