export function getPatients (state) {
  return state.patients
}
// export function getTags (state) {
//   return state.tags
// }
// export function getMessages (state) {
//   return state.messages
// }
// export function getMessagesByReadType (state) {
//   return unreadOnly => state.messages.filter(message => !unreadOnly || message.unread)
// }
// export function getUnreadMessageCount (state) {
//   const unreadMessages = state.messages.filter(message => message.unread)
//   return unreadMessages.length
// }
// export function getSysMessages (state) {
//   return state.systemMsg
// }
// export function getPatDetails (state, userid) {
//   console.log('getPat !!!', state, 'id: ', userid)
//   return patDetails => state.patients.find(patient => patient.id === userid)
// }
export function getPatDetails (state) {
  return (userid) => {
    return state.patients.find((patient) => patient.id === Number(userid))
  }
}

// returning albums by id - one per req
export function getPatCollections (state) {
  return (collectionid) => {
    return state.collections.find((collection) => collection.id === Number(collectionid))
  }
}
export function getPatPanoramas (state) {
  return (collectionid) => {
    return state.panoramas.find((collection) => collection.id === Number(collectionid))
  }
}
export function getPatSnapshots (state) {
  return (collectionid) => {
    return state.snapshots.find((collection) => collection.id === Number(collectionid))
  }
}
export function getHighestPat (state) {
  return Math.max(...state.patients.map(coll => coll.id))
}
export function getHighestColl (state) {
  return Math.max(...state.collections.map(patient => patient.id))
}
export function getHighestPano (state) {
  return Math.max(...state.panoramas.map(pano => pano.id))
}
export function getHighestSnaps (state) {
  return Math.max(...state.snapshots.map(snap => snap.id))
}
