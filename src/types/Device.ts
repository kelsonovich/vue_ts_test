import DeviceParams from "@/types/DeviceParams";

export default interface Device {
    id: number;
    name: string;
    isActual: boolean;
    priceNoVat: number;
    endDate: number;
    price: number;
    vat: number;
    fillEndDate: number;
    params?: DeviceParams;
}