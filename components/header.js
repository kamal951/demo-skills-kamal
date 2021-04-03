import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { login, logout, loginAsGuest } from '../redux/actions/userAction';
import styled from 'styled-components'
import Loading from './loading';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},

}));

const ModalContent = styled.div`
	width: 400px;
	background-color: white;
	border: solid 2px;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30px 50px 30px 50px;
`

const Hr = styled.hr`
	margin-top: 20px;
	margin-bottom: 20px;
	width: 80%;
`

export default function Header() {
	const classes = useStyles();
	const { user, is_login_loading, is_logged } = useSelector(state => state.userReducer)

	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (!is_login_loading) {
			setOpen(false);
		}
	}, [is_login_loading])


	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleLogin = () => {
		dispatch(login())
	}

	const handleLoginAsGuest = () => {
		dispatch(loginAsGuest())
	}
	

	const dispatch = useDispatch()

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>Demo Skills Kamal</Typography>
					{user && Object.keys(user).length !== 0 ?
						<Button color="inherit" onClick={() => dispatch(logout(user))}>Logout</Button>
						: <Button color="inherit" onClick={() => handleOpen()} >Login</Button>
					}
				</Toolbar>
			</AppBar>
			<Modal
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<ModalContent>
					<Avatar>
						<AccountCircleIcon />
					</Avatar>
					<Typography component="h1" variant="h5">Log in</Typography>
					<Hr />
					{is_login_loading ?
						<Loading /> :
						<>
							<Button style={{marginBottom: "20px"}} variant="outlined" color="inherit" onClick={() => handleLogin()} >Login with TMDB</Button>
							<Button variant="outlined" color="inherit" onClick={() => handleLoginAsGuest()} >Login as guest</Button>
						</>
					}
				</ModalContent>
			</Modal>
		</div>
	)
}