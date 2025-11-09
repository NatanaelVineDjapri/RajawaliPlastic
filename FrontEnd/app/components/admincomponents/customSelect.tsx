'use client';

import React from 'react';
import Select, { Props as SelectProps, StylesConfig } from 'react-select';

export interface SelectOption {
  value: string;
  label: string;
}

const customSelectStyles: StylesConfig<SelectOption, false> = {
  control: (base) => ({
    ...base,
    minHeight: 'calc(1.5em + 1rem + 2px)',
    borderColor: '#ced4da',
    boxShadow: 'none',
    fontSize: '1rem',
    '&:hover': {
      borderColor: '#ced4da',
    },
    '@media (max-width: 576px)': {
      minHeight: '40px',
      fontSize: '0.85rem',
    },
    '@media (min-width: 577px) and (max-width: 991px)': {
      minHeight: '44px',
      fontSize: '0.9rem',
    },
  }),
  menuList: (base) => ({
    ...base,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};

type CustomSelectProps = SelectProps<SelectOption, false>;

export default function CustomSelect(props: CustomSelectProps) {
  return <Select {...props} styles={customSelectStyles} />;
}