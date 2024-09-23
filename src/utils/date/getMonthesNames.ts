import { createDate } from './createDate';

export const getMonthesNames = (locale: string = 'defalut') => {
  const monthesNames: string[] = Array.from({ length: 12 });

  const d = new Date();

  monthesNames.forEach((_, i) => {
    const { month, monthIndex, monthShort, date } = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + i, 1)
    });

    monthesNames[monthIndex] =  month;
  });

  return monthesNames;
};
