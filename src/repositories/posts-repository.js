const { Post, PostAttachment } = require("./../models/index");
const { Like } = require("./../models/index");
class PostRepository {
  static async create(data) {
    try {
      const post = await Post.create(data);
      return post;
    } catch (err) {
      throw err;
    }
  }
  static async getMany(filter, pagination) {
    try {
      const posts = await Post.findAll({
        where: filter,
        ...pagination,
        include: [{ model: Like, required: false }],
        order: [["createdAt", "DESC"]],
      });
      return posts;
    } catch (err) {
      throw err;
    }
  }
  static async getOne(filter) {
    try {
      const post = await Post.findOne({ where: filter });
      return post;
    } catch (err) {
      throw err;
    }
  }
  static async delete(filter) {
    try {
      await Post.destroy({ where: filter });
      return null;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PostRepository;
