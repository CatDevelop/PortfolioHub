import { useSelector } from 'react-redux';

export function useProject() {
  console.log("UseProject");
  const project = useSelector((state) => state.project);

  return { ...project };
}
