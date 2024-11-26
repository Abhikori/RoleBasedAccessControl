export const initialState = {
  members: [],
  userCounter: 0, // Tracks the last user ID
  creatorCounter: 0, // Tracks the last creator ID
};

export const actionTypes = {
  DELETE_MEMBER: "DELETE_MEMBER",
  ADD_MEMBER: "ADD_MEMBER",
  TOGGLE_ACTIVE: "TOGGLE_ACTIVE",
  TOGGLE_PERMISSION: "TOGGLE_PERMISSION",
};

export const reducer = (state, action) => {
  switch (action.type) {
    

    case actionTypes.DELETE_MEMBER: {
      return {
        ...state,
        members: state.members.filter(
          (member) => !(member.id === action.id && member.role === action.role)
        ),
      };
    }

    case actionTypes.TOGGLE_ACTIVE: {
      return {
        ...state,
        members: state.members.map((member) =>
          member.id === action.id && member.role === action.role
            ? { ...member, active: !member.active }
            : member
        ),
      };
    }
    case actionTypes.ADD_MEMBER:
      const isUser = action.payload.role === "user"; // Check the role being added
      const isCreator = action.payload.role === "creator";

      return {
        ...state,
        userCounter: isUser ? state.userCounter + 1 : state.userCounter, // Increment user counter if user
        creatorCounter: isCreator
          ? state.creatorCounter + 1
          : state.creatorCounter, // Increment creator counter if creator
        members: [
          ...state.members,
          {
            id: isUser
              ? state.userCounter + 1 // Assign next user ID
              : isCreator
              ? state.creatorCounter + 1 // Assign next creator ID
              : state.members.length > 0
              ? Math.max(...state.members.map((member) => member.id)) + 1
              : 1, // Fallback for other roles
            email: action.payload.email,
            name: action.payload.name,
            role: action.payload.role,
            active: true, // Default status
            permissions: isUser
          ? { read: true, write: false, delete: false } // Default permissions for user
          : isCreator
          ? { read: true, write: true, delete: true } // Default permissions for creator
          : { read: false, write: false, delete: false }, // Default permissions
          },
        ],
      };

    case actionTypes.TOGGLE_FOLLOW:
      return {
        ...state,
        members: state.members.map((member) =>
          member.id === action.id
            ? { ...member, isFollowing: !member.isFollowing }
            : member
        ),
      };
      case actionTypes.TOGGLE_PERMISSION:
        return {
          ...state,
          members: state.members.map((member) => 
            member.id === action.payload.id && member.role === action.payload.role  // Check both id and role
              ? {
                  ...member,
                  permissions: {
                    ...member.permissions,
                    [action.payload.perm]: !member.permissions[action.payload.perm],  // Toggle the permission
                  },
                }
              : member
          ),
        };
    default:
      return state;
  }
};
