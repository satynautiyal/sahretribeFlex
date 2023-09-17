// import reverse from 'lodash/reverse';
// import sortBy from 'lodash/sortBy';
// import { storableError } from '../../util/errors';
// import { parse } from '../../util/urlHelpers';
// import { TRANSITIONS } from '../../util/transaction';
// import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';

// const sortedTransactions = txs =>
//   reverse(
//     sortBy(txs, tx => {
//       return tx.attributes ? tx.attributes.lastTransitionedAt : null;
//     })
//   );

// // ================ Action types ================ //
// //
// export const FETCH_ORDERS_OR_SALES_REQUEST = 'app/InboxPage/FETCH_ORDERS_OR_SALES_REQUEST';
// export const FETCH_ORDERS_OR_SALES_SUCCESS = 'app/InboxPage/FETCH_ORDERS_OR_SALES_SUCCESS';
// export const FETCH_ORDERS_OR_SALES_ERROR = 'app/InboxPage/FETCH_ORDERS_OR_SALES_ERROR';

// // ================ Reducer ================ //

// const entityRefs = entities =>
//   entities.map(entity => ({
//     id: entity.id,
//     type: entity.type,
//   }));

// const initialState = {
//   fetchInProgress: false,
//   fetchOrdersOrSalesError: null,
//   pagination: null,
//   transactionRefs: [],
// };

// export default function checkoutPageReducer(state = initialState, action = {}) {
//   const { type, payload } = action;
//   switch (type) {
//     case FETCH_ORDERS_OR_SALES_REQUEST:
//       return { ...state, fetchInProgress: true, fetchOrdersOrSalesError: null };
//     case FETCH_ORDERS_OR_SALES_SUCCESS: {
//       const transactions = sortedTransactions(payload.data.data);
//       return {
//         ...state,
//         fetchInProgress: false,
//         //
//         transactionRefs: entityRefs(transactions),
//         pagination: payload.data.meta,
//       };
//     }
//     case FETCH_ORDERS_OR_SALES_ERROR:
//       console.error(payload); // eslint-disable-line
//       return { ...state, fetchInProgress: false, fetchOrdersOrSalesError: payload };

//     default:
//       return state;
//   }
// }

// // ================ Action creators ================ //

// const fetchOrdersOrSalesRequest = () => ({ type: FETCH_ORDERS_OR_SALES_REQUEST });
// const fetchOrdersOrSalesSuccess = response => ({
//   type: FETCH_ORDERS_OR_SALES_SUCCESS,
//   payload: response,
// });
// const fetchOrdersOrSalesError = e => ({
//   type: FETCH_ORDERS_OR_SALES_ERROR,
//   error: true,
//   payload: e,
// });

// // ================ Thunks ================ //

// const INBOX_PAGE_SIZE = 10;
// ////
// export const loadData = (params, search) => (dispatch, getState, sdk) => {
//   const { isProSessions } = params;
//   //console.log(params, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

//   const onlyFilterValues = {
//     orders: 'order',
//     sales: 'sale',
//   };

//   //const onlyFilter = 'order';
//   // if (!onlyFilter) {
//   //   return Promise.reject(new Error(`Invalid tab for InboxPage: ${tab}`));
//   // }

//   dispatch(fetchOrdersOrSalesRequest());

//   const { page = 1 } = parse(search);

//   const apiQueryParams = {
//     only: isProSessions ? onlyFilterValues.sales : onlyFilterValues.orders,
//     lastTransitions: TRANSITIONS,
//     include: [
//       'provider',
//       'provider.profileImage',
//       'customer',
//       'customer.profileImage',
//       'booking',
//       'listing',
//     ],
//     'fields.transaction': [
//       'lastTransition',
//       'lastTransitionedAt',
//       'transitions',
//       'payinTotal',
//       'payoutTotal',
//     ],
//     'fields.user': ['profile.displayName', 'profile.abbreviatedName'],
//     'fields.image': ['variants.square-small', 'variants.square-small2x'],
//     page,
//     per_page: INBOX_PAGE_SIZE,
//   };

//   return sdk.transactions
//     .query(apiQueryParams)
//     .then(response => {
//       dispatch(addMarketplaceEntities(response));
//       dispatch(fetchOrdersOrSalesSuccess(response));
//       return response;
//     })
//     .catch(e => {
//       dispatch(fetchOrdersOrSalesError(storableError(e)));
//       throw e;
//     });
// };

// import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
// import { fetchCurrentUser } from '../../ducks/user.duck';
// import { denormalisedResponseEntities } from '../../util/data';
// import { storableError } from '../../util/errors';

// // ================ Action types ================ //

// export const SET_INITIAL_STATE = 'app/ProfilePage/SET_INITIAL_STATE';

// export const SHOW_USER_REQUEST = 'app/ProfilePage/SHOW_USER_REQUEST';
// export const SHOW_USER_SUCCESS = 'app/ProfilePage/SHOW_USER_SUCCESS';
// export const SHOW_USER_ERROR = 'app/ProfilePage/SHOW_USER_ERROR';

// export const QUERY_LISTINGS_REQUEST = 'app/ProfilePage/QUERY_LISTINGS_REQUEST';
// export const QUERY_LISTINGS_SUCCESS = 'app/ProfilePage/QUERY_LISTINGS_SUCCESS';
// export const QUERY_LISTINGS_ERROR = 'app/ProfilePage/QUERY_LISTINGS_ERROR';

// export const QUERY_REVIEWS_REQUEST = 'app/ProfilePage/QUERY_REVIEWS_REQUEST';
// export const QUERY_REVIEWS_SUCCESS = 'app/ProfilePage/QUERY_REVIEWS_SUCCESS';
// export const QUERY_REVIEWS_ERROR = 'app/ProfilePage/QUERY_REVIEWS_ERROR';

// export const QUERY_LISTING_REVIEWS_REQUEST = '/v1/api/reviews/query';

// //export const FETCH_ORDERS_OR_SALES_REQUEST = 'app/InboxPage/FETCH_ORDERS_OR_SALES_REQUEST';

// // ================ Reducer ================ //

// const initialState = {
//   userId: null,
//   userListingRefs: [],
//   userShowError: null,
//   queryListingsError: null,
//   reviews: [],
//   queryReviewsError: null,
// };

// export default function profilePageReducer(state = initialState, action = {}) {
//   const { type, payload } = action;
//   switch (type) {
//     case SET_INITIAL_STATE:
//       return { ...initialState };
//     case SHOW_USER_REQUEST:
//       return { ...state, userShowError: null, userId: payload.userId };
//     case SHOW_USER_SUCCESS:
//       return state;
//     case SHOW_USER_ERROR:
//       return { ...state, userShowError: payload };

//     case QUERY_LISTINGS_REQUEST:
//       return {
//         ...state,

//         // Empty listings only when user id changes
//         userListingRefs: payload.userId === state.userId ? state.userListingRefs : [],

//         queryListingsError: null,
//       };
//     case QUERY_LISTINGS_SUCCESS:
//       return { ...state, userListingRefs: payload.listingRefs };
//     case QUERY_LISTINGS_ERROR:
//       return { ...state, userListingRefs: [], queryListingsError: payload };
//     case QUERY_REVIEWS_REQUEST:
//       return { ...state, queryReviewsError: null };
//     case QUERY_REVIEWS_SUCCESS:
//       return { ...state, reviews: payload };
//     case QUERY_REVIEWS_ERROR:
//       return { ...state, reviews: [], queryReviewsError: payload };

//     case QUERY_LISTING_REVIEWS_REQUEST:
//       return { ...state };

//     default:
//       return state;
//   }
// }

// // ================ Action creators ================ //

// export const setInitialState = () => ({
//   type: SET_INITIAL_STATE,
// });

// export const showUserRequest = userId => ({
//   type: SHOW_USER_REQUEST,
//   payload: { userId },
// });

// export const showUserSuccess = () => ({
//   type: SHOW_USER_SUCCESS,
// });

// export const showUserError = e => ({
//   type: SHOW_USER_ERROR,
//   error: true,
//   payload: e,
// });

// export const queryListingReviewsRequest = listingId => ({
//   type: QUERY_LISTING_REVIEWS_REQUEST,
//   payload: { listingId },
// });

// export const queryListingsRequest = userId => ({
//   type: QUERY_LISTINGS_REQUEST,
//   payload: { userId },
// });

// export const queryListingsSuccess = listingRefs => ({
//   type: QUERY_LISTINGS_SUCCESS,
//   payload: { listingRefs },
// });

// export const queryListingsError = e => ({
//   type: QUERY_LISTINGS_ERROR,
//   error: true,
//   payload: e,
// });

// export const queryReviewsRequest = () => ({
//   type: QUERY_REVIEWS_REQUEST,
// });

// export const queryReviewsSuccess = reviews => ({
//   type: QUERY_REVIEWS_SUCCESS,
//   payload: reviews,
// });

// export const queryReviewsError = e => ({
//   type: QUERY_REVIEWS_ERROR,
//   error: true,
//   payload: e,
// });

// // ================ Thunks ================ //
// // Query all reviews about given listing
// // export const queryListingReviews = listingId => (dispatch, getState, sdk) => {
// //   return sdk.reviews
// //     .query({
// //       listingId: new UUID("c6ff7190-bdf7-47a0-8a2b-e3136e74334f'"),
// //     })
// //     .then(res => {
// //       // res.data contains the response data
// //     });
// // };

// export const queryUserListings = userId => (dispatch, getState, sdk) => {
//   // console.log(
//   //   userId,
//   //   'USERID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
//   // );
//   dispatch(queryListingsRequest(userId));
//   return sdk.listings
//     .query({
//       author_id: userId,
//       include: ['author', 'images'],
//       'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x'],
//     })
//     .then(response => {
//       // Pick only the id and type properties from the response listings
//       const listingRefs = response.data.data.map(({ id, type }) => ({ id, type }));
//       dispatch(addMarketplaceEntities(response));
//       dispatch(queryListingsSuccess(listingRefs));
//       return response;
//     })
//     .catch(e => dispatch(queryListingsError(storableError(e))));
// };

// export const queryUserReviews = userId => (dispatch, getState, sdk) => {
//   //console.log(userId, 'userId');
//   sdk.reviews
//     .query({
//       subject_id: userId,
//       state: 'public',
//       include: ['author', 'author.profileImage'],
//       'fields.image': ['variants.square-small', 'variants.square-small2x'],
//     })
//     .then(response => {
//       const reviews = denormalisedResponseEntities(response);
//       dispatch(queryReviewsSuccess(reviews));
//     })
//     .catch(e => dispatch(queryReviewsError(e)));
// };

// export const showUser = userId => (dispatch, getState, sdk) => {
//   //console.log(userId, 'userId');
//   dispatch(showUserRequest(userId));
//   return sdk.users
//     .show({
//       id: userId,
//       include: ['profileImage'],
//       'fields.image': ['variants.square-small', 'variants.square-small2x'],
//     })
//     .then(response => {
//       dispatch(addMarketplaceEntities(response));
//       dispatch(showUserSuccess());
//       return response;
//     })
//     .catch(e => dispatch(showUserError(storableError(e))));
// };

// export const loadData = userId => (dispatch, getState, sdk) => {
//   const currentUser = getState().user;
//   // console.log(
//   //   currentUser,
//   //   'currentUser############################################################################################'
//   // );
//   // Clear state so that previously loaded data is not visible
//   // in case this page load fails.
//   dispatch(setInitialState());

//   return Promise.all([
//     dispatch(fetchCurrentUser()),
//     dispatch(showUser(userId)),
//     dispatch(queryUserListings(userId)),
//     dispatch(queryUserReviews(userId)),
//   ]);
// };
