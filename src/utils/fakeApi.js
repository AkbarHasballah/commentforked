import { getRandomDate } from './date';

const authUser = {
  id: '1',
  username: 'Ers',
  email: 'NQpP1@example.com',
  role: 'company',
  profile: {
    name: 'Ervalsa Dwi Nanda',
    photo: 'https://i.pravatar.cc/300',
    headTitle: 'Software Engineer',
    phone: '+62 xxx xxxx xxx',
  },
  recentEvents: [
    // {
    //   id: '1',
    //   title: 'Event 1',
    // },
  ],
};

const posts = Array.from({ length: 100 }, (_, index) => {
  const startDate = getRandomDate(new Date(2023, 0, 1), new Date(2023, 11, 31));
  const endDate = getRandomDate(startDate, new Date(2024, 11, 31));

  return {
    id: `12dad3-1412da-2134d-141w1-${index + 1}`,
    title: `Event ${index + 1}`,
    category: 'Event',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    startDate: +startDate,
    endDate: +endDate,
    maxParticipant: 20,
    image: 'https://i.pravatar.cc/300',
    createdAt: '2023-01-01 00:00:00',
    ownerId: `${index + 1}`,
    bookmarks: [`${index + 1}`],
    totalParticipants: 1,
  };
});

const detailPost = {
  title: 'Event 1',
  category: 'event',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  startDate: '2023-01-01',
  endDate: '2023-01-10',
  maxParticipant: 20,
  image: 'https://i.pravatar.cc/300',
  createdAt: '2023-01-01 00:00:00',
  owner: {
    name: 'PT Pengembang Teknologi Indonesia',
    avatar: 'https://i.pravatar.cc/300',
    headTitle: 'Software Engineer',
  },
  participants: [],
  bookmarks: [],
  comments: [
    {
      id: 'comment-1',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      createdAt: '2023-01-01 00:00:00',
      owner: {
        name: 'Ervalsa Dwi Nanda',
        avatar: 'https://i.pravatar.cc/300',
        headTitle: 'Software Engineer',
      },
    },
  ],
};

const users = Array.from({ length: 20 }, (_, index) => {
  const role = Math.random() > 0.5 ? 'user' : 'company';
  return {
    id: `${index + 1}`,
    username: `user${index + 1}`,
    email: `user${index + 1}@example.com`,
    role,
    profile: {
      name: 'Ervalsa Dwi Nanda',
      photo: 'https://i.pravatar.cc/300',
      headTitle: 'Software Engineer',
      phone: '+62 xxx xxxx xxx',
    },
    recentEvents: [
      {
        id: `12dad3-1412da-2134d-141w1-${index + 2}`,
        title: `Event ${index + 2}`,
      },
    ],
  };
});

const fakeApi = (() => {
  const getAuthUser = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (authUser) {
          resolve(authUser);
        } else {
          reject(new Error('Not found'));
        }
      }, 1000);
    });
  };

  // Fungsi untuk mendapatkan daftar postingan
  const getPosts = async (page = 1, limit = 10) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedPosts = posts.slice(start, end);
        if (paginatedPosts.length > 0) {
          resolve({ posts: paginatedPosts, hasMore: end < posts.length });
        } else {
          reject(new Error('No more posts'));
        }
      }, 1000);
    });
  };

  const getPostsByTrends = async () => {
    return new Promise((resolve, reject) => {
      const eventTrends = posts
        .filter((post) => post.category === 'Event')
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        .slice(0, 20);
      setTimeout(() => {
        resolve(eventTrends);
        if (eventTrends.length > 0) {
        } else {
          reject(new Error('No more posts'));
        }
      }, 1000);
    });
  };

  const getPostsByUpcoming = async () => {
    return new Promise((resolve, reject) => {
      const eventUpcoming = posts
        .filter((post) => post.category === 'Event')
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .slice(0, 10);
      setTimeout(() => {
        resolve(eventUpcoming);
        if (eventUpcoming.length > 0) {
        } else {
          reject(new Error('No more posts'));
        }
      }, 1000);
    });
  };

  const getPostsByBookmark = async (userId) => {
    return new Promise((resolve, reject) => {
      const eventBookmark = posts.filter((post) =>
        post.bookmarks.includes(userId),
      );
      setTimeout(() => {
        if (eventBookmark.length > 0) {
          resolve(eventBookmark);
        } else {
          reject(new Error('No more posts'));
        }
      }, 1000);
    });
  };
  const getMyPosts = async (userId) => {
    return new Promise((resolve, reject) => {
      const myPosts = posts.filter((post) => post?.ownerId === userId);
      setTimeout(() => {
        if (myPosts.length > 0) {
          resolve(myPosts);
        } else {
          reject(new Error('No more posts'));
        }
      }, 1000);
    });
  };
  // Fungsi untuk mendapatkan detail postingan berdasarkan ID
  const getDetailPost = async (postId) => {
    return new Promise((resolve, reject) => {
      const detailPostById = posts.find((post) => post.id === postId);
      const detailPostTotal = {
        ...detailPostById,
        owner: users.find((user) => user.id === detailPostById.ownerId),
      };
      setTimeout(() => {
        if (detailPostTotal) {
          resolve(detailPostTotal);
        } else {
          reject(new Error('Not found'));
        }
      }, 1000);
    });
  };

  // Fungsi untuk mendapatkan daftar pengguna
  const getUsers = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (users.length > 0) {
          resolve(users);
        } else {
          reject(new Error('Not found'));
        }
      }, 1000);
    });
  };

  const getDetailUser = async (userId) => {
    try {
      const detailUser = users.find((user) => user.id === userId);
      if (!detailUser) throw new Error('User not found');

      const detailUserWithEvent = {
        ...detailUser,
        recentEvents: detailUser.recentEvents.map((event) => {
          const post = posts.find((post) => post.id === event.id);
          if (!post) throw new Error(`Event with ID ${event.id} not found`);
          return post;
        }),
      };

      return new Promise((resolve) => {
        setTimeout(() => resolve(detailUserWithEvent), 1000);
      });
    } catch (error) {
      return new Promise((_, reject) => {
        setTimeout(() => reject(error), 1000);
      });
    }
  };

  const createPost = async (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data) {
          resolve(data);
        } else {
          reject(new Error('Not found'));
        }
      }, 1000);
    });
  };

  return {
    getAuthUser,
    getPosts,
    getDetailPost,
    getPostsByTrends,
    getPostsByUpcoming,
    getPostsByBookmark,
    getMyPosts,
    getUsers,
    getDetailUser,
    createPost,
  };
})();

export default fakeApi;
