import React from 'react';
import {  fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

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

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>Demo Skills Kamal</Typography>
				</Toolbar>
			</AppBar>
		</>
	)
}