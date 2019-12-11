import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useField } from '@rocketseat/unform';

import { updateProfileSuccess } from '~/store/modules/user/actions';

import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const { fieldName, defaultValue, registerField } = useField('avatar_id');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef(null);

  useEffect(() => {
    if (profile.avatar) {
      setPreview(profile.avatar.url);
    }
  }, [profile]);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);
    const avatar = response.data;

    dispatch(updateProfileSuccess({ ...profile, avatar }));

    const { id, url } = avatar;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={preview || 'https://api.adorable.io/avatars/50/asdsada.png'}
          alt=""
        />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
