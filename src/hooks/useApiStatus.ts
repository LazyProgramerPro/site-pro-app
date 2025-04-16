import { useMemo, useState } from "react";
import { defaultApiStatuses, IDLE } from "../constants/api-status";

const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

type ApiStatus = (typeof defaultApiStatuses)[number];
type ApiStatusesObject = {
  [key: string]: boolean;
};

const prepareStatuses = (currentStatus: ApiStatus): ApiStatusesObject => {
  const statuses: ApiStatusesObject = {};
  for (const status of defaultApiStatuses) {
    const normalisedStatus = capitalize(status.toLowerCase());
    const normalisedStatusKey = `is${normalisedStatus}`;
    statuses[normalisedStatusKey] = status === currentStatus;
  }
  return statuses;
};

export const useApiStatus = (currentStatus = IDLE) => {
  const [status, setStatus] = useState(currentStatus);
  const statuses = useMemo(() => prepareStatuses(status), [status]);

  return {
    status,
    setStatus,
    ...statuses,
  };
};

// Example usage of useApi

// const useFetchUsers = () => {
//   const {
//     data: users,
//     exec: initFetchUsers,
//     status: fetchUsersStatus,
//     isIdle: isFetchUsersStatusIdle,
//     isPending: isFetchUsersStatusPending,
//     isError: isFetchUsersStatusError,
//     isSuccess: isFetchUsersStatusSuccess,
//   } = useApi(() => fetchUser().then((response) => response.data));
//   return {
//     users,
//     fetchUsersStatus,
//     initFetchUsers,
//     isFetchUsersStatusIdle,
//     isFetchUsersStatusPending,
//     isFetchUsersStatusError,
//     isFetchUsersStatusSuccess,
//   };
// };

// const {
//   users,
//   initFetchUsers,
//   isFetchUsersStatusIdle,
//   isFetchUsersStatusPending,
//   isFetchUsersStatusError,
//   isFetchUsersStatusSuccess,
// } = useFetchUsers();

// useEffect(() => {
//   initFetchUsers();
// }, []);
