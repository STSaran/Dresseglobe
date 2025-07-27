import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/orders/ordersSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditOrders = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    buyer: null,

    'total_amount': '',

    status: '',

    order_date: new Date(),

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { orders } = useAppSelector((state) => state.orders)

  const { ordersId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: ordersId }))
  }, [ordersId])

  useEffect(() => {
    if (typeof orders === 'object') {
      setInitialValues(orders)
    }
  }, [orders])

  useEffect(() => {
      if (typeof orders === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (orders)[el])

          setInitialValues(newInitialVal);
      }
  }, [orders])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: ordersId, data }))
    await router.push('/orders/orders-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit orders')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit orders'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField label='Buyer' labelFor='buyer'>
        <Field
            name='buyer'
            id='buyer'
            component={SelectField}
            options={initialValues.buyer}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

    <FormField
        label="TotalAmount"
    >
        <Field
            type="number"
            name="total_amount"
            placeholder="TotalAmount"
        />
    </FormField>

    <FormField label="OrderStatus" labelFor="status">
        <Field name="status" id="status" component="select">

            <option value="Pending">Pending</option>

            <option value="Shipped">Shipped</option>

            <option value="Delivered">Delivered</option>

            <option value="Cancelled">Cancelled</option>

        </Field>
    </FormField>

      <FormField
          label="OrderDate"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.order_date ?
                  new Date(
                      dayjs(initialValues.order_date).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'order_date': date})}
          />
      </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/orders/orders-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditOrders.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditOrders
