import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

const PrivateRoute = ({ component: Component, currentUserState: { currentUser }, ...rest }) => {
  if (!currentUser) {
    toast.error('Please Login First!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

  return (
    <>
      <Route
        {...rest}
        render={(props) => (
          currentUser ? <Component {...props} /> : <Redirect to="/" />
        )}
      />
    </>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape()
  ]).isRequired,
  currentUserState: PropTypes.shape().isRequired
}

const mapStateToProps = (state) => ({
  currentUserState: state.currentUser
})

export default connect(mapStateToProps)(PrivateRoute)
