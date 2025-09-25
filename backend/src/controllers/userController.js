import { createUser,
    getUsersService,
    getUserByIdService,
    deleteUserByIdService,
    updateUserByIdService
} from "../models/userService.js";
import {handleResponse} from "../utils/utilFuncs.js";


export const createNewUser = async (req, res, next) => {
  const newUser = await createUser(req.body);
  handleResponse(res, 201, "User created successfully", newUser);
};

export const getUsers = async (req, res, next) => {
  const users = await getUsersService();
  handleResponse(res, 200, "Users fetched successfully", users);
};

export const getUserById = async (req, res, next) => {
  const user = await getUserByIdService(req.params.id);
  if(!user){
    return handleResponse(res,404,"User Not Found");
  }
  return handleResponse(res, 200, "User fetched successfully", user);
};

export const deleteUserById = async (req, res, next) => {
  
  const deletedUser = await deleteUserByIdService(req.params.id);
  if(!deletedUser){
    return handleResponse(res,404,"User Not Found");
  }
  return handleResponse(res, 200, "User deleted successfully", deletedUser);
};
export const updateUserById = async (req, res, next) => {
  const user = await getUserByIdService(req.params.id);
  if(!user){
    return handleResponse(res,404,"User Not Found");
  }
  const updatedUser = await updateUserByIdService(req.params.id,req.body);
  return handleResponse(res, 200, "User updated successfully", updatedUser);
};