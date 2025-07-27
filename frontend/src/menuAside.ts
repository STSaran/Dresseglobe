import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/orders/orders-list',
    label: 'Orders',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiPackageVariantClosed' in icon ? icon['mdiPackageVariantClosed' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ORDERS'
  },
  {
    href: '/products/products-list',
    label: 'Products',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCart' in icon ? icon['mdiCart' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_PRODUCTS'
  },
  {
    href: '/reviews/reviews-list',
    label: 'Reviews',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiStar' in icon ? icon['mdiStar' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_REVIEWS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
