import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { PhoneBook } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContactRedux, deleteContactRedux } from 'redux/contactsSlice';
import { handleFilterRedux } from 'redux/filterSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const addContact = formData => {
    const alreadyExist = contacts?.some(
      el => el.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (alreadyExist) return alert(`${formData.name} is already in contacts.`);
    dispatch(addContactRedux(formData));
  };

  const deleteContact = id => {
    dispatch(deleteContactRedux(id));
  };

  const filteredContacts = () => {
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <PhoneBook>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter
        handleFilter={e => {
          dispatch(handleFilterRedux(e.target.value));
        }}
      />
      {contacts && (
        <ContactList
          contacts={filteredContacts()}
          deleteContact={deleteContact}
        />
      )}
    </PhoneBook>
  );
};
