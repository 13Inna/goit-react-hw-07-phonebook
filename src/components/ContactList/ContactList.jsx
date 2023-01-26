import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from '../../redux/selectors';
import { deleteContact } from '../../redux/operations';

export function ContactList() {
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getFilter);

  const dispatch = useDispatch();
  
  const onDeleteContact = evt => {
    dispatch(deleteContact(evt.target.id));
    alert(`This contact is delited from your phonebook!`);
};


  const getVisibilityContacts = () => {
    if (!filterValue || filterValue === '') {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const visibilityContacts = getVisibilityContacts();

  return (
    <ul className={css.list}>
      {visibilityContacts.map(contact => (
        <li className={css.item} key={contact.id}>
            {contact.name}: {contact.phone}
            <button className={css.btn}
              type="button" id={contact.id} onClick={onDeleteContact}>
                Delete
            </button> 
        </li>
      ))}
    </ul>
 );
};


export default ContactList;