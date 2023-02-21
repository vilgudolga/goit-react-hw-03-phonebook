import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactListItem.module.css';

class ContactListItem extends Component {
  render() {
    const { id, name, number, handleRemove } = this.props;
    return (
      <li id={id} className={styles.item}>
        {name}: {number}
        <button className={styles.button} onClick={() => handleRemove(id)}>
          Delete
        </button>
      </li>
    );
  }
}

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactListItem;
