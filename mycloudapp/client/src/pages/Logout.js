import React from 'react';
import firebase from 'firebase';
import { Button} from 'reactstrap';

const logOutUser = () => {
 firebase.auth().signOut();
};
const LogOut = () => {
 return <Button onClick={logOutUser} children="Log Out" />;
};
export default LogOut;