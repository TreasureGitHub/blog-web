import styled from "styled-components";

export const AdminWrapper = styled.div`

`

export const Back = styled.div`
height: 77px;
font-size: 15px;
padding: 30px 18px 5px;

.link {
display: block;
overflow: hidden;
width: ${props => props.collapsed ? '0px' : '204px'};
transition: all .3s;
height: 42px;
line-height: 42px;
color: #ec7259;
box-sizing: border-box;
text-align: center;
border-radius: 20px;
border: ${props => props.collapsed ? '0px' : '1px'}  solid rgba(236,114,89,.8);

:hover{
border: 1px solid rgba(236,114,89,1);
}
}
`

export const BreadcrumbWrapper = styled.div`
padding-left: 20px;
padding-top: 20px;
height: 64px;
line-height: 64px;
vertical-align: center;
`