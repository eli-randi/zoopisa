import CircularProgress from '@mui/material/CircularProgress';

export const LoadingCircle = () => {
    return (
        <div style={{borderRight: '3px #6A687A solid', height: '74vh'}}>
            <CircularProgress
                sx={{
                    marginX: '40%',
                    marginTop: '30%',
                    color: '#5EB1BF'
                }}
                size={150}
                thickness={3}
            />
        </div>

    )
}