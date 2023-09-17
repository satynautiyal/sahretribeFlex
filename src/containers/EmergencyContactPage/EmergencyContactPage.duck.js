import merge from 'lodash/merge';
import { denormalisedResponseEntities } from '../../util/data';
import { storableError } from '../../util/errors';
import { currentUserShowSuccess } from '../../ducks/user.duck';

// ================ Action types ================ //

export const SAVE_CONTACT_DETAILS_REQUEST = 'app/ContactDetailsPage/SAVE_CONTACT_DETAILS_REQUEST';
export const SAVE_CONTACT_DETAILS_SUCCESS = 'app/ContactDetailsPage/SAVE_CONTACT_DETAILS_SUCCESS';
export const SAVE_NAME_ERROR = 'app/ContactDetailsPage/SAVE_NAME_ERROR';
export const SAVE_PHONE_NUMBER_ERROR = 'app/ContactDetailsPage/SAVE_PHONE_NUMBER_ERROR';

export const SAVE_CONTACT_DETAILS_CLEAR = 'app/ContactDetailsPage/SAVE_CONTACT_DETAILS_CLEAR';

// ================ Reducer ================ //

const initialState = {
  saveNameError: null,
  savePhoneNumberError: null,
  saveContactDetailsInProgress: false,
  contactDetailsChanged: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SAVE_CONTACT_DETAILS_REQUEST:
      return {
        ...state,
        saveContactDetailsInProgress: true,
        saveNameError: null,
        savePhoneNumberError: null,
        contactDetailsChanged: false,
      };
    case SAVE_CONTACT_DETAILS_SUCCESS:
      return { ...state, saveContactDetailsInProgress: false, contactDetailsChanged: true };
    case SAVE_NAME_ERROR:
      return { ...state, saveContactDetailsInProgress: false, saveNameError: payload };
    case SAVE_PHONE_NUMBER_ERROR:
      return { ...state, saveContactDetailsInProgress: false, savePhoneNumberError: payload };

    case SAVE_CONTACT_DETAILS_CLEAR:
      return {
        ...state,
        saveContactDetailsInProgress: false,
        saveNameError: null,
        savePhoneNumberError: null,
        contactDetailsChanged: false,
      };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const saveContactDetailsRequest = () => ({ type: SAVE_CONTACT_DETAILS_REQUEST });
export const saveContactDetailsSuccess = () => ({ type: SAVE_CONTACT_DETAILS_SUCCESS });
export const saveNameError = error => ({
  type: SAVE_NAME_ERROR,
  payload: error,
  error: true,
});
export const savePhoneNumberError = error => ({
  type: SAVE_PHONE_NUMBER_ERROR,
  payload: error,
  error: true,
});

export const saveContactDetailsClear = () => ({ type: SAVE_CONTACT_DETAILS_CLEAR });

// ================ Thunks ================ //

/**
 * Make a phone number update request to the API and return the current user.
 */
const requestSaveEmergencyData = params => (dispatch, getState, sdk) => {
  const emergencyPhoneNumber = params.emergencyPhoneNumber;
  const emergencyContactName = params.emergencyContactName;
  const emergencycountrycode = params.emergencycountrycode;


  return sdk.currentUser
    .updateProfile(
      { protectedData: { emergencyPhoneNumber, emergencyContactName,emergencycountrycode } },
      {
        expand: true,
        include: ['profileImage'],
        'fields.image': ['variants.square-small', 'variants.square-small2x'],
      }
    )
    .then(response => {
      const entities = denormalisedResponseEntities(response);
      if (entities.length !== 1) {
        throw new Error('Expected a resource in the sdk.currentUser.updateProfile response');
      }

      const currentUser = entities[0];
      return currentUser;
    })
    .catch(e => {
      dispatch(savePhoneNumberError(storableError(e)));
      // pass the same error so that the SAVE_CONTACT_DETAILS_SUCCESS
      // action will not be fired
      throw e;
    });
};

/**
 * Make a email update request to the API and return the current user.
 */
// const requestSaveName = params => (dispatch, getState, sdk) => {
//   const emergencyContactName = params.emergencyContactName;

//   return sdk.currentUser
//     .updateProfile(
//       { protectedData: { emergencyContactName } },
//       {
//         expand: true,
//         include: ['profileImage'],
//         'fields.image': ['variants.square-small', 'variants.square-small2x'],
//       }
//     )
//     .then(response => {
//       const entities = denormalisedResponseEntities(response);
//       if (entities.length !== 1) {
//         throw new Error('Expected a resource in the sdk.currentUser.updateProfile response');
//       }

//       const currentUser = entities[0];
//       return currentUser;
//     })
//     .catch(e => {
//       dispatch(savePhoneNumberError(storableError(e)));
//       // pass the same error so that the SAVE_CONTACT_DETAILS_SUCCESS
//       // action will not be fired
//       throw e;
//     });
// };

/**
 * Save email and update the current user.
 */
const saveData = params => (dispatch, getState, sdk) => {
  return (
    dispatch(requestSaveEmergencyData(params))
      .then(user => {
        dispatch(currentUserShowSuccess(user));
        dispatch(saveContactDetailsSuccess());
      })
      // error action dispatched in requestSaveEmail
      .catch(e => null)
  );
};

/**
 * Save phone number and update the current user.
 */
// const savePhoneNumber = params => (dispatch, getState, sdk) => {
//   return (
//     dispatch(requestSavePhoneNumber(params))
//       .then(user => {
//         dispatch(currentUserShowSuccess(user));
//         dispatch(saveContactDetailsSuccess());
//       })
//       // error action dispatched in requestSavePhoneNumber
//       .catch(e => null)
//   );
// };

/**
 * Save email and phone number and update the current user.
 */
const saveNameAndPhoneNumber = params => (dispatch, getState, sdk) => {
  const { emergencyContactName, emergencyPhoneNumber,emergencycountrycode } = params;

  // order of promises: 1. email, 2. phone number
  // const promises = [
  return dispatch(saveData({ emergencyContactName, emergencyPhoneNumber,emergencycountrycode }))
    .then(values => {
      const protectedData = values.attributes.profile.protectedData;
      const phoneNumberMergeSource = { attributes: { profile: { protectedData } } };
      dispatch(currentUserShowSuccess(phoneNumberMergeSource));
      dispatch(saveContactDetailsSuccess());
    })
    .catch(e => null);
  //   dispatch(requestSavePhoneNumber({ phoneNumber })),
  // ];

  // return Promise.all(promises)
  //   .then(values => {
  //     // Array of two user objects is resolved
  //     // the first one is from the email update
  //     // the second one is from the phone number update

  //     const saveEmailUser = values[0];
  //     const savePhoneNumberUser = values[1];

  //     // merge the protected data from the user object returned
  //     // by the phone update operation
  //     const protectedData = savePhoneNumberUser.attributes.profile.protectedData;
  //     const phoneNumberMergeSource = { attributes: { profile: { protectedData } } };

  //     const currentUser = merge(saveEmailUser, phoneNumberMergeSource);
  //     dispatch(currentUserShowSuccess(currentUser));
  //     dispatch(saveContactDetailsSuccess());
  //   })
  //   .catch(e => null);
};

/**
 * Update contact details, actions depend on which data has changed
 */
export const saveContactDetails = params => (dispatch, getState, sdk) => {
  const { emergencyContactName, emergencyPhoneNumber,emergencycountrycode, currentPhoneNumber, currentName } = params;
  const nameChanged = emergencyContactName !== currentName;
  const phoneNumberChanged = emergencyPhoneNumber !== currentPhoneNumber;

  return dispatch(saveData({ emergencyContactName, emergencyPhoneNumber,emergencycountrycode }));
};
