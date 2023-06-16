import { useSelector } from 'react-redux';

export function useFavouriteProjects() {
  const favouriteProjects = useSelector((state) => state.favouriteProjects);

  /*const isFilledProfile = () => {
    for (let [_, value] of Object.entries(profile)) {
      if (value === null) return false;
    }
    return true;
  };*/

  return { ...favouriteProjects };//, isFilledProfile];
}
