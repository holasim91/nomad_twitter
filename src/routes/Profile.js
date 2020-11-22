import { authService } from 'myBase';
import React from 'react'


const Profile = () => {
    const onLogOutClick = () => {
        authService.signOut()
    }
  return(
  <button onClick={onLogOutClick}>LOG OUT</button>
  )
};
export default Profile
