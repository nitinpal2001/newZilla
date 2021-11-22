import React, { Component } from 'react'
import GlowingRing from '../Glowing-ring.gif'
import '../App.css';

  function LoadSpinner() {
        return (
            <div className='text-center d-flex justify-content-center my-2'>
                <img src={GlowingRing} alt="loading" />
            </div>
        )
}
export default LoadSpinner;
