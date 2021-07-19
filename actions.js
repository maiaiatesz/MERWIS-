import { patientsMock, collectionsMock, panoramasMock, snapshotsMock } from 'src/mocks'

export function fetchPatients ({ commit }) {
  const patients = patientsMock
  commit('setPatients', patients)
}
export function fetchCollections ({ commit }) {
  const collections = collectionsMock
  commit('setCollections', collections)
}
export function fetchPanoramas ({ commit }) {
  const panoramas = panoramasMock
  commit('setPanorama', panoramas)
}
export function fetchSnapshots ({ commit }) {
  const snapshots = snapshotsMock
  commit('setSnapshots', snapshots)
}
// export function fetchTags ({ commit }) {
//   const tags = tagsMock
//   commit('setTags', tags)
// }
// export function fetchMessages ({ commit }) {
//   const messages = messagesMock
//   commit('setMessages', messages)
// }
// export function fetchSysMessages ({ commit }) {
//   const sysMessages = systemMsgMock
//   commit('setSystemMsg', sysMessages)
// }
// export function pushCollection ({ commit }) {
//   commit('newCollection', collection)
// }
