import expeditedShippingIcon from '@assets/images/expedited-shipping.png';
import fullTruckloadIcon from '@assets/images/full-truckload.png';
import lessThanTruckloadIcon from '@assets/images/less-than-truckload.png';
import refrigeratedFreightIcon from '@assets/images/refrigerated-freight.png';

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'full-truckload',
    title: 'Full Truckload (FTL)',
    description: 'For high-volume, direct deliveries',
    iconSrc: fullTruckloadIcon,
  },
  {
    id: 'less-than-truckload',
    title: 'Less-Than-Truckload (LTL)',
    description: 'Cost-efficient for smaller shipments.',
    iconSrc: lessThanTruckloadIcon,
  },
  {
    id: 'refrigerated-freight',
    title: 'Refrigerated Freight',
    description: 'Keep it fresh, safe, and on time.',
    iconSrc: refrigeratedFreightIcon,
  },
  {
    id: 'expedited-shipping',
    title: 'Expedited Shipping',
    description: 'When every hour matters.',
    iconSrc: expeditedShippingIcon,
  },
];

/** Matches `$size-services-icon` in `variables.scss` (13.5rem @ 4px/rem → 54px). */
export const SERVICES_ICON_SIZE_PX = 54 as const;
