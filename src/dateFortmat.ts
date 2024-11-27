import dayjs from "dayjs";

export const dateFortmat = (date: Date): string => {
  return dayjs(date).format("YYYY年MM月DD日 HH:mm");
};
