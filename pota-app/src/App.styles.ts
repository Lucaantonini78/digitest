import { styled } from "styled-components";

const Wrapper = styled.div`
  background-color: black;
  color: white;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 76px;
  padding: 16px;
  border-bottom: 6px solid #005ed3;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const Input = styled.input`
  background-color: white;
  border-radius: 8px;
  color: black;
  margin-left: auto;
  height: 32px;
  padding: 0 16px;
`;
const Title = styled.h1`
  font-size: 24px;
`;
const Button = styled.button`
  background: #f7d900;
  border-radius: 4px;
  height: 32px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
`;

export default { Wrapper, Title, Header, Input, Button };
