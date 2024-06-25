import { createSlice } from '@reduxjs/toolkit';

const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState: null,
  reducers: {
    receivePostDetail(state, action) {
      return action.payload;
    },
    clearPostDetail() {
      return null;
    },
    updatePostDetail(state, action) {
      return { ...state, ...action.payload };
    },
    deletePostDetail(state, action) {
      return state.filter((post) => post.postDetail.id !== action.payload.id);
    },
    addCommentPostDetail: {
      reducer(state, action) {
        return {
          ...state,
          comments: [action.payload.comment, ...state.comments],
        };
      },
      prepare(comment) {
        return { payload: { comment } };
      },
    },
    editCommentPostDetail: {
      reducer(state, action) {
        return {
          ...state,
          comments: state.comments.map((comment) => {
            if (comment.id === action.payload.comment.id) {
              return action.payload.comment;
            }
            return comment;
          }),
        };
      },
      prepare(comment) {
        return { payload: { comment } };
      },
    },
    deleteCommentPostDetail: {
      reducer(state, action) {
        return {
          ...state,
          comments: state.comments.filter(
            (comment) => comment.id !== action.payload.commentId,
          ),
        };
      },
      prepare(commentId) {
        return { payload: { commentId } };
      },
    },
    joinParticipantEvent: {
      reducer(state, action) {
        return {
          ...state,
          participants: [action.payload.participant, ...state.participants],
        };
      },
      prepare(participant) {
        return { payload: { participant } };
      },
    },
    leaveParticipantEvent: {
      reducer(state, action) {
        return {
          ...state,
          participants: state.participants.filter(
            (participant) => participant.id !== action.payload.participantId,
          ),
        };
      },
      prepare(participantId) {
        return { payload: { participantId } };
      },
    },
    addBookmarkPostDetail(state, action) {
      return {
        ...state,
        bookmarks: [action.payload, ...state.bookmarks],
      };
    },
    removeBookmarkPostDetail(state, action) {
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.userId !== action.payload.userId,
        ),
      };
    },
  },
});

export const {
  receivePostDetail,
  clearPostDetail,
  updatePostDetail,
  deletePostDetail,
  addCommentPostDetail,
  editCommentPostDetail,
  deleteCommentPostDetail,
  joinParticipantEvent,
  leaveParticipantEvent,
  addBookmarkPostDetail,
  removeBookmarkPostDetail,
} = postDetailSlice.actions;

export default postDetailSlice.reducer;
