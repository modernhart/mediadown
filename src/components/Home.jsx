import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from './common/Loader'

const Home = () => {
    const {show} = useSelector(state => state.artist)
    if (show) {
        return (
            <Redirect to={{
                pathname: "/artist/list"
            }} />
        )
    }

    return (
        <Loader />
    )
}

export default Home