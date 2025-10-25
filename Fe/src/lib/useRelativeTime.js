import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("id");

export function useRelativeTime() {
  const formatTime = (utcTime) => {
    const now = dayjs();
    const postTime = dayjs.utc(utcTime).local();

    if (now.diff(postTime, "day") > 30) {
      return postTime.format("D MMMM YYYY");
    }

    return postTime.fromNow();
  };

  return { formatTime };
}
