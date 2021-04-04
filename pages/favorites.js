import { Alert } from '@material-ui/lab';
import React from 'react';
import { useSelector } from 'react-redux';
import { LikesTab } from '../components/likesTab';

export default function Favorites() {
    const { login_type } = useSelector(state => state.userReducer)

    return (
        <>
            { login_type !== "user" ?
                <Alert style={{ width: '100%' }} severity="error">You need to be connected to your account to see this page!</Alert> :
                <LikesTab />
            }
        </>
    )
}
