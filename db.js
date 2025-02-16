import { query } from 'express'
import mysql from 'mysql2'

const pool = mysql.createPool( {
    host: 'localhost',
    user: 'danieleghosa',
    password: 'mySQL2004@',
    database: 'dwp'
}).promise()


export async function checkForBrand(brandQuery) {
    try {
        const [query] = await pool.query(`SELECT * FROM NewDB Where brand = (?)`, [brandQuery])

        // console.log(query)
        return query
    } catch (err) {
        console.log(err)
    }
}

export async function sendAll(){
    const [query]  = await pool.query(`SELECT * FROM NewDB`);
    return query
}

async function sandBox() {

    const [response] = await pool.query(`SELECT * FROM USERS`);
    return response[57]
    
}


// const callingB = await sandBox();
// console.log(callingB)


async function joinQuery(ni_query) {

    let query = `select * from ni_no
                join users on ni_no.user_id = users.user_id
                where ni_no.ni = (?)
                `

    let query2 = `
                select ni_no.ni, users.first_name, users.last_name, users.middle_name
                from ni_no
                join users on ni_no.user_id = users.user_id;
                
    `

    let query3 = `
                    select address.home_address, address.address_2, address.post_code, address.county, users.first_name, users.last_name
                    from address
                    join users on address.user_id = users.user_id
                `

    query3 = `
                    select address.home_address, address.address_2, address.post_code, address.county, users.first_name, users.last_name 
                    from address
                    join users on address.user_id = users.user_id
                    where address.home_address = (?)
            `
    try {
        const [response] = await pool.query(query3, [ni_query]);

        
        console.log('response below')
        return response
    
    } catch (err) {
        console.log('error below')
        return err
    }
}

// const queryTest = await joinQuery('1234 McDonalds');
// if (Array.isArray(queryTest)) {
//     console.log('true')

//     if (!queryTest.length) {
//         console.log('Nothing found')

        
//     } 
// } else {
//     console.log('not array')
// }
// console.log( queryTest)


export async function queryByNi(niNo) {
    let query = `
                select u.first_name, u.last_name, a.home_address, a.post_code, a.county, n.ni, c.phone_no
                
                from users u

                inner join address a ON u.user_id = a.user_id
                inner join ni_no n ON a.user_id = n.user_id
                inner join contact c ON n.user_id = c.user_id
                where n.ni = (?);
    `

    try {
        const [response] = await pool.query(query, [niNo]);
        console.log('response below')
        return response[0]

     } catch (err) {
        console.log(err)
        console.log('err above')
     }
}

// const test900 = await queryByNi('WX234567O');
// console.log(test900)