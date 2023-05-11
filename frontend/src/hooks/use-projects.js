import { useSelector } from 'react-redux';

export function useProjects() {
  console.log("UseProjects");
  const projects = useSelector((state) => state.projects);

  /*const isFilledProfile = () => {
    for (let [_, value] of Object.entries(profile)) {
      if (value === null) return false;
    }
    return true;
  };*/

  return { ...projects };//, isFilledProfile];
}
