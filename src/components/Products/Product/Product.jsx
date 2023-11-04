import React, {useState} from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Dialog, DialogContent, Button, Collapse } from '@material-ui/core';
import {AddShoppingCart, EmailOutlined, ExpandLessOutlined, ExpandMoreOutlined} from '@material-ui/icons';
import useStyles from './styles';


const Product = ({ product, onAddToCart}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setIsOpen(true);
    }
    
    const handleExpansion = () => {
      !isExpanded ? setIsExpanded(true) : setIsExpanded(false)
    }

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography className={classes.name} variant='subtitle2' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography className={classes.price_text} variant='subtitle1'>
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography className={`${classes.description} text-description`} dangerouslySetInnerHTML={{__html:product.description.slice(0, 120)}} variant='body2' color='textSecondary'
                 />
            </CardContent>
            
            <CardActions disableSpacing  className={classes.cardActions}>
                <IconButton style={{backgroundColor: '#fc721e'}} aria-label='Add to Cart' onClick={handleClickOpen}>
                    <AddShoppingCart style={{color: 'black'}} className={classes.cart_icon} />
                </IconButton>
                <Dialog
                fullWidth
                
                PaperComponent={DialogContent}
                maxWidth='sm'
                scroll='paper'
                open={isOpen}
                onClose={()=> setIsOpen(false)}
                >
                    <DialogContent>
                      <div className={classes.wrapper}>
                        <img className={classes.img} src={product.image.url} alt='product img' title='product_img' />
                        <hr className={classes.demarcation} />
                        <div className={classes.name_wrap}>
                          <Typography className={classes.product_name} variant='body1'  gutterBottom>
                            {product.name}
                          </Typography>
                          <Typography className={classes.price_text} variant='body1'>
                              {product.price.formatted_with_symbol}
                          </Typography>
                        </div>
                        <div className={classes.product_details_wrap}>
                           <Typography variant='h6' className={classes.product_details} >
                            PRODUCT DETAILS                     
                          </Typography>
                            <IconButton style={{backgroundColor: '#fc721e', marginRight: '20px',height: '30px', width: '30px'}} 
                            aria-label='Expand/Collapse' onClick={handleExpansion}>
                                {isExpanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined /> }
                            </IconButton>
                           
                        </div>
                        
                  
                        <Collapse  in={isExpanded} collapsedSize= '10px' timeout='auto' >
                          <Typography dangerouslySetInnerHTML={{__html:product.description}}
                           className={classes.product_description} variant='body2' color='textSecondary'/> 

                        </Collapse>


                        
                        <div className={classes.contact}>
                            <IconButton style={{backgroundColor: '#fc721e'}} aria-label='Contact' onClick={handleClickOpen}>
                                <EmailOutlined />
                            </IconButton>
                            <Button onClick={() => onAddToCart(product.id, 1)} className={classes.cart_button} size='medium' type='button' variant='contained' >ADD TO CART</Button>
                        </div>
                        <div className={classes.spacing}></div>

                      </div>
                    </DialogContent>
                </Dialog>
            </CardActions>
        </Card>
    )
}

export default Product;
