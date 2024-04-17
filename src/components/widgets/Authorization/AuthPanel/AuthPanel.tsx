import styles from './AuthPanel.module.scss';
import { Button } from 'src/components/common/Button/Button';
import { AuthnModal } from '../AuthnModal/AuthnModal';
import { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { UserActions } from 'src/redux/reducers/userSlice';
import { useTranslation } from 'react-i18next';
import { MoviesActions } from 'src/redux/reducers/moviesSlice';

export const AuthPanel = memo(() => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const userName = useAppSelector(({ user }) => user.authUserName);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onCloseModal = () => {
    setisModalOpen(false);
  };
  const onShowModal = () => {
    setisModalOpen(true);
  };
  const onExit = () => {
    dispatch(UserActions.setAuthUserName(''));
    dispatch(MoviesActions.clearFavorites());
  };
  return (
    <div className={styles.authpanel}>
      <Button
        variant="outlined"
        className={styles.btn}
        onClick={userName ? onExit : onShowModal}
      >
        {userName ? t('Выйти') : t('Войти')}
      </Button>
      <div className={styles.username}>{userName}</div>
      <AuthnModal isOpen={isModalOpen} onClose={onCloseModal} />
    </div>
  );
});