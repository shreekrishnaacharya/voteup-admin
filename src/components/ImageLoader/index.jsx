import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Typography,
    Box,
    Divider,
    Button,
    Input,
    Card,
    CardMedia,
    CardContent
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import imageIcon from "assets/images/product.png";
import { VideoIcon, PdfIcon, DocIcon, ExcelIcon, WordIcon } from './Icons';

const extensions = {
    pdf: ['pdf'],
    video: ['mp4', 'avi', 'webm', 'mpeg', 'mov'],
    doc: ['doc', 'docx'],
    excel: ['xlsx', 'xls', 'xlsm', 'ods'],
    image: ['jpg', 'jpeg', 'png', 'gif']
}
const SizeType = {
    sm: [[4, 3, 2], '80px'],
    md: [[12, 6, 3], '100px'],
    lg: [[12, 12, 6], '180px'],
}

function ImageLoader({ title, InputProps, size, cancelName, saveName, onSave, multiple, isModal, onChange }) {

    const [profileImg, setProfile] = React.useState(null)
    const [totSize, setTotSize] = React.useState(0)
    const handleClose = () => {
        setProfile(null);
    };
    const removeSelectedImage = () => {
        setProfile(null);
    };
    const getSize = (size) => {
        if (size > 1048576) {
            return Math.round(size / 1048576, 2) + ' MB'
        } else if (size > 1024) {
            return Math.round(size / 1024, 2) + ' KB'
        } else {
            return size + ' Bytes'
        }
    }
    function getFileIcon(file) {
        const en = file.name.split('.').pop().toLowerCase();
        let ex = null;
        for (const ext of Object.keys(extensions)) {
            if (extensions[ext].includes(en)) {
                ex = ext;
                break;
            }
        }
        switch (ex) {
            case 'pdf':
                return PdfIcon;
            case 'image':
                return URL.createObjectURL(file)
            case 'doc':
                return WordIcon;
            case 'excel':
                return ExcelIcon;
            case 'video':
                return VideoIcon;
            default:
                return DocIcon;
        }
    }

    const ImageList = () => {
        let imageList = [];
        let _totSize = 0;
        const pImg = profileImg.target.files
        for (let i = 0; i < pImg.length; i++) {
            _totSize += pImg[i].size;
            imageList.push(
                <Grid item sm={SizeType[size][0][0]} md={SizeType[size][0][1]} lg={SizeType[size][0][2]}>
                    <Card
                        raised
                        sx={{
                            margin: "0 auto",
                            padding: "0",
                        }}
                    >
                        <div style={{ height: SizeType[size][1], overflow: 'hidden' }}>
                            <CardMedia
                                component="img"
                                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                                image={getFileIcon(pImg[i])}
                                alt={pImg[i].name}
                            />
                        </div>
                        <CardContent sx={{ backgroundColor: '#EEE', padding: '5px 12px !important' }}>
                            <Box>
                                <Typography noWrap style={{ color: "#6E759F" }}>
                                    {pImg[i].name}
                                </Typography>
                                <Typography noWrap style={{ color: "#6E759F" }}>
                                    {getSize(pImg[i].size)}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            )
        }
        setTotSize(_totSize)
        return imageList
    }

    const ImageBox = () => {
        if (Boolean(profileImg)) {
            return <Box my={2}>
                <Typography variant="subtitle2">
                    <Grid
                        container
                        spacing={2}
                    >
                        <ImageList />
                    </Grid>
                </Typography>
                <Box mt={2}>
                    <Divider />
                    <Grid container mt={1} justifyContent="flex-start">
                        <Grid item xs={6}>
                            <Box display="flex" flexDirection="column" justifyContent="flex-start">
                                <Typography variant="subtitle2">
                                    Total Files : {Boolean(profileImg) ? profileImg.target.files.length : 0}
                                </Typography>
                                <Typography variant="subtitle2">
                                    Size : {getSize(totSize)}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button onClick={handleClose} color='error' variant='outlined' size='small'>clear</Button>
                            </Box>
                        </Grid>
                    </Grid >
                </Box >
            </Box >
        }
        return "";
    }
    return (
        <>
            <Input
                {...InputProps}
                type="file"
                sx={{ display: 'none' }}
                inputProps={{ multiple }}
                onChange={(e) => {
                    if (e.target.files != undefined) {
                        setProfile(e)
                        onChange(e)
                    }
                }}
            />
            {isModal ? (
                <Dialog open={Boolean(profileImg)} fullWidth maxWidth={'md'}>
                    <DialogTitle variant="h3">{title}</DialogTitle>
                    <DialogContent sx={{ padding: '10px 16px' }}>
                        <Divider />
                        <ImageBox />
                    </DialogContent>
                    <DialogActions>
                        <Button color='error' onClick={handleClose}>{cancelName}</Button>
                        <Button color='primary' type={'submit'} onClick={() => {
                            onSave(profileImg, handleClose)
                        }}>{saveName}</Button>
                    </DialogActions>
                </Dialog >
            ) : (<ImageBox />)}
        </>
    );
}

ImageLoader.propTypes = {
    cancelName: PropTypes.string,
    saveName: PropTypes.string,
    onSave: PropTypes.func,
    InputProps: PropTypes.object,
    multiple: PropTypes.bool,
    type: PropTypes.string,
    columns: PropTypes.number,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    title: PropTypes.string,
    onChange: PropTypes.func
}

ImageLoader.defaultProps = {
    cancelName: 'Cancel',
    saveName: 'Save',
    multiple: true,
    isModal: false,
    columns: 5,
    size: 'md',
    title: 'Image Upload',
    onChange: (e) => { }
}

export default ImageLoader;