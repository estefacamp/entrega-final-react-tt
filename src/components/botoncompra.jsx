import styled from "styled-components";

const BotonCompra = styled.button`
  background-color: #ff5733;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c70039;
  }
`;

export default function Producto({ text, onClick }) {
  return (
    <BotonCompra onClick={onClick}>
      {text}
    </BotonCompra>
  );
}
