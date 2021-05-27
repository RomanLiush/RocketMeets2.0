// import React from 'react';
// import './signin.css';
// import Input from "../utils/Input/Input";
//
// const Registaration = () => {
//     return (
//         <div className={'registration'}>
//             <div className="registration__header">Sing Up</div>
//             <Input type={'text'} placeholder={'Enter name...'}/>
//             <Input type={'text'} placeholder={'Enter name...'}/>
//             <Input type={'text'} placeholder={'Enter name...'}/>
//             <Input type={'text'} placeholder={'Enter name...'}/>
//             <div className={'registration__btn'}>SignIn Up</div>
//         </div>
//     );
// };
//
// export default Registaration;

import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import SignUpForm from "../SignUp/SignUpForm";

import Navbar from "../Navbar/Navbar";
import SignInForm from "./SignInForm";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                RocketSoft
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();

    const [isSignIn, setSignIn] = useState(true);

    return (
        <>
            <Navbar/>
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        {/*<Avatar className={classes.avatar}>*/}
                        {/*    <LockOutlinedIcon/>*/}
                        {/*</Avatar>*/}
                        <Typography component="h1" variant="h5">
                            {/*{isSignIn && "SignIn In"}*/}
                            {/*{!isSignIn && "SignIn Up"}*/}
                            Sign In
                        </Typography>
                        <SignInForm/>
                        {/*{isSignIn && <SignInForm/>}*/}
                        {/*{!isSignIn && <SignUpForm/>}*/}
                        <Grid container justify="flex-end">
                            <Grid item
                                  onClick={() => setSignIn(prevState => !prevState)}
                            >
                                <Link href="/registration" variant="body2">
                                    "Don't have an account? Sign Up"
                                </Link>
                                {/*{!isSignIn && <Link href="/login" variant="body2">*/}
                                {/*    "Already have an account? Sign In"*/}
                                {/*</Link>}*/}
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}
