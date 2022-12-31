import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Toolbar } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Prompt, useHistory } from "react-router-dom";
import { Delete_Products_Action } from "../Store/Actions";
import SearchBar from 'material-ui-search-bar'
import { Store } from "../Store/Store";
import React from "react";

export function increase(number) {
    return number
};
function ProductsList(props) {
    const history = useHistory()
    const productList = useSelector((state) => state.Products);
    const userdata = useSelector((udata) => udata.user)
    const issignedin = useSelector((state) => state.signedin);
    const dispatch = useDispatch();
    const [pstate, setState] = useState({ products: [] });
    //Pagination
    const pages = [3, 6, 10]
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])

    //For Searching
    const [searched, setSearched] = useState("");
    let deleteitems = []
    useEffect(() => {
        setState((prevstate) => ({
            ...prevstate, products: productList
        }))


    }, [Store.getState().change])

    const Tablehead = withStyles((theme) => ({
        root: {
            backgroundColor: "#A6D0E4",
            textAlign: 'center'
        }
    }))(TableHead)
    const TableHeadCell = withStyles((theme) => ({
        root: {
            fontSize: '1.2em',
            fontFamily: 'fantasy',
            textAlign: 'center'
        }
    }))(TableCell)
    const TableBodyRow = withStyles((theme) => ({
        root: {
            textAlign: 'center',
            backgroundColor: '#FFFFFF',

            paddingTop: '3px',
            '&:hover': {
                backgroundColor: "#D3E0DC"
            }


        }
    }))(TableRow)

    const TableBodyCell = withStyles((theme) => ({
        root: {
            textAlign: 'center',
            fontSize: '1em',
            width: '250px',
            color: 'blue',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }
    }))(TableCell)
    const Tablepagination = withStyles((theme) => ({
        root: {
            fontSize: '1em'
        }
    }))(TablePagination)

    const useStyle = makeStyles({
        searchbar: {
            marginTop: '2px',
            height: 'auto',
            width: '180px',
            fontSize: '1.3em',
            borderRadius: '8px',

        }
    })
    const classes = useStyle();

    function handleChangePage(event, newPage) {
        setPage(newPage)
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    function productsAfterPaging() {

        return pstate.products.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    const searchRequest = (searchvalue) => {
        setPage(0)
        const filteredProducts = productList.filter(
            (row) => {
                return row.product_name.toLowerCase().includes(searchvalue.toLowerCase());
            });
        setState((prevstate) => ({
            ...prevstate, products: filteredProducts
        }))

    }
    const cancelSearch = () => {
        setSearched("")
        searchRequest(searched)
        setState((prevstate) => ({
            ...prevstate, products: productList
        }))
    }

    let user_details = '';
    let user = 'User';
    if (issignedin) {
        user_details = userdata;
        user = user_details.First_Name

    }


    function check() {
        if (issignedin) {

            return false;

        }
        else {

            return true;

        }
    }



    function handleCheck(e) {
        const { value, checked } = e.target

        if (checked) {

            if (issignedin) {
                deleteitems.push(value)
            }

        }
        else {
            let index = deleteitems.indexOf(value)

            deleteitems.splice(index, 1)
            console.log(deleteitems)

        }

    }

    function deleteProduct() {

        if (issignedin) {
            if (deleteitems.length == 0) {
                alert("Please select items to delete");
            }
            else {
                if (window.confirm("Are You sure about deleting?")) {
                    for (let i = 0; i < deleteitems.length; i++) {
                        let productId = deleteitems[i]
                        const RequiredOptions = {
                            method: 'DELETE',
                            headers: { "Content-Type": "application/json ; charset=UTF-8 " }
                        }
                        fetch("http://localhost:3212/products/" + productId, RequiredOptions).then(res => res.json())
                            .then(data => {
                                dispatch(Delete_Products_Action(productId))

                                setState((prevstate) => ({
                                    ...prevstate, products: data
                                }))

                            })
                    }
                }
                deleteitems = []
            }
            history.replace('/products')



        }

        else {
            alert("Sign in to perform changes");
        }
    }



    return (
        <div className="ProductList">
            <Prompt when={check()} message="Sign in to perform changes" />
            <h1 className="heading">Hello {user} Welcome To Products Inventory</h1>
            <div className="buttons">
                <SearchBar className={classes.searchbar}
                    value={searched}
                    onChange={(searchvalue) => searchRequest(searchvalue)}
                    onCancelSearch={() => cancelSearch()}
                    placeholder={'Product Name'}
                />
                <Link className="info" to={() => {
                    if (issignedin) {
                        return '/addproduct'
                    }
                    else {
                        return '/products'
                    }
                }}>Add</Link>
                <button className="info" onClick={deleteProduct}>Delete</button>

            </div>
            <div className="Table">
                <TableContainer component={Paper}>
                    <Table>
                        <Tablehead>
                            <TableRow>

                                <TableHeadCell>PRODUCT NAME</TableHeadCell>
                                <TableHeadCell>PRODUCT MANUFACTURER</TableHeadCell>
                                <TableHeadCell>PRODUCT PRICE</TableHeadCell>
                                <TableHeadCell>PRODUCT QUANTITY</TableHeadCell>
                                <TableHeadCell>PRODUCT UPDATE</TableHeadCell>
                                <TableHeadCell>PRODUCT DELETE</TableHeadCell>
                            </TableRow>
                        </Tablehead>
                        <TableBody>
                            {
                                productsAfterPaging().map(product =>
                                    <TableBodyRow key={product.id}>

                                        <TableBodyCell><Link className="product" to={() => {
                                            if (!issignedin) {
                                                return '/products'
                                            }
                                            else {
                                                return {
                                                    pathname: '/products/' + product.product_name,
                                                    state: {
                                                        Product: product
                                                    }
                                                }
                                            }

                                        }}
                                        >{product.product_name}</Link></TableBodyCell>
                                        <TableBodyCell>{product.product_manufacturer}</TableBodyCell>
                                        <TableBodyCell>{product.product_price}</TableBodyCell>
                                        <TableBodyCell>{product.Quantity}</TableBodyCell>
                                        <TableBodyCell> <Link className="update" to={() => {
                                            if (issignedin) {
                                                return '/products/update/' + product.product_name
                                            }
                                            else {
                                                return '/products'
                                            }
                                        }}>Update</Link></TableBodyCell>

                                        <TableCell>
                                            <input type="checkbox" onChange={(e) => { handleCheck(e) }} value={product.id}

                                            />
                                        </TableCell>

                                    </TableBodyRow>

                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Tablepagination rowsPerPageOptions={pages}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    count={pstate.products.length} component='div' />
            </div>


        </div>

    )
}
export default ProductsList;