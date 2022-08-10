import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ConfirmDelete({ open, onClose, onDelete, title, description }) {

    return (
        <div>
            <Dialog
                open={open}
            >
                <DialogTitle sx={{ fontWeight: 700, fontSize: 20, padding: '16px 20px' }}>
                    {title ? title : "Are you sure you want to delete this?"}
                </DialogTitle>
                <DialogContent sx={{ padding: '20px' }}>
                    <DialogContentText>
                        {description ? description : `Deleting this item will also delete all the activities related to this it such as its vote, shared links
                        and you will not be able to recover them.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ padding: '20px' }}>
                    <Button
                        variant='outlined'
                        color={'warning'}
                        onClick={() => {
                            onClose()
                        }}>Cancel</Button>
                    <Button color={'error'} variant='outlined' onClick={() => {
                        onDelete()
                    }} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

ConfirmDelete.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    title: PropTypes.string,
    description: PropTypes.string
}


export default ConfirmDelete;