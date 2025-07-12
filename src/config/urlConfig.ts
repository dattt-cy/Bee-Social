const UrlConfig: any = {
  user: {
    login: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/login`,
    signup: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/signup`,
    refresh: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/refresh` // ✅ Fix: Add full domain
  },
  me: {
    getMe: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/me`,
    checkId: (id: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/checkId/${id}`,
    updateProfile: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/updateMe`
  },
  otherUsers: {
    getProfileByID: (id: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/getProfileByID/${id}` // ✅ Fix: Remove :id placeholder
  },
  posts: {
    createPost: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts`,
    getPosts: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts`,
    getComments: (postId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/${postId}/comments`,
    getMyPosts: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/me`,
    likePost: (postId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/${postId}/like`,
    unlikePost: (postId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/${postId}/like`,
    checkLikePost: (postId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/${postId}/like`,
    getPostByUserId: (userId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/getPostByUserId/${userId}`,
    deletePost: (postId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/${postId}`,
    update: (postId: string | undefined) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/${postId}`,
    getUsersLikedPost: (postId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/${postId}/users/like`,
    getUsersSharedPost: (postId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/${postId}/users/share`,
    getRandomPost: () => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/random`
  },
  comments: {
    likeComment: (commentId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/comments/${commentId}/like`,
    unlikeComment: (commentId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/comments/${commentId}/like`,
    createComment: (postId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/${postId}/comments`,
    getReplyComments: (postId: string, commentId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/${postId}/comments/${commentId}`,
    getCommentById: (commentId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/comments/id/${commentId}`,
    getUsersLikedComment: (commentId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/comments/users/${commentId}`,
    updateComment: (postId: string, commentId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/${postId}/comments/${commentId}`,
    deleteComment: (postId: string, commentId: string) => `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/posts/${postId}/comments/${commentId}`
  },
  search: {
    searchUsers: (q: string, limit: number | undefined = undefined) => 
      `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/search/users?q=${q}${limit ? `&limit=${limit}` : ''}`,
    searchPosts: (q: string, media: string | null = null, sort: string = '-createdAt', limit: number = 10) =>
      `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/search/posts?q=${q}${media ? `&media=${media}` : ''}&sort=${sort}&limit=${limit}`
  }
}

export default UrlConfig
