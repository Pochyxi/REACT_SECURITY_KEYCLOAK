import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearProgressMUI() {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress color={'success'} />
        </Box>
    );
}