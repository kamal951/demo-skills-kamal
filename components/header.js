import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { login } from '../redux/actions/userAction';

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

export default function Header() {
	const classes = useStyles();

	const user = useSelector(state => state.userReducer.user)
	const dispatch = useDispatch()

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>Demo Skills Kamal</Typography>
					{user.success !== undefined ?
						<Typography variant="h6" >Logged In!</Typography>
						: <Button color="inherit" onClick={() => { dispatch(login()) }}>Login</Button>}
				</Toolbar>
			</AppBar>
		</div>
	)
}