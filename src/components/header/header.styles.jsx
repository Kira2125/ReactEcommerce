import style, {css} from 'styled-components';
import {Link} from "react-router-dom";


const OptionShareStyles = css`
    padding: 10px 15px;
    cursor: pointer;
`;

export const HeaderStyleContainer = style.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoStyleContainer = style(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`;

export const OptionsStyleContainer = style.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const OptionLinkStyle = style(Link)`
    ${OptionShareStyles}
`;
