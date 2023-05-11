import { useSelector } from 'react-redux';

export function useProfile() {
  console.log("UseProfile");
  const profile = useSelector((state) => state.profile);

  return {...profile, isFilledProfile: !!profile.name};
}
