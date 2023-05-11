import { useSelector } from 'react-redux';

export function useProject() {
  console.log("UseProject");
  const project = useSelector((state) => state.project);

  /*const isFilledProfile = () => {
    for (let [_, value] of Object.entries(profile)) {
      if (value === null) return false;
    }
    return true;
  };*/

  return [{ ...project }];//, isFilledProfile];
}
