const mysql = require('mysql2')
const express = require('express')
let app = express()
const bodyparser = require('body-parser')
//const PoolCluster = require('mysql2/lib/pool_cluster')

app.use(bodyparser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'flowers',
    multipleStatements: true
})

app.listen(process.env.PORT || 3001, () => console.log('Express server is running at post 3001'))


// Get categories

app.get('/get_categories', (req, res) => {
    pool.query('SELECT * from product_category', (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        }
        else {
            console.log(err)
        }
    })
})

app.get('/get_occasions', (req, res) => {
    pool.query('SELECT * from occasions', (err, rows, fields) => {

        if (!err) {
            res.send(rows)
        }
        else {
            console.log(err)
        }
    })
})

// Get all flowers

app.get('/get_flowers_types', (req, res) => {
    pool.query('SELECT * from flowers_category', (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        }
        else {
            console.log(err)
        }
    })
})

// Get all colors

app.get('/get_all_colors', (req, res) => {
    pool.query('SELECT * from color_variants', (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        }
        else {
            console.log(err)
        }
    })
})

// Get all products by categories

app.get('/get_all_products_by_categories', (req, res) => {
    pool.query(`SELECT * from products where category = ${req.query.category}`, (err, products, fields) => {
        if (!err) {
            // К товарам добавить еще категории, чтобы в дальнейшем использовать для создания url
            pool.query('SELECT * from product_category', (err, categories, fields) => {
                if (!err) {
                    for (let i = 0; i < products.length; i++){
                        for (let k = 0; k < categories.length; k++) {
                            if (categories[k].id == products[i].category) {
                                products[i].category_url = categories[k].url_name
                            }
                        }
                    }
                    res.send(products)
                }
                else {
                    console.log(err)
                }
            })
        }
        else {
            console.log(err)
        }
    })
})

// Получить данные для отображения каталога

app.get('/catalog_products', (req, res) => {

    console.log('*')

    let queryStr = 'SELECT * from product_category'

    pool.query('SELECT * from products', (err, products, fields) => {
        if (!err) {
            // К товарам добавить еще категории, чтобы в дальнейшем использовать для создания url
            pool.query('SELECT * from product_category', (err, categories, fields) => {
                if (!err) {
                    for (let i = 0; i < products.length; i++){
                        for (let k = 0; k < categories.length; k++) {
                            if (categories[k].id == products[i].category) {
                                products[i].category_url = categories[k].url_name
                            }
                        }
                    }
                    res.send(products)
                }
                else {
                    console.log(err)
                }
            })
        }
        else {
            console.log(err)
        }
    })
})


// Get a product
app.get('/products/id', (req, res) => {
    pool.query('SELECT * from products WHERE id = ?',[req.query.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        }
        else {
            console.log(err)
        }
    })
})

// Get images for product

app.get('/images/id', (req, res) => {
    pool.query('SELECT * from pictures WHERE product_id = ?', [req.query.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        }
        else {
            console.log(err)
        }
    })
})

app.get('/subscribe', (req, res) => {

    let clientData = JSON.parse(req.query.clientData)

   if (!clientData.email || clientData.email.indexOf('@') == -1 || clientData.email.length < 5) return false

    let a = pool.query('SELECT * FROM email_subscribers where email LIKE ?', clientData.email, (err, rows, fields) => {
        if (err) {
            res.send('Ошибка!')
            return false
        }
        if (rows.length == 0){
            let sql = 'INSERT INTO email_subscribers (email, name, client_id) VALUES (?,?,?)'
            pool.query(sql, [clientData.email, clientData.name, clientData.client], (err, rows, fields) => {
                if (!err) {
                    res.send('Success')
                }
                else {
                    console.log(err)
                }
            })
            return false
        }
        rows[0].email == clientData.email ? res.send('Email exists') : ''
    })
})


app.post('/send_order', (req, res) => {

    let sql = 'INSERT INTO orders (phone, order_info, email, adress, additional, date, time, client_id, form_id) VALUES (?,?,?,?,?,?,?,?,?)',
        data = req.body.params.clientData,
        phone = data.phone.replace(/[^\d]/g, '')

    if (!data.phone.length || !data.phone) {
        res.send('Нет телефона')
        return false
    }

    pool.query(sql, [phone, data.order, data.email, data.adress, data.additional, data.date, data.time, data.client, data.form_id], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        }
        else {
            console.log(err)
        }
    })
})

// Поиск

app.get('/clients_search', (req, res) => {

    let sql = "SELECT * from `products` where `title` LIKE '%" + req.query.text + "%'"

    pool.query(sql, (err, rows, fields) => {
        if (!err) {

            // К товарам добавить еще категории, чтобы в дальнейшем использовать для создания url
            pool.query('SELECT * from product_category', (err, categories, fields) => {
                if (!err) {
                    for (let i = 0; i < rows.length; i++){
                        for (let k = 0; k < categories.length; k++) {
                            if (categories[k].id == rows[i].category) {
                                rows[i].category_url = categories[k].url_name
                            }
                        }
                    }
                    res.send(rows)
                }
                else {
                    console.log(err)
                }
            })
        }
        else {
            console.log(err)
        }
    })
})