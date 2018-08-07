const devConfig = {
  FireBase: {
    apiKey: 'AIzaSyA-ZiCPD1pMkM5_7gqs_M03Ql3P-yzZiQU',
    authDomain: 'gusec-incubator-sandbox.firebaseapp.com',
    databaseURL: 'https://gusec-incubator-sandbox.firebaseio.com',
    projectId: 'gusec-incubator-sandbox',
    storageBucket: 'gusec-incubator-sandbox.appspot.com',
    messagingSenderId: '940339804600'
  },
  apiGateway: {
    URL: 'http://localhost:4000'
  },
}

const prodConfig = {
  FireBase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  }
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

export default config
