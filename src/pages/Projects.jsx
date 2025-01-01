import React from 'react'
import PageTitleAndSnackBar from '../components/common/PageTitleAndSnackBar'
import DataTable from '../components/common/DataTable'
import CommonModal from '../components/common/CommonModal'

const Projects = () => {
    return (
        <>

            <PageTitleAndSnackBar pageTitle="Projects" />

            <section className="section dashboard">
            <DataTable />

            </section>

            <CommonModal/>


        </>
    )
}

export default Projects