import { getCats, getAccessories } from '@/apis';
import { Cat, Acc } from '@/type';
import { UseQueryOptions } from '@tanstack/react-query';

const getCat: UseQueryOptions<Cat[]> = {
    queryKey: ['common', 'cats'],
    queryFn: getCats,
};

const getAcc: UseQueryOptions<Acc[]> = {
    queryKey: ['common', 'accessories'],
    queryFn: getAccessories,
};

const CommonQuery = {
    getCat,
    getAcc,
};

export default CommonQuery;
