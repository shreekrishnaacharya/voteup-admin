import { LoadingButton } from '@mui/lab';
import { ThumbUpAltTwoTone, ThumbDownAltTwoTone } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';

const LoaderIndicator = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '10px',
    height: '10px',
    borderRadius: '5px',
    backgroundColor: '#9880ff',
    color: '#9880ff',
    animation: 'dotFlashing 1s infinite linear alternate',
    '&:before, &:after': {
        content: "''",
        display: 'inline-block',
        position: 'absolute',
        top: 0,
        width: '10px',
        height: '10px',
        borderRadius: '5px',
        backgroundColor: '#9880ff',
        color: '#9880ff',
        animation: 'dotFlashing 1s infinite alternate',
    },
    animationDelay: '0.5s',
    '&:after': {
        left: '15px',
        animationDelay: '1s'
    },
    '&:before': {
        left: '-15px',
        animationDelay: '0s'
    },



    '@keyframes dotFlashing': {
        '0%': {
            backgroundColor: '#9880ff'
        },
        '50%': {
            backgroundColor: '#ebe6ff'
        },
        '100%': {
            backgroundColor: '#ebe6ff'
        }
    }
}));

const VoteButton = ({ type, vote, onClick, ...rest }) => {
    const [loading, setLoading] = useState(false)
    console.log(vote, vote == null, 'vote')
    useEffect(() => {
        setLoading(false)
    }, [vote])
    return <LoadingButton
        onClick={() => {
            onClick(type)
            setLoading(true)
        }}
        color={type == 1 ? 'primary' : 'error'}
        startIcon={type == 1 ? <ThumbUpAltTwoTone /> : <ThumbDownAltTwoTone />}
        variant={vote != type ? 'outlined' : 'contained'}
        loadingIndicator={<LoaderIndicator />}
        loading={loading}
        {...rest}
    >
        {type == 0 ? 'Dislike' : 'Like'}
    </LoadingButton>
}

export default VoteButton;