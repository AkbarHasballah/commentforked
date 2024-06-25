import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import {
  ActionIcon,
  rem,
  Modal as MantineModal,
  Text,
  Group,
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useExpand from '../../hooks/useExpand';
import ownerShape from '../../types/Owner';
import { postedAt } from '../../utils/date';
import useInput from '../../hooks/useInput';
import {
  asyncDeleteComment,
  asyncEditComment,
} from '../../states/postDetail/thunk';
import useModal from '../../hooks/useModal';

function CommentItem({ id, owner, createdAt, content }) {
  const authUser = useSelector((state) => state.authUser);
  const [isExpanded, handleExpand] = useExpand(false);
  const [editModal, actionEditModal, setEditModal] = useModal(false);
  const [deleteModal, actionDeleteModal, setDeleteModal] = useModal(false);
  const [comment, onChangeComment] = useInput(content);
  const dispatch = useDispatch();

  const handleEditComment = () => {
    dispatch(asyncEditComment({ commentId: id, content: comment }));
    setEditModal(false);
  };

  const handleDeleteComment = () => {
    dispatch(asyncDeleteComment(id));
    setDeleteModal(false);
  };

  return (
    <>
      <Card
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderRadius: '10px',
        }}>
        <Box className="flex gap-2.5 max-md:flex-wrap flex-col sm:flex-row items-center">
          <Avatar
            loading="lazy"
            src={owner?.profile?.photo}
            alt={owner?.username}
          />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            paddingY={1}
            className="flex-1 max-md:max-w-full">
            <Typography
              fontWeight="600"
              color="black"
              className="text-xl max-md:max-w-full">
              {owner?.username}
            </Typography>
            <div className="text-sm text-zinc-500 max-md:max-w-full">
              {owner?.profile?.headTitle}
            </div>
          </Box>
          <Box>
            {owner?.id === authUser?.id && (
              <ActionIcon.Group style={{ justifyContent: 'end' }}>
                <ActionIcon
                  variant="default"
                  size="lg"
                  aria-label="Edit"
                  onClick={actionEditModal}>
                  <IconEdit style={{ width: rem(20) }} stroke={1.5} />
                </ActionIcon>

                <ActionIcon
                  variant="default"
                  size="lg"
                  aria-label="Delete"
                  onClick={actionDeleteModal}>
                  <IconTrash
                    style={{ width: rem(20), color: 'red' }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </ActionIcon.Group>
            )}
            <Typography alignSelf="start" fontWeight="400" color="black">
              {postedAt(createdAt)}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" color="textSecondary">
          {content}
        </Typography>
      </Card>

      {/* Edit Comment Modal */}
      <MantineModal
        opened={editModal}
        onClose={actionEditModal}
        title="Edit Comment"
        centered>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextareaAutosize
            aria-label="minimum height"
            className="w-full text-sm font-normal font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 bg-white  text-slate-900 focus-visible:outline-0 box-border"
            minRows={3}
            placeholder="Edit your comment here...."
            onChange={onChangeComment}
            value={comment}
          />
          <Button
            variant="contained"
            onClick={handleEditComment}
            color="primary">
            Submit
          </Button>
        </Box>
      </MantineModal>
      <MantineModal
        opened={deleteModal}
        onClose={actionDeleteModal}
        title="Delete Comment"
        centered>
        <Box display="flex" flexDirection="column" gap={2}>
          <Text>Are you sure you want to delete this post?</Text>
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={actionDeleteModal} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleDeleteComment} color="primary">
              Confirm
            </Button>
          </Box>
        </Box>
      </MantineModal>
    </>
  );
}

CommentItem.propTypes = {
  owner: PropTypes.shape(ownerShape).isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default CommentItem;
