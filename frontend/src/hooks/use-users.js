import { useSelector } from 'react-redux';

export function useUsers() {
  const users = useSelector((state) => state.users);

  /*const isFilledProfile = () => {
    for (let [_, value] of Object.entries(profile)) {
      if (value === null) return false;
    }
    return true;
  };*/

  return { ...users };//, isFilledProfile];
}
