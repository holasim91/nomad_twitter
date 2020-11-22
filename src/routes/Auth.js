import { authService, firebaseInstance } from 'myBase';
import React, { useCallback, useState } from 'react'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState('')
    const onChange = (e) =>{
        const {target:{name, value}} = e
        if(name === 'email'){
            setEmail(value)
        }
        else if(name ==='password'){
            setPassword(value)
        }
    }
    const onSubmit = async(e) =>{
        e.preventDefault()
        try{
            let data;
            if(newAccount){
                //create new accont
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else{
                // login
                data = await authService.signInWithEmailAndPassword(email, password)
            }
            console.log(data)
        }catch(error){
            setError(error.message)
        }
    }

    const toggleAccount = useCallback(() => {
      setNewAccount((prev) => !prev);
    }, []);

    let provider
    const socialClick =
        async(e) => {
            const {target:{name}} = e
            if(name === 'google'){
                provider = new firebaseInstance.auth.GoogleAuthProvider();
            }else if(name === 'github'){
                provider = new firebaseInstance.auth.GithubAuthProvider();
            }
            const data = await authService.signInWithPopup(provider)
            console.log(data)
        }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name='email' type="email" placeholder="email" required={email} onChange={onChange}/>
        <input name='password' type="password" placeholder="password" required value={password} onChange={onChange}/>
        <input type="submit" value={newAccount ? 'Create Account':"Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount? 'Sign in': 'Create Account'}</span>
      <div>
        <button name='google' onClick={socialClick}>Continue With Google</button>
        <button name='github' onClick={socialClick}>Continue With Github</button>
      </div>
    </div>
  );
};

export default Auth;