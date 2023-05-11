import { useSelector } from 'react-redux';

export function usePortfolio() {
  console.log("UsePortfolio");
  const portfolio = useSelector((state) => state.portfolio);

  return {...portfolio};
}
