import React from 'react';
import CardBox from '../CardBox';
import dataFormatter from '../../helpers/dataFormatter';
import ListActionsPopover from "../ListActionsPopover";
import {useAppSelector} from "../../stores/hooks";
import {Pagination} from "../Pagination";
import LoadingSpinner from "../LoadingSpinner";
import Link from 'next/link';

type Props = {
    orders: any[];
    loading: boolean;
    onDelete: (id: string) => void;
    currentPage: number;
    numPages: number;
    onPageChange: (page: number) => void;
};

const ListOrders = ({ orders, loading, onDelete, currentPage, numPages, onPageChange }: Props) => {
    const corners = useAppSelector((state) => state.style.corners);
    const bgColor = useAppSelector((state) => state.style.cardsColor);

    return (
        <>
            <div className='relative overflow-x-auto p-4 space-y-4'>
                {loading && <LoadingSpinner />}
                {!loading && orders.map((item) => (
                  <div key={item.id}>
                    <CardBox hasTable isList className={'rounded shadow-none'}>
                        <div className={`flex rounded dark:bg-dark-900 border items-center overflow-hidden`}>
                          <Link
                              href={`/orders/orders-view/?id=${item.id}`}
                              className={
                                  'flex-1 px-4 py-6 h-24 flex divide-x-2 divide-stone-300 items-center overflow-hidden dark:divide-dark-700 overflow-x-auto'
                              }
                          >

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>Buyer</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.usersOneListFormatter(item.buyer) }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>Products</p>
                                <p className={'line-clamp-2'}>{ item.products }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>TotalAmount</p>
                                <p className={'line-clamp-2'}>{ item.total_amount }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>OrderStatus</p>
                                <p className={'line-clamp-2'}>{ item.status }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>OrderDate</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.dateTimeFormatter(item.order_date) }</p>
                            </div>

                          </Link>
                            <ListActionsPopover
                              onDelete={onDelete}
                              itemId={item.id}
                              pathEdit={`/orders/orders-edit/?id=${item.id}`}
                              pathView={`/orders/orders-view/?id=${item.id}`}
                              hasUpdatePermission={true}
                            />
                        </div>
                    </CardBox>
                  </div>
                ))}
                {!loading && orders.length === 0 && (
                  <div className='col-span-full flex items-center justify-center h-40'>
                      <p className=''>No data to display</p>
                  </div>
                )}
            </div>
            <div className={'flex items-center justify-center my-6'}>
                <Pagination
                  currentPage={currentPage}
                  numPages={numPages}
                  setCurrentPage={onPageChange}
                />
            </div>
        </>
    )
};

export default ListOrders
