import {combineReducers} from 'redux';
import AuthAdminReducer from './AuthAdminReducer'
import ItemReducer from './ItemReducer'
import CategoryReducer from './CategoryReducer'
import SongReducer from './SongReducer';
import FavoritesReducer from './FavoritesReducer';
export default combineReducers({
    authAdmin: AuthAdminReducer,
    ItemAdmin: ItemReducer,
    CategoryAdmin:CategoryReducer,
    SongAdmin:SongReducer,
    FavoritesAdmin:FavoritesReducer,
})