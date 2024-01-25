import {Box,TextField,Button,styled, Typography} from '@mui/material'
import logo from "../../assets/images/CreativeContent_logo.png"
import { useState } from 'react'


// style apply to components
const Component=styled(Box)`
    width:400px;
    margin:auto;
`

const Image=styled('img')({
    width:200
})

const Wrapper=styled(Box)`
    margin-top:-30px;
`

const LoginButton=styled(Button)`
    text-transform:none;
    background:#FF3131;
    color:#fff
`

const SignupButton=styled(Button)`
    background:#2874f0;
    color:#fff;
    text-transform:none;
`

const signupInitialValues={
    name:"",
    username:"",
    password:""
}

function Login(){

    const [accountForm,setAccountForm]=useState("loginForm")
    const [signUpDate,setSignUpData]=useState(signupInitialValues)

    //switching forms
    const toggleForm =()=>{
        accountForm==="loginForm" ? setAccountForm("signUpForm") : setAccountForm("loginForm")
    }

    const OnInputChange= (e)=>{
        setSignUpData({...signUpDate,[e.target.name]:e.target.value})
    }

    const signupUser =()=>{
        
    }

    return(
        <>
            <Component className="bg-light py-3 px-3 rounded shadow">
                  <Image src={logo} className='img-fluid'/><br />
                  
                  {
                    accountForm==="loginForm" ?
                        <Wrapper>
                            <h2>Login Form</h2>
                        <TextField id="standard-basic" label="Username" variant="standard" /><br /><br />
                        <TextField id="standard-basic" label="Password" variant="standard" /> <br /><br /><br />
                        <LoginButton variant="contained">Login</LoginButton>
                        <Typography style={{textAlign:'center'}}>OR</Typography>
                        <SignupButton variant="contained" onClick={toggleForm}>Create an Account</SignupButton><br /><br />
                    </Wrapper>
                  :
                    <Wrapper>
                        <h2>Sign Up Form</h2>
                        <TextField id="standard-basic" label="Enter Name" onChange={(e)=>OnInputChange(e)} name="name" variant="standard" /><br /><br />
                        <TextField id="standard-basic" label="Enter Username" onChange={(e)=>OnInputChange(e)} name="username" variant="standard" /><br /><br />
                        <TextField id="standard-basic" label="Enter Password" onChange={(e)=>OnInputChange(e)} name="password" variant="standard" /> <br /><br /><br />
                        <SignupButton variant="contained" onClick={signupUser}>SignUp</SignupButton>
                        <Typography style={{textAlign:'center'}}>OR</Typography>
                        <LoginButton variant="contained" onClick={toggleForm}>Already have an account</LoginButton><br /><br />
                    </Wrapper>

                  }
                
            </Component>  
        </>
    )
}

export default Login