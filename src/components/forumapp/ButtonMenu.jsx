import React, { useState } from 'react';
import {
  Menu,
  Button,
  Modal,
  TextInput,
  Textarea,
  Group,
  Text,
  NumberInput,
  Avatar,
  Notification,
  Box,
  Card,
} from '@mantine/core';
import {
  IconTrash,
  IconEdit,
  IconSettings2,
  IconUpload,
  IconPhoto,
  IconX,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { randomId } from '@mantine/hooks';
import { DateInput } from '@mantine/dates';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import parse from 'html-react-parser';
import useModal from '../../hooks/useModal';
import { BookmarkBorder, BookmarkOutlined } from '@mui/icons-material';

function ButtonMenu({ event, editPost, deletePost, handleBookmark, isBookmark }) {
  const [editModal, actionEditModal, setEditModal] = useModal(false);
  const [deleteModal, actionDeleteModal, setDeleteModal] = useModal(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  // Convert ISO strings to Date objects for Mantine DateInput
  const startDate = event?.startDate ? new Date(event.startDate) : null;
  const endDate = event?.endDate ? new Date(event.endDate) : null;

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: event?.title,
      description: event.description,
      image: event?.image,
      category: event?.category,
      startDate: startDate,
      endDate: endDate,
      maxParticipants: event?.maxParticipants,
    },

    validate: {
      title: (value) => (value.length < 3 ? 'Title must be at least 3 letters' : null),
    },
  });

  const handleSubmit = (data) => {
    // Convert Date objects back to ISO strings
    const transformedData = {
      ...data,
      startDate: data.startDate ? data.startDate.toISOString() : null,
      endDate: data.endDate ? data.endDate.toISOString() : null,
    };

    const { error } = editPost(transformedData);
    if (!error) {
      setEditModal(false);
    }
  };

  const handleDelete = (postId) => {
    const { error } = deletePost(postId);
    if (!error) {
      setDeleteModal(false);
    }
  };

  const handleDrop = (files) => {
    setLoading(true);
    const randomName = randomId();
    const fileExtension = files[0].name.split('.').pop();
    const newName = `${randomName}.${fileExtension}`;

    form.setFieldValue('image', {
      ...files[0],
      name: newName,
    });

    form.setFieldError('image', null);
    setPreview(URL.createObjectURL(files[0]));
    setFileName(files[0].name);
    setLoading(false);
  };

  const handleReject = (files) => {
    console.log('rejected files', files);
    form.setFieldError('image', 'File size exceeds 5MB or invalid file type');
  };

  return (
    <>
      <Menu shadow="md" width={150}>
        <Menu.Target>
          <Button color="#75A47F">
            <IconSettings2 style={{ paddingRight: '5px' }} />
            Properties
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Action</Menu.Label>
          <Menu.Item
            onClick={handleBookmark}
            leftSection={
              isBookmark ? (
                <BookmarkIcon style={{ width: '14px', height: '14px' }} />
              ) : (
                <BookmarkBorder style={{ width: '14px', height: '14px' }} />
              )
            }
          >
            Bookmark
          </Menu.Item>
          <Menu.Item
            onClick={actionEditModal}
            leftSection={<IconEdit style={{ width: '14px', height: '14px' }} />}
          >
            Edit Post
          </Menu.Item>
          <Menu.Item
            color="red"
            onClick={actionDeleteModal}
            leftSection={<IconTrash style={{ width: '14px', height: '14px' }} />}
          >
            Delete Post
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Modal
        opened={editModal}
        onClose={actionEditModal}
        title="Edit Post"
        centered
      >
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <TextInput
            label="Post Title"
            placeholder="Enter post title"
            required
            key={form.key('title')}
            {...form.getInputProps('title')}
          />
          <Textarea
            label="Post Description"
            placeholder="Enter post description"
            required
            key={form.key('description')}
            {...form.getInputProps('description')}
          />
          {event?.category === 'Event' && (
            <>
              <DateInput
                {...form.getInputProps('startDate')}
                key={form.key('startDate')}
                label="Start Date"
                placeholder="Select start date"
              />
              <DateInput
                {...form.getInputProps('endDate')}
                key={form.key('endDate')}
                label="End Date"
                placeholder="Select end date"
              />
              <NumberInput
                label="Max Participants"
                placeholder="Enter max participants"
                min={1}
                max={100}
                key={form.key('maxParticipants')}
                {...form.getInputProps('maxParticipants')}
              />
            </>
          )}
          <Text size="lg" fw={600}>
            Image
          </Text>
          <Dropzone
            onDrop={handleDrop}
            onReject={handleReject}
            maxSize={5 * 1024 ** 2}
            loading={loading === true}
            accept={IMAGE_MIME_TYPE}
            key={form.key('image')}
            {...form.getInputProps('image')}
            style={{
              borderColor: form.errors.image ? 'red' : undefined,
            }}
          >
            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: '52px',
                    height: '52px',
                    color: 'var(--mantine-color-blue-6)',
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: '52px',
                    height: '52px',
                    color: 'var(--mantine-color-red-6)',
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: '52px',
                    height: '52px',
                    color: 'var(--mantine-color-dimmed)',
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed 5MB
                </Text>
              </div>
            </Group>
          </Dropzone>

          {form.errors.image && (
            <Notification color="red" title="Upload Error" disallowClose mt="md">
              {form.errors.image}
            </Notification>
          )}

          {preview && (
            <Box
              component={Card}
              sx={{
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              boxShadow="xs"
            >
              <Group>
                <Avatar src={preview} alt="Profile of Darlene Robertson" size="xl" radius="xl" />
                <div>
                  <Text size="xl" weight={500}>
                    {fileName}
                  </Text>
                </div>
              </Group>
            </Box>
          )}
          <Group position="center" mt="md">
            <Button type="submit" style={{ width: '100%', backgroundColor: '#75A47F' }}>
              Edit
            </Button>
          </Group>
        </form>
      </Modal>

      <Modal
        opened={deleteModal}
        onClose={actionDeleteModal}
        title="Confirm Deletion"
        centered
      >
        <Text>Are you sure you want to delete this post?</Text>
        <Group justify="end" mt="md">
          <Button variant="outline" color="green" onClick={actionDeleteModal}>
            Cancel
          </Button>
          <Button color="red" onClick={() => handleDelete(event?.id)}>
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default ButtonMenu;
