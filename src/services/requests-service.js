const ApiError = require("../utils/errors/ApiError");
const { statusCodes, errors } = require("../utils/errors/errors");
const { RequestRepository } = require("./../repositories/index");
const FriendService = require("./friends-service");
// const { Op } = require("sequelize");
class RequestService {
  static async sendRequest(from, to) {
    try {
      const filter = {
        from,
        to,
      };
      const response = await RequestRepository.getOne(filter);
      if (response)
        throw new ApiError(
          "you have already sent the request",
          statusCodes.BadRequest,
          errors.BadRequest
        );
      const data = { from, to };
      const result = await RequestRepository.create(data);
      return result;
    } catch (err) {
      throw err;
    }
  }
  static async acceptRequest(request_id, my_id) {
    try {
      const filter = { id: request_id, to: my_id };
      const response = await RequestRepository.getOne(filter);
      if (!response)
        throw new ApiError(
          "invalid request id or you're not authorized to accept this request"
        );
      const result = await FriendService.acceptRequest(response.from, my_id);
      console.log(request_id);
      await RequestRepository.deleteOne(request_id);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = RequestService;
