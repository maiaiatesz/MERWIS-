export const doctorMock = {
  fname: 'Mock',
  lname: 'Strange',
  pref: 'dr.',
  rank: 'doctor',
  birthday: '1900.01.30.',
  birthplace: 'Gotham city',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYm-KcyvHy3PDkmh0V9KzkUk26255h0RwthshiaoanTnfH2B_IRg',
  address: '1092 Valamilyen utca 49. 1.em/99.',
  phone: '+3690 909 0900',
  mail: 'balaysavko@example.ru',
  usedTags: ['viszket', 'vérzik', 'hólyagos', 'gyulladt', 'vörös', 'nőtt'],
  prefLang: 'hu'
}
export const userMock = {
  name: 'Strange',
  email: 'strange@doctor.com',
  address: '9999 Gotham, Noway 42. 6/42',
  phone: '+36 99 2648042'
}

export const patientsMock = [
  {
    id: 0,
    avatar: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/ID/en/999/UP1018-CUSA00133_00-ASIA000000000042/1543458368000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000',
    fname: 'Batman',
    lname: 'Only',
    birthday: '1939.05.01',
    birthplace: 'Gotham city',
    address: '1092 Valamilyen utca 49. 1.em/99.',
    phone: '+3690 909 0900',
    mail: 'balaysavko@example.ru',
    freqmed: 'Xanax',
    othernote: 'Depression, dead parents, weed, coco ... ',
    lastvisit: '2018.10.12',
    lastsamples: '2018.10.12',
    collections: [0],
    panoramas: [1],
    snapshots: [0]
  }, {
    id: 1,
    avatar: 'https://lrmonline.com/file/2018/08/alfred_michealcaine.jpg',
    fname: 'Pennyworth',
    lname: 'Alfred',
    birthday: '1939.05.01',
    birthplace: 'Somewhere in England',
    address: '1092 That street 49. 1./99.',
    phone: '+3690 909 0900',
    mail: 'joraylenhe@example.ru',
    freqmed: 'Algfoflex, Cataflan',
    othernote: 'Doing assassination, housing jobs ...',
    lastvisit: '2018.08.12',
    lastsamples: '2018.10.20',
    collections: [1],
    panoramas: [0],
    snapshots: [1, 2, 3, 4]
  }
]

export const collectionsMock = [{
  id: 0,
  name: 'Point on my left hand',
  place: '0',
  desc: 'Looks bad, need more check',
  category: '0',
  archived: false,
  notificationLevel: '1',
  latestPhoto: 'https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg',
  lastUpdated: '2018, 10, 31',
  photos: [{
    date: '2018, 05, 23',
    photos: [{
      url: 'https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg',
      id: 1
    }, {
      url: 'https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg',
      id: 2
    }, {
      url: 'https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg',
      id: 3
    }],
    tags: ['viszket', 'vörös', 'gennyes'],
    status: '0',
    // TODO: need an english tag-set
    id: 1
  }, {
    date: '2018, 10, 31',
    photos: [{
      url: 'https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg',
      id: 1
    }, {
      url: 'https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg',
      id: 2
    }],
    tags: ['viszket', 'vérzik'],
    status: 3,
    // TODO: need an english tag-set
    id: 0
  }]
}, {
  id: 1,
  name: 'Big black on arm',
  place: '0',
  desc: 'No problem here',
  category: '1',
  archived: false,
  notificationLevel: '1',
  latestPhoto: 'https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg',
  lastUpdated: '2018, 10, 31',
  photos: [{
    date: '2018, 05, 23',
    photos: [{
      url: 'https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg',
      id: 1
    }, {
      url: 'https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg',
      id: 2
    }, {
      url: 'https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg',
      id: 3
    }],
    tags: ['viszket', 'vörös', 'gennyes'],
    status: 0,
    id: 1
  }, {
    date: '2018, 10, 31',
    photos: [{
      url: 'https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg',
      id: 1
    }, {
      url: 'https://www.babycenter.com/ims/2015/03/505x273x80402118_wide.jpg.pagespeed.ic.o2s0BqMIoC.jpg',
      id: 2
    }],
    tags: ['viszket', 'vérzik'],
    status: 3,
    id: 0
  }]
}]

export const panoramasMock = [{
  id: 0,
  pics: ['http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340'],
  date: '2019,01,01',
  time: '15:05',
  notes: '-> recskab.in <-',
  docId: 0
}, {
  id: 1,
  pics: ['http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340', 'http://placehold.it/400x340'],
  date: '2019,01,03',
  time: '16:30',
  notes: 'Not bad, look like a topmodel!',
  docId: 0
}]

export const snapshotsMock = [{
  id: 0,
  url: 'http://placehold.it/400x340',
  date: '2019,01,10',
  time: '18:27',
  comments: 'okkay',
  tags: 'viszketős szőrös',
  camNum: 3,
  docId: 0
}, {
  id: 1,
  url: 'http://placehold.it/400x340',
  date: '2019,01,10',
  time: '18:27',
  comments: 'vrum vrum',
  tags: 'normal melanoma',
  camNum: 2,
  docId: 0
}, {
  id: 2,
  url: 'http://placehold.it/400x340',
  date: '2019,01,10',
  time: '18:27',
  comments: 'shake that *** for me',
  tags: 'normal melanoma',
  camNum: 2,
  docId: 0
}, {
  id: 3,
  url: 'http://placehold.it/400x340',
  date: '2019,01,10',
  time: '18:27',
  comments: 'shake that *** for me',
  tags: 'normal melanoma',
  camNum: 2,
  docId: 0
}, {
  id: 4,
  url: 'http://placehold.it/400x340',
  date: '2019,01,10',
  time: '18:27',
  comments: 'shake that *** for me',
  tags: 'some tag',
  camNum: 2,
  docId: 0
}]

export const tagsMock = ['viszket', 'vérzik', 'hólyagos', 'gyulladt', 'vörös', 'nőtt']

// TODO change name to id, add doctors
export const messagesMock = [{
  text: `  Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Nam sed vulputate quam. Sed eget tincidunt leo.
  Cras euismod condimentum felis, id semper tellus
  scelerisque vel. Vestibulum quis dui eu felis gravida
  pellentesque sit amet vitae diam. Sed dapibus
  tristique libero vitae interdum. Cras et sem quis risus
  iaculis feugiat eget non erat. Ut dignissim metus sed
  dui molestie rhoncus.

  Dr Stephen Stramge`,
  title: 'Penguin just shot me',
  attachments: [{
    img: 'http://via.placeholder.com/200x300',
    id: 1
  }, {
    img: 'http://via.placeholder.com/200x300',
    id: 2
  }, {
    img: 'http://via.placeholder.com/200x300',
    id: 3
  }, {
    img: 'http://via.placeholder.com/200x300',
    id: 4
  }, {
    img: 'http://via.placeholder.com/200x300',
    id: 5
  }],
  unread: true,
  from: {
    name: 'Batman',
    email: 'batman@batcave.com',
    img: 'https://randomuser.me/api/portraits/med/men/82.jpg'
  },
  id: 0,
  date: '2018.02.05'
}, {
  text: 'Some other message',
  title: 'Bruce hit me. Again.',
  attachments: [],
  unread: false,
  from: {
    name: 'Alfred Pennywoth',
    email: 'alfred@waynecorp.com',
    img: 'https://randomuser.me/api/portraits/med/men/82.jpg'
  },
  id: 1,
  date: '2018.02.05'
}, {
  text: 'Some other message',
  title: 'I want an appointment',
  attachments: [],
  unread: true,
  from: {
    name: 'Bruce Wayne',
    email: 'bruce@waynecorp.com',
    img: 'https://randomuser.me/api/portraits/med/men/82.jpg'
  },
  id: 2,
  date: '2018.02.05'
}]
export const systemMsgMock = [{
  id: 0,
  icon: '',
  title: 'System shutdown',
  text: 'fáWPEOGJWLRGHÉLGKHSDDSAFadf',
  dateFrom: '2019.02.15',
  dateTo: '2019.02.20',
  seen: false
}, {
  id: 2,
  icon: '',
  title: 'System restart',
  text: 'fáWPEOGJWLRGHÉLGKHSDDSAFadf',
  dateFrom: '2019.02.12',
  dateTo: '2019.02.18',
  seen: false
}]
export const sentMessagesMock = [{
  text: 'Some other message',
  title: 'I sent you something',
  attachments: [],
  // unread: true,
  to: {
    name: 'Alfred',
    email: 'alfred@waynecorp.com',
    img: 'https://randomuser.me/api/portraits/med/men/82.jpg'
  },
  id: 0,
  date: '2018.02.05'
}, {
  text: 'Definately not a message',
  title: 'Cow level is a lie.',
  attachments: [{
    img: 'http://download.gamezone.com/uploads/image/data/1211676/diablo_cow_level.jpg',
    id: 0
  }],
  // unread: true,
  to: {
    name: 'Bruce Wayne',
    email: 'bruce@waynecorp.com',
    img: 'https://randomuser.me/api/portraits/med/men/82.jpg'
  },
  id: 1,
  date: '2018.02.05'
}]
