import styled from 'styled-components';

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const DataContainer = styled.span`
  width: 23%;
`;

export const QuantityDataContainer = styled(DataContainer)`
  display: flex;
`;
export const Arrow = styled.div`
  cursor: pointer;
`;

export const ValueDataContainer = styled.span`
  margin: 0 10px;
`;

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;

export const CheckoutContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;
