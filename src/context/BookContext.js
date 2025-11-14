import React, { createContext, useContext, useReducer } from 'react';

const BookContext = createContext();

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'BORROW_BOOK':
      if (state.borrowedBooks.length >= 3) {
        alert('You cannot borrow more than 3 books at a time!');
        return state;
      }
      if (state.borrowedBooks.find(book => book.id === action.payload.id)) {
        alert('You have already borrowed this book!');
        return state;
      }
      return {
        ...state,
        borrowedBooks: [...state.borrowedBooks, action.payload]
      };
    case 'RETURN_BOOK':
      return {
        ...state,
        borrowedBooks: state.borrowedBooks.filter(book => book.id !== action.payload)
      };
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, {
    borrowedBooks: []
  });

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};