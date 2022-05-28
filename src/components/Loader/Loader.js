import React from 'react';
import loader from '../../assets/img/spinner.jpg';
export const Loader = () => {
  return (
        <div className="loader">
            <img src={loader} alt="loader" />
        </div>
  )
}
