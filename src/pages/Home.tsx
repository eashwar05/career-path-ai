// src/pages/Home.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';      // Type for root Redux state
import { increment, decrement } from '../redux/exampleSlice';  // Action creators from your slice

const Home: React.FC = () => {
  // Select the current value from Redux store's example slice
  const value = useSelector((state: RootState) => state.example.value);

  // Get the dispatch function to dispatch actions
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Home Page</h1>
      <p>Value in Redux: {value}</p>
      {/* Dispatch increment and decrement actions on button clicks */}
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Home;