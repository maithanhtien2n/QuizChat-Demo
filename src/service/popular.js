export default {
    getPopularPosts() {
        return AxiosInstance({
            method: 'GET',
            url: 'posts/popular-posts',
            params: {
                pageSize: data?.pageSize || 0,
                currentPage: data?.currentPage || 0
            }
        });
    }
};
