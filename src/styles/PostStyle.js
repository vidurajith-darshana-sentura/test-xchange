import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  background-color: #ffffff;
  margin-top: -100px;
`;

export const Card = styled.TouchableOpacity`
 
  width: 100%;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserImgWrapper = styled.View`

  padding-top: 15px;
  padding-bottom: 15px;

`;

export const BuyerImg = styled.Image`
  width: 65px;
  height: 50px;
  border-radius: 25px;
  
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 260px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;

`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Lato-Regular';
`;

export const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
  font-family: 'Lato-Regular';
  padding-top: 10px;
`;

export const MessageText = styled.Text`
  font-size: 13px;
  color: #000000;
  left:25px;
  width:130px;
  
`;