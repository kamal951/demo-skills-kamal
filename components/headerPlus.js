import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { connectedUserListItems, mainListItems } from './listItems';
import { login, loginAsGuest, logout } from '../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styled from 'styled-components';
import Loading from './loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuIcon from '@material-ui/icons/Menu';

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

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://kamal-allali.fr/">
				Kamal ALLALI
      </Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
}));

export default function HeaderPlus(props) {
	const classes = useStyles();
	const { user, is_login_loading, login_type } = useSelector(state => state.userReducer)
	const [open, setOpen] = React.useState(false);
	const [openModal, setOpenModal] = React.useState(false);

	useEffect(() => {
		if (!is_login_loading) {
			setOpenModal(false);
		}
	}, [is_login_loading])

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpenModal(true);
	};

	const handleClose = () => {
		setOpenModal(false);
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
			<CssBaseline />
			<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
					>
						<MenuIcon />
					</IconButton>
					<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
						Demo skills kamal
          </Typography>
					{user && Object.keys(user).length !== 0 ?
						<Button color="inherit" onClick={() => dispatch(logout(user))}>Logout</Button>
						: <Button color="inherit" onClick={() => handleOpen()} >Login</Button>
					}
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>{mainListItems}</List>
				{login_type === "user" ?
					<>
						<Divider />
						<List>{connectedUserListItems}</List>
					</> : null
				}
			</Drawer>
			<main className={classes.content}>
				<ToastContainer autoClose={2000} style={{ paddingTop: "60px" }} />
				<div className={classes.appBarSpacer} />
				<Container className={classes.container}>
					<Grid container spacing={3}>
						{props.children}
					</Grid>
					<Box pt={4}>
						<Copyright />
					</Box>
				</Container>
			</main>
			<Modal
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
				open={openModal}
				disableBackdropClick={true}
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
							<Button style={{ marginBottom: "20px" }} variant="outlined" color="inherit" onClick={() => handleLogin()} >Login with TMDB</Button>
							<Button variant="outlined" color="inherit" onClick={() => handleLoginAsGuest()} >Login as guest</Button>
						</>
					}
				</ModalContent>
			</Modal>
		</div>
	);
}