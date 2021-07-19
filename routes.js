const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MyLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') }
  //   ]
  // },
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/patients',
    component: () => import('layouts/DashLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PatientList.vue') }
    ]
  },
  {
    path: '/new-patient',
    component: () => import('layouts/DashLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AddPatient.vue') }
    ]
  },
  {
    path: '/details/:userId',
    component: () => import('layouts/DashLayout.vue'),
    children: [
      { path: '', name: 'Details', component: () => import('pages/PatientDetails.vue') },
      { path: '/details/:userId/snapshots', name: 'Snaps', component: () => import('pages/Snaps.vue') },
      { path: '/details/:userId/panoramas', name: 'Panos', component: () => import('pages/Panoramas.vue') },
      { path: '/details/:userId/:albumId', name: 'AlbumDetails', component: () => import('pages/Album.vue') },
      { path: '/details/:userId/cabin', name: 'NewPano', component: () => import('pages/Cabin.vue') }
    ]
  },
  {
    path: '/cabin',
    component: () => import('layouts/DashLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Cabin.vue') }
    ]
  },
  {
    path: '/messaging',
    component: () => import('layouts/DashLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Messaging.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
