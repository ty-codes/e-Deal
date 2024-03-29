import React from 'react'
import {AppBar, Toolbar, IconButton , Badge, Typography } from '@material-ui/core';
import {  ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/logo.png';
import useStyles from './styles';
import {Link, useLocation} from 'react-router-dom';

const NavBar = ({totalItems}) => {
	const classes = useStyles();
	const location = useLocation();

    return (
			<>
				<AppBar position='fixed' className={classes.appBar}  style={{background: '#fc721e'}} color='inherit'>
						<Toolbar>
								<Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
										<img src={logo} alt='e-deal' height='25px' className={classes.image} />
										e-Deal
								</Typography>
								<div className={classes.grow} />
								{ location.pathname === '/' && (
									<div className={classes.button}>
										<IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
												<Badge classes={{badge: classes.customBadge}} overlap='rectangular' badgeContent={totalItems} color='secondary'>
														<ShoppingCart />
												</Badge>
										</IconButton>
								</div>
								)}
						</Toolbar>
				</AppBar>
			</>
    )
}

export default NavBar
