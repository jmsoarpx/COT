import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, Button } from '@material-ui/core';
import Lottie from 'react-lottie';
import successData from '../../images/sending.json';
import loadingData from '../../images/loading.json';

export default function DialogFrame(props) {

    const { onClose, open, status, message} = props;

    const handleClose = () => {
        onClose();
    };

    const loadingOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const successOptions = {
        loop: true,
        autoplay: true,
        animationData: successData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Dialog onClose={handleClose} open={open} status={status}>
            <DialogTitle>{message}</DialogTitle>
            {status ? <Lottie options={successOptions} height={300} width={300} /> : <Lottie options={loadingOptions} height={300} width={300} />}
            <DialogActions>
                <Button onClick={handleClose}>
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    )
}