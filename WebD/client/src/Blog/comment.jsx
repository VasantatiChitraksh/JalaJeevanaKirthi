import {usecontext} from "react";

import {Typography , Box ,styled} from "@mui/material" ;
import {Delete } from "@mui/icons-material" ;

const Component = styled(Box)`
  margin-top: 30px;
  background: #F5F5F5;
  padding:10px;
`;

const Container = styled(Box)`
   display: flex;
   margin-bottom: 5px;
`;

const Name = styled(Typography)`
   font-weight: 600;
   font-size: 18px;
   margin-right: 20px;
`;

const StyledDate = styled(Typography)`
  font-size: 14px;
  color:#878787;
`;

const DeleteIcon = styled(Delete)`
   margin-left: auto;

`;

const Comment = ({comment ,settoggle} ) => {
    //want user details like name

    const removeComment = async() =>{

    }

    return (
        <Component>
            <Container>
                <Name>
                    {comment.Name}
                </Name>
                <StyledDate>
                        {new Date(comment.date).toDateString()}
                </StyledDate>
             {comment.name ===    <DeleteIcon onclick ={()=> removeComment()} />}
            </Container>

        </Component>
    )
}

export default Comment;