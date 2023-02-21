import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ id, name, number }) => {
    const { contacts } = this.state;
    if (
      contacts.find(
        contacts => contacts.name.toLowerCase() === name.toLowerCase()
      )
    )
      return Notiflix.Notify.failure(`${name} is already in phonebook`);

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, { id, name, number }] };
    });
  };

  removeContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getContacts = () => {
    const { filter, contacts } = this.state;
    const filterNormalize = filter.toLowerCase();
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filterNormalize)
    );
  };

  filterContacts = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { filter } = this.state;
    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmitData={this.addContact} />

          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.filterContacts} />
          <ContactList
            contacts={this.getContacts()}
            handleRemove={this.removeContact}
          />
        </div>
      </>
    );
  }
}
