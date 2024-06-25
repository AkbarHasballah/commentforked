import React, { useState } from 'react';
import { Card, Title, Text, Button, Group, Modal } from '@mantine/core';

function DeleteAccount({ deleteAccount }) {
  const [opened, setOpened] = useState(false);

  const handleDelete = () => {
    // Tambahkan logika penghapusan akun di sini
    deleteAccount();
    setOpened(false); // Tutup modal setelah penghapusan akun
  };

  return (
    <>
      <Title order={4} mb="md">
        Delete Account
      </Title>
      <Text mb="md">
        Are you sure you want to delete your account? This action cannot be
        undone.
      </Text>
      <Button color="red" fullWidth onClick={() => setOpened(true)}>
        Delete Account
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirm Delete Account">
        <Text mb="md">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Text>
        <Group justify="end">
          <Button
            variant="outline"
            color="gray"
            onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default DeleteAccount;
