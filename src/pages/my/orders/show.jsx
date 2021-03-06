import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import FormsConfirmCheckout from '@/forms/confirm-checkout'
import FormsPayment from '@/forms/payment'
import CompsPaymentSide from '@/components/PaymentSide'

import { payMyOrder } from '@/actions/my/orders/pay'
import { getMyOrdersShow } from '@/actions/my/orders/show'
import orderIndex from '@/reducers/my/orders/order-index'

const MyOrdersShow = ({ orderStatus: { orderDetails }, currentUser, match, ...props }) => {
  useEffect(() => {
    props.getMyOrdersShow(match.params.id)
  }, [])

  const handlePayNow = (values, methods) => {
    const { history: { push } } = props
    props.payMyOrder(values).then(() => {
      push('/my/orders/')
    }).catch(() => {
      methods.setSubmitting(false)
      toast.error('Error to pay, please try again', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined
      })
    })
  }

  if (!orderDetails) return <div>No Such Order</div>

  if (orderDetails.status === 'Pending-Payment') {
    return (
      <div id="pages-orders-show" className="container my-3">
        <header className="text-center border-bottom">
          <h1>PAYMENT</h1>
        </header>
        <div className="row">
          <div className="col-12 col-lg-6">
            <FormsConfirmCheckout
              initialValues={orderDetails || {}}
              onSubmit={handlePayNow}
            />
          </div>
          <div className="col-12 col-lg-6">
            <CompsPaymentSide />
          </div>
        </div>
      </div>

    )
  }

  if (orderDetails.status === 'Pending-Delivery' || orderDetails.status === 'Delivered' || orderDetails.status === 'Cancelled-Order') {
    return (
      <div id="pages-orders-show" className="container my-3">
        <header className="text-center border-bottom">
          <h1>ORDER {orderDetails.id}</h1>
        </header>
        <div className="row">
          <div className="col-12 col-lg-6">
            <FormsPayment
              initialValues={orderDetails || {}}
              onSubmit="disabled"
            />
          </div>
          <div className="col-12 col-lg-6">
            <CompsPaymentSide />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="pages-orders-show" className="container my-3">should never see this section</div>
  )
}

MyOrdersShow.propTypes = {
  currentUser: PropTypes.shape().isRequired,
  payMyOrder: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  orderStatus: PropTypes.shape().isRequired,
  getMyOrdersShow: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.currentUser,
  orderStatus: state.orderShow
})

const mapDispatchToProps = {
  payMyOrder,
  getMyOrdersShow
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrdersShow)
