import Box from "@mui/material/Box";
import {LinearProgress} from "@mui/material";

type LoadingProps = {
    marginTop?: number;
}

const LoadingScreen = (props: LoadingProps) => {
    const {marginTop} = props;
    return (
        <Box sx={{ width: '100%', marginTop: marginTop}}>
            <LinearProgress />
        </Box>
    );
}

export default LoadingScreen;