import {Grid} from '@mui/material';

import Banner from './banner'


const blogHome = () =>{

    return (
        <> 
         <Banner/> 
         <Grid container item  lg={10}>
                    <Posts />
         </Grid>
        </>
    )
}

export default blogHome;