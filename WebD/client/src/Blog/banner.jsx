import {styled , Box , Typography} from '@mui/material'

const Image = styled(Box)`
        width: 100%;
        background:
        height:50vh;
        display:flex;
        flex-direction:column;
        align-items: center;
        justify-content:center;
`;

const Heading = styled(Typography)`
     font-size: 70px;
     color: #FFFFFF;
     line-height: 1
`;

const SubHeading = styled(Typography)`
      font-size: 20px;
      background: #FFFFFF;
`;

const Banner= ()=>{
    return(
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>Jala Jeevana Keerthi</SubHeading>
        </Image>
    )

}

export default Banner;