import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SearchIcon from '@material-ui/icons/Search';
import Link from 'next/link';
import { Tooltip } from '@material-ui/core';

export const mainListItems = (
    <div>

        <Link href={'/'} passHref>
            <ListItem button component="a">
                <ListItemIcon>
                    <Tooltip title="Movies">
                        <MovieIcon />
                    </Tooltip>
                </ListItemIcon>
                <Tooltip title="Movies">
                    <ListItemText primary="Movies" />
                </Tooltip>
            </ListItem>
        </Link>

        <Link href={'/series'} passHref>
            <ListItem button component="a">
                <ListItemIcon>
                    <Tooltip title="Series">
                        <TvIcon />
                    </Tooltip>
                </ListItemIcon>
                <Tooltip title="Series">
                    <ListItemText primary="Series" />
                </Tooltip>
            </ListItem>
        </Link>

        <Tooltip title="Search movie">
            <Link href={'/search'} passHref>
                <ListItem button component="a">
                    <ListItemIcon>
                        <Tooltip title="Search movie">
                            <SearchIcon />
                        </Tooltip>
                    </ListItemIcon>
                    <Tooltip title="Search movie">
                        <ListItemText primary="Search" />
                    </Tooltip>
                </ListItem>
            </Link>
        </Tooltip>
    </div>
);

export const connectedUserListItems = (
    <div>
        <Link href={'/watchlist'} passHref>
            <ListItem button component="a">
                <ListItemIcon>
                    <Tooltip title="Watchlist">
                        <VisibilityIcon />
                    </Tooltip>
                </ListItemIcon>
                <Tooltip title="Watchlist">
                    <ListItemText primary="Watchlist" />
                </Tooltip>
            </ListItem>
        </Link>

        <Link href={'/favorites'} passHref>
            <ListItem button component="a">
                <ListItemIcon>
                    <Tooltip title="Favorites">
                        <FavoriteBorderIcon />
                    </Tooltip>
                </ListItemIcon>
                <Tooltip title="Favorites">
                    <ListItemText primary="Favorites" />
                </Tooltip>
            </ListItem>
        </Link>

    </div>
);