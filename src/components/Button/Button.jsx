import s from './Button.module.scss';
import PropTypes from 'prop-types';

export const Button = ({ showMore }) => {
  return (
    <button className={s.btn} onClick={showMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  showMore: PropTypes.func.isRequired,
};
