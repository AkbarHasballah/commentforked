import React, { useState } from 'react';
import { Typography, Box, Card } from '@mui/material';
import {
  Avatar,
  Button,
  Group,
  Image,
  Modal,
  Notification,
  NumberInput,
  SimpleGrid,
  Switch,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import { useSelector } from 'react-redux';

function PostForm({ addPost }) {
  const [category, toggleCategory] = useToggle(['News', 'Event']);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [fileName, setFileName] = useState('');
  const authUser = useSelector((state) => state.authUser);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      image: null,
      category: 'News',
      startDate: null,
      endDate: null,
      maxParticipants: null,
    },
    validate: {
      title: (value) =>
        value.length < 3 ? 'Title must be at least 3 letters' : null,
    },
  });

  const handleDrop = (files) => {
    console.log('Dropping:', files);
    setLoading(true);
    form.setFieldValue('image', files[0]);
    form.setFieldError('image', null); // Clear any existing errors on drop
    setPreview(URL.createObjectURL(files[0]));
    setFileName(files[0].name);
    setLoading(false);
  };

  const handleReject = (files) => {
    console.log('Rejecting:', files);
    form.setFieldError('image', 'File size exceeds 5MB or invalid file type');
  };

  const handleToggleCategory = () => {
    toggleCategory();
    const newCategory = category === 'News' ? 'Event' : 'News';
    form.setFieldValue('category', newCategory);
  };

  const handleSubmit = async (values) => {
    const startDate = values.startDate ? values.startDate.toISOString() : null;
    const endDate = values.endDate ? values.endDate.toISOString() : null;

    const postData = {
      ...values,
      startDate,
      endDate,
    };

    await addPost(postData);
  };

  return (
    <>
      <Card sx={{ padding: 4 }}>
        <Box
          component="form"
          encType="multipart/form-data"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
          onSubmit={form.onSubmit(handleSubmit)}>
          <Typography
            fontWeight="600"
            fontSize="26px"
            color="primary"
            component="h1"
            align="start">
            Make Your Post.
          </Typography>

          <TextInput
            label="Title"
            placeholder="Title..."
            {...form.getInputProps('title')}
          />

          <Textarea
            placeholder="Description..."
            label="Description"
            autosize
            minRows={4}
            {...form.getInputProps('description')}
          />

          {authUser?.role === 'company' && (
            <Switch
              color={category === 'Event' ? 'green' : 'gray'}
              label={category}
              onClick={handleToggleCategory}
              checked={category === 'Event'}
            />
          )}

          {category === 'Event' && (
            <>
              <SimpleGrid cols={2}>
                <DatePickerInput
                  clearable
                  defaultValue={new Date()}
                  label="Start date"
                  placeholder="Start Date"
                  valueFormat="DD MMM YYYY"
                  {...form.getInputProps('startDate')}
                />
                <DatePickerInput
                  clearable
                  defaultValue={new Date()}
                  label="End date"
                  placeholder="End Date"
                  valueFormat="DD MMM YYYY"
                  {...form.getInputProps('endDate')}
                />
              </SimpleGrid>

              <NumberInput
                label="Max Participant"
                placeholder="Participate"
                allowDecimal={false}
                allowNegative={false}
                {...form.getInputProps('maxParticipants')}
              />
            </>
          )}

          <Dropzone
            onDrop={handleDrop}
            onReject={handleReject}
            maxSize={5 * 1024 ** 2}
            loading={loading}
            accept={IMAGE_MIME_TYPE}
            {...form.getInputProps('image')}
            style={{
              borderColor: form.errors.image ? 'red' : undefined,
            }}>
            <Group
              justify="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: 'none' }}>
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
                  Attach as many files as you like, each file should not exceed
                  5MB
                </Text>
              </div>
            </Group>
          </Dropzone>

          {form.errors.image && (
            <Notification
              color="red"
              title="Upload Error"
              disallowClose
              mt="md">
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
              boxShadow={'xs'}
              onClick={() => setModalOpened(true)}>
              <Group>
                <Avatar src={preview} alt="Preview" size="xl" radius="xl" />
                <div>
                  <Text size="xl" weight={500}>
                    {fileName}
                  </Text>
                </div>
              </Group>
            </Box>
          )}

          <Button type="submit" fullWidth color="#75A47F">
            Submit
          </Button>
        </Box>
      </Card>
      <Modal
        centered
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Image Preview">
        <Image src={preview} alt="Preview" />
      </Modal>
    </>
  );
}

export default PostForm;
