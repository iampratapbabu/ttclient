import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitleAndSnackBar from '../components/common/PageTitleAndSnackBar';

const Demopage = () => {
    let { demoid } = useParams();

    return (
        <>
              <PageTitleAndSnackBar pageTitle={demoid} />

            <h1>{demoid}</h1>

        </>
    )
}

export default Demopage;