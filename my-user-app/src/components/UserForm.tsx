import React, { useReducer } from 'react';
import { useUserContext } from '../context/hooks/useUserContext.ts';
import { useNavigate } from 'react-router-dom';

interface UserFormState {
  name: string;
  email: string;
  phone: string;
  city: string;
  error: string | null;
}

interface UserFormAction {
  type: 'SET_VALUE' | 'SET_ERROR';
  payload: { field: keyof UserFormState; value: string } | { error: string };
}

const userFormReducer = (state: UserFormState, action: UserFormAction): UserFormState => {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, [action.payload.field]: action.payload.value, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

const inputClassName = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
const labelClassName = "block text-gray-700 font-bold mb-2";

const UserForm: React.FC = () => {
  const [formData, dispatch] = useReducer(userFormReducer, {
    name: '',
    email: '',
    phone: '',
    city: '',
    error: null,
  });
  
  const { addUser, users } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (field: keyof UserFormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_VALUE', payload: { field, value: e.target.value } });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid(formData)) {
      return;
    }

    addUser(formData);

    dispatch({ type: 'SET_VALUE', payload: { field: 'name', value: '' } });
    dispatch({ type: 'SET_VALUE', payload: { field: 'email', value: '' } });
    dispatch({ type: 'SET_VALUE', payload: { field: 'phone', value: '' } });
    dispatch({ type: 'SET_VALUE', payload: { field: 'city', value: '' } });

    navigate('/');
  };

  const isValid = (data: UserFormState): boolean => {
    if (!data.name || !data.email || !data.phone || !data.city || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      dispatch({ type: 'SET_ERROR', payload: { error: 'Заполните все поля корректно!' } });

      return false;
    }

    // Проверка, что такого пользователя нет в базе
    const isExist = users.some((user) => user.phone === data.phone || user.email === data.email);

    if (isExist) {
        dispatch({ type: 'SET_ERROR', payload: { error: 'Пользователь с такими данными уже существует' } });

        return false;
    }

    return true;
  };

  return (
    <div className="w-full p-4 max-w-2xl mx-auto my-8 p-8 bg-gray-100 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Добавить пользователя</h2>
      {formData.error && <div className="text-red-500 mb-4">{formData.error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className={labelClassName}>Имя:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange('name')}
            className={inputClassName}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className={labelClassName}>Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange('email')}
            className={inputClassName}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className={labelClassName}>Телефон:</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange('phone')}
            className={inputClassName}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className={labelClassName}>Город:</label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={handleChange('city')}
            className={inputClassName}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default UserForm;