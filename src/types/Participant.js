import PropTypes from 'prop-types';

const participantShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  headTitle: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default participantShape;
