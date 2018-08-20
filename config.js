const devConfig = {
  FireBase: {
    apiKey: "AIzaSyCLL5ZFtg4Y3_ORIHtOepa22AHoGYukIw4",
    authDomain: "gusec-incubator-project.firebaseapp.com",
    databaseURL: "https://gusec-incubator-project.firebaseio.com",
    projectId: "gusec-incubator-project",
    storageBucket: "gusec-incubator-project.appspot.com",
    messagingSenderId: "990443185412"
  },
  apiGateway: {
    URL: 'http://localhost:4000'
  },
}

const prodConfig = {
  FireBase: {
    apiKey: "AIzaSyCLL5ZFtg4Y3_ORIHtOepa22AHoGYukIw4",
    authDomain: "gusec-incubator-project.firebaseapp.com",
    databaseURL: "https://gusec-incubator-project.firebaseio.com",
    projectId: "gusec-incubator-project",
    storageBucket: "gusec-incubator-project.appspot.com",
    messagingSenderId: "990443185412"
  },
  apiGateway: {
    URL: 'http://localhost:4000'
  },
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

export default config
