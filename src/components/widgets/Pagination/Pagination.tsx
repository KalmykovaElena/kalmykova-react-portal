import styles from './Pagination.module.scss'
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { MoviesActions } from 'src/redux/reducers/moviesSlice';
import { Button } from 'src/components/common/Button/Button';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

interface PaginationProps {
 
}
export const Pagination: FC<PaginationProps> = () => {
  const dispatch = useAppDispatch();
  const {page, renderData} = useAppSelector(({ movies }) => movies);
  const { t } = useTranslation();
  const handleNextPage = () => {
    dispatch(MoviesActions.setPage(page + 1));
  };

  const handlePrevPage = () => {
    dispatch(MoviesActions.setPage(Math.max(page - 1, 1)));
  };
  return (
    <div className={styles.pagination}>
      <Button
        variant="secondary"
        onClick={handlePrevPage}
        disabled={page === 1}
      >
        {'<<'}
      </Button>
      <span>{`${t('Страница')}: ${page}`}</span>
      <Button
        variant="secondary"
        onClick={handleNextPage}
        disabled={page === renderData?.pagesCount}
      >
        {'>>'}
      </Button>
    </div>
  );
};