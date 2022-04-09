import s from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ increment }) {
  return (
    <button className={s.button} type="button" onClick={increment}>
      load more
    </button>
  );
}

export default Button;

Button.propTypes = {
  increment: PropTypes.func.isRequired,
};
