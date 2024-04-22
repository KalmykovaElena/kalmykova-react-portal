import React, { useEffect } from 'react';
import {
  useGetGanresQuery,
  useGetMoviesQuery,
  useSearchMoviesByGanreQuery,
  useSearchMoviesQuery,
} from 'src/redux/reducers/moviesApi';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { MoviesActions } from 'src/redux/reducers/moviesSlice';
import { Loader } from 'src/components/common/Loader/Loader';
import styles from './MainPage.module.scss';
import { MovieListContainer } from 'src/components/widgets/MovieListContainer/MovieListContainer';
import { convertGenres } from 'src/utils/convertGenres';
import { useTranslation } from 'react-i18next';
import { handleErrorMessage } from 'src/utils/rtqHelpers';

export const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { page, renderData, searchTerm, searchGanre } = useAppSelector(
    ({ movies }) => movies,
  );
  const { data: genresList } = useGetGanresQuery();
  const { data, isLoading, error } = useGetMoviesQuery({ page });
  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchMoviesQuery({ searchTerm, page });
  const {
    data: searchGanres,
    isLoading: isGanresLoading,
    error: ganresError,
  } = useSearchMoviesByGanreQuery({ ganreId: +searchGanre, page });
  const { setSearchGanre, setRenderData, setGenres } = MoviesActions;
  const fetchError = searchError || ganresError || error;

  useEffect(() => {
    if (genresList) {
      dispatch(setGenres(convertGenres(genresList.genres, t('все жанры'))));
    }
  }, [dispatch, genresList, setGenres, t]);
  useEffect(() => {
    if (searchData?.keyword) {
      dispatch(setRenderData(searchData));
      setSearchGanre('');
    } else if (searchGanre && searchGanres?.items.length) {
      dispatch(
        setRenderData({
          films: searchGanres.items,
          pagesCount: searchGanres.totalPages,
        }),
      );
    } else if (data) {
      dispatch(setRenderData(data));
    }
  }, [
    searchData,
    data,
    searchGanres,
    searchGanre,
    dispatch,
    setRenderData,
    setSearchGanre,
  ]);
  if (fetchError) {
    handleErrorMessage(fetchError);
  }
  return (
    <main className={styles.main}>
      {isLoading || isSearchLoading || isGanresLoading ? (
        <Loader />
      ) : (
        renderData && <MovieListContainer />
      )}
    </main>
  );
};
