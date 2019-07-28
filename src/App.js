import React from 'react'
import firebase from './Config/fbConfig'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = { selectedNoteIndex: null, selectedNote: null, notes: null }
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data()
          data['id'] = _doc.id
          return data
        })
        console.log(notes)
        this.setState({ notes })
      })
  }

  render() {
    return (
      <div>
        <h1>app</h1>
      </div>
    )
  }
}
