import { Prompt, useHistory, withRouter } from "react-router-dom"
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as  Yup from 'yup'
import { PUT_Products_Action } from '../Store/Actions';



function UpdateProduct(props) {
    const productList = useSelector((state) => state.Products);
    const issignedin = useSelector((state) => state.signedin);
    let product = {}
    const dispatch = useDispatch();
    let price = ""
    let prompt = true
    productList.map((Product) => {
        if (Product.product_name == props.match.params.id) {
            product = Product
            price = product.product_price.substr(3,)
            price = price.replace(",", "");
            price = Number.parseInt(price)

        }
    })
    let history = useHistory();
    const formik = useFormik({
        initialValues: {
            product_name: product.product_name,
            product_description: product.product_description,
            product_manufacturer: product.product_manufacturer,
            product_price: price,
            Quantity: product.Quantity,


        },
        validationSchema: Yup.object({
            product_name: Yup.string().required("product name is Required"),
            product_manufacturer: Yup.string().required("product manufacturer is Required"),
            product_price: Yup.number().required("product_price is Required"),
            product_description: Yup.string().required("A breif description is Required"),
            Quantity: Yup.number().required("Quantity is Required"),

        }),
        onSubmit(values) {
            if (issignedin) {
                const RequiredOptions = {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json ; charset=UTF-8 " },
                    body: JSON.stringify({
                        "product_name": values.product_name,
                        "product_description": values.product_description,
                        "product_manufacturer": values.product_manufacturer,
                        "product_price": "Rs " + values.product_price,
                        "Quantity": values.Quantity,
                    })
                }
                fetch("http://localhost:3212/products/" + product.id, RequiredOptions).then(res => res.json())
                    .then(data => {
                        dispatch(PUT_Products_Action(data));


                    })
                prompt = false
                history.replace('/products')
            }
            else {
                alert("Please sign in to make changes")
                history.replace("/")
            }
        }
    }
    )
    return (
        <div className='rregisterform'>
            <Prompt when={prompt} message="Are you sure you want to leave the page" />
            <h2>Update PRODUCT</h2>

            <form className='rvalid' onSubmit={formik.handleSubmit} noValidate>
                <div className='rformdiv'>
                    <div className='rinput'>

                        <input type='text' name='product_name' placeholder='Enter Product Name'

                            className={formik.touched.product_name && formik.errors.product_name ? 'rerror' : 'rtext'} id='email'
                            {...formik.getFieldProps('product_name')} />
                        {formik.touched.product_name && formik.errors.product_name && <span style={{ color: 'red', fontStyle: 'italic' }}>
                            {formik.errors.product_name}</span>}
                    </div>
                    <div className='rinput'>

                        <textarea name='product_description' placeholder='Description about the product'
                            className={formik.touched.product_description &&
                                formik.errors.product_description ? 'rerror' : 'rtext'}
                            {...formik.getFieldProps('product_description')} />
                        {formik.touched.product_description
                            && formik.errors.product_description && <span style={{ color: 'red', fontStyle: 'italic' }}>
                                {formik.errors.product_description}</span>}
                    </div>

                    <div className='rinput'>

                        <input type='text' name='product_manufacturer' placeholder='product manufactured by'
                            className={formik.touched.product_manufacturer
                                && formik.errors.product_manufacturer ? 'rerror' : 'rtext'}
                            {...formik.getFieldProps('product_manufacturer')} />
                        {formik.touched.product_manufacturer && formik.errors.product_manufacturer
                            && <span style={{ color: 'red', fontStyle: 'italic' }}>
                                {formik.errors.product_manufacturer}</span>}
                    </div>
                    <div className='rinput'>

                        <input type="number" name='product_price' placeholder='35999'
                            className={formik.touched.product_price
                                && formik.errors.product_price ? 'rerror' : 'rtext'}
                            {...formik.getFieldProps('product_price')} />
                        {formik.touched.product_price
                            && formik.errors.product_price && <span style={{ color: 'red', fontStyle: 'italic' }}>
                                {formik.errors.product_price}</span>}
                    </div>

                    <div className='rinput'>

                        <input type="number" name='Quantity' placeholder='Quantity'
                            className={formik.touched.Quantity &&
                                formik.errors.Quantity ? 'rerror' : 'rtext'}
                            {...formik.getFieldProps('Quantity')} />
                        {formik.touched.Quantity
                            && formik.errors.Quantity && <span style={{ color: 'red', fontStyle: 'italic' }}>
                                {formik.errors.Quantity}</span>}
                    </div>
                </div>
                <div className='rsubmit'>
                    <button type='submit' className='rbutton'>Update Product</button>
                </div>
            </form>



        </div>

    )
}
export default withRouter(UpdateProduct);