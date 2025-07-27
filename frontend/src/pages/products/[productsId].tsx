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

import { update, fetch } from '../../stores/products/productsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditProducts = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'name': '',

    description: '',

    'price': '',

    category: '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { products } = useAppSelector((state) => state.products)

  const { productsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: productsId }))
  }, [productsId])

  useEffect(() => {
    if (typeof products === 'object') {
      setInitialValues(products)
    }
  }, [products])

  useEffect(() => {
      if (typeof products === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (products)[el])

          setInitialValues(newInitialVal);
      }
  }, [products])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: productsId, data }))
    await router.push('/products/products-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit products')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit products'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField
        label="ProductName"
    >
        <Field
            name="name"
            placeholder="ProductName"
        />
    </FormField>

    <FormField label='Description' hasTextareaHeight>
        <Field
            name='description'
            id='description'
            component={RichTextField}
        ></Field>
    </FormField>

    <FormField
        label="Price"
    >
        <Field
            type="number"
            name="price"
            placeholder="Price"
        />
    </FormField>

    <FormField label="Category" labelFor="category">
        <Field name="category" id="category" component="select">

            <option value="Electronics">Electronics</option>

            <option value="Clothing">Clothing</option>

            <option value="Books">Books</option>

            <option value="Home">Home</option>

        </Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/products/products-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditProducts.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditProducts
