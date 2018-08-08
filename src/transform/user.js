export const fireBaseGoogleToDBUserModel = (signUpUser) => {
  return {
    displayName: signUpUser.user.displayName,
    givenName: signUpUser.additionalUserInfo.profile.given_name,
    familyName: signUpUser.additionalUserInfo.profile.family_name,
    gender: signUpUser.additionalUserInfo.profile.gender,
    email: signUpUser.additionalUserInfo.profile.email,
    picture: signUpUser.additionalUserInfo.profile.picture,
    social: {
      google: {
        uid: signUpUser.user.uid,
      },
    }
  }
}

export const fireBasePasswordToDBUserModel = (response, signInUser) => {
  return {
    displayName: response.data.displayName,
    email: signInUser.user.email,
    picture: response.data.picture,
    social: {
      password: {
        uid: signInUser.user.uid,
      },
    }
  }
}
