import React from 'react';
import { TextInput, Button, Title, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function ChangePassword({ changePassword }) {
  const form = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },

    validate: {
      newPassword: (value) =>
        value.length < 6 ? 'Password must be at least 6 characters' : null,
      confirmPassword: (value, values) =>
        value !== values.newPassword ? 'Passwords do not match' : null,
    },
  });

  return (
    <div>
      <Title order={4}>Change Password</Title>
      <form onSubmit={form.onSubmit((values) => changePassword(values))}>
        <PasswordInput
          label="Current Password"
          {...form.getInputProps('oldPassword')}
          required
          mt="md"
        />
        <PasswordInput
          label="New Password"
          {...form.getInputProps('newPassword')}
          required
          mt="md"
        />
        <PasswordInput
          label="Confirm Password"
          {...form.getInputProps('confirmPassword')}
          required
          mt="md"
        />
        <Button
          type="submit"
          mt="lg"
          fullWidth
          style={{
            backgroundColor: '#75A47F',
          }}>
          Change Password
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;
