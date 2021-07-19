export function setPatients (state, patients) {
  state.patients = patients
}
export function setCollections (state, collections) {
  state.collections = collections
}
export function setPanorama (state, panoramas) {
  state.panoramas = panoramas
}
export function setSnapshots (state, snapshots) {
  state.snapshots = snapshots
}
// export function setTags (state, tags) {
//   state.tags = tags
// }
// export function setMessages (state, messages) {
//   state.messages = messages
// }
// export function setSystemMsg (state, sysMessages) {
//   state.systemMsg = sysMessages
// }
export function newCollection (state, data) {
  let patientToPush = state.patients.find((patient) => patient.id === Number(data.userid))
  const damnuser = state.patients.indexOf(patientToPush)
  console.log('Damn wtf: ', data.album[0], data.userid, damnuser)
  state.collections.push(data.album[0])
  state.patients[damnuser].collections.push(data.album[0].id)
  console.log(state.patients[damnuser].collections)
}
export function pushPanorama (state, data) {
  state.panoramas.push(data.album)
  let patientToPush = state.patients.find((patient) => patient.id === Number(data.userid))
  const damnuser = state.patients.indexOf(patientToPush)
  state.patients[damnuser].panoramas.push(data.id)
}
export function pushSnapshot (state, data) {
  state.snapshots.push(data.album)
  let patientToPush = state.patients.find((patient) => patient.id === Number(data.userid))
  const damnuser = state.patients.indexOf(patientToPush)
  state.patients[damnuser].snapshots.push(data.id)
}
export function editPatDetails (state, data) {
  let patientToPush = state.patients.find((patient) => patient.id === Number(data.userid))
  const damnuser = state.patients.indexOf(patientToPush)
  state.patients[damnuser] = data.things
}
