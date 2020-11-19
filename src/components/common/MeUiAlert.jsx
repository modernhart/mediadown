import React from 'react';
import config from '../../settings/config.json'
import { ALERT_CLOSE } from '../../action'
import { useSelector, useDispatch } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const MeUiAlert = () => {
    const {notice} = config
    const {alertShow, alertMsg, alertStatus} = useSelector(state => state.media)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch({
            type: ALERT_CLOSE
        })
    }

    return (
        <Snackbar open={alertShow} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={alertStatus}>
                {notice[alertMsg]}
            </MuiAlert >
        </Snackbar>
    );
};

export default MeUiAlert;