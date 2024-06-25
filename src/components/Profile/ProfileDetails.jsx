import React, { useState } from 'react';
import {
  Button,
  Modal,
  Group,
  Text,
  TextInput,
  Divider,
  Title,
  Box,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPhone } from '@tabler/icons-react';

function ProfileDetails({ username, name, headTitle, email, phone, onUpdate }) {
  const theme = useMantineTheme();
  const formEdit = useForm({
    initialValues: { username, name, headTitle, email, phone },
    validate: {
      username: (value) => (value ? null : 'Username cannot be empty'),
      name: (value) =>
        value.length < 3 ? 'Name must be at least 3 letters' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = (data) => {
    onUpdate(data);
    handleClose();
  };

  return (
    <Box>
      <Title
        order={3}
        style={{ fontWeight: 'bold', marginBottom: theme.spacing.sm }}>
        Profile
      </Title>
      <Divider style={{ marginBottom: theme.spacing.md }} />

      <Box style={{ marginTop: theme.spacing.md }}>
        <Text style={{ marginBottom: theme.spacing.sm }}>
          Username: {username}
        </Text>
        <Divider />
        <Text
          style={{
            marginTop: theme.spacing.sm,
            marginBottom: theme.spacing.sm,
          }}>
          Name: {name}
        </Text>
        <Divider />
        <Text
          style={{
            marginBottom: theme.spacing.sm,
            marginTop: theme.spacing.sm,
          }}>
          Head Title: {headTitle}
        </Text>
        <Divider />
        <Text
          style={{
            marginBottom: theme.spacing.sm,
            marginTop: theme.spacing.sm,
          }}>
          Email Account: {email}
        </Text>
        <Divider />
        <Text
          style={{
            marginBottom: theme.spacing.sm,
            marginTop: theme.spacing.sm,
          }}>
          Mobile Phone: {phone}
        </Text>
        <Divider />
      </Box>

      <Button
        style={{
          marginTop: theme.spacing.lg,
          backgroundColor: '#75A47F',
          width: '100%',
        }}
        onClick={handleOpen}>
        Change Profile
      </Button>

      <Modal
        opened={open}
        onClose={handleClose}
        title="Update Profile"
        centered>
        <form onSubmit={formEdit.onSubmit((values) => handleUpdate(values))}>
          <Text>Update your profile details below:</Text>
          <TextInput
            mt="md"
            label="Username"
            withAsterisk
            {...formEdit.getInputProps('username')}
          />
          <TextInput
            mt="md"
            label="Name"
            withAsterisk
            {...formEdit.getInputProps('name')}
          />
          <TextInput
            mt="md"
            label="Head Title"
            {...formEdit.getInputProps('headTitle')}
          />
          <TextInput
            mt="md"
            label="Email Account"
            withAsterisk
            {...formEdit.getInputProps('email')}
          />
          <TextInput
            mt="md"
            label="Mobile Phone"
            leftSection={
              <IconPhone style={{ width: rem(18), height: rem(18) }} />
            }
            {...formEdit.getInputProps('phone')}
            onKeyPress={(event) => {
              if (!/[+\d]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <Group position="right" mt="md">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Update
            </Button>
          </Group>
        </form>
      </Modal>
    </Box>
  );
}

export default ProfileDetails;
