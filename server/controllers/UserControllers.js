import User from "../models/UserModel.js";

export const GetUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const GetUserFriends = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    const userFriends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const FormattedFriends = userFriends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(FormattedFriends);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const AddRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    console.log(user, friend);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((uid) => uid !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const userFriends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const FormattedFriends = userFriends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(FormattedFriends);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
