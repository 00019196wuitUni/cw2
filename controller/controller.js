const fs = require('fs')
const express = require('express')

function uniqueId() {
    return Math.random().toString(36).substr(2, 9);
} 

class Controller {
    indexPage(req,res) {
        res.render('index')
    }

    addProductPage(req, res) {
        res.render('addProduct')
    }

    createFunction(req,res) {

        const name = req.body.name
        const description = req.body.description
        const phoneNumber = req.body.phoneNumber
        const available = req.body.available
        

        fs.readFile('./data/database.json', (err, data) => {
            if(err){
                console.log(err)
            }
            const product = JSON.parse(data)

            product.push({
                id: uniqueId(),
                name:name,
                phoneNumber:phoneNumber,
                description: description,
                available:available
            })
            fs.writeFile('./data/database.json', JSON.stringify(product), err => {
                if(err){
                    console.log(err)
                }
                res.render('index')
            })
        })
    }
    listOfProductsRender(req,res){
        fs.readFile('./data/database.json', (err, data)=>{
            if(err){
                console.log(err)
            }
    
            const product = JSON.parse(data)
            res.render('listOfProducts', 
            {
                products: product
            })
    
        })
    }
    removeProduct (req,res) {
        const id = req.params.id

        fs.readFile('./data/database.json', (err, data) =>{
            if(err){
                console.log(err)
            }

        const products = JSON.parse(data)
        const product = products.filter(product => product.id != id)

        fs.writeFile('./data/database.json', JSON.stringify(product), (err) =>{
            if(err){
                console.log(err)
            }
            res.render('listOfProducts', {products: product, deleted:true})
        })
        })
    }
}

module.exports =  new Controller()
