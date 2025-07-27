import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/orders/ordersSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const OrdersView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { orders } = useAppSelector((state) => state.orders)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View orders')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View orders')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/orders/orders-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Buyer</p>

                        <p>{orders?.buyer?.firstName ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>TotalAmount</p>
                  <p>{orders?.total_amount || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>OrderStatus</p>
                    <p>{orders?.status ?? 'No data'}</p>
                </div>

                <FormField label='OrderDate'>
                    {orders.order_date ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={orders.order_date ?
                        new Date(
                          dayjs(orders.order_date).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No OrderDate</p>}
                </FormField>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/orders/orders-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

OrdersView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default OrdersView;
