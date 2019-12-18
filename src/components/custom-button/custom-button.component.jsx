import React from 'react';

import {CustomButtonStyle} from "./custom-button.styles";

const CustomButton = ({children, ...props}) => (
  <CustomButtonStyle {...props}>
    {children}
  </CustomButtonStyle>
);

export default CustomButton;
