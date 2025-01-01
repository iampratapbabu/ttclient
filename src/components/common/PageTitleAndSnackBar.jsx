import React from 'react';
import { Link} from 'react-router-dom';

const PageTitleAndSnackBar = ({pageTitle}) => {

    return (
        <>
            <div className="pagetitle">
                <h1>{pageTitle}</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active">{pageTitle}</li>
                    </ol>
                </nav>
            </div>

        </>
    )
}

export default PageTitleAndSnackBar;