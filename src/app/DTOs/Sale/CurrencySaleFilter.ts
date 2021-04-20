import { CurrencySaleDto } from "./CurrencySaleDto";
import { ICurrencySaleFilter } from './ICurrencySaleFilter';
import { FilterGenericDto } from '../FilterGeneric/FilterGenericDto';
export class CurrencySaleFilter extends FilterGenericDto<CurrencySaleDto> implements ICurrencySaleFilter {
    brokerId: number;
    customerId: number;
    isCashed: boolean;
    isAccount: boolean;
    // isProfitAmount: boolean;
    // isLossAmount: boolean;
    fromDateSale: string;
    toDateSale: string;
    fromSaleBasePrice: number;
    toSaleBasePrice: number;
    isCurrencyTypeCurrency:boolean;
    isCurrencyTypeBroker:boolean;
    isCurrencyTypeMissCustomer:boolean;
    isCurrencyTypeCommCustomer:boolean ;
}
