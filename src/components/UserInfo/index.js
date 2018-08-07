import React from 'react'
import { connect } from 'react-redux'
import { userSignOut } from 'actions/Auth'
import IntlMessages from 'util/IntlMessages'

class UserInfo extends React.Component {
  render() {
    return (
      <div>
        <div className='user-profile'>
          <img className='user-avatar border-0 size-40' src={this.props.authUser.picture || 'http://via.placeholder.com/150x150'} alt='User' />
          <div className='user-detail ml-2'>
            <h4 className='user-name mb-0'>{this.props.authUser.displayName}</h4>
            {/* <small>Administrator</small> */}
          </div>
        </div>
        <a className='dropdown-item text-muted' href='javascript:void(0)'>
          <i className='zmdi zmdi-face zmdi-hc-fw mr-1' />
          <IntlMessages id='popup.profile' />
        </a>
        <a className='dropdown-item text-muted' href='javascript:void(0)'>
          <i className='zmdi zmdi-settings zmdi-hc-fw mr-1' />
          <IntlMessages id='popup.setting' />
        </a>
        <a className='dropdown-item text-muted' href='javascript:void(0)'
          onClick={() => {
            console.log('Try to logout')
            this.props.userSignOut()
          }}
        >
          <i className='zmdi zmdi-sign-in zmdi-hc-fw mr-1' />
          <IntlMessages id='popup.logout' />
        </a>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth
  return { authUser }
}

export default connect(
  mapStateToProps,
  { userSignOut }
)(UserInfo)
