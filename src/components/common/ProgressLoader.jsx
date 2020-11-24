import React from 'react'
import { useSelector } from 'react-redux'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const ProgressLoader = () => {
    const {disabledBtn} = useSelector(state => state.media)

    return (
        <Backdrop style={{ zIndex: 100 }} open={disabledBtn}>
            <CircularProgress color="secondary" />
        </Backdrop>
    );
};

export default ProgressLoader