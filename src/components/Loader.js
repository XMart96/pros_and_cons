import React from 'react';
import Loader from 'react-loader-spinner';

export default function Loading() {
        return(
                <div className="loaderBox">
                        <Loader type="Oval" color="#61dafb" height={50} width={50} />
                        <h2>Getting data</h2>
                </div>
        );
}
