import {styled , Box , Typography} from '@mui/material'

const Container = styled(Box)`
    borde: 1px solid #d3cde;
    border-radius:10px;
    margin: 10px;
    display: flex;
    align-items:center;
    flex-direction:column;
    height: 350px;
    & > img, & > p{
      padding : 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
   font-size: 18px;
   word-break: break-word;
`;

const Post = ({post}) => {
    const url = post.picture ? post.picture :

    //const or function 
    function addEllipsis  (str, limit) {
            return str.length > limit ? str.substring(0, limit) + '...' : str;
    }
    return(
        <Container>
            <Image src={url} alt="post" />
            <Heading>{addEllipsis(post.title ,15)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addEllipsis(post.description ,150)}</Details>
        </Container>
    )

}

export default Post;