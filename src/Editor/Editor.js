import React from 'react'
import ReactQuill from 'react-quill'
import debounce from '../Helpers/debounce'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import { NotesContext } from '../Contexts/NotesContext'
import { updateNoteOnDatabase } from '../Contexts/NotesContext'

const EditorComponent = ({ classes }) => {
  const [state, dispatch] = React.useContext(NotesContext)
  const { selectedNote, id, title, body } = state

  React.useEffect(() => {
    if (selectedNote) {
      dispatch({
        type: 'LOAD_NOTE_INTO_EDITOR',
        text: selectedNote.text,
        body: selectedNote.body,
        id: selectedNote.id
      })
    }
  }, [])

  const update = debounce(() => {
    updateNoteOnDatabase(id, {
      title: selectedNote.text,
      body
    })
  }, 1500)

  console.log(state)

  return (
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon} />
      <input
        className={classes.titleInput}
        placeholder='Note title...'
        value={selectedNote.title ? selectedNote.title : ''}
        onChange={e => {
          dispatch({ type: 'UPDATE_TITLE', title: e.target.value })
          update()
        }}
      />
      <ReactQuill
        value={body}
        onChange={e => {
          dispatch({ type: 'UPDATE_NOTE_BODY' })
          update()
        }}
        modules={EditorComponent.modules}
        formats={EditorComponent.formats}
      />
    </div>
  )
}

EditorComponent.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
  }
}

EditorComponent.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]

export default withStyles(styles)(EditorComponent)

// class EditorComponent extends React.Component {
//   constructor() {
//     super()
//     this.state = { text: '', title: '', id: '' }
//   }

//   updateBody = async value => {
//     await this.setState({ text: value })
//     this.update()
//   }

//   updateTitle = async text => {
//     await this.setState({ title: text })
//     this.update()
//   }

//   update = debounce(() => {
//     this.props.noteUpdate(this.state.id, {
//       title: this.state.title,
//       body: this.state.text
//     })
//   }, 1500)

//   componentDidMount() {
//     this.setState({
//       text: this.props.selectedNote.body,
//       title: this.props.selectedNote.title,
//       id: this.props.selectedNote.id
//     })
//   }

//   componentDidUpdate() {
//     if (this.props.selectedNote.id !== this.state.id) {
//       this.setState({
//         text: this.props.selectedNote.body,
//         title: this.props.selectedNote.title,
//         id: this.props.selectedNote.id
//       })
//     }
//   }

//   render() {
//     const { classes } = this.props
//     return (
//       <div className={classes.editorContainer}>
//         <BorderColorIcon className={classes.editIcon} />
//         <input
//           className={classes.titleInput}
//           placeholder='Note title...'
//           value={this.state.title ? this.state.title : ''}
//           onChange={e => this.updateTitle(e.target.value)}
//         />
//         <ReactQuill
//           value={this.state.text}
//           onChange={this.updateBody}
//           modules={EditorComponent.modules}
//           formats={EditorComponent.formats}
//         />
//       </div>
//     )
//   }
// }

// EditorComponent.modules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ size: [] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [
//       { list: 'ordered' },
//       { list: 'bullet' },
//       { indent: '-1' },
//       { indent: '+1' }
//     ],
//     ['link', 'image', 'video'],
//     ['clean']
//   ],
//   clipboard: {
//     matchVisual: false
//   }
// }

// EditorComponent.formats = [
//   'header',
//   'font',
//   'size',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'list',
//   'bullet',
//   'indent',
//   'link',
//   'image',
//   'video'
// ]

// export default withStyles(styles)(EditorComponent)
