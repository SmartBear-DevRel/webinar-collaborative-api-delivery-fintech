// Dropdown.js

import React from 'react';
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
  StyledLabel,
  StyledButton
} from './Styles';

export function Dropdown(props: any) {
  return (
    <DropdownWrapper action={props.action} onChange={props.onChange}>
      <StyledLabel htmlFor="services">{props.formLabel}</StyledLabel>
      <StyledSelect id="services" name="services">
        {props.children}
      </StyledSelect>
      {props.buttonText && (
        <StyledButton type="submit" value={props.buttonText} />
      )}
    </DropdownWrapper>
  );
}

export function Option(props: any) {
  return (
    <StyledOption value={props.value}>
      {props.value ?? props.defaultValue}
    </StyledOption>
  );
}
