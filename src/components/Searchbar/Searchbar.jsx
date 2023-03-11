import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TbPhotoSearch } from 'react-icons/tb';

import {
  SearchbarHeader,
  Form,
  SearchButton,
  SearchLabel,
  SearchInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onInputChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(query.trim());
    setQuery('');
  };

  return (
    <SearchbarHeader>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <TbPhotoSearch size={30} />
        </SearchButton>
        <SearchLabel>
          <SearchInput
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={onInputChange}
          />
        </SearchLabel>
      </Form>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
