'use client';

import React from 'react';
import Select, { Props as SelectProps } from 'react-select';

export interface SelectOption {
  value: string;
  label: string;
}

const customSelectStyles = {
  control: (base: any) => ({
    ...base,
    minHeight: 'calc(1.5em + 1rem + 2px)',
    borderColor: '#ced4da',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#ced4da'
    }
  }),
  menuList: (base: any) => ({
    ...base
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 9999 
  })
};

type CustomSelectProps = SelectProps<SelectOption, false>; 

export default function CustomSelect(props: CustomSelectProps) {
  return (
    <Select
      {...props} 
      styles={customSelectStyles}
    />
  );
}