import PropTypes from 'prop-types';
import ownerShape from './Owner';

const commentShape = {
  owner: PropTypes.shape(ownerShape).isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default commentShape;
